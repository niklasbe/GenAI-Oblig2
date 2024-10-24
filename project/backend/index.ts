import { serve } from "bun";
import { Database } from "bun:sqlite";
import type { Listing } from "@shared/types";


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
                return new Response("POST request", {
                    status: 200,
                    headers: { ...corsHeaders, "Content-Type": "text/plain" }
                });
            } else {
                return new Response("Method not allowed", { status: 405, headers: corsHeaders });
            }


        } else {
            return new Response("Not found", { status: 404, headers: corsHeaders });
        }
    },
});

console.log(`Server running at http://localhost:${server.port}`);