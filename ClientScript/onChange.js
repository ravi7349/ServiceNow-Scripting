
//control, oldValue, newValue, isLoading, isTemplate this are all the staes which  use in the onChange

//When state of the incident chnages toon hold then workotes filed shoold mandotoryy

ontrol

// The field UI element that triggered the onChange event.
// oldValue
// The value of the field before the user changed it.
// newValue
// The value of the field after the user changed it
// isLoading
//When form loads, onChange runs automatically → we don’t want that.
// True when the form is loading — used to stop the script from running automatically.
// isTemplate
//When user applies an Incident Template, values change automatically → script should NOT run.
// True when a template updates the field — used to prevent script execution during template application.

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

//Delete incidnets when impact and urgency are null
var inc = new GlideRecord('incident');
inc.addNullQuery('impact');
inc.addNullQuery('urgency');
var gd = new GlideDateTime();
gd.addDays(-7);
inc.addQuery('sys_created_on','<=',gd);
inc.query();
while(inc.next()){
	inc.deleteRecord();
}
// when category is assignement set assignment group mandortoy
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    if (newValue == 'software') {
        g_form.setMandatory('assignment_group', true);
    }
	else{
		g_form.setMandatory('assignment_group',false);
	}

    //Type appropriate comment here, and begin script below

}
// when caller Changes clear the assigment group
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
   if(newValue!=oldValue){
	g_form.clearValue('assignment_group');
   }

   //Type appropriate comment here, and begin script below
   
}
//make fields restrict
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    if (newValue == 'software') {
        g_form.removeOption('short_description ');
        }

        //Type appropriate comment here, and begin script below

    }