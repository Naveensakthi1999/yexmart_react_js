export const customerTableData = [
  {
    id: 1,
    customer_name: 'Naveen',
    mobile_number: '9876543210',
    alt_mobile_number: '9876543210',
    address: 'Karur',
    district: 'Karur',
    state: 'Karur',
    country: 'Karur',
    description: 'Karur',
    gst_no: '9999999999999',
    customer_type: 'Customer',
    created_at: '2024-11-07T12:45:40.000Z',
    updated_at: '2024-11-07T12:45:40.000Z',
    user_created: {
      fullname: 'admin'
    },
    user_updated: null
  },
];

export const customerData = [
  {
    id: '1',
    customer_name: 'Marvel Fabrics',
    contact_person_name: 'Mr. Dhinesh',
    phone_number: '9994844666',
    email: 'info@marvelfabrics.com',
    address_1: 'No.2-B, Sengunthapuram,',
    address_2: '12th Cross Strret',
    district: 'Karur',
    state: 'Tamilnadu',
    country: 'India',
    gst: '33AAYFM6520D1Z8',
    customer_type: 'Customer',
    created_at: '2024-11-07T12:45:40.000Z',
    updated_at: '2024-11-07T12:45:40.000Z',
    user_created: {
      fullname: 'admin'
    },
    user_updated: null
  },
  {
    id: '2',
    customer_name: 'Aishwarya Poly Mers',
    contact_person_name: 'Mr.Karthik',
    phone_number: '9789491484',
    email: 'pushparajttt@gmail.com',
    address_1: '217 A Esantham Road,Thirumanilaiyur,',
    address_2: 'Karur-639003',
    district: 'Karur',
    state: 'Tamilnadu',
    country: 'India',
    gst: '33BUCPK8449Q1ZY',
    customer_type: 'Customer',
    created_at: '2024-11-07T12:45:40.000Z',
    updated_at: '2024-11-07T12:45:40.000Z',
    user_created: {
      fullname: 'admin'
    },
    user_updated: null
  },
  {
    id: '3',
    customer_name: 'P.R. Traders',
    contact_person_name: 'Sathish kumar',
    phone_number: '9791422780',
    email: 'prtrader2005@gmail.com',
    address_1: 'No.5,Vijay Nagar,',
    address_2: '12th Cross Strret',
    district: 'Karur',
    state: 'Tamilnadu',
    country: 'India',
    gst: '33AASPP6990J1ZG',
    customer_type: 'Customer',
    created_at: '2024-11-07T12:45:40.000Z',
    updated_at: '2024-11-07T12:45:40.000Z',
    user_created: {
      fullname: 'admin'
    },
    user_updated: null
  },
];

export const customerFormData = [
  {
    type: 'TEXT_FIELD',
    label: 'Customer Name',
    validationType: 'general',
    attributeType: 'text',
    id: 'customer_name',
    name: 'customer_name',
    placeholder: 'Enter Your Customer Name',
    required: true,
  },
  {
    type: 'TEXT_FIELD',
    label: 'Mobile Number',
    validationType: 'mobile',
    attributeType: 'number',
    id: 'mobile_number',
    name: 'mobile_number',
    placeholder: 'Enter Your Mobile Number',
    required: true,
  },
  {
    type: 'TEXT_FIELD',
    label: 'Alternate Mobile Number',
    validationType: 'mobile',
    attributeType: 'number',
    id: 'alt_mobile_number',
    name: 'alt_mobile_number',
    placeholder: 'Enter Your Alternate Mobile Number',
    required: false,
  },
  {
    type: 'TEXT_FIELD',
    label: 'GST No',
    validationType: 'general',
    attributeType: 'text',
    id: 'gst_no',
    name: 'gst_no',
    placeholder: 'Enter Your Gst No',
    required: true,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Customer Type',
    validationType: 'general',
    id: 'customer_type',
    name: 'customer_type',
    placeholder: 'Select Your Customer Type',
    required: true,
    options: [
      {
        label: 'Customer',
        value: '1',
      },
      {
        label: 'Dealer',
        value: '2',
      },
      {
        label: 'Retailer',
        value: '3',
      }
    ]
  },
  {
    type: 'TEXTAREA_FIELD',
    label: 'Address',
    validationType: 'general',
    attributeType: 'text',
    id: 'address',
    name: 'address',
    placeholder: 'Enter Your Address',
    required: true,
  },
  {
    type: 'TEXT_FIELD',
    label: 'District',
    validationType: 'general',
    attributeType: 'text',
    id: 'district',
    name: 'district',
    placeholder: 'Enter Your District',
    required: true,
  },
  {
    type: 'TEXT_FIELD',
    label: 'State',
    validationType: 'general',
    attributeType: 'text',
    id: 'state',
    name: 'state',
    placeholder: 'Enter Your State',
    required: true,
  },
  {
    type: 'TEXT_FIELD',
    label: 'Country',
    validationType: 'general',
    attributeType: 'text',
    id: 'country',
    name: 'country',
    placeholder: 'Enter Your Country',
    required: true,
  },
  {
    type: 'TEXTAREA_FIELD',
    label: 'Description',
    validationType: 'general',
    attributeType: 'text',
    id: 'description',
    name: 'description',
    placeholder: 'Enter Your Description',
    required: false,
  },
];