export const Messages = {
    'orderType': {
        'required': 'Please select an order type'
    },
    'customerId': {
        'required': 'CustomerID is required',
        'validation': 'Customer not found'
    },
    'transferType': { 'required': 'Please select an transfer type' },
    'routeCode': {
        'required': 'Route code is required',
        'minLength': 'Route code must be max 2 characters only.'
    },

    'releaseDate': { 'required': 'Please select process date' },

    'deliveryDate':
    { 'required': 'Please select delivery date' },
    'itemNumber': {
        'required': 'Item Number is reqiured',
        'notFound': 'Item Number not found',
        'duplicate' : 'Duplicate Item found'
    },
    'quantity' : {
        'required': 'Quantity is reqiured'
    },
    'emailId':{
        'required': 'Email Id is reqiured',
        'email': 'Emaild Id must be valid'
    },
    'comments' : {
        'required': 'Comments are reqiured'
    },
    'additionUpto' : 'You can add only upto ',
    'minItemLimitForCreation' : 'Atleast one record is mandatory',
    'records' : 'records',
    'supplierId' : {
        'required' : 'Supplier is required'
    },
    'searchError' : {
        'atleastOneField' : 'Please fill out at least one field to search',
        'serverError' : 'Service Error! please try again.'
    },
    'noDataFound' : 'No Records found'

}