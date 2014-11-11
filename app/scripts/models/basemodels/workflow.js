var Workflow = function (options) {
    options = options || {};
    var self = this;
    this.id = options.id || 0;//As Integer
    this.active = options.active || true; //As Boolean
    this.alwaysFolded = options.alwaysFolded || false;//As Boolean
    this.description = options.description || '';//As String
    this.displayOnInvoice = options.displayOnInvoice || false;//As Boolean
    this.workflowCertificationMessages = options.workflowCertificationMessages || []; // As List(Of CertificationMessageDTO)
    this.workflowColor = options.workflowColor || '';//As String
    this.workflowfields = [] //As List(Of OrderWorkflowFieldDTO)
    this.name = options.name || '';
    this.cssClass = options.cssClass || '';

    this.initWorkflowFields = function () {
        for (var x in options.workflowfields) {
            self.workflowfields.push(new Workflowfield(options.workflowfields[x]))
        }
    }();
}