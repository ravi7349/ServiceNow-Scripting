===========================
BUSINESS RULE QUESTIONS + ANSWERS (EASY)
===========================

Q1. Why should you NOT use current.update() inside a Business Rule?
A1. Because it creates an infinite loop. The BR runs → update() runs → BR runs again. This can crash the system.

------------------------------------------------------------

Q2. If Priority changes to P1, set Assignment Group = Critical Support.
Use: BEFORE UPDATE Business Rule
Script:
if (current.priority.changesTo('1')) {
    current.assignment_group = 'CRITICAL_SUPPORT_SYS_ID';
}

Reason: Before Update can change field values. After Update cannot.

------------------------------------------------------------

Q3. When Parent Incident Work Notes change, copy notes to all Child Incidents.
Use: AFTER UPDATE Business Rule (because Work Notes update after save)
Script:
if (current.work_notes.changes()) {
    var child = new GlideRecord('incident');
    child.addQuery('parent_incident', current.sys_id);
    child.query();
    while (child.next()) {
        child.work_notes = current.work_notes;
        child.update();
    }
}

------------------------------------------------------------

Q4. Stop saving if State = Resolved and Resolution Notes empty.
Use: BEFORE UPDATE BR
Script:
if (current.state == 6 && current.close_notes == '') {
    gs.addErrorMessage("Please enter Resolution Notes.");
    current.setAbortAction(true);
}

------------------------------------------------------------

Q5. Auto-populate "Opened by" with logged-in user.
Use: BEFORE INSERT BR
Script:
current.opened_by = gs.getUserID();

Output: Opened by field shows the logged-in user automatically.

------------------------------------------------------------

Q6. If Category = Software, set Assignment Group = Software Support.
Use: BEFORE INSERT/UPDATE BR
Script:
if (current.category == 'software') {
    current.assignment_group = 'SOFTWARE_SUPPORT_SYS_ID';
}

------------------------------------------------------------

Q7. Automatically create a Change Task after creating a Change Request.
Use: AFTER INSERT BR (to create related records)
Script:
var task = new GlideRecord('change_task');
task.initialize();
task.change_request = current.sys_id;
task.short_description = "Initial Review";
task.insert();

------------------------------------------------------------

Q8. Send notification only when Assignment Group changes.
Use: AFTER UPDATE BR + Event
Script:
if (current.assignment_group.changes()) {
    gs.eventQueue("assignment.group.changed", current, current.assignment_group, previous.assignment_group);
}

// Notification: Trigger on event "assignment.group.changed".

// ------------------------------------------------------------

// BEFORE vs AFTER (Easy Explanation):
// Before Update → modify current record, validate, stop save.
// After Update → cannot modify current record, but can update related records, send notifications, fire events.

// ===========================
// END OF BUSINESS RULE SET
// ===========================
