var ProductionResource = function (options) {
    var self = riot.observable(this);
    options = options || {};
    this.id = options.id || 0;
    this.name = options.name || '';
    this.companyId = options.companyId || 0;
    this.costPerUnit = options.costPerUnit || 0;
    this.startCost = options.startCost || 0;
}