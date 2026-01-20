export const termsFormData = [
  {
    type: 'TEXTAREA_FIELD',
    label: 'Terms & Conditions',
    validationType: 'general',
    id: 'content',
    name: 'content',
    placeholder: 'Enter Terms & Conditions',
    required: false,
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
