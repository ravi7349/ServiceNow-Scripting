// onLoad Client Script Example
// Requirements:
// 	1. State & Category → Read-only
// 	2. Impact & Urgency → Mandatory
// 	3. Assignment Group → Hidden
// 	4. Show info message if the record is new

// 💻 Code:

function onLoad() {
// Show info message when new record is created
    if (g_form.isNewRecord()) {
        g_form.addInfoMessage('Please provide Impact and Urgency before saving.');
    }
// Make fields mandatory
    g_form.setMandatory('impact', true);
    g_form.setMandatory('urgency', true);
// Make fields read-only
    g_form.setDisabled('state', true);
    g_form.setDisabled('category', true);
// Hide field
    g_form.setDisplay('assignment_group', false);
}

// 🧠 Quick Notes:
// 	• isNewRecord() → checks if it’s a new record.
// 	• addInfoMessage() → shows message on top of form.
// 	• setMandatory() → makes fields required.
// 	• setDisabled() → makes fields read-only.
// 	• setDisplay() → hides a field from the form.
