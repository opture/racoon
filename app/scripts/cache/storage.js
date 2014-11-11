var Storage = function() {
    
    var self = riot.observable(this);

    //Get single object from storage.
    self.getSingle = function (options) {
        // options
        //url string, query keyValuePair, headers, keyvaluepair, model ModelConstructor, callback function. 
        $.ajax({
            url: options.url,
            data: options.query || {},
            type: 'GET',
            headers: options.headers || {},
            success: function (data) {
                var singleItem = new options.model(data);
                options.callback(singleItem);
            }
        });
    };

    //Get array of data.
    self.getList = function (options) {
        
        //url string, query keyValuePair, headers, keyvaluepair, model ModelConstructor, callback function.
        $.ajax({
            url: options.url,
            data: options.query || {},
            type: 'GET',
            headers: options.headers || {},
            success: function (data) {

                var retList = [];
                //Check that we received an array.
                if (data.length <= 0 ) {
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
}