// INCIDENT MODULE
// ✅ Example 1: Parent Incident → Child Incidents (same table)

// Child incidents use the field: parent_incident

// Use case: When parent incident short description changes → update all child incidents.

var child = new GlideRecord('incident');
child.addQuery('parent_incident', current.sys_id);
child.query();

while (child.next()) {
    child.short_description = current.short_description;
    child.update();
}

//  Example 2: Incident → Incident Tasks (task table = incident_task)

// Child task table: incident_task
// Relationship field: incident

// Use case: When Incident priority changes → update all incident tasks.

(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var gr = new GlideRecord('incident_task');
	gr.addQuery('universal_request',current.sys_id);
	gr.query();
	while(gr.next()){
		gr.short_description = current.short_description;
		gr.update();
	}

})(current, previous);

// 🟩 PROBLEM MODULE
// ✅ Example 1: Parent Problem → Child Problems (same table)

// Child field: parent (or parent_problem depending on instance)

// Use case: Update child problem priority.

// var child = new GlideRecord('problem');
// child.addQuery('parent', current.sys_id);
// child.query();

// while (child.next()) {
//     child.priority = current.priority;
//     child.update();
// }

// ✅ Example 2: Problem → Problem Tasks (task table = problem_task)

// Child table: problem_task
// Relationship field: problem

// Use case: When Problem short description changes → update all problem tasks.

var pt = new GlideRecord('problem_task');
pt.addQuery('problem', current.sys_id);
pt.query();

while (pt.next()) {
    pt.short_description = current.short_description;
    pt.update();
}

// 🟥 CHANGE MODULE
// ✅ Example 1: Parent Change Request → Child Change Requests (same table)

// Child field: parent or parent_change_request

// Use case: Update all child changes when parent description changes.

// var child = new GlideRecord('change_request');
// child.addQuery('parent', current.sys_id);
// child.query();

// while (child.next()) {
//     child.short_description = current.short_description;
//     child.update();
// }

// ✅ Example 2: Change Request → Change Tasks (task table = change_task)

// Child table: change_task
// Relationship field: change_request

// Use case: Update all change tasks when change request priority changes.

var ct = new GlideRecord('change_task');
ct.addQuery('change_request', current.sys_id);
ct.query();

while (ct.next()) {
    ct.priority = current.priority;
    ct.update();
}
// to create the incident in task table
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var task = new GlideRecord('change_task');
	task.initialize();
	task.short_description = "The Automated task for this" + current.number;
	task.change_request = current.sys_id;
	task.insert();

})(current, previous);


//when child incident SD changes parent shortDescription sholid changes
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var parent = current.parent_incident.getValue();
	if(parent){
		var gr = new GlideRecord('incident');
		gr.addQuery('sys_id',parent);
		gr.query();
		while(gr.next()){
			gr.short_description = current.short_description;
			gr.update();
		}
	}

})(current, previous);