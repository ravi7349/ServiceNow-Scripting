// onSubmit() Script Notes (Simple Way)

function onSubmit() {
   var pri = g_form.getValue('priority');
   if (pri == 1) {
      return confirm(getMessage('Are you submitting priority 1 ticket?'));
   }
}

// 🧠 Explanation in Easy Words:
// 	• onSubmit() → Runs when we click the Submit or Update button.
// 	• g_form.getValue('priority') → Gets the value from the Priority field.
// 	• if (pri == 1) → Checks if the priority is 1 (Critical).
// 	• confirm() → Shows a popup with OK and Cancel buttons.
// 		○ If user clicks OK, form will submit.
// 		○ If user clicks Cancel, form will not submit.
// 	• getMessage() → Used to show text message (supports multiple languages).

// 🪄 In Short:
// When customer tries to submit a Priority 1 (Critical) ticket,
// it shows a message:
// 👉 “Are you submitting priority 1 ticket?”
// If they click OK → submits,
// If they click Cancel → stops submission.

// Imagine a situation where users sometimes forget to fill in the short description field before submitting an incident.
// We want to stop the form submission and show an alert if that field is empty.

// How would you do that using an onSubmit client script?


function onSubmit() {
   var pri = g_form.getValue('short_description');
   if(pri ==''){
	alert('Please fill the short Description');
   }
   
}


// “Suppose you’re on the Incident form, and the rule is —
// if Priority = 1 (High) but Description is empty,
// then the form should not be submitted.

// Show an alert message:

// ‘Description is mandatory for high-priority incidents.’

function onSubmit() {
   var pri = g_form.getValue('priority');
   var desc = g_form.getValue('description');

   if (pri == '1' && desc == '') {
      alert('Description is mandatory for high-priority incidents.');
      return false;  // stops the form from submitting
   }

   return true; // allow submission otherwise
}



// “Assume on the Incident form,
// if the Category is set to ‘Hardware’,
// but the Subcategory is not selected (left empty),
// the user should not be allowed to submit the form.

// Show an alert message:

// ‘Please select a Subcategory for Hardware incidents.’

// How would you write that using an onSubmit client script?”



function onSubmit() {
   //Type appropriate comment here, and begin script below
   var cat = g_form.getValue('category');
   var subcat = g_form.getValue('subcategory');

   if(cat=='hardware'&& subcat==''){
	alert("Please select a Subcategory for Hardware incidents.");
	false;
   }
   true;
   
   
}
//if state is chnaging to close see if thhe sd is filled or not

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
   if(newValue=='7'&& g_form.getValue('work_notes')==''){
	alert("plase fill the worknotes");
	g_form.setValue('state',oldValue);
   }

   //Type appropriate comment here, and begin script below
   
}

//Make the Description field read-only only for non-admin users.
function onLoad() {
   //Type appropriate comment here, and begin script below
   if(!g_user.hasRole('admin')){
	g_form.setReadOnly('description',false);
   }
   
}

//--------------------
// When ShortDescription is emppty Preven submitting
function onSubmit() {
   //Type appropriate comment here, and begin script below
   if(g_form.getValue('assignment_group')==''){
	alert("Please fill the short Description");
	return false;
   }
   return true;
   
}
//prevent when category is hardware and assignement group is empty
function onSubmit() {
   //Type appropriate comment here, and begin script below
   if(g_form.getValue('category')=='hardware'&& !g_form.getValue('assignment_group')){
	alert("Plese fill the assgment group");
	return false;
   }
   return true;
   
}