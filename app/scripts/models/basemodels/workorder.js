var Workorder = function (options) {
    var self = riot.observable(this);
    options = options || {};
    self.statuses = ['Nollad', 'Ej påbörjad', 'Påbörjad', 'Avslutad'];
    self.statusClass = ['notUsed', 'orderNotStarted', 'orderStarted', 'orderFinished'];
    //Basic
    self.id = options.id || 0;
    self.description = options.description || '';
    self.desiredDelivery = (options.desiredDelivery ? new Date(options.desiredDelivery) : new Date().addDays(10));
    self.orderStatus = options.orderStatus || null;
    self.status = function () {
        return self.statuses[self.orderStatus];
    }

    self.cssClass = function () {

        if (self.isInvoiced == false && self.desiredDelivery < new Date().addDays(-5)) {
            return "orderNotinvoiced";
        }
        if (self.desiredDelivery < new Date().addDays(-4)) {
            return "orderNotdelivered";
        }
        return self.statusClass[self.orderStatus];
    }
    //ProductionPlanning
    self.productionWeek = options.productionWeek || null;
    self.productionYear = options.productionYear || null;

    //Customers
    self.customerId = options.customerId || null;
    self.customer = {};
    self.invoiceCustomerId = options.invoiceCustomerId || null;
    self.invoiceCustomer = {};
    self.ordercontactId = options.ordercontactId || null;
    self.invoiceContactId = options.invoiceContactId || null;

    //Company/usergroup belonging.
    self.usergroupId = options.userGroupId || 0;
    self.usergroup = {};
    self.company = {};

    //Users connected
    self.lockedById = options.lockedById || null;
    self.lockedBy = {}
    self.quoteCreatorId = options.quoteCreatorId || 0;
    self.quoteCreator = {};
    self.createdById = options.createdById || 0;
    self.createdBy = {};
    self.workStartedById = options.workStartedById || null;
    self.workStartedBy = {};
    self.salesPersonId = options.salesPersonId || null;
    self.salesPerson = {};
    self.customerManagerId = options.customerManagerId || null;
    self.customerManager = {};

    //Criticaldelivery
    self.criticalDelivery = options.criticalDelivery || false;
    self.criticalDeliveryNote = options.criticalDeliveryNote || '';

    //Currentworkflow is the currentactive workflow if any.
    self.currentWorkflow = options.currentWorkflow || '';

    //Primary productionmachine.
    self.productionResourceId = options.productionResourceId || 0;
    self.productionResource = {};


    //Order product.
    self.productId = options.productId || 0;
    self.product = {};

    //Workflows and such....
    self.isInvoiced = options.isInvoiced || false;
    self.orderworkflows = options.orderworkflows || [];
    self.owfs = [];
    self.savedata = [];
    self.certifications = options.certifications || [];
    self.certificates = {};
    self.files = options.files || [];

    self.setProperty = function (collectionName, propertyToSet, propertyId) {
        //setObjectFromCollection(self, collectionName, propertyToSet, propertyId)
        if (!self[propertyId]) { return null; }
        var _C = _.find(window.appCache.getCacheItem(collectionName), function (c) {
            return c.id == self[propertyId];
        });
        if (_C == 'undefined') { _C = {} }
        self[propertyToSet] = _C;
    }


    self.loadCertificates = function () {

        self.certifications.forEach(function (certId, index) {
            var _C = _.find(window.appCache.getCacheItem('Certifications'), function (c) {
                return c.id == certId;
            });
            self.certificates[_C.id] = _C;
        });
        

    }();

    //Load orderworkflows
    self.loadOrderWorkflows = function () {

        //Load the data for the workflows.
        //This includes the save data.
        $.ajax({
            url: 'http://ao2010.agrenshuset.se/api/orderworkflows/',
            data: { orderId: self.id },
            type: 'GET',
            headers: options.headers || {},
            success: function (data) {
                self.owfs = [];
                data.forEach(function (owf, index) {
                    //Add a place holder for the workflow.
                    //$('#OrderWorkflows').append('<div id="owf_' + owf.id + '" class="col-1-1 orderworkflow"></div>');
                    var newOWF = new Orderworkflow(owf);
                    
                    self.owfs.push(newOWF);
                    newOWF.loadSaveData();
                });
                self.trigger('workflowsloaded');
            }
        });

    }


    self.referenceCacheObjects = function () {
        //self.setProperty('Customers', 'customer', 'customerId');
        //self.setProperty('Customers', 'invoiceCustomer', 'invoiceCustomerId');
        //self.setProperty('Users', 'lockedBy', 'lockedById');
        //self.setProperty('Users', 'quoteCreator', 'quoteCreatorId');
        //self.setProperty('Users', 'createdBy', 'createdById');
        //self.setProperty('Users', 'orderManager', 'orderManagerId');
        //self.setProperty('Users', 'workStartedBy', 'workStartedById');
        //self.setProperty('Users', 'salesPerson', 'salesPersonId');
        //self.setProperty('Users', 'customerManager', 'customerManagerId');
        self.setProperty('Usergroups', 'usergroup', 'usergroupId');
        self.setProperty('Products', 'product', 'productId');
        self.setProperty('Usergroups', 'company', 'userGroupId');
        self.setProperty('ProductionResources', 'productionResource', 'productionResourceId');
        self.statusClass = self.cssClass();
        self.formattedDelivery = self.desiredDelivery.format('yyyy-mm-dd');
        self.trigger("cacheProperties:ready");
        
    }();
}