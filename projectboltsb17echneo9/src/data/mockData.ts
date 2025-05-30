// Mock Users
export const mockUsers = [
  {
    id: 'client1',
    name: 'John Doe',
    email: 'client@example.com',
    password: 'password123',
    userType: 'client',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    location: 'New York, NY',
    phone: '(555) 123-4567',
    dateJoined: '2023-01-15'
  },
  {
    id: 'provider1',
    name: 'Jane Smith',
    email: 'provider@example.com',
    password: 'password123',
    userType: 'provider',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    location: 'Los Angeles, CA',
    phone: '(555) 987-6543',
    bio: 'Professional with 10+ years of experience in home services.',
    hourlyRate: 85,
    rating: 4.8,
    dateJoined: '2022-11-05',
    verified: true
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    userType: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    dateJoined: '2022-01-01'
  },
  {
    id: 'provider2',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    password: 'password123',
    userType: 'provider',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Chicago, IL',
    phone: '(555) 222-3333',
    bio: 'Certified technician specializing in electrical installations and repairs.',
    hourlyRate: 75,
    rating: 4.6,
    dateJoined: '2022-08-12',
    verified: true
  },
  {
    id: 'provider3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    password: 'password123',
    userType: 'provider',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    location: 'Seattle, WA',
    phone: '(555) 444-5555',
    bio: 'Creative designer with a passion for making spaces beautiful and functional.',
    hourlyRate: 95,
    rating: 4.9,
    dateJoined: '2023-02-18',
    verified: true
  },
  {
    id: 'provider4',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    password: 'password123',
    userType: 'provider',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    location: 'Denver, CO',
    phone: '(555) 666-7777',
    bio: 'Master plumber with expertise in all aspects of residential and commercial plumbing.',
    hourlyRate: 80,
    rating: 4.7,
    dateJoined: '2022-05-20',
    verified: true
  }
];

// Categories
export const serviceCategories = [
  {
    id: 'cat1',
    name: 'Home Cleaning',
    icon: 'spray-can',
    description: 'Professional home cleaning services',
    providers: 34
  },
  {
    id: 'cat2',
    name: 'Electrical',
    icon: 'zap',
    description: 'Electrical installation and repair services',
    providers: 22
  },
  {
    id: 'cat3',
    name: 'Plumbing',
    icon: 'droplet',
    description: 'Plumbing services and repairs',
    providers: 18
  },
  {
    id: 'cat4',
    name: 'Home Design',
    icon: 'home',
    description: 'Interior design and decoration',
    providers: 15
  },
  {
    id: 'cat5',
    name: 'Tutoring',
    icon: 'book-open',
    description: 'Educational tutoring services',
    providers: 29
  },
  {
    id: 'cat6',
    name: 'Personal Training',
    icon: 'activity',
    description: 'Fitness and wellness coaching',
    providers: 24
  },
  {
    id: 'cat7',
    name: 'Tech Support',
    icon: 'cpu',
    description: 'Computer and technology assistance',
    providers: 31
  },
  {
    id: 'cat8',
    name: 'Gardening',
    icon: 'flower',
    description: 'Landscaping and garden maintenance',
    providers: 12
  }
];

