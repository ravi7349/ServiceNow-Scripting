
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


(function process(request, response) {

    // This Scripted REST API reads the JSON data sent by the client.
    // The JSON contains caller_id, assigned_to, and short_description.
    var body = request.body.data;

    // Create a new Incident record using GlideRecord.
    // initialize() prepares a fresh/blank record (same as clicking "New" on the UI).
    var gr = new GlideRecord('incident');
    gr.initialize();

    // Set values on the new Incident from the incoming request body.
    gr.caller_id = body.caller_id;                  // who reported the issue
    gr.assigned_to = body.assigned_to;              // who will work on it
    gr.short_description = body.short_description;  // brief issue description

    // Insert the record into the Incident table and capture the sys_id of the new record.
    var sys_id = gr.insert();

    // Return a response message with the new sys_id so client knows the record was created successfully.
    return {
        message: "Incident created successfully",
        sys_id: sys_id
    };

})(request, response);


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
