import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { mockUsers, serviceListings, mockReviews } from '../../data/mockData';
import { Star, MapPin, Phone, Mail, Calendar, Clock, ChevronRight, MessageSquare, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');
  const navigate = useNavigate();
  
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingNote, setBookingNote] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      // Find provider by ID
      const providerData = mockUsers.find(user => user.id === id && user.userType === 'provider');
      if (providerData) {
        setProvider(providerData);
      }
      
      // Get services for this provider
      const providerServices = serviceListings.filter(service => service.providerId === id);
      setServices(providerServices);
      
      // Set selected service if serviceId is provided
      if (serviceId) {
        const service = providerServices.find(s => s.id === serviceId);
        if (service) {
          setSelectedService(service);
          setShowBookingForm(true);
        }
      } else if (providerServices.length > 0) {
        setSelectedService(providerServices[0]);
      }
      
      // Get reviews for this provider
      const providerReviews = mockReviews.filter(review => review.providerId === id);
      setReviews(providerReviews);
      
      setLoading(false);
    }, 800);
  }, [id, serviceId]);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate booking process
    setLoading(true);
    
    setTimeout(() => {
      setBookingSuccess(true);
      setLoading(false);
    }, 1000);
  };
  
  const resetBookingForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setBookingNote('');
    setBookingSuccess(false);
  };

  const handleMessageProvider = () => {
    navigate('/client/messages');
  };

  if (loading && !provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType="client" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="h-20 w-20 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType="client" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h2>
            <p className="text-gray-600 mb-4">
              The service provider you're looking for doesn't exist or has been removed.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/client')}
            >
              Return to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Available booking times
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Generate dates for the next 14 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="client" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/client')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <ChevronRight className="mr-1 h-5 w-5 transform rotate-180" />
            Back to services
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {provider.name}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Provider Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardBody>
                <div className="flex items-center mb-4">
                  <img 
                    src={provider.avatar} 
                    alt={provider.name} 
                    className="h-20 w-20 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {provider.name}
                    </h2>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {provider.rating} ({reviews.length} reviews)
                      </span>
                    </div>
                    {provider.verified && (
                      <div className="flex items-center text-green-600 text-sm mt-1">
                        <CheckCircle size={14} className="mr-1" />
                        Verified Provider
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-start mb-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="ml-2 text-gray-700">{provider.location}</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="ml-2 text-gray-700">{provider.phone}</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="ml-2 text-gray-700">{provider.email}</span>
                  </div>
                  <div className="flex items-start mb-3">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="ml-2 text-gray-700">Member since {provider.dateJoined}</span>
                  </div>
                </div>
                
                {provider.bio && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700">
                      {provider.bio}
                    </p>
                  </div>
                )}
                
                <div className="mt-4">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleMessageProvider}
                    className="flex items-center justify-center"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Message Provider
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Client Reviews</h3>
              </CardHeader>
              <CardBody className="p-4">
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {format(new Date(review.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No reviews yet</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* Services and Booking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Services List */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Available Services</h3>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-200">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedService?.id === service.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900 mb-1">
                            {service.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-700 font-medium mr-4">
                              ${service.price}/{service.priceType}
                            </span>
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-gray-700">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceSelect(service);
                            }}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            {/* Booking Form */}
            {selectedService && (
              <Card className={`${showBookingForm ? '' : 'cursor-pointer hover:shadow-md'}`} onClick={!showBookingForm ? handleBookNow : undefined}>
                <CardHeader className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Book this Service</h3>
                  {!showBookingForm && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow();
                      }}
                    >
                      Book Now
                    </Button>
                  )}
                </CardHeader>
                
                {showBookingForm && (
                  <>
                    <CardBody>
                      {bookingSuccess ? (
                        <div className="text-center py-6">
                          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="mt-3 text-lg font-medium text-gray-900">Booking Successful!</h3>
                          <p className="mt-2 text-sm text-gray-500">
                            Your booking request has been sent to {provider.name}. 
                            You'll receive a confirmation soon.
                          </p>
                          <div className="mt-6">
                            <Button
                              variant="outline"
                              onClick={() => {
                                resetBookingForm();
                                navigate('/client');
                              }}
                            >
                              Return to Dashboard
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleBookingSubmit}>
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Service</h4>
                              <div className="bg-blue-50 p-4 rounded-md">
                                <div className="flex justify-between">
                                  <div>
                                    <h5 className="font-medium text-gray-900">{selectedService.title}</h5>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {selectedService.description.substring(0, 100)}...
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-lg font-bold text-gray-900">
                                      ${selectedService.price}
                                    </span>
                                    <p className="text-sm text-gray-600">
                                      /{selectedService.priceType}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Date
                              </label>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                                {availableDates.slice(0, 7).map((date, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    className={`p-2 border rounded-md text-center focus:outline-none ${
                                      selectedDate === format(date, 'yyyy-MM-dd') 
                                        ? 'bg-blue-500 text-white border-blue-500' 
                                        : 'border-gray-300 hover:border-blue-500'
                                    }`}
                                    onClick={() => setSelectedDate(format(date, 'yyyy-MM-dd'))}
                                  >
                                    <div className="text-xs font-medium">
                                      {format(date, 'EEE')}
                                    </div>
                                    <div className="font-bold">
                                      {format(date, 'd')}
                                    </div>
                                    <div className="text-xs">
                                      {format(date, 'MMM')}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Time
                              </label>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {availableTimes.map((time, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    className={`p-2 border rounded-md text-center focus:outline-none ${
                                      selectedTime === time 
                                        ? 'bg-blue-500 text-white border-blue-500' 
                                        : 'border-gray-300 hover:border-blue-500'
                                    }`}
                                    onClick={() => setSelectedTime(time)}
                                    disabled={!selectedDate}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                                Add Note (Optional)
                              </label>
                              <textarea
                                id="note"
                                rows={3}
                                value={bookingNote}
                                onChange={(e) => setBookingNote(e.target.value)}
                                placeholder="Any special requests or information for the service provider..."
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </form>
                      )}
                    </CardBody>
                    
                    {!bookingSuccess && (
                      <CardFooter className="bg-gray-50 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Total Price</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${selectedService.price}
                            <span className="text-sm font-normal text-gray-500">
                              /{selectedService.priceType}
                            </span>
                          </p>
                        </div>
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={!selectedDate || !selectedTime}
                          isLoading={loading}
                          onClick={handleBookingSubmit}
                          className="flex items-center"
                        >
                          <CreditCard size={18} className="mr-2" />
                          Confirm Booking
                        </Button>
                      </CardFooter>
                    )}
                  </>
                )}
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderProfile;
