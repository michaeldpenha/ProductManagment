export const EndPoints = {
    orderProcessorUrl: 'http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/',
    orderChildUrlPath: {
        orderPath: 'order',
        itemPath: 'order/item',
        orderTypesPath: 'order/ordertypes',
        orderStatusPath: 'order/orderstatus',
        changeReasonPath: 'order/changereason',
        searchPath: 'order/search',
        updatePath: 'order/update/bulk'
    },
    batchProcessorUrl: 'http://dev-batch-api.centralus.cloudapp.azure.com/batch-processor',
    batchChildUrlPath: {
        bulkUpload: 'upload',
        getAllBatches: 'batch'
    }
}
