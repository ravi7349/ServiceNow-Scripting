
//Display Business rules
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	g_scratchpad.name=current.caller_id.department.name;
})(current, previous);

function onLoad() {
   //Type appropriate comment here, and begin script below
   g_form.addInfoMessage(g_scratchpad.name);
   g_form.setValue('u_department',g_scratchpad.name);
   
}