export const policyFormData = [
  {
    type: 'TEXTAREA_FIELD',
    label: 'Privacy Policy',
    validationType: 'general',
    id: 'content',
    name: 'content',
    placeholder: 'Enter Privacy Policy Content',
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
