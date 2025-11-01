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