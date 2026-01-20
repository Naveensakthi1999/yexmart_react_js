export const rightSideSalesFormData = [
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
    id: 'sales_date',
    name: 'sales_date',
    placeholder: 'Select Sales Date',
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

export const tableSalesHeader = [
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

export const salesTableData = [
  {
    id: 1,
    sales_date: '18-11-2024',
    sales_code: 'SL1281',
    sales_status: 'Final',
    reference_no: '001',
    customer_name: 'NITHYA',
    grand_total_amount: '100.00',
    paid_amount: '100.00',
    due_amount: '100.00',
    payment_status: 'Paid',
    created_at: '2024-11-07T12:45:40.000Z',
    updated_at: '2024-11-07T12:45:40.000Z',
    user_created: {
      fullname: 'admin'
    },
    user_updated: null
  },
];