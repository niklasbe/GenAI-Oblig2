import OpenAI from "openai";
import type { Listing } from "@shared/types";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});


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


export async function generateImage(listing: Listing) {
	// Make the API call
	const description = listing.description;

	const image = await openai.images.generate({
		model: "dall-e-2",
		prompt: "Generate a realistic image of a housing listing on Airbnb. The image must not be abstract - it is housing for real people. Description: " + description,
		size: "256x256",
	});

	console.log(image.data);
	if (image.data[0].url) {
		await downloadImage(image.data[0].url, listing.id);
	} else {
		throw new Error("Image URL is undefined");
	}
};