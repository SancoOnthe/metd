import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/common/Navbar';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { platformMetrics, serviceCategories } from '../../data/mockData';
import { BarChart2, Users, DollarSign, CheckCircle, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setMetrics(platformMetrics);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Colors for charts
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="admin" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Platform overview and statistics
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
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-bold text-gray-900 mr-2">
                          {metrics.users.total.toLocaleString()}
                        </p>
                        <span className="text-xs text-green-500">
                          +{metrics.users.growth.monthly}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-bold text-gray-900 mr-2">
                          {metrics.bookings.total.toLocaleString()}
                        </p>
                        <span className="text-xs text-green-500">
                          +{metrics.bookings.growth.monthly}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${metrics.bookings.revenue.monthly.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Response</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {metrics.engagement.avgResponseTime} min
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Growth Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Platform Growth</h2>
                <div className="flex space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-500">Users</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-500">Bookings</span>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div className="h-72 bg-gray-100 animate-pulse rounded-md"></div>
                ) : (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={metrics.monthlyGrowth}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="users"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="bookings"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#F59E0B"
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
          
          {/* User Distribution */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">User Distribution</h2>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Clients', value: metrics.users.clients },
                            { name: 'Providers', value: metrics.users.providers }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#3B82F6" />
                          <Cell fill="#10B981" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Clients</p>
                    <p className="text-xl font-semibold text-gray-900">{metrics?.users.clients.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Providers</p>
                    <p className="text-xl font-semibold text-gray-900">{metrics?.users.providers.toLocaleString()}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Popularity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Service Category Popularity</h2>
                <Link
                  to="/admin/categories"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
                >
                  Manage Categories
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div className="h-80 bg-gray-100 animate-pulse rounded-md"></div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={metrics.categories.popularity}
                        layout="vertical"
                        margin={{ top: 10, right: 10, left: 100, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                          {metrics.categories.popularity.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* System Status and Alerts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">System Status</h2>
              </CardHeader>
              <CardBody className="p-0">
                {loading ? (
                  <div className="p-4 animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span>API Server</span>
                      </div>
                      <span className="text-green-500 text-sm">Operational</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span>Database</span>
                      </div>
                      <span className="text-green-500 text-sm">Operational</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span>Payment Processing</span>
                      </div>
                      <span className="text-green-500 text-sm">Operational</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Notification Service</span>
                      </div>
                      <span className="text-yellow-500 text-sm">Minor Delays</span>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  2 new
                </span>
              </CardHeader>
              <CardBody className="p-0">
                {loading ? (
                  <div className="p-4 animate-pulse space-y-4">
                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center mb-2">
                        <AlertTriangle size={16} className="text-red-500 mr-2" />
                        <h3 className="font-medium text-gray-900">Payment Processing Error</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        Multiple failed payment attempts detected for user ID #2458.
                      </p>
                      <span className="text-xs text-gray-400">Today at 10:23 AM</span>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center mb-2">
                        <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                        <h3 className="font-medium text-gray-900">High Server Load</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        Unusual traffic spike detected. Server load at 75%.
                      </p>
                      <span className="text-xs text-gray-400">Yesterday at 8:12 PM</span>
                    </div>
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
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardBody className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/admin/users">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-blue-600 mb-1">
                        <Users size={20} />
                      </span>
                      <span className="text-sm">Manage Users</span>
                    </Button>
                  </Link>
                  <Link to="/admin/categories">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-green-600 mb-1">
                        <BarChart2 size={20} />
                      </span>
                      <span className="text-sm">Categories</span>
                    </Button>
                  </Link>
                  <Link to="/admin/reports">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-red-600 mb-1">
                        <AlertTriangle size={20} />
                      </span>
                      <span className="text-sm">Reports</span>
                    </Button>
                  </Link>
                  <Link to="/admin/metrics">
                    <Button
                      variant="outline"
                      fullWidth
                      className="flex flex-col items-center justify-center h-20 text-center"
                    >
                      <span className="text-purple-600 mb-1">
                        <BarChart2 size={20} />
                      </span>
                      <span className="text-sm">Metrics</span>
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
