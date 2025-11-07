
//control, oldValue, newValue, isLoading, isTemplate this are all the staes which  use in the onChange

//When state of the incident chnages toon hold then workotes filed shoold mandotoryy


function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   if(newValue=='3'){
	g_form.setMandatory('worknotes' ,true);
   }

   //Type appropriate comment here, and begin script below
   
}