export const rightSideFormData = [
  {
    type: 'TEXT_FIELD',
    label: 'Your Reference No',
    validationType: 'general',
    attributeType: 'text',
    id: 'your_reference_no',
    name: 'your_reference_no',
    placeholder: 'Enter Your Your Reference No',
    required: true,
  },
  {
    type: 'DATE_FIELD',
    label: 'Invoice Date',
    validationType: 'general',
    id: 'invoice_date',
    name: 'invoice_date',
    placeholder: 'Select Invoice Date',
    required: true,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Sales Type',
    validationType: 'general',
    id: 'sales_type',
    name: 'sales_type',
    placeholder: 'Select Your Sales Type',
    required: true,
    options: [{
      label: 'Final',
      value: '1',
    }, {
      label: 'Quotation',
      value: '2',
    }]
  },
];

export const tableHeader = [
  { label: 'Item Name', width: '15%' },
  { label: 'Unit', width: '10%' },
  { label: 'Rate', width: '10%' },
  { label: 'Qty', width: '10%' },
  { label: 'Discount(₹)', width: '10%' },
  { label: 'Tax', width: '10%' },
  { label: 'Tax Amt', width: '10%' },
  { label: 'Amount', width: '10%' },
  { label: 'Action', width: '10%' },
]