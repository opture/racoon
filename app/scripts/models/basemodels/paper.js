var Paper = function (options) {
    var self = this;
    options = options || {};
    this.id = options.id || 0;
    this.paperNameId = options.paperNameId || 0;
    this.paperSheetFormatId = options.paperSheetFormatId || 0;
    this.paperWeightId = options.paperWeightId || 0;
}