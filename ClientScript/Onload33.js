//setDisplay
//setMandotory
//setReadOnly
function onLoad() {
   //Type appropriate comment here, and begin script below
   if(g_form.getValue('impact')==1){
	g_form.setValue('assignment_group','019ad92ec7230010393d265c95c260dd');
   }
   
}

//Message display

function onLoad() {
   //Type appropriate comment here, and begin script below
   g_form.addInfoMessage("Please fill all mandotory fields");
   
}

//based on role visible some fields
function onLoad() {
   //Type appropriate comment here, and begin script below
   if(g_form.hasRole('admin')){
	g_form.setDisplay('u_phone_number',false);
   }
   
}

//if category == incquiry make disable attachement button
function onLoad() {
   //Type appropriate comment here, and begin script below
   if(g_form.getValue('category')=='inquiry'){
	g_form.setAttachmentsEnabled(false);
   }
   
}
