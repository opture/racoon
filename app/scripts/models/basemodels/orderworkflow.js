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