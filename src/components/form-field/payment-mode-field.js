export const paymentModeTableData = [
    {
      id: 1,
      payment_mode_title: 'Cash',
      created_at: '2024-11-07T12:45:40.000Z',
      updated_at: '2024-11-07T12:45:40.000Z',
      user_created: {
        fullname: 'admin'
      },
      user_updated: null
    },
    {
      id: 2,
      payment_mode_title: 'Online',
      created_at: '2024-11-07T12:45:40.000Z',
      updated_at: '2024-11-07T12:45:40.000Z',
      user_created: {
        fullname: 'admin'
      },
      user_updated: null
    },
    {
      id: 3,
      payment_mode_title: 'Bank Account',
      created_at: '2024-11-07T12:45:40.000Z',
      updated_at: '2024-11-07T12:45:40.000Z',
      user_created: {
        fullname: 'admin'
      },
      user_updated: null
    },
  ];
  
  export const paymentModeFormData = [
    {
      type: 'TEXT_FIELD',
      label: 'Payment mode title',
      validationType: 'general',
      attributeType: 'text',
      id: 'payment_mode_title',
      name: 'payment_mode_title',
      placeholder: 'Enter Your Payment mode title',
      required: true,
    },
  ];