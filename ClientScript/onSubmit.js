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
