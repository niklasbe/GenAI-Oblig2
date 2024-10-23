
export interface Listing {
    id: string;
    title: string;
    location: string;
    description: string;
    propertyType: string;
    imageUrl: string;
    keyFeatures: string[];
    pricePerNight: number;
    idealFor: string;
    rating: number;
}