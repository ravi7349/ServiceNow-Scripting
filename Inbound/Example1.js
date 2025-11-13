
//2nd Type // Scripted rest Api

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
 
    var body = request.body.data;
    var gr=new GlideRecord('incident');
    gr.initialize();
    gr.caller_id = body.caller_id;
    gr.assigned_to = body.assigned_to;
    gr.short_description = body.short_description;
    var sys_id=gr.insert();
    return{
        message: "Incident created successfully",
        sys_id: sys_id
    };
})(request, response);

