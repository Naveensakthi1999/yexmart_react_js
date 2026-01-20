export const painterTableData = [
    {
      id: 1,
      painter_name: 'Naveen',
      mobile_number: '9876543210',
      address: 'Karur',
      created_at: '2024-11-07T12:45:40.000Z',
      updated_at: '2024-11-07T12:45:40.000Z',
      user_created: {
        fullname: 'admin'
      },
      user_updated: null
    },
  ];
  
  export const painterFormData = [
    {
      type: 'TEXT_FIELD',
      label: 'Painter Name',
      validationType: 'general',
      attributeType: 'text',
      id: 'painter_name',
      name: 'painter_name',
      placeholder: 'Enter Your Painter Name',
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
  
  export const painterPercentageFormData = [
    {
      type: 'SELECT_FIELD',
      label: 'Product Category',
      validationType: 'general',
      id: 'category_id',
      name: 'category_id',
      placeholder: 'Select Your Category',
      required: true,
      options: [{
        label: 'Paint',
        value: '1',
      }, {
        label: 'Brush',
        value: '2',
      }]
    },
    {
      type: 'TEXT_FIELD',
      label: 'Percentage',
      validationType: 'text',
      attributeType: 'number',
      id: 'percentage',
      name: 'percentage',
      placeholder: 'Enter Your Percentage',
      required: true,
    },
  ];
  
  export const painterPercentageTableData = [
    {
      id: 1,
      category_title: 'Paint',
      percentage: '10',
      created_at: '2024-11-07T12:45:40.000Z',
      updated_at: '2024-11-07T12:45:40.000Z',
      user_created: {
        fullname: 'admin'
      },
      user_updated: null
    },
  ];