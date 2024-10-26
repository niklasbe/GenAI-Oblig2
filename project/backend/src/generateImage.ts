import OpenAI from "openai";
import type { Listing } from "@shared/types";

// Initialize OpenAI client with API key
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

// Download and save image to disk
const downloadImage = async (url: string, id: string) => {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();
	const image = Buffer.from(buffer);

	try {
		await Bun.write(`img/${id}.png`, image);
	}
	catch (error) {
		console.error(error);
	}
};


// Generate image based on listing description
export async function generateImage(listing: Listing) {

	const description = listing.description;
	// Request image generation from OpenAI
	const image = await openai.images.generate({
		model: "dall-e-2",
		prompt: "Generate a realistic image of a housing listing on Airbnb. The image must not be abstract - it is housing for real people. Description: " + description,
		size: "256x256",
	});

	// Save generated image to disk
	if (image.data[0].url) {
		await downloadImage(image.data[0].url, listing.id);
	} else {
		throw new Error("Image URL is undefined");
	}
};