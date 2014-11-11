var Usergroup = function (options) {
    options = options || {};
    var self = this;
    this.id = options.id || 0;
    this.name = options.name || '';
    this.parentgroupId = options.parentgroup || null;
    this.active = options.active || true;
}