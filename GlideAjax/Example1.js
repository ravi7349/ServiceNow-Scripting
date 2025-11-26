
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

// To get active callers per particular id
function onLoad() {
   //Type appropriate comment here, and begin script below
   var user = g_form.getValue('caller_id');
   if(!user) return;
   var gr= new GlideRecord('incident');
   gr.addQuery('caller_id',user);
   gr.addQuery('active',true);
   gr.query();

   g_form.addInfoMessage("There are"+ gr.getRowCount()+ "Cases for"+ g_form.getDisplayValue('caller_id'));
   
}

// for delgations
function onLoad() {
   //Type appropriate comment here, and begin script below
   var user = g_form.getValue('caller_id');
   if(! user) return;

   var gr = new GlideRecord('sys_user_delegate');
   gr.addQuery('user',user);
   gr.addQuery('active',true);
   gr.query();

   if(gr.next()){
	var user1 = g_form.getDisplayValue('caller_id');
	var delegateto = gr.getDisplayValue('delegate');
	g_form.addInfoMessage(user1 +" Has Delegation Name"+ delegateto);

   }
   else{
	g_form.addInfoMessage('No delegations');
   }
   
}