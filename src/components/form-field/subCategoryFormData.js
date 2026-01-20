export const subCategoryFormData = [
  {
    type: 'SELECT_FIELD',
    label: 'Category',
    validationType: 'general',
    id: 'category_id',
    name: 'category_name',
    options: [],
    required: true,
  },
  {
    type: 'TEXT_FIELD',
    label: 'Sub-Category Title',
    validationType: 'general',
    attributeType: 'text',
    id: 'subcategory_id',
    name: 'title',
    placeholder: 'Enter Sub-Category Title',
    required: true,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Status',
    validationType: 'general',
    id: 'status',
    name: 'status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    required: true,
  },
];
