
//2nd Type // Scripted rest Api //post

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
// here i need to clikc on explore rest api and need to give the exact values there and the data

//Get
(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var gr = new GlideRecord('incident');
    gr.get('number', request.pathParams.number);
    if (gr.isValidRecord()) {
        return {
            number: gr.number.toString(),
            short_description: gr.short_description.toString(),
            state: gr.state.toString()

        };
    } else {

        return {
            Error: "record not found"
        };
    }


    // implement resource here

})(request, response);


//Soap method

(function scriptedWebServiceOperation(request, response) {

	var gr = new GlideRecord('incident');
	gr.initialize();
	gr.short_description = request.short_description;
	gr.description = request.description;
	gr.impact = request.impact || 3;
	gr.urgency  = request.urgency ||3;
	gr.category = request.category || "Category";
	var sysId = gr.insert();
	response.sysid = sysId;
	response.message = "Incident created succesfully";

})(request, response);
