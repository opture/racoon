var Article = function (options) {
    options = options || {};
    var self = this;

    this.id = options.id || 0;
    this.description = options.description || '';
    this.unitOfMeasure = options.unitOfMeasure || '';
    this.priceUnitConversion = options.priceUnitConversion || 0;
    this.unitPrice = options.unitPrice || 0.0;
    this.unitCost = options.unitCost || 0.0;
    this.isStructure = options.isStructure || false;
    this.workflowId = options.workflowId || 0;
    this.strucuturedArticles = options.strucuturedArticles || [];
    //Fetch and cache workflow for article.
    this._workflow;

    //this.createOrderWorkflow = oh.createOrderWorkflow;
}

Article.prototype.workflow = function () {
    //Check if workflow is already loaded.
    if (!this.workflow.id) {
        //Fetch from cache
        this._workflow = appCache.workflows.getById(this.workflowId);
    }

    return this._workflow;
}