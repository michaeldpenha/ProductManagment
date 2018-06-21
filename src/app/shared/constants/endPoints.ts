import { environment } from './../../../environments/environment';

export const EndPoints = {
    orderProcessorUrl: `${environment.orderProcessorBaseUrl}`,
    orderChildUrlPath: {
        orderPath: 'order',
        itemPath: 'order/item',
        orderTypesPath: 'order/ordertypes',
        orderStatusPath: 'order/orderstatus',
        changeReasonPath: 'order/changereason',
        searchPath: 'order/search',
        updatePath: 'order/update/bulk'
    },
    batchProcessorUrl: `${environment.batchProcessorBaseUrl}`,
    batchChildUrlPath: {
        bulkUpload: 'upload',
        getAllBatches: 'batch'
    }
}

