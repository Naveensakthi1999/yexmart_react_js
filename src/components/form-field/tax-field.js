export const taxFormData = [
    {
        type: 'TEXT_FIELD',
        label: 'Tax Name',
        validationType: 'general',
        attributeType: 'text',
        id: 'tax_name',
        name: 'tax_name',
        placeholder: 'Enter Your tax name',
        required: true,
    },
    {
        type: 'TEXT_FIELD',
        label: 'Tax Percentage',
        validationType: 'general',
        attributeType: 'number',
        id: 'tax_percentage',
        name: 'tax_percentage',
        placeholder: 'Enter Your tax percentage',
        required: true,
    },
    {
        type: 'TEXTAREA_FIELD',
        label: 'Description',
        validationType: 'general',
        id: 'description',
        name: 'description',
        placeholder: 'Enter Your description',
        required: true,
    },
];

export const taxTableData = [
    {
        id: 1,
        tax_name: 'GST - 18',
        tax_percentage: '18',
        description: '',
        created_at: '2024-11-07T12:45:40.000Z',
        updated_at: '2024-11-07T12:45:40.000Z',
        user_created: {
            fullname: 'admin'
        },
        user_updated: null
    },
];