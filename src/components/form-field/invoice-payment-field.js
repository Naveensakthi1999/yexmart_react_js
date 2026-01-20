export const invoicePaymentTableData = [
    {
        id: 1,
        payment_date: '29.11.2024',
        amount: '100.00',
        Payment_type: 'Cash',
        Payment_note: '',
        created_at: '2024-11-07T12:45:40.000Z',
        updated_at: '2024-11-07T12:45:40.000Z',
        user_created: {
            fullname: 'admin'
        },
        user_updated: null
    },  
];

export const invoicePaymentFormData = [
    {
        type: 'TEXT_FIELD',
        label: 'Amount',
        validationType: 'general',
        attributeType: 'text',
        id: 'amount',
        name: 'amount',
        placeholder: 'Enter Your Amount',
        required: true,
    },
    {
        type: 'SELECT_FIELD',
        label: 'Payment Type',
        validationType: 'general',
        id: 'payment_type',
        name: 'payment_type',
        placeholder: 'Select Your Payment Type',
        required: true,
        options: [
            {
                label: 'Cash',
                value: '1',
            },
            {
                label: 'Bank Account',
                value: '2',
            },
        ]
    },
    {
        type: 'TEXTAREA_FIELD',
        label: 'Payment Note',
        validationType: 'general',
        id: 'payment_note',
        name: 'payment_note',
        placeholder: 'Enter Your Payment Note',
        required: true,
    },
];