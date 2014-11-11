///#source 1 1 /scripts/models/basemodels/article.js
var Article = function (options) {
    options = options || {};
    var self = this;

    this.id = options.id || 0;
    this.description = options.description || '';
    this.unitOfMeasure = options.unitOfMeasure || '';
    this.priceUnitConversion = options.priceUnitConversion || 0;
    this.unitPrice = options.unitPrice || 0.0;
    this.unitCost = options.unitCost || 0.0;
    this.isStructure = options.isStructure || false;
    this.workflowId = options.workflowId || 0;
    this.strucuturedArticles = options.strucuturedArticles || [];
    //Fetch and cache workflow for article.
    this._workflow;

    //this.createOrderWorkflow = oh.createOrderWorkflow;
}

Article.prototype.workflow = function () {
    //Check if workflow is already loaded.
    if (!this.workflow.id) {
        //Fetch from cache
        this._workflow = appCache.workflows.getById(this.workflowId);
    }

    return this._workflow;
}
///#source 1 1 /scripts/models/basemodels/certification.js
var Certification = function (options) {
    options = options || {};
    var self = this;
    this.id = options.id || 0;
    this.name = options.name || '';
    this.checklistPath = options.checklistPath || '';
    this.certNumber = options.certNumber || '';
}
///#source 1 1 /scripts/models/basemodels/customer.js
var Customer = function (options) {
    var self = this;
    options = options || {};
    options.customerContacts = options.customerContacts || [];
    self.id = options.id || 0;
    self.name = options.name || '';
    self.address = options.address || '';
    self.address2 = options.address2 || '';
    self.city = options.city || '';
    self.zip = options.zip || '';
    self.vatNumber = options.vatNumber || '';
    self.contacts = options.contacts || [];
    
    self.initContacts = function () {
        if (options.customerContacts.length > 0) {
            options.customerContacts.forEach(function (contact, index) {
                self.contacts.push(new CustomerContact(contact));
            });
        }
        if (self.contacts.length > 0) {
            var tmpList = [];
            self.contacts.forEach(function (contact, index) {
                tmpList.push(new CustomerContact(contact));
            });
            self.contacts = tmpList;
        }
    }();
}

///#source 1 1 /scripts/models/basemodels/customercontact.js
var CustomerContact = function (options) {
    var self = this;
    options = options || {};
    self.id = options.id || null;
    self.firstname = options.firstname || '';
    self.lastname = options.lastname || '';
    self.active = options.active || true;
    self.phone = options.phone || '';
    self.email = options.email || '';
    self.cellphone = options.cellphone || '';

}
///#source 1 1 /scripts/models/basemodels/orderlistitem.js
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
///#source 1 1 /scripts/models/basemodels/ordersavedata.js
var OrderSavedata = function (options) {
    var self = riot.observable(this);
    options = options || {};
    self.owfId = options.owfId || null;
    self.wffinwfId = options.wffinwfId || null;
    self.savedata = options.savedata || null;
}

