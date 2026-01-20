export const rightSideSalesReturnFormData = [
  {
    type: 'DATE_FIELD',
    label: 'Sale Return Date',
    validationType: 'general',
    id: 'sales_return_date',
    name: 'sales_return_date',
    placeholder: 'Select Sales Return Date',
    required: true,
  },
  {
    type: 'SELECT_FIELD',
    label: 'Return Type',
    validationType: 'general',
    id: 'return_type',
    name: 'return_type',
    placeholder: 'Select Your Return Type',
    required: true,
    options: [{
      label: 'Return',
      value: '1',
    }, {
      label: 'Cancel',
      value: '2',
    }]
  },
];

export const tableSalesReturnHeader = [
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

export const salesReturnTableData = [
  {
    id: 1,
    sales_return_date: '18-11-2024',
    sales_return_code: 'SL1281',
    return_status: 'Final',
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