// Service Listings
export const serviceListings = [
  {
    id: 'service1',
    providerId: 'provider1',
    title: 'Premium Home Cleaning Service',
    category: 'cat1',
    description: 'Comprehensive home cleaning service using eco-friendly products. We ensure your home is spotless and healthy.',
    price: 120,
    priceType: 'per session',
    location: 'Los Angeles, CA',
    images: ['https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg'],
    rating: 4.8,
    reviewCount: 124,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    featured: true
  },
  {
    id: 'service2',
    providerId: 'provider2',
    title: 'Electrical Wiring and Repairs',
    category: 'cat2',
    description: 'Professional electrical services for your home or office. Licensed and insured electrician with 15+ years of experience.',
    price: 75,
    priceType: 'per hour',
    location: 'Chicago, IL',
    images: ['https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg'],
    rating: 4.6,
    reviewCount: 87,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    featured: false
  },
  {
    id: 'service3',
    providerId: 'provider3',
    title: 'Interior Design Consultation',
    category: 'cat4',
    description: 'Transform your space with a professional interior design consultation. Get expert advice on colors, furniture, and layout.',
    price: 150,
    priceType: 'per session',
    location: 'Seattle, WA',
    images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
    rating: 4.9,
    reviewCount: 56,
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    featured: true
  },
  {
    id: 'service4',
    providerId: 'provider4',
    title: 'Emergency Plumbing Services',
    category: 'cat3',
    description: 'Available 24/7 for all your plumbing emergencies. Fast, reliable service at competitive rates.',
    price: 90,
    priceType: 'per hour',
    location: 'Denver, CO',
    images: ['https://images.pexels.com/photos/7937979/pexels-photo-7937979.jpeg'],
    rating: 4.7,
    reviewCount: 103,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    featured: false
  },
  {
    id: 'service5',
    providerId: 'provider2',
    title: 'Smart Home Installation',
    category: 'cat2',
    description: 'Get your home upgraded with the latest smart technology. Installation of smart lights, thermostats, security systems, and more.',
    price: 200,
    priceType: 'per project',
    location: 'Chicago, IL',
    images: ['https://images.pexels.com/photos/3855495/pexels-photo-3855495.jpeg'],
    rating: 4.5,
    reviewCount: 42,
    availableDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    featured: true
  },
  {
    id: 'service6',
    providerId: 'provider3',
    title: 'Home Staging Services',
    category: 'cat4',
    description: 'Professional home staging to help sell your property faster and for a better price. Includes consultation and execution.',
    price: 350,
    priceType: 'per project',
    location: 'Seattle, WA',
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    rating: 4.8,
    reviewCount: 38,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    featured: false
  },
  {
    id: 'service7',
    providerId: 'provider4',
    title: 'Bathroom Renovation Plumbing',
    category: 'cat3',
    description: 'Complete plumbing services for bathroom renovations. Installation of fixtures, pipes, and all necessary components.',
    price: 800,
    priceType: 'per project',
    location: 'Denver, CO',
    images: ['https://images.pexels.com/photos/6444247/pexels-photo-6444247.jpeg'],
    rating: 4.6,
    reviewCount: 29,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    featured: false
  },
  {
    id: 'service8',
    providerId: 'provider1',
    title: 'Deep Cleaning and Sanitization',
    category: 'cat1',
    description: 'Thorough deep cleaning and sanitization service for homes and offices. Includes hard-to-reach areas and special attention to high-touch surfaces.',
    price: 180,
    priceType: 'per session',
    location: 'Los Angeles, CA',
    images: ['https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg'],
    rating: 4.7,
    reviewCount: 51,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    featured: true
  }
];

// Bookings
export const mockBookings = [
  {
    id: 'booking1',
    clientId: 'client1',
    providerId: 'provider1',
    serviceId: 'service1',
    status: 'confirmed',
    date: '2024-06-15',
    time: '10:00 AM',
    duration: 3,
    totalPrice: 120,
    notes: 'Please bring eco-friendly cleaning products.',
    createdAt: '2024-06-01T15:30:00'
  },
  {
    id: 'booking2',
    clientId: 'client1',
    providerId: 'provider2',
    serviceId: 'service2',
    status: 'pending',
    date: '2024-06-18',
    time: '2:00 PM',
    duration: 2,
    totalPrice: 150,
    notes: 'Need help with kitchen light fixtures.',
    createdAt: '2024-06-02T10:15:00'
  },
  {
    id: 'booking3',
    clientId: 'client1',
    providerId: 'provider3',
    serviceId: 'service3',
    status: 'completed',
    date: '2024-05-25',
    time: '11:00 AM',
    duration: 1.5,
    totalPrice: 150,
    notes: 'Looking for ideas for living room renovation.',
    createdAt: '2024-05-10T09:00:00'
  },
  {
    id: 'booking4',
    clientId: 'client1',
    providerId: 'provider4',
    serviceId: 'service4',
    status: 'canceled',
    date: '2024-05-30',
    time: '4:00 PM',
    duration: 1,
    totalPrice: 90,
    notes: 'Emergency leak in bathroom.',
    createdAt: '2024-05-29T16:45:00',
    cancelReason: 'Fixed the issue myself.'
  }
];

