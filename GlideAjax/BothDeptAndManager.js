var MAnagerandDepartment = Class.create();
MAnagerandDepartment.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	ManagerDept:function(){
		var caller_id = this.getParameter('sysparm_caller_id');
		var gr = new GlideRecord('sys_user');
		gr.addQuery('sys_id',caller_id);
		gr.query();
		while(gr.next()){
			return gr.department.getDisplayValue();
		}
	},
	Manager:function(){
		var caller_id = this.getParameter('sysparm_caller_id');
		var gr = new GlideRecord('sys_user');
		gr.addQuery('sys_id',caller_id);
		gr.query();
		while(gr.next()){
			return gr.manager.getDisplayValue();
		}
	},

    type: 'MAnagerandDepartment'
});

//client script

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
   var gr = new GlideAjax('MAnagerandDepartment');
   gr.addParam('sysparm_name','ManagerDept');
   gr.addParam('sysparm_caller_id',g_form.getValue('caller_id'));
   gr.getXMLAnswer(function(response){
	g_form.setValue('u_department',response);
   });
   var gr1 = new GlideAjax('MAnagerandDepartment');
   gr1.addParam('sysparm_name','Manager');
   gr1.addParam('sysparm_caller_id',g_form.getValue('caller_id'));
   gr1.getXMLAnswer(function(response){
	g_form.setValue('u_manager',response);
   });

   //Type appropriate comment here, and begin script below
   
}