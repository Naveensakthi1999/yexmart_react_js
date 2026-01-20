
export const categoryFormData = [
  {
    type: 'TEXT_FIELD',
    label: 'Category Name',
    validationType: 'general',
    attributeType: 'text',
    id: 'category_id',
    name: 'title',
    placeholder: 'Enter Category Name',
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
