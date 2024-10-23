import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

// TypeScript interfaces
export interface Listing {
    id: string;
    title: string;
    location: string;
    description: string;
    propertyType: string;
    keyFeatures: string[];
    pricePerNight: number;
    idealFor: string;
    rating: number;
}

const LISTING_PROMPT = `You are a creative travel destination generator specializing in imaginative, AI-generated locations. Generate a rental listing with the following characteristics:

Each listing should feel both fantastical yet somehow plausible, include subtle references to AI and technology without making it overwhelming, and balance wonder with practicality.

Please generate a listing using the following JSON format:
{
  "title": "A captivating name for the property (max 40 characters)",
  "location": "An evocative location name (max 30 characters)",
  "description": "A compelling 2-3 sentence description (max 200 characters)",
  "propertyType": "The type of accommodation (e.g., loft, villa, treehouse)",
  "keyFeatures": ["Array of 3-5 standout features"],
  "pricePerNight": "A number between 100-1000",
  "idealFor": "1-2 target guest types (e.g., 'Digital nomads', 'Tech enthusiasts')"
}

Ensure the response is valid JSON and includes all fields. Balance innovation with homey comfort and avoid dystopian elements or unrealistic features.`;

export async function generateListing(): Promise<Listing> {
    try {
        // Construct the prompt with any specific requirements
        const prompt = LISTING_PROMPT;

        // Make the API call
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert at creating unique and appealing travel listings."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
            response_format: { type: "json_object" }
        });

        // Parse the response
        const response = completion.choices[0].message.content;
        if (!response) {
            throw new Error('No response from OpenAI');
        }

        const listing = JSON.parse(response) as Listing;

        // Validate the response has all required fields
        const requiredFields: (keyof Listing)[] = [
            'title',
            'location',
            'description',
            'propertyType',
            'keyFeatures',
            'pricePerNight',
            'idealFor'
        ];

        for (const field of requiredFields) {
            if (!listing[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        return listing;
    } catch (error) {
        console.error('Error generating listing:', error);
        throw error;
    }
}

// Example usage:
async function example() {
    try {
        // Generate a basic listing
        const basicListing = await generateListing();
        console.log('Basic listing:', basicListing);

    } catch (error) {
        console.error('Error in example:', error);
    }
}

// Uncomment to run the example:
example();