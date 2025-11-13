
//Script Include
var GetManagerWithCaller = Class.create();
GetManagerWithCaller.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	getManager : function(){
		var caller_id = this.getParameter('sysparm_caller_id');
		var ga = new GlideRecord('sys_user');
		ga.addQuery('sys_id',caller_id);
		ga.query();
		while(ga.next()){
			return ga.manager.name.toString();
		}
	},

    type: 'GetManagerWithCaller'
});


//CLient Script
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
   var ga = new GlideAjax('GetManagerWithCaller');
   ga.addParam('sysparm_name','getManager');
   ga.addParam('sysparm_caller_id',g_form.getValue('caller_id'));
   ga.getXMLAnswer(function(response){
	g_form.setValue('u_managername', response);
   });

   //Type appropriate comment here, and begin script below
   
}