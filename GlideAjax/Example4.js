var NoOFIncidentspercaller = Class.create();
NoOFIncidentspercaller.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getcaller: function() {

		var userId = this.getParameter('sysparm_user');  // corrected variable name

		var gr = new GlideAggregate('incident');        // renamed ga → gr
		gr.addQuery('caller_id', userId);
		gr.addQuery('state', '!=', 7);                  // exclude closed
		gr.addAggregate('COUNT');
		gr.query();
		gr.next();

		return gr.getAggregate('COUNT');
	},

	type: 'NoOFIncidentspercaller'
});
// ✅ Your Client Script is Perfect (No changes needed):
// js
// Copy code
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   var ga = new GlideAjax('NoOFIncidentspercaller');
   ga.addParam('sysparm_name','getcaller');
   ga.addParam('sysparm_user',newValue);
   ga.getXMLAnswer(function(response){
	   g_form.addInfoMessage("Active Incidents for this Caller: " + response);
   });
}
//✅ Expected Result on Incident Form:
// When you select Caller, you will see:

// kotlin
// Copy code
// Active Incidents for this Caller: 3