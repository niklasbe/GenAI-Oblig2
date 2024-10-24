import { serve } from "bun";
import { Database } from "bun:sqlite";
import type { Listing } from "@shared/types";

import { generateListing } from "./generateListing";
import { generateImage } from "./generateImage";


const db = new Database("database.db");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const getAllListings = async () => {
    const query = db.query("SELECT * FROM listings");
    // Map the listings from the database to the Listing type
    const listings: Listing[] = query.all().map((row: any) => ({
        ...row,
        keyFeatures: JSON.parse(row.keyFeatures),
    }));
    return listings;
};

const server = serve({
    port: 3000,
    idleTimeout: 30,
    async fetch(req) {
        const url = new URL(req.url);

        // Handle CORS preflight requests
        if (req.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        if (url.pathname === "/api/listings") {

            if (req.method === "GET") {
                const listings = JSON.stringify(await getAllListings());
                return new Response(listings, {
                    status: 200,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });
            } else if (req.method === "POST") {
                const listing: Listing = await generateListing();
                // Insert the new listing into the database
                const query = db.prepare(
                    `INSERT INTO listings (id, title, location, description, propertyType, keyFeatures, pricePerNight, idealFor,rating) 
                    VALUES ($id, $title, $location, $description, $propertyType, $keyFeatures, $pricePerNight, $idealFor, $rating)`
                );
                const run = query.run({
                    $id: listing.id,
                    $title: listing.title,
                    $location: listing.location,
                    $description: listing.description,
                    $propertyType: listing.propertyType,
                    $keyFeatures: JSON.stringify(listing.keyFeatures),
                    $pricePerNight: listing.pricePerNight,
                    $idealFor: listing.idealFor,
                    $rating: listing.rating,
                });
                // Verify if the listing was inserted
                if (run.changes !== 1) {
                    return new Response("Error inserting listing", { status: 500, headers: corsHeaders });
                }

                console.log(listing);
                await generateImage(listing);

                // Return the new listing
                return new Response(JSON.stringify(listing), {
                    status: 200,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });

            } else {
                return new Response("Method not allowed", { status: 405, headers: corsHeaders });
            }
        }

        else if (url.pathname.startsWith("/img/")) {
            const file = Bun.file(url.pathname.slice(1));

            const fileExists = await file.exists();

            if (!fileExists) {
                console.log("Not found, returning 404");
                return new Response("Not found", { status: 404, headers: corsHeaders });
            }
            // const file = Bun.file(url.pathname);
            return new Response(file, { headers: { ...corsHeaders, "Content-Type": "image/png", "Cache-Control": "public, max-age=604800" } });
        }
        else {
            return new Response("Not found", { status: 404, headers: corsHeaders });
        }
    },
});

console.log(`Server running at http://localhost:${server.port}`);