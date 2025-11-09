//Soap Scripted Apis

(function scriptedWebServiceOperation(request, response) {

	var ga = new GlideRecord('incident');
	ga.impact = request.impact;
	ga.urgency = request.urgency;
	ga.short_description = request.short_description;
	var sys_id= ga.insert();
	response.sys_id = sys_id;
	response.message= "Incident created succefully";

})(request, response);

//Rest  Scripted Apis

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

   var shortdes = request.body.data.short_description;
   var imp = request.body.data.impact;
   var urg = request.body.data.urgency;

   var ga = new GlideRecord('incident');
   ga.short_description  = shortdes;
   ga.impact = imp;
   ga.urgency = urg;
   var sys_id = ga.insert();

   response.setBody({
	"sys_id" : sysId,
	"messgae":"Incidnet created succeffully"
   });

})(request, response);