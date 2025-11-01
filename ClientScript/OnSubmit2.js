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
