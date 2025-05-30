import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/common/Navbar';
import Card, { CardBody, CardHeader } from '../../components/common/Card';
import { Search, Filter, MapPin, Star, Clock, ChevronDown } from 'lucide-react';
import { serviceListings, serviceCategories } from '../../data/mockData';

const ClientDashboard = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filteredListings, setFilteredListings] = useState(serviceListings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = serviceListings.filter((listing) => {
      // Search term filter
      const matchesSearch = 
        searchTerm === '' || 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        selectedCategory === '' || 
        listing.category === selectedCategory;
      
      // Price range filter
      const matchesPrice = 
        listing.price >= priceRange[0] && 
        listing.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    setFilteredListings(filtered);
  }, [searchTerm, selectedCategory, priceRange]);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = newValue;
      return newRange;
    });
  };

  const getCategoryName = (categoryId: string) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="client" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {currentUser?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Find the perfect service provider for your needs.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={toggleFilter}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                <Filter className="mr-2 h-5 w-5" />
                Filters
                <ChevronDown className="ml-2 -mr-1 h-5 w-5" />
              </button>

              {filterOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-60 md:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1 px-4" role="menu" aria-orientation="vertical">
                    <div className="py-2">
                      <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="all-categories"
                            name="category"
                            type="radio"
                            checked={selectedCategory === ''}
                            onChange={() => setSelectedCategory('')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="all-categories" className="ml-3 text-sm text-gray-700">
                            All Categories
                          </label>
                        </div>
                        
                        {serviceCategories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              id={`category-${category.id}`}
                              name="category"
                              type="radio"
                              checked={selectedCategory === category.id}
                              onChange={() => setSelectedCategory(category.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-700">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="py-2 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Min: ${priceRange[0]}</span>
                          <span className="text-sm text-gray-500">Max: ${priceRange[1]}</span>
                        </div>
                        <div>
                          <label htmlFor="min-price" className="block text-xs text-gray-500">
                            Minimum Price
                          </label>
                          <input
                            type="range"
                            id="min-price"
                            min={0}
                            max={500}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceRangeChange(e, 0)}
                            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label htmlFor="max-price" className="block text-xs text-gray-500">
                            Maximum Price
                          </label>
                          <input
                            type="range"
                            id="max-price"
                            min={0}
                            max={1000}
                            value={priceRange[1]}
                            onChange={(e) => handlePriceRangeChange(e, 1)}
                            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="mb-8 overflow-x-auto pb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Categories</h2>
          <div className="flex space-x-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-sm min-w-[120px] transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-400'
                    : 'bg-blue-100'
                }`}>
                  <span className={selectedCategory === category.id ? 'text-white' : 'text-blue-500'}>
                    {category.icon.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-center">
                  {category.name}
                </span>
                <span className="text-xs mt-1">
                  {category.providers} providers
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Listings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Available Services</h2>
            <div className="text-sm text-gray-500">
              {filteredListings.length} {filteredListings.length === 1 ? 'result' : 'results'}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardBody>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900">No services found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((service) => (
                <Link to={`/client/provider/${service.providerId}?service=${service.id}`} key={service.id}>
                  <Card className="h-full transition-transform hover:scale-[1.02] hover:shadow-lg">
                    <div className="h-48 w-full overflow-hidden rounded-t-lg">
                      <img 
                        src={service.images[0]} 
                        alt={service.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardBody>
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCategoryName(service.category)}
                        </span>
                        {service.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {service.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin size={16} className="mr-1" />
                        {service.location}
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center text-yellow-400 mr-2">
                          <Star size={16} className="fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-900">
                            {service.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({service.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-gray-900">
                          ${service.price}
                          <span className="text-sm font-normal text-gray-500">
                            /{service.priceType}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-1" />
                          {service.availableDays.length} days
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
