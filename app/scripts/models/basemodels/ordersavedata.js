var OrderSavedata = function (options) {
    var self = riot.observable(this);
    options = options || {};
    self.owfId = options.owfId || null;
    self.wffinwfId = options.wffinwfId || null;
    self.savedata = options.savedata || null;
}
