export const itemStockTableData = [
    {
        id: 1,
        stock_date: '31-08-2024',
        stock_type: 'Add',
        stock_value: '1',
        note: '',
        created_at: '2024-11-07T12:45:40.000Z',
        updated_at: '2024-11-07T12:45:40.000Z',
        user_created: {
            fullname: 'admin'
        },
        user_updated: null
    },
];

export const itemStockFormData = [
    {
        type: 'SELECT_FIELD',
        label: 'Stock type',
        validationType: 'general',
        id: 'stock_type',
        name: 'stock_type',
        placeholder: 'Select Your stock type',
        required: true,
        options: [{
            label: 'Adding +',
            value: '1',
        }, {
            label: 'Subtracting -',
            value: '2',
        }]
    },
    {
        type: 'TEXT_FIELD',
        label: 'Stock Value',
        validationType: 'general',
        attributeType: 'text',
        id: 'stock_value',
        name: 'stock_value',
        placeholder: 'Enter Your stock value',
        required: true,
    },
    {
        type: 'TEXTAREA_FIELD',
        label: 'Note',
        validationType: 'general',
        id: 'note',
        name: 'note',
        placeholder: 'Enter Your note',
        required: false,
      },
];