///#source 1 1 /scripts/models/basemodels/orderworkflow.js
var Orderworkflow = function (options) {
    var self = riot.observable(this);
    options = options || {};
    self.statuses = ['Null','Ej påbörjad','Påbörjad','Avslutad']
    self.id = options.id || 0;
    self.orderId = options.orderId || 0;
    self.workflowId = options.workflowId || 0;
    self.workflow = {};
    self.articleId = options.articleId || null;
    self.article = {};
    self.savedata = [];
    self.sortorder = options.sortorder || 0;
    self.workflowstatusId = options.workflowstatusId || 0;
    self.workstartedAt = options.workstartedAt || null;
    self.workEndedAt = options.workEndedAt || null;
    self.expanded = options.expanded || false;
    self.previousWfHasToBeCompleted = options.previousWfHasToBeCompleted || true;
    self.showOnDeliveryNote = options.showOnDeliveryNote || false;
    
    //Return workflowstatus as text.
    self.workflowStatus = function () {
        return self.statuses[self.workflowstatusId];
    }


    //
    self.setProperty = function (collectionName, propertyToSet, propertyId) {
        if (!self[propertyId]) { return null; }
        var _C = _.find(appCache.getCacheItem(collectionName), function (c) {
            return c.id == self[propertyId];
        });
        if (_C == 'undefined') { _C = {} }
        self[propertyToSet] = _C;
    }

    self.initSaveData = function () {
        if (options.savedata) {
            self.savedata = [];
            options.savedata.forEach(function (sd, index) {
                self.savedata.push(new OrderSavedata(sd));
            });
        }
    }
    self.referenceCacheObjects = function () {
        //self.setProperty('Workflows', 'workflow', 'workflowId');
        //Initialize to a new workflow
        self.initSaveData();

        var _WF = _.find(appCache.getCacheItem('Workflows'), function (c) {
            return c.id == self.workflowId;
        });
        //Copy the workflow...
        var selfWF = new Workflow(_WF);
        selfWF.workflowfields.forEach(function (wff, index) {
            
            //Bind the savedata to the workflowfields.
            var sd = _.find(self.savedata, function (_sd) {
                return _sd.wffinwfId == wff.id
            })
            if (sd) {
                wff.displayValue = sd.savedata;
            }
            
        });
        self.workflow = selfWF;
        //setObjectFromCollection(self, 'Articles', 'article', 'articleId');
        self.setProperty('Articles', 'article', 'articleId');
    }();

    //Load savedata
    self.loadSaveData = function () {
        //Load the data for the workflows.
        $.ajax({
            url: 'http://ao2010.agrenshuset.se/api/saveddatas/',
            data: { owfid: self.id },
            type: 'GET',
            headers: options.headers || {},
            success: function (data) {
                self.savedata = [];
                data.forEach(function (sd, index) {
                    self.savedata.push(new OrderSavedata(sd));
                });
                self.trigger('savedataUpdated');
            }
        });

    }

    self.on('savedataUpdated', function () {
        
    });

    /* this.createWorkflowFields = function () {
        if (!options.workflowfields) { return; }
        for (var x in options.workflowfields) {
            self.workflowfields.push(new wff(options.workflowfields[x]))
        }
    }(); */
}
///#source 1 1 /scripts/models/basemodels/paper.js
var Paper = function (options) {
    var self = this;
    options = options || {};
    this.id = options.id || 0;
    this.paperNameId = options.paperNameId || 0;
    this.paperSheetFormatId = options.paperSheetFormatId || 0;
    this.paperWeightId = options.paperWeightId || 0;
}
///#source 1 1 /scripts/models/basemodels/product.js
var Product = function (options) {
    options = options || {};
    var self = this;

    this.id = options.id || 0;
    this.description = options.description || '';
    this.unitOfMeasure = options.unitOfMeasure || '';
    this.priceUnitConversion = options.priceUnitConversion || 0;
    this.unitPrice = options.unitPrice || 0.0;
    this.unitCost = options.unitCost || 0.0;
    this.isStructure = options.isStructure || true;
    this.workflowId = options.workflowId || 0;
    this.strucuturedArticles = options.strucuturedArticles || [];

    //fetch and cache subarticles.
    this._subArticles = [];

    //Fetch and cache workflow for product.
    this._workflow;

}
Product.prototype.workflow = function () {
    //Check if workflow is already loaded.
    if (!this.workflow.id) {
        //Fetch from cache
        this._workflow = appCache.workflows.getById(this.workflowId);
    }

    return this._workflow;
}
Product.prototype.articles = function () {
    var retVal = [];
    if (this.strucuturedArticles.length <= 0) { return retVal }
    this.strucuturedArticles.forEach(function (id) {
        retVal.push(_.find(appCache.cachedItems['Articles'], function (art) {
            return art.id == id;
        })
        );
    });
    return retVal;
}

