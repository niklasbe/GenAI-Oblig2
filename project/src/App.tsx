import { useState } from 'react';
import { Search, MapPin, Star, Filter } from 'lucide-react';

type Listing = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: number;
};

const ListingCard = ({ listing }: { listing: Listing }) => (
  <div className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
    <img
      src="/api/placeholder/400/300"
      alt={listing.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{listing.title}</h3>
        <div className="flex items-center">
          <Star className="w-4 h-4" />
          <span className="ml-1">{listing.rating}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-600 mt-1">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{listing.location}</span>
      </div>
      <p className="text-gray-600 mt-2">{listing.description}</p>
      <div className="mt-4">
        <span className="font-bold">${listing.price}</span>
        <span className="text-gray-600"> / night</span>
      </div>
    </div>
  </div>
);

const SearchBar = () => (
  <div className="flex items-center space-x-4 mb-8">
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Search AI-generated destinations..."
        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
    </div>
    <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
      <Filter className="w-5 h-5" />
    </button>
  </div>
);

const AIRentalMarketplace = () => {
  const [listings] = useState([
    {
      id: 1,
      title: "Cyberpunk Skyline Loft",
      location: "Neo Tokyo District",
      description: "Experience the future in this AI-designed loft with panoramic holographic views",
      price: 299,
      rating: 4.9
    },
    {
      id: 2,
      title: "Quantum Garden Retreat",
      location: "Digital Wilderness",
      description: "A peaceful sanctuary where nature meets quantum computing",
      price: 199,
      rating: 4.7
    },
    {
      id: 3,
      title: "Neural Network Nexus",
      location: "Silicon Valley 2.0",
      description: "Live inside a visualization of a neural network",
      price: 399,
      rating: 4.8
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AIrbnb</h1>
        <p className="text-gray-600">Discover AI-generated destinations beyond imagination</p>
      </header>

      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default AIRentalMarketplace;