import { useState, useEffect } from 'preact/hooks';
import { Search, MapPin, Star, Plus, Loader2 } from 'lucide-react';
import { Listing } from "@shared/types";



const ListingCard = ({ listing, isLoading = false }: { listing: Listing, isLoading?: boolean }) => {
	const imageUrl = `http://localhost:3000/img/${listing.id}.png`;

	return (
		<div className={`rounded-xl overflow-hidden shadow-lg transition-all ${isLoading ? 'opacity-60 animate-pulse' : 'hover:scale-105'}`}>
			<img
				src={isLoading ? "https://placehold.co/400x300" : imageUrl}
				alt={listing.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<div className="flex justify-between items-start">
					<h3 className="font-semibold text-lg">
						{isLoading ? 'Generating...' : listing.title}
					</h3>
					<div className="flex items-center">
						<Star className="w-4 h-4" />
						<span className="ml-1">{listing.rating || 'New'}</span>
					</div>
				</div>
				<div className="flex items-center text-gray-600 mt-1">
					<MapPin className="w-4 h-4 mr-1" />
					<span>{isLoading ? 'Finding location...' : listing.location}</span>
				</div>
				<p className="text-gray-600 mt-2">
					{isLoading ? 'Creating an amazing AI-generated destination just for you...' : listing.description}
				</p>
				<div className="mt-4">
					<span className="font-bold">${listing.pricePerNight}</span>
					<span className="text-gray-600"> / night</span>
				</div>
				{!isLoading && listing.keyFeatures && (
					<div className="mt-3 flex flex-wrap gap-2">
						{listing.keyFeatures.map((feature, index) => (
							<span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
								{feature}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => {

	return (
		<div className="flex items-center space-x-4 mb-8">
			<div className="flex-1 relative">
				<input
					type="text"
					value={searchQuery}
					onInput={(e) => setSearchQuery(e.currentTarget.value)}
					placeholder="Search AI-generated destinations..."
					className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
				/>
				<Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
			</div>
			{/*<button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
				<Filter className="w-5 h-5" />
			</button>
			*/}
		</div>
	)
}

const GenerateButton = ({ onClick, isGenerating }: { onClick: () => void, isGenerating: boolean }) => (
	<button
		onClick={onClick}
		disabled={isGenerating}
		className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
	>
		{isGenerating ? (
			<Loader2 className="w-5 h-5 animate-spin" />
		) : (
			<Plus className="w-5 h-5" />
		)}
		<span className="pr-2">Generate New Listing</span>
	</button>
);

const AIRentalMarketplace = () => {
	const [listings, setListings] = useState<Listing[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');


	useEffect(() => {
		fetch('http://localhost:3000/api/listings')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setListings(data);
			});
	}, []);


	const generateNewListing = async () => {
		setIsGenerating(true);

		// Create a temporary loading listing at the start of the list
		const loadingListing: Listing = {
			id: "",
			title: "",
			location: "",
			description: "",
			propertyType: "",
			keyFeatures: [],
			pricePerNight: 0,
			idealFor: "",
			rating: 0
		};

		setListings(prev => [loadingListing, ...prev]);

		try {

			const response = await fetch('http://localhost:3000/api/listings', {
				method: 'POST'
			});

			if (!response.ok) {
				throw new Error("Error fetching generated listing: " + response);
			}

			const newListing: Listing = await response.json();

			// Replace the loading listing with the new one
			setListings(prev => [newListing, ...prev.slice(1)]);
		} catch (error) {
			// Remove the loading listing if there's an error
			setListings(prev => prev.slice(1));
			console.error('Error generating listing:', error);
			// You might want to show an error toast here
		} finally {
			setIsGenerating(false);
		}
	};

	// Filter and sort listings based on search query
	const filteredListings = listings.filter(listing =>
		listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		listing.location.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold mb-4"><b>AI</b>rbnb</h1>
				<p className="text-gray-600">Discover AI-generated destinations beyond imagination</p>
			</header>

			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredListings.map(listing => (
					<ListingCard
						key={listing.id}
						listing={listing}
						isLoading={isGenerating && listing.id === listings[0].id}
					/>
				))}
			</div>

			<GenerateButton onClick={generateNewListing} isGenerating={isGenerating} />
		</div>
	);
};

export default AIRentalMarketplace;