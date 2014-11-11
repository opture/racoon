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