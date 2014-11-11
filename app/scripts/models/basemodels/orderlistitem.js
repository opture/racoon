var OrderListItem = function (options) {
    var self = riot.observable(this);
    self.id = options.id || 0;
    self.description = options.description || '';
    self.customerId = options.customerId || 0;
    self.userGroupId = options.userGroupId || 0;
    self.lockedBy = options.lockedBy || null;
    self.criticalDelivery = options.criticalDelivery || false;
    self.criticalDeliveryNote = options.criticalDeliveryNote || '';

    self.currentWorkflow = options.currentWorkflow || '';
    self.productionWeek = options.productionWeek || null;
    self.productionResourceId = options.productionResourceId || 0;
    self.invoicingId = options.invoicingId || 0;
    self.createdById = options.createdById || 0;

    self.productId = options.productId || 0;


    self.customer = {};
    self.company = {};
    self.productionResource = {};
    self.createdBy = {};
    self.product = {};
    self.invoicingBy = {};


    

    self.setProperty = function(collectionName, propertyToSet, propertyId){
        var _C = _.find(appCache.getCacheItem(collectionName), function (c) {
            return c.id == self[propertyId];
        });
        if (_C == 'undefined') { _C = {}}
        self[propertyToSet] = _C;
    }

    self.referenceCacheObjects = function () {
        self.setProperty('Customers', 'customer', 'customerId');
        self.setProperty('Users', 'createdBy', 'createdById');
        self.setProperty('Users', 'invoicingBy', 'invoicingId');
        self.setProperty('Products', 'product', 'productId');
        self.setProperty('Usergroups', 'company', 'userGroupId');
        self.setProperty('ProductionResources', 'productionResource', 'productionResourceId');
    }();
    //Unlock the order.
    //this.unlockOrder = orderhelper.unlockOrder;

    //Edit deliverynote.
    //this.editDeliveryNote = orderhelper.editdeliveryNote;
}