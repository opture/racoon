var Certification = function (options) {
    options = options || {};
    var self = this;
    this.id = options.id || 0;
    this.name = options.name || '';
    this.checklistPath = options.checklistPath || '';
    this.certNumber = options.certNumber || '';
}