///#source 1 1 /scripts/models/basemodels/productionresource.js
var ProductionResource = function (options) {
    var self = riot.observable(this);
    options = options || {};
    this.id = options.id || 0;
    this.name = options.name || '';
    this.companyId = options.companyId || 0;
    this.costPerUnit = options.costPerUnit || 0;
    this.startCost = options.startCost || 0;
}
///#source 1 1 /scripts/models/basemodels/user.js
var User = function (options) {
    options = options || {};
    var self = riot.observable(this);
    this.id = options.id || 0;
    this.firstname = options.firstname || '';
    this.lastname = options.lastname || '';
    this.username = options.username || '';
    this.email = options.email || '';
    this.phone = options.phone || '';
    this.active = options.active || false;
    this.userGroup = options.userGroup || null;
    this.value = options.firstname + ' ' + options.lastname;
    self.fullname = function () {
        return self.firstname + ' ' + self.lastname;
    }
}
///#source 1 1 /scripts/models/basemodels/usergroup.js
var Usergroup = function (options) {
    options = options || {};
    var self = this;
    this.id = options.id || 0;
    this.name = options.name || '';
    this.parentgroupId = options.parentgroup || null;
    this.active = options.active || true;
}
///#source 1 1 /scripts/models/basemodels/workflow.js
var Workflow = function (options) {
    options = options || {};
    var self = this;
    this.id = options.id || 0;//As Integer
    this.active = options.active || true; //As Boolean
    this.alwaysFolded = options.alwaysFolded || false;//As Boolean
    this.description = options.description || '';//As String
    this.displayOnInvoice = options.displayOnInvoice || false;//As Boolean
    this.workflowCertificationMessages = options.workflowCertificationMessages || []; // As List(Of CertificationMessageDTO)
    this.workflowColor = options.workflowColor || '';//As String
    this.workflowfields = [] //As List(Of OrderWorkflowFieldDTO)
    this.name = options.name || '';
    this.cssClass = options.cssClass || '';

    this.initWorkflowFields = function () {
        for (var x in options.workflowfields) {
            self.workflowfields.push(new Workflowfield(options.workflowfields[x]))
        }
    }();
}
///#source 1 1 /scripts/models/basemodels/workflowfield.js
var Workflowfield = function (options) {
    options = options || {};
    var self = riot.observable(this);
    self.id = options.id || 0;
    self.fieldId = options.fieldId || 0;
    self.label = options.label || '';
    self.tooltip = options.tooltip || '';
    self.mandatory = options.mandatory || false;
    self.sortOrder = options.sortOrder || 0;
    self.showInPopup = options.showInPopup || false;
    self.typeId = options.typeId || 1;
    self.value = options.value || '';
    self.displayValue = options.displayValue || '';
    self.optionsList = [];
    //self.optionsList = function () {

    //    return app.app_cache.workflowfielddatas.collection.filter(function (item) {
    //        return item.workflowFieldId == self.fieldId;
    //    }).sort(function (a, b) {
    //        if (a.sortOrder > b.sortOrder) {
    //            return 1
    //        }
    //        if (a.sortOrder < b.sortOrder) {
    //            return -1
    //        }
    //        return 0
    //    });
    //};
    self.initOptions = function () {
        options.optionsList.forEach(function (opt, index) {
            self.optionsList.push(opt)
        });

    }();
}
Workflowfield.prototype.typeName = function () {

    if (this.typeId == 1) {
        return 'text';
    }
    if (this.typeId == 2) {
        return 'number';
    }
    if (this.typeId == 3) {
        return 'decimal';
    }
    if (this.typeId == 4) {
        return 'date';
    }
    if (this.typeId == 5) {
        return 'dropdown';
    }
    if (this.typeId == 6) {
        return 'list';
    }
    if (this.typeId == 7) {
        return 'textarea';
    }
    if (this.typeId == 8) {
        return 'checkbox';
    }
    if (this.typeId == 9) {
        return 'paper';
    }
    if (this.typeId == 18) {
        return 'placeholder';
    }
    return 'text';
}
///#source 1 1 /scripts/models/basemodels/workflowfielddata.js
var Workflowfielddata = function (options) {
    options = options || {};
    var self = riot.observable(this);
    self.id = options.id || 0;
    self.data = options.data || '';
    self.sortOrder = options.sortOrder || 0;
    self.active = options.active || false;
}
///#source 1 1 /scripts/models/basemodels/workorder.js
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
