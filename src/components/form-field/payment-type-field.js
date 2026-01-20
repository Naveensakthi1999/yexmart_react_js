export const paymentTypeTableData = [
    {
        id: 1,
        payment_type_title: 'Cash',
        created_at: '2024-11-07T12:45:40.000Z',
        updated_at: '2024-11-07T12:45:40.000Z',
        user_created: {
            fullname: 'admin'
        },
        user_updated: null
    },
    {
        id: 2,
        payment_type_title: 'Credit',
        created_at: '2024-11-07T12:45:40.000Z',
        updated_at: '2024-11-07T12:45:40.000Z',
        user_created: {
            fullname: 'admin'
        },
        user_updated: null
    },
];

export const paymentTypeFormData = [
    {
        type: 'TEXT_FIELD',
        label: 'Payment type title',
        validationType: 'general',
        attributeType: 'text',
        id: 'payment_type_title',
        name: 'payment_type_title',
        placeholder: 'Enter Your Payment type title',
        required: true,
    },
];
