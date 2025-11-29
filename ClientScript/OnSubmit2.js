function onSubmit() {

    // ✅ 1️⃣ Check if mandatory fields are filled
    // If Caller or Short Description is empty → show alert and stop submission
    if (g_form.getValue('caller_id') == '' || g_form.getValue('short_description') == '') {
        alert('Please fill Caller and Short Description before submitting.');
        return false; // Stops form from submitting
    }

    // ✅ 2️⃣ Confirm submission if Priority is 1 (Critical)
    // Shows a message with OK and Cancel buttons
    var pri = g_form.getValue('priority');
    if (pri == 1) {
        return confirm('Are you sure you want to submit a Priority 1 Incident?');
    }

    // ✅ 3️⃣ Validate field values before submit
    // Example: If Impact = High and Urgency = Low → invalid combination
    if (g_form.getValue('impact') == 1 && g_form.getValue('urgency') == 3) {
        alert('Impact and Urgency combination is invalid.');
        return false;
    }

    // ✅ 4️⃣ Show confirmation for Change Request
    // If record type is change_request → confirm before submitting
    if (g_form.getTableName() == 'change_request') {
        return confirm('Do you want to proceed with this Change Request?');
    }

    // ✅ If all checks pass, form will submit successfully


}


// Q1. When Category changes to “Hardware”, automatically set Subcategory to “Laptop”.
// onChange Client Script (field: category)
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') return;

    if (newValue == 'hardware') {
        g_form.setValue('subcategory', 'laptop');
    }
}

// ✅ Q2. Prevent form submission if Short Description or Description is empty (using onSubmit).
// onSubmit Client Script
function onSubmit() {
    if (g_form.getValue('short_description') == '' ||
        g_form.getValue('description') == '') {

        alert("Short Description and Description are required.");
        return false; // stop submit
    }
}

// ✅ Q3. When Assignment Group changes, clear the Assigned To field.
// onChange Client Script (field: assignment_group)
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    g_form.setValue('assigned_to', '');
}

// ✅ Q4. Hide the Impact field on Create form but show it on Update form.
// onLoad Client Script
function onLoad() {
    if (g_form.isNewRecord()) {
        g_form.setDisplay('impact', false);
    } else {
        g_form.setDisplay('impact', true);
    }
}

// ✅ Q5. Show a warning message: “This is a P1 Incident” when Priority changes to P1.
// onChange Client Script (field: priority)
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue == '1') {
        g_form.showFieldMsg('priority', 'This is a P1 Incident', 'warning');
    }
}

// ✅ Q6. When caller is selected, automatically fill phone number from sys_user (using GlideAjax).
// Client Script
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') return;

    var ga = new GlideAjax('GetUserInfo');
    ga.addParam('sysparm_name', 'getPhone');
    ga.addParam('sysparm_user_id', newValue);
    ga.getXML(function(response) {
        var phone = response.responseXML.documentElement.getAttribute("answer");
        g_form.setValue('caller_phone', phone);
    });
}

// Script Include (Client Callable = true)
var GetUserInfo = Class.create();
GetUserInfo.prototype = {
    getPhone: function() {
        var user = new GlideRecord('sys_user');
        user.get(this.getParameter('sysparm_user_id'));
        return user.phone + '';
    },
    type: 'GetUserInfo'
};

// ✅ Q7. Make the Description field read-only only for non-admin users.
// onLoad Client Script
function onLoad() {

    if (!g_user.hasRole('admin')) {
        g_form.setReadOnly('description', true);
    }
}

// ✅ Q8. If State = “Resolved”, ensure user enters Resolution Notes.
// onSubmit Client Script
function onSubmit() {

    if (g_form.getValue('state') == '6' &&   // resolved
        g_form.getValue('close_notes') == '') {

        alert("Please enter Resolution Notes.");
        return false;
    }
}

// ✅ Q9. When location changes, automatically set Contact Type = “Walk-in”.
// onChange Client Script (field: location)
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    g_form.setValue('contact_type', 'walk-in');
}

// ✅ Q10. Prevent user from selecting “Closed” unless Work Notes has at least one entry.
// onChange Client Script (field: state)
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue == '7' && g_form.getValue('work_notes') == '') {
        alert("Please add Work Notes before closing.");
        g_form.setValue('state', oldValue); 
    }
}