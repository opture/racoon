var Cache = function () {
    //var self = riot.observable(this);
    var self = this;
    //Add item or collection to cache.
    self.addCacheItem = function (key, data) {
        self.cachedItems[key] = data;
        //self.trigger('cacheItemAdded', key, data);
    };

    //Get item or collection from cache
    self.getCacheItem = function (key) {
        return self.cachedItems[key];
    };

    //Execute when cacheitems are added-
    //self.on('cacheItemAdded', function (key, data) {
    //    console.log('Item ' + key + ' added to cache');
    //});
    self.cachedItems = {};
}
initFakeCachItems = [
            //Users
        {
            url: '/testdata/users.js',
            query: {},
            headers: { 'Accept': 'application/json+nestedids' },
            model: User,
            key: 'Users',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Usergroups
        {
            url: '/testdata/usergroups.js',
            query: {},
            headers: { 'Accept': 'application/json+nestedids' },
            model: Usergroup,
            key: 'Usergroups',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Customers
        {
            url: '/testdata/customers.js',
            query: { getAll: true },
            headers: {},
            model: Customer,
            key: 'Customers',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Products
        {
            url: '/testdata/articles.js',
            query: { isStructure: true },
            headers: { 'Accept': 'application/json+nestedids' },
            model: Product,
            key: 'Products',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Articles
        {
            url: '/testdata/articles.js',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Article,
            key: 'Articles',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Usergroups
        {
            url: '/testdata/usergroups.js',
            query: { getAll: true },
            headers: { 'Accept': 'application/json' },
            model: Usergroup,
            key: 'UserGroups',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Workflows
        {
            url: '/testdata/workflows.js',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Workflow,
            key: 'Workflows',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //WorkflowFieldDatas
        {
            url: '/testdata/workflowfielddatas.js',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Workflowfielddata,
            key: 'Workflowfielddatas',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //ProductionResources
        {
            url: '/testdata/productionmachines.js',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: ProductionResource,
            key: 'ProductionResources',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Certifications
        {
            url: '/testdata/certifications.js',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Certification,
            key: 'Certifications',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Papers
        {
            url: '/testdata/papers.js',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Paper,
            key: 'Papers',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        }

];
initCacheItems =
    [
        //Users
        {
            url: 'http://ao2010.agrenshuset.se/api/users/',
            query: {},
            headers: { 'Accept': 'application/json+nestedids' },
            model: User,
            key: 'Users',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Usergroups
        {
            url: 'http://ao2010.agrenshuset.se/api/usergroups/',
            query: {},
            headers: { 'Accept': 'application/json+nestedids' },
            model: Usergroup,
            key: 'Usergroups',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Customers
        {
            url: 'http://ao2010.agrenshuset.se/api/customers/',
            query: { getAll: true },
            headers: {},
            model: Customer,
            key: 'Customers',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Products
        {
            url: 'http://ao2010.agrenshuset.se/api/articles/',
            query: { isStructure: true },
            headers: { 'Accept': 'application/json+nestedids' },
            model: Product,
            key: 'Products',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Articles
        {
            url: 'http://ao2010.agrenshuset.se/api/articles/',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Article,
            key: 'Articles',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Usergroups
        {
            url: 'http://ao2010.agrenshuset.se/api/usergroups/',
            query: { getAll: true },
            headers: { 'Accept': 'application/json' },
            model: Usergroup,
            key: 'UserGroups',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Workflows
        {
            url: 'http://ao2010.agrenshuset.se/api/workflows/',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Workflow,
            key: 'Workflows',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //WorkflowFieldDatas
        {
            url: 'http://ao2010.agrenshuset.se/api/workflowfielddatas/',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Workflowfielddata,
            key: 'Workflowfielddatas',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //ProductionResources
        {
            url: 'http://ao2010.agrenshuset.se/api/productionmachines/',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: ProductionResource,
            key: 'ProductionResources',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Certifications
        {
            url: 'http://ao2010.agrenshuset.se/api/certifications/',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Certification,
            key: 'Certifications',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        },
        //Papers
        {
            url: 'http://ao2010.agrenshuset.se/api/papers/',
            query: {},
            headers: { 'Accept': 'application/json' },
            model: Paper,
            key: 'Papers',
            callback: function (retList) {
                self.appCache.addCacheItem(this.key, retList);
            }
        }
];






function getList(options) {
    //url string, query keyValuePair, headers, keyvaluepair, model ModelConstructor, callback function.
    $.ajax({
        url: options.url,
        data: options.query || {},
        type: 'GET',
        headers: options.headers || {},
        success: function (data) {

            var retList = [];
            //Check that we received an array.
            if (data.length <= 0) {
                options.callback(null);
            }

            //Check if its an array or an object wrapping an array.
            if (Object.prototype.toString.call(data) === '[object Array]') {
                //Pure array
                _.forEach(data, function (item, index) {
                    retList.push(new options.model(item));
                });
            } else {
                //Array wrapped by object.
                _.forEach(data[Object.keys(data)[0]], function (item, index) {
                    retList.push(new options.model(item));
                });
            }

            //Execute callback with returned data.
            options.callback(retList);
        }
    });
}
//Actual initialization
initCache = function (options) {
    options = options || {};
    options.debug = options.debug || false;
    var self = this;
    self.appCache = new Cache();
    window.appCache = self.appCache;
    var cacheItemList = options.debug ? self.initFakeCachItems : self.initCacheItems
    if (!options.debug) {
        _.forEach(cacheItemList, function (option, index) {
            //app.trigger('loadingCacheItem', option.key);
            getList(option);
        });
    }
    if (options.debug) {
        _.forEach(self.initFakeCachItems, function (item, index) {
           
            $.getJSON(item.url, function (data) {
                
                var retList = [];
                //Check that we received an array.
                if (data.length <= 0) {
                    item.callback(null);
                }
                console.log(item.key);
                console.log(Object.prototype.toString.call(data));
                //Check if its an array or an object wrapping an array.
                if (Object.prototype.toString.call(data) === '[object Array]') {
                    //Pure array
                    _.forEach(data, function (item2, index) {
                        retList.push(new item.model(item2));
                    });
                } else {
                    //Array wrapped by object.
                    _.forEach(data[Object.keys(data)[0]], function (item2, index) {
                        retList.push(new item.model(item2));
                    });
                }

                //Execute callback with returned data.
                item.callback(retList);
            });
        });
    }
};