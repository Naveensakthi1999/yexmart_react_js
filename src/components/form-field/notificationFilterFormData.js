export const notificationProductsTableData = [
  {
    id: 1,
    user_info: {
      id: 101,
      full_name: 'John Smith',
      email: 'john.smith@example.com',
      phone_number: '+1 (555) 123-4567',
      location: 'New York, USA',
      profile_image: '/images/users/user1.jpg',
      member_since: '2024-01-15'
    },
    product_info: {
      title: 'iPhone 15 Pro Max 256GB',
      description: 'Brand new iPhone 15 Pro Max in sealed box. Never used, with 1 year Apple warranty.',
      price: '$1,199',
      original_price: '$1,299',
      category: 'Electronics',
      subcategory: 'Mobile Phones',
      condition: 'New',
      images: [
        '/images/products/iphone15-1.jpg',
        '/images/products/iphone15-2.jpg'
      ],
      specifications: {
        storage: '256GB',
        color: 'Natural Titanium',
        brand: 'Apple'
      },
      posted_date: '2024-11-08T10:30:00.000Z',
      expiry_date: '2024-12-08T10:30:00.000Z'
    },
    status: 'pending',
    notification_sent: '2024-11-08T10:35:00.000Z',
    admin_reviewed: null,
    admin_notes: null,
    created_at: '2024-11-08T10:30:00.000Z',
    updated_at: '2024-11-08T10:30:00.000Z'
  },
  {
    id: 2,
    user_info: {
      id: 102,
      full_name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone_number: '+44 20 7946 0958',
      location: 'London, UK',
      profile_image: '/images/users/user2.jpg',
      member_since: '2024-02-20'
    },
    product_info: {
      title: '2019 Honda Civic LX Sedan',
      description: 'Well maintained Honda Civic with low mileage. Regular service done. No accidents.',
      price: '$18,500',
      original_price: '$22,000',
      category: 'Vehicles',
      subcategory: 'Cars',
      condition: 'Used',
      images: [
        '/images/products/honda-civic-1.jpg',
        '/images/products/honda-civic-2.jpg',
        '/images/products/honda-civic-3.jpg'
      ],
      specifications: {
        year: '2019',
        mileage: '45,000 miles',
        fuel_type: 'Petrol',
        transmission: 'Automatic'
      },
      posted_date: '2024-11-08T09:15:00.000Z',
      expiry_date: '2024-12-08T09:15:00.000Z'
    },
    status: 'pending',
    notification_sent: '2024-11-08T09:20:00.000Z',
    admin_reviewed: null,
    admin_notes: null,
    created_at: '2024-11-08T09:15:00.000Z',
    updated_at: '2024-11-08T09:15:00.000Z'
  },
  {
    id: 3,
    user_info: {
      id: 103,
      full_name: 'Mike Chen',
      email: 'mike.chen@example.com',
      phone_number: '+81 3 1234 5678',
      location: 'Tokyo, Japan',
      profile_image: '/images/users/user3.jpg',
      member_since: '2024-03-10'
    },
    product_info: {
      title: '2BHK Apartment in Downtown',
      description: 'Spacious 2 bedroom apartment with modern amenities. Great location near subway.',
      price: '$350,000',
      original_price: '$375,000',
      category: 'Properties',
      subcategory: 'Apartments',
      condition: 'New Construction',
      images: [
        '/images/products/apartment-1.jpg',
        '/images/products/apartment-2.jpg',
        '/images/products/apartment-3.jpg'
      ],
      specifications: {
        area: '950 sq ft',
        bedrooms: 2,
        bathrooms: 2,
        furnished: 'Semi-Furnished'
      },
      posted_date: '2024-11-07T16:45:00.000Z',
      expiry_date: '2024-12-07T16:45:00.000Z'
    },
    status: 'approved',
    notification_sent: '2024-11-07T16:50:00.000Z',
    admin_reviewed: '2024-11-07T17:30:00.000Z',
    admin_notes: 'All documents verified. Property looks genuine.',
    created_at: '2024-11-07T16:45:00.000Z',
    updated_at: '2024-11-07T17:30:00.000Z'
  },
  {
    id: 4,
    user_info: {
      id: 104,
      full_name: 'Emma Wilson',
      email: 'emma.w@example.com',
      phone_number: '+1 (555) 987-6543',
      location: 'Los Angeles, USA',
      profile_image: '/images/users/user4.jpg',
      member_since: '2024-04-05'
    },
    product_info: {
      title: 'Designer Handbag - Louis Vuitton',
      description: 'Authentic Louis Vuitton handbag in excellent condition. Original purchase receipt available.',
      price: '$1,200',
      original_price: '$2,800',
      category: 'Fashion',
      subcategory: 'Bags',
      condition: 'Used - Excellent',
      images: [
        '/images/products/lv-bag-1.jpg',
        '/images/products/lv-bag-2.jpg'
      ],
      specifications: {
        brand: 'Louis Vuitton',
        material: 'Leather',
        color: 'Brown',
        authenticity: 'With Original Receipt'
      },
      posted_date: '2024-11-07T14:20:00.000Z',
      expiry_date: '2024-12-07T14:20:00.000Z'
    },
    status: 'rejected',
    notification_sent: '2024-11-07T14:25:00.000Z',
    admin_reviewed: '2024-11-07T15:10:00.000Z',
    admin_notes: 'Suspected counterfeit product. Images not clear for authentication.',
    created_at: '2024-11-07T14:20:00.000Z',
    updated_at: '2024-11-07T15:10:00.000Z'
  }
];

export const notificationFilterFormData = [
  {
    type: 'TEXT_FIELD',
    label: 'Search Products',
    validationType: 'general',
    attributeType: 'text',
    id: 'search',
    name: 'search',
    placeholder: 'Search by product title, user name...',
    required: false,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Filter by Status',
    validationType: 'general',
    id: 'status',
    name: 'status',
    placeholder: 'Select Status',
    required: false,
    options: [
      {
        label: 'Pending',
        value: 'pending',
      },
      {
        label: 'Approved',
        value: 'approved',
      },
      {
        label: 'Rejected',
        value: 'rejected',
      }
    ]
  },
  {
    type: 'SELECT_FIELD',
    label: 'Filter by Category',
    validationType: 'general',
    id: 'category',
    name: 'category',
    placeholder: 'Select Category',
    required: false,
    options: [
      {
        label: 'Electronics',
        value: 'electronics',
      },
      {
        label: 'Vehicles',
        value: 'vehicles',
      },
      {
        label: 'Properties',
        value: 'properties',
      },
      {
        label: 'Fashion',
        value: 'fashion',
      }
    ]
  },
  {
    type: 'DATE_FIELD',
    label: 'Posted Date From',
    validationType: 'date',
    id: 'date_from',
    name: 'date_from',
    placeholder: 'Select Start Date',
    required: false,
  },
  {
    type: 'DATE_FIELD',
    label: 'Posted Date To',
    validationType: 'date',
    id: 'date_to',
    name: 'date_to',
    placeholder: 'Select End Date',
    required: false,
  }
];