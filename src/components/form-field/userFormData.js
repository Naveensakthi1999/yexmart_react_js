export const userFormData = [
  {
    type: 'TEXT_FIELD',
    label: 'User Name',
    validationType: 'general',
    attributeType: 'text',
    id: 'fullname',
    name: 'fullname',
    placeholder: 'fullname',
    required: false,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Status',
    validationType: 'general',
    id: 'status',
    name: 'status', 
    required: false,
    options: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ],
  },
  {
    type: 'SELECT_FIELD',
    label: 'Premium',
    validationType: 'general',
    id: 'ispremium',
    name: 'ispremium', 
    required: false,
    options: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ],
  },
];
