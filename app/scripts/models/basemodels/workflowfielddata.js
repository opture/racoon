var Workflowfielddata = function (options) {
    options = options || {};
    var self = riot.observable(this);
    self.id = options.id || 0;
    self.data = options.data || '';
    self.sortOrder = options.sortOrder || 0;
    self.active = options.active || false;
}