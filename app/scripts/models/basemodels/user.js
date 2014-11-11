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