var Product = function (options) {
    options = options || {};
    var self = this;

    this.id = options.id || 0;
    this.description = options.description || '';
    this.unitOfMeasure = options.unitOfMeasure || '';
    this.priceUnitConversion = options.priceUnitConversion || 0;
    this.unitPrice = options.unitPrice || 0.0;
    this.unitCost = options.unitCost || 0.0;
    this.isStructure = options.isStructure || true;
    this.workflowId = options.workflowId || 0;
    this.strucuturedArticles = options.strucuturedArticles || [];

    //fetch and cache subarticles.
    this._subArticles = [];

    //Fetch and cache workflow for product.
    this._workflow;

}
Product.prototype.workflow = function () {
    //Check if workflow is already loaded.
    if (!this.workflow.id) {
        //Fetch from cache
        this._workflow = appCache.workflows.getById(this.workflowId);
    }

    return this._workflow;
}
Product.prototype.articles = function () {
    var retVal = [];
    if (this.strucuturedArticles.length <= 0) { return retVal }
    this.strucuturedArticles.forEach(function (id) {
        retVal.push(_.find(appCache.cachedItems['Articles'], function (art) {
            return art.id == id;
        })
        );
    });
    return retVal;
}