// Reviews
export const mockReviews = [
  {
    id: 'review1',
    bookingId: 'booking3',
    clientId: 'client1',
    providerId: 'provider3',
    serviceId: 'service3',
    rating: 5,
    comment: 'Emily was fantastic! She had so many great ideas for my living room and was very professional. Highly recommend!',
    date: '2024-05-26T14:30:00'
  },
  {
    id: 'review2',
    bookingId: 'booking1',
    clientId: 'client1',
    providerId: 'provider1',
    serviceId: 'service1',
    rating: 4,
    comment: 'Jane did a great job cleaning our home. Very thorough and professional.',
    date: '2023-12-12T16:45:00'
  }
];

// Messages
export const mockMessages = [
  {
    id: 'convo1',
    participants: ['client1', 'provider1'],
    messages: [
      {
        id: 'msg1',
        senderId: 'client1',
        text: 'Hi Jane, I have a question about your cleaning service.',
        timestamp: '2024-06-01T09:30:00',
        read: true
      },
      {
        id: 'msg2',
        senderId: 'provider1',
        text: 'Hi John, sure! What would you like to know?',
        timestamp: '2024-06-01T09:45:00',
        read: true
      },
      {
        id: 'msg3',
        senderId: 'client1',
        text: 'Do you bring your own cleaning supplies?',
        timestamp: '2024-06-01T10:00:00',
        read: true
      },
      {
        id: 'msg4',
        senderId: 'provider1',
        text: 'Yes, I bring all necessary cleaning supplies and equipment. All products are eco-friendly.',
        timestamp: '2024-06-01T10:15:00',
        read: true
      }
    ],
    lastUpdated: '2024-06-01T10:15:00'
  },
  {
    id: 'convo2',
    participants: ['client1', 'provider2'],
    messages: [
      {
        id: 'msg5',
        senderId: 'client1',
        text: 'Hello Michael, I need help with some electrical work.',
        timestamp: '2024-06-02T11:00:00',
        read: true
      },
      {
        id: 'msg6',
        senderId: 'provider2',
        text: 'Hi John, what kind of electrical work do you need assistance with?',
        timestamp: '2024-06-02T11:30:00',
        read: true
      },
      {
        id: 'msg7',
        senderId: 'client1',
        text: 'I need to install new light fixtures in my kitchen.',
        timestamp: '2024-06-02T11:45:00',
        read: true
      },
      {
        id: 'msg8',
        senderId: 'provider2',
        text: 'I can definitely help with that. How many fixtures are you looking to replace?',
        timestamp: '2024-06-02T12:00:00',
        read: false
      }
    ],
    lastUpdated: '2024-06-02T12:00:00'
  }
];

// Platform Metrics
export const platformMetrics = {
  users: {
    total: 1250,
    clients: 875,
    providers: 375,
    growth: {
      weekly: 4.2,
      monthly: 15.8
    },
    active: {
      daily: 385,
      weekly: 720,
      monthly: 950
    }
  },
  bookings: {
    total: 3280,
    pending: 145,
    confirmed: 320,
    completed: 2735,
    canceled: 80,
    growth: {
      weekly: 5.7,
      monthly: 22.3
    },
    revenue: {
      daily: 4250,
      weekly: 28500,
      monthly: 112000,
      total: 1345000
    }
  },
  categories: {
    popularity: [
      { name: 'Home Cleaning', bookings: 782 },
      { name: 'Electrical', bookings: 541 },
      { name: 'Plumbing', bookings: 489 },
      { name: 'Home Design', bookings: 412 },
      { name: 'Tutoring', bookings: 398 },
      { name: 'Personal Training', bookings: 325 },
      { name: 'Tech Support', bookings: 243 },
      { name: 'Gardening', bookings: 90 }
    ]
  },
  engagement: {
    messagesSent: 12450,
    avgResponseTime: 25, // minutes
    reviewsSubmitted: 2185,
    avgRating: 4.6
  },
  monthlyGrowth: [
    { month: 'Jan', users: 950, bookings: 2800, revenue: 95000 },
    { month: 'Feb', users: 985, bookings: 2900, revenue: 98000 },
    { month: 'Mar', users: 1020, bookings: 3000, revenue: 101000 },
    { month: 'Apr', users: 1080, bookings: 3100, revenue: 105000 },
    { month: 'May', users: 1150, bookings: 3200, revenue: 108000 },
    { month: 'Jun', users: 1250, bookings: 3280, revenue: 112000 }
  ]
};
