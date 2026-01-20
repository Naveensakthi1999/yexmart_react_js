export const brandFormData = [
  {
    type: 'TEXT_FIELD',
    label: 'Brand Name',
    validationType: 'general',
    attributeType: 'text',
    id: 'brand_id',
    name: 'title',
    placeholder: 'Enter Your Brand Name',
    required: true,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Status',
    id: 'status',
    name: 'status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    default: 'active',
  },
];
