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