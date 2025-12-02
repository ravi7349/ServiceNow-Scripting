// onLoad Client Script Example

// Requirements:

// Number and Priority fields → Read-only

// Caller and Short Description fields → Mandatory

// Configuration Item (cmdb_ci) field → Hidden

// Show an info message on the top if the record is new

// 💻 Code:
function onLoad() {
    // Step 1: Show info message if this is a new record
    if (g_form.isNewRecord()) {
        g_form.addInfoMessage('Please fulfill all mandatory fields');
    }

    // Step 2: Make 'Caller' and 'Short Description' fields mandatory
    g_form.setMandatory('caller_id', true);
    g_form.setMandatory('short_description', true);

    // Step 3: Make 'Number' and 'Priority' fields read-only
    g_form.setDisabled('number', true);
    g_form.setDisabled('priority', true);

    // Step 4: Hide 'Configuration Item' field
    g_form.setDisplay('cmdb_ci', false);
}

// 🧠 Quick Explanation (Simple Words)

// g_form.isNewRecord() → Checks if the form is new.
// If yes → shows an info message at the top.

// g_form.setMandatory() → Makes fields compulsory.

// g_form.setDisabled() → Makes fields read-only so users can’t edit.

// g_form.setDisplay() → Hides the field from the form.

// g_form.addInfoMessage() → Displays a message on the top of the form.

// 💬 How to Explain in an Interview

// In this onLoad Client Script, I controlled the form behavior dynamically.
// When a user opens a new record, an info message appears reminding them to fill mandatory fields.
// The Caller and Short Description fields are made mandatory,
// the Number and Priority fields are set to read-only to prevent changes,
// and the Configuration Item field is hidden.
// This improves data accuracy and user experience while protecting system-generated data.



// Scneria Based

// Question 1 (Beginner – OnLoad):

// Write a Client Script that shows a popup message saying "Welcome, this form is used for logging incidents" only when a new incident record is created.

function onLoad() {
    if (g_form.isNewRecord()) {
        alert("Welcome, this form is used for logging incidents");
    }
}


// Question 2 (Intermediate – onLoad)

// When the incident form loads, if the priority is 1 (Critical),
// show an alert message:

// “High Priority Incident — Please address immediately.”


function onLoad() {
   var pri = g_form.getValue('priority');
   if (pri == '1') {
       alert("High Priority Incident — Please address immediately.");
   }
}


// When the incident form loads,
// if the category is “network”, then:

// Automatically set the assignment group to “Network Team”.

// Show a message:

// “Incident assigned to Network Team automatically.”

function onLoad() {
   var cat = g_form.getValue('category');
   if(cat=='network'){
	g_form.setValue('assignment_group','Network');
	g_form.addInfoMessage("Incident assigned to Network Team automatically");
   }
   
}

// Question 4 (onLoad – Real-Time Scenario):

// When the incident form loads,
// if the caller is a VIP user, then:

// Show an alert message:

// “⚠️ Caller is VIP – handle this incident with priority!”

// Set the impact and urgency fields both to 1 (High).

// Make both of these fields read-only so users can’t change them.
// if u want to get the caller_if need to use the getRefrence and function(caller)
function onLoad() {
   g_form.getReference('caller_id', function(caller) {
       if (caller.vip == true) {
           alert("Caller is VIP – handle this incident with priority!");
           g_form.setValue('impact', 1);
           g_form.setValue('urgency', 1);
           g_form.setReadOnly('impact', true);
           g_form.setReadOnly('urgency', true);
           g_form.getReference('caller_id',function(caller){
            
           })
       }
   });
}


// When the incident form loads,
// if the short description field is empty,
// then automatically fill it with this text:

// “Short description not provided – please update before saving.”

function onLoad() {
   var sd = g_form.getValue('short_description');  // get the current value
   if (sd == '') {  // check if it's empty
      g_form.setValue('short_description', 'Short description not provided – please update before saving.');
      g_form.addInfoMessage('Short description field was empty. Please update it.');
   }
}

