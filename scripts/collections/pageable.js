define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
) {
    var PageableCollection = Backbone.Collection.extend({

        constructor: function(models, options) {
            this.props = { pageFilter: {} };
            var pageFilter = (options || {}).pageFilter || {},
                opts = _.omit((options || {}), "pageFilter");
            _.extend(this.props, opts);
            _.extend(this.props.pageFilter, pageFilter);
            this.props.pageFilter.pageNumber = (pageFilter.pageNumber && _.isNumber(pageFilter.pageNumber) && pageFilter.pageNumber > 0) ? pageFilter.pageNumber : 1;
            Backbone.Collection.apply(this, models, null);
        },

        setPageNumber: function(pageNumber, silent) {
            var oldPageNumber = this.props.pageFilter.pageNumber;
            this.props.pageFilter.pageNumber = (pageNumber <= 0) ? 1 : Math.min(pageNumber, this.props.totalPages);

            if(!silent && this.props.pageFilter.pageNumber !== oldPageNumber) {
                this.trigger("pageNumberChanged", this.props.pageFilter.pageNumber);
            }
        },

        fetch: function(options) {
            return this._fetch(options);
        },

        _fetch: function(options) {
            var opts = options || {};
            var successCallback = opts.success,
                errorCallback = opts.error,
                settings = _.omit(opts, ["success", "error"]);

            if(!settings.data) settings.data = {};

            settings.data.pageNumber = this.props.pageFilter.pageNumber;
            settings.data.pageSize = this.props.pageFilter.pageSize;

            var self = this;

            return Backbone.Collection.prototype.fetch.call(this, settings).then(function(fetchedData) {
                if(fetchedData.totalPages < settings.data.pageNumber && fetchedData.totalPages > 0) {
                    self.setPageNumber(fetchedData.totalPages, true);
                    settings.data.pageNumber = fetchedData.totalPages;
                    return Backbone.Collection.prototype.fetch.call(self, settings);
                }
                return fetchedData;
            }).then(successCallback, errorCallback);
        },

        parse: function(response) {
            this.props.number = response.number;
            this.props.totalElements = response.totalElements ? response.totalElements : 0;
            this.props.totalPages = response.totalPages ? response.totalPages : 0;
            this.props.sortDirection = (response.sort) ? response.sort.direction : null;
            this.props.sortField = (response.sort) ? response.sort.property : null;
            return response.content;
        }

    });

    return PageableCollection;
});
