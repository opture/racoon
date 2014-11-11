var Customer = function (options) {
    var self = this;
    options = options || {};
    options.customerContacts = options.customerContacts || [];
    self.id = options.id || 0;
    self.name = options.name || '';
    self.address = options.address || '';
    self.address2 = options.address2 || '';
    self.city = options.city || '';
    self.zip = options.zip || '';
    self.vatNumber = options.vatNumber || '';
    self.contacts = options.contacts || [];
    
    self.initContacts = function () {
        if (options.customerContacts.length > 0) {
            options.customerContacts.forEach(function (contact, index) {
                self.contacts.push(new CustomerContact(contact));
            });
        }
        if (self.contacts.length > 0) {
            var tmpList = [];
            self.contacts.forEach(function (contact, index) {
                tmpList.push(new CustomerContact(contact));
            });
            self.contacts = tmpList;
        }
    }();
}
