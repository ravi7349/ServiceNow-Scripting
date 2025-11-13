
// script incldue
var getDepaWithCaller = Class.create();
getDepaWithCaller.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	getDept :function(){
		var Userid = this.getParameter('sysparm_caller_id');
		var gr = new GlideRecord('sys_user');//storing sys_user details like all //data in the gr and filtering the data
		gr.addQuery('sys_id',Userid);
		gr.query();
		while(gr.next()){
			return gr.department.getDisplayValue();

		}
	},


    type: 'getDepaWithCaller'
});


// Client Script
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   var ga = new GlideAjax('getDepaWithCaller');
   ga.addParam('sysparm_name','getDept');//used to callthe function in scriptinc
   ga.addParam('sysparm_caller_id',g_form.getValue('caller_id')); //used to pass data to script incldue
   ga.getXMLAnswer(function(response){
	g_form.setValue("u_department_column", response);
   });

   
}