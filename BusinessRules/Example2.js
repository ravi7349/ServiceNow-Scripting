// ===========================
// BUSINESS RULE QUESTIONS + ANSWERS (EASY)
// ===========================

// Q1. Why should you NOT use current.update() inside a Business Rule?
// A1. Because it creates an infinite loop. The BR runs → update() runs → BR runs again. This can crash the system.

//------------------------------------------------------------

// Q2. If Priority changes to P1, set Assignment Group = Critical Support.
// Use: BEFORE UPDATE Business Rule
// Script:
if (current.priority.changesTo('1')) {
    current.assignment_group = 'CRITICAL_SUPPORT_SYS_ID';
}

//Reason: Before Update can change field values. After Update cannot.

// ------------------------------------------------------------


// Q3. When Parent Incident Work Notes change, copy notes to all Child Incidents.
// Use: AFTER UPDATE Business Rule (because Work Notes update after save)
// Script:
if (current.work_notes.changes()) {
    var child = new GlideRecord('incident');
    child.addQuery('parent_incident', current.sys_id);
    child.query();
    while (child.next()) {
        child.work_notes = current.work_notes;
        child.update();
    }
}
//If the caller id chnages print the short description as caller name
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	if(current.caller_id.changes()){
		current.short_description = "Incident created successfully for "+current.caller_id.getDisplayValue();
	}

})(current, previous);

// ------------------------------------------------------------
//if we enter the worng number like charecter,spaces it will remove automatically

(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	if(current.u_phone_number){
		current.u_phone_number = current.u_phone_number.replace(/\D/g,'');
		
	}

})(current, previous);


// Q4. Stop saving if State = Resolved and Resolution Notes empty.
// Use: BEFORE UPDATE BR
// Script:
if (current.state == 6 && current.close_notes == '') {
    gs.addErrorMessage("Please enter Resolution Notes.");
    current.setAbortAction(true);
}

//When state chnages note it down in sd states that state is chnages from previous to current state
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	if(current.state.changes()){
		current.short_description = "The state chnages from"+ previous.state+"to"+ current.state;
	}

})(current, previous);

//------------------------------------------------------------

// Q5. Auto-populate "Opened by" with logged-in user.
// Use: BEFORE INSERT BR
Script:
current.opened_by = gs.getUserID();

//Output: Opened by field shows the logged-in user automatically.

//------------------------------------------------------------

// Q6. If Category = Software, set Assignment Group = Software Support.
// Use: BEFORE INSERT/UPDATE BR
// Script:
if (current.category == 'software') {
    current.assignment_group = 'SOFTWARE_SUPPORT_SYS_ID';
}

//------------------------------------------------------------

// Q7. Automatically create a Change Task after creating a Change Request.
// Use: AFTER INSERT BR (to create related records)
// Script:

// Current Incident:

// Number = INC001000

// Sys_id = abc123

//You create a new related incident:
var task = new GlideRecord('change_task');
task.initialize();
task.change_request = current.sys_id;
task.short_description = "Initial Review";
task.insert();


// INC001001 is a child
// 👉 INC001000 is the parent
// ------------------------------------------------------------

//Async when incidnet created trigger email in the bakgroundd
//gs.eventQueue(event_name, record, parm1, parm2);

(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	gs.eventQueue('incident.updated',current,previous.priority,current.priority);

})(current, previous);


// Without passing current, the event would have NO idea:
// Which incident was updated
// What fields it has
// Who to send to
// So current is required so the event knows which record triggered the event.

//after ths need to create the eventregistrty and notification

// Q8. Send notification only when Assignment Group changes.
// Use: AFTER UPDATE BR + Event
// Script:
if (current.assignment_group.changes()) {
    gs.eventQueue("assignment.group.changed", current, current.assignment_group, previous.assignment_group);
}

if (current.assignment_group.changes()) {
gs.eventQueue(
    'incident.assignment.changed',
    current,
    previous.assignment_group,
    current.assignment_group
);
}

// Notification: Trigger on event "assignment.group.changed".

// ------------------------------------------------------------

// BEFORE vs AFTER (Easy Explanation):
// Before Update → modify current record, validate, stop save.
// After Update → cannot modify current record, but can update related records, send notifications, fire events.

// ===========================
// END OF BUSINESS RULE SET
// ===========================

// BEFORE Business Rule — When to use?
// Runs BEFORE the record is saved to the database.
// Use BEFORE when:

// ✔ You want to set or modify field values
// ✔ You want to validate data
// ✔ You want to stop the save (addErrorMessage)
// ✔ You DO NOT want to use update()
// ✔ You want to make sure logic happens before insert/update happens

// Examples:

// Auto-assign group
// Auto-fill short description
// Enforce rules (priority cannot downgrade)
// Clean phone numbers
// Validate mandatory fields
// Key idea:

// 🟩 BEFORE = Prepare the record before saving.
// No update() required.

// ✅ AFTER Business Rule — When to use?
// Runs AFTER the record is saved in the database.
// Use AFTER when:

// ✔ You want to create another record
// ✔ You want to update a different table
// ✔ You want to send notifications or events
// ✔ You want access to the final saved sys_id
// ✔ You want to run logic that should not affect user performance

// Examples:

// Create change task after change request saved

// Update parent problem record

// Insert audit/log record

// Trigger event for notification

// Write to activity/work notes

// Key idea:

// 🟧 AFTER = Perform actions that depend on the record already being saved.
// You can safely use update(), insert(), eventQueue(), etc.

// ⭐ SIMPLE REAL-WORLD UNDERSTANDING
// User clicks Save/Update
// Step 1 → BEFORE BR

// 🟩 Prepare the record
// 🟩 Set values
// 🟩 Validate
// 🟩 Stop save if needed
// (Record NOT saved yet)

// Step 2 → Record is saved
// Step 3 → AFTER BR

// 🟧 Now you can:

// Create related records

// Update other tables

// Send events/notifications

// (Record is already saved)

// 🚀 SUPER SIMPLE FORMULA
// If you are modifying the same record → BEFORE BR
// If you are modifying a different record/table → AFTER BR