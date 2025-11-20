
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

// olution 1: OnChange Client Script (BEST & CLEAN)
// Client Script Type: onChange
// Field Name: priority
// ✔ Code:

// When priority changes to 1 the number field sholud goes to red color
function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading) return;

    // Check if priority is Critical
    if (newValue == 1) {
        // Change background color of Number field
        g_form.getControl('number').style.backgroundColor = 'red';
    } else {
        // Reset color
        g_form.getControl('number').style.backgroundColor = '';
    }
}
