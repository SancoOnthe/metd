import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/common/Navbar';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { mockBookings, serviceListings } from '../../data/mockData';
import { BarChart2, Calendar, Clock, DollarSign, MessageSquare, Star, Users, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>({
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    recentBookings: [],
    unreadMessages: 0,
    revenueData: []
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const providerServices = serviceListings.filter(service => service.providerId === currentUser?.id);
      const providerBookings = mockBookings.filter(booking => booking.providerId === currentUser?.id);
      
      // Calculate metrics
      const pending = providerBookings.filter(booking => booking.status === 'pending').length;
      const completed = providerBookings.filter(booking => booking.status === 'completed').length;
      const totalRevenue = providerBookings
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => sum + booking.totalPrice, 0);
      
      // Sort bookings by date (most recent first)
      const sortedBookings = [...providerBookings].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      // Mock data for revenue chart
      const mockRevenueData = [
        { name: 'Jan', revenue: 2500 },
        { name: 'Feb', revenue: 3200 },
        { name: 'Mar', revenue: 2800 },
        { name: 'Apr', revenue: 3800 },
        { name: 'May', revenue: 4100 },
        { name: 'Jun', revenue: totalRevenue }
      ];
      
      setDashboardData({
        pendingBookings: pending,
        completedBookings: completed,
        totalRevenue,
        recentBookings: sortedBookings.slice(0, 5),
        serviceCount: providerServices.length,
        unreadMessages: 3, // Mock data for unread messages
        revenueData: mockRevenueData,
        totalRating: 4.7, // Mock data for rating
        reviewCount: 48 // Mock data for review count
      });
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentUser]);

  const getServiceName = (serviceId: string) => {
    const service = serviceListings.find(s => s.id === serviceId);
    return service ? service.title : 'Unknown Service';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="provider" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {currentUser?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's an overview of your provider dashboard
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // Loading skeleton for stats
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardBody className="p-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <>
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${dashboardData.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.pendingBookings}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Services</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.serviceCount}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                      <Star size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-gray-900 mr-2">
                          {dashboardData.totalRating}
                        </p>
                        <span className="text-sm text-gray-500">
                          ({dashboardData.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
                <Link
                  to="/provider/bookings"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
                >
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </CardHeader>
              <CardBody className="p-0">
                {loading ? (
                  <div className="divide-y divide-gray-200">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 animate-pulse">
                        <div className="flex justify-between mb-2">
                          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : dashboardData.recentBookings.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No bookings yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {dashboardData.recentBookings.map((booking: any) => (
                      <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-gray-900">
                            {getServiceName(booking.serviceId)}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar size={14} className="mr-1" />
                          {booking.date} at {booking.time}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            ${booking.totalPrice.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
              <CardFooter className="bg-gray-50">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {}}
                >
                  Manage All Bookings
                </Button>
              </CardFooter>
            </Card>
            
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={dashboardData.revenueData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Actions Card */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardBody className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/provider/services">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-blue-600 mb-1">
                        <BarChart2 size={20} />
                      </span>
                      <span className="text-sm">Manage Services</span>
                    </Button>
                  </Link>
                  <Link to="/provider/bookings">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-purple-600 mb-1">
                        <Calendar size={20} />
                      </span>
                      <span className="text-sm">View Bookings</span>
                    </Button>
                  </Link>
                  <Link to="/provider/messages">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-green-600 mb-1">
                        <MessageSquare size={20} />
                      </span>
                      <span className="text-sm">Messages</span>
                    </Button>
                  </Link>
                  <Link to="/provider/profile">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-orange-600 mb-1">
                        <Users size={20} />
                      </span>
                      <span className="text-sm">Edit Profile</span>
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
            
            {/* Messages Preview */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Messages</h2>
                {dashboardData.unreadMessages > 0 && !loading && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {dashboardData.unreadMessages} unread
                  </span>
                )}
              </CardHeader>
              <CardBody className="p-0">
                {loading ? (
                  <div className="divide-y divide-gray-200">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 animate-pulse">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                          <div className="flex-grow">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          alt="Client"
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">John Doe</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            I have a question about your electrical service...
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <img
                          src="https://randomuser.me/api/portraits/women/2.jpg"
                          alt="Client"
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Sarah Johnson</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            Thanks for the great service yesterday!
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-xs text-gray-400">Yesterday</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
              <CardFooter className="bg-gray-50">
                <Link to="/provider/messages">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                  >
                    View All Messages
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Upcoming Schedule */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Today's Schedule</h2>
              </CardHeader>
              <CardBody className="p-0">
                {loading ? (
                  <div className="p-4 animate-pulse">
                    <div className="h-20 bg-gray-200 rounded mb-3"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span className="font-medium">10:00 AM - 12:00 PM</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">Home Cleaning Service</h3>
                      <p className="text-sm text-gray-500">123 Main St, Apt 4B</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span className="font-medium">2:30 PM - 4:00 PM</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">Kitchen Deep Clean</h3>
                      <p className="text-sm text-gray-500">456 Oak Ave</p>
                    </div>
                  </div>
                )}
              </CardBody>
              <CardFooter className="bg-gray-50">
                <Link to="/provider/bookings">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                  >
                    View Full Schedule
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
