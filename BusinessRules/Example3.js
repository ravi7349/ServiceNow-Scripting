
//Display Business rules
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	g_scratchpad.name=current.caller_id.department.name;
})(current, previous);

function onLoad() {
   //Type appropriate comment here, and begin script below
   g_form.addInfoMessage(g_scratchpad.name);
   g_form.setValue('u_department',g_scratchpad.name);
   
}


// When parent sd updted it sholud update in praoble_tasl shortdescription
(function executeRule(current, previous /*null when async*/) {

		var child  = new GlideRecord('problem_task');
		child.addQuery('problem', current.sys_id);
		child.query();
		while(child.next()){
			child.short_description = current.short_description;
			child.update();
		}

})(current, previous);

//Example 1: Update all child Problem Tasks when Problem Priority changes

//Use case: If you change the priority of the parent Problem, update all child tasks.

(function executeRule(current, previous) {

    if (current.priority.changes()) {
        var task = new GlideRecord('problem_task');
        task.addQuery('problem', current.sys_id);
        task.query();

        while (task.next()) {
            task.priority = current.priority;
            task.update();
        }
    }

})(current, previous);

// ✅ Example 2: When a Problem is Closed, close all Problem Tasks
(function executeRule(current, previous) {

    if (current.state == 7) { // Closed
        var task = new GlideRecord('problem_task');
        task.addQuery('problem', current.sys_id);
        task.addQuery('state', '!=', 7);  
        task.query();

        while (task.next()) {
            task.state = 7; // Closed
            task.update();
        }
    }

})(current, previous);

// ✅ Example 3: When all child tasks are closed → close the Problem (reverse logic)

Direction: child → parent

(function executeRule(current, previous) {

    if (current.state.changes() && current.state == 7) {

        var parent = new GlideRecord('problem_task');
        parent.addQuery('problem', current.problem);
        parent.addQuery('state', '!=', 7);
        parent.query();

        // If no more open tasks
        if (!parent.hasNext()) {
            var p = new GlideRecord('problem');
            if (p.get(current.problem)) {
                p.state = 7;
                p.update();
            }
        }
    }

})(current, previous);

// ✅ Example 4: Copy Assignment Group from Problem → Problem Tasks
(function executeRule(current, previous) {

    if (current.assignment_group.changes()) {
        var t = new GlideRecord('problem_task');
        t.addQuery('problem', current.sys_id);
        t.query();

        while (t.next()) {
            t.assignment_group = current.assignment_group;
            t.update();
        }
    }

})(current, previous);

// ✅ Example 5: Add Work Note to all Child Tasks when Problem is updated
(function executeRule(current, previous) {

    var t = new GlideRecord('problem_task');
    t.addQuery('problem', current.sys_id);
    t.query();

    while (t.next()) {
        t.work_notes = "Parent Problem updated: " + current.number;
        t.update();
    }

})(current, previous);