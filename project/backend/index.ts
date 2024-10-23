import { serve } from "bun";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const server = serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);

        // Handle CORS preflight requests
        if (req.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        if (url.pathname === "/api/test") {
            let responseBody;
            if (req.method === "GET") {
                responseBody = "This is a GET request to /api/test";
            } else if (req.method === "POST") {
                responseBody = "This is a POST request to /api/test";
            } else {
                return new Response("Method not allowed", { status: 405, headers: corsHeaders });
            }

            return new Response(responseBody, {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "text/plain" }
            });
        } else {
            return new Response("Not found", { status: 404, headers: corsHeaders });
        }
    },
});

console.log(`Server running at http://localhost:${server.port}`);