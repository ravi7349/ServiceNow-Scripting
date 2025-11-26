// GlideRecord Challenges
// 1. Find High-Priority Open Incidents
// Challenge:
// Write a GlideRecord query to find all incidents where:
// priority = 1
// state is not "Closed" (7)
// Assigned to someone (i.e. assigned_to is not empty)
// Bonus: Print the short description and the assigned_to user’s name.

var ga = new GlideRecord('incident');
ga.addQuery('priority',1);
ga.addQuery('state','!=','7');
ga.addNotNullQuery('assigned_to');
ga.query();
while(ga.next()){

	gs.info(ga.number+' '+ga.short_description);

	
}


// 2. Recently Updated Records
// Challenge:
// Query the incident table for records updated in the last 24 hours.
// Hint: Use gs.daysAgoStart(1) or gs.nowDateTime() to compare timestamps.

var ga = new GlideRecord('incident');
ga.addQuery('sys_updated_on','>=',gs.daysAgoStart(1));
ga.query();
while(ga.next()){
	gs.info(ga.number);
}


// 3. Tickets Without a Caller
// Challenge:
// Return all incidents that have a null or empty caller_id field.
// Then, print how many such records exist.


var ga = new GlideRecord('incident');
ga.addNullQuery('caller_id');
ga.query();
var count = 0;
while(ga.next()){

	count++;


}
gs.print("Total Number of incidents are"+   count);

var ga = new GlideRecord('incident');
ga.addQuery('state',1);
ga.query();
var count = 0;
while(ga.next()){

	count++;
	
}
gs.print("No of incidents are" + count);

// 4. Related Records Challenge
// Challenge:
// Find all incidents where the caller_id's department name is "IT".
// (Hint: use incident.caller_id.department.name

var gr = new GlideRecord('incident');
gr.addQuery('caller_id.department.name','IT');
gr.query();
while(gr.next()){
	gs.info(gr.number);
}


// 5. Escalation Needed
// Challenge:
// Find all incidents with:
// priority = 1 or 2
// state not in (6, 7)
// Created more than 3 days ago
// Then log their number, priority, and sys_created_on.

var gr = new GlideRecord('incident');
var qc = gr.addQuery('priority',1);
qc.addOrCondition('priority',2);
gr.addQuery('state','!=',7);
gr.addQuery('state','!=',6);
gr.addQuery('sys_created_on','<',gs.daysAgoStart(3));
gr.query();
while(gr.next()){
	gs.print(gr.number);
}

// . Subquery Challenge
// Challenge:
// Find all incidents where the caller_id is also the opened_by.
// (Hint: use addQuery('caller_id', '=', 'opened_by') won’t work directly — you’ll need to loop or use GlideAggregate.)

var gr = new GlideRecord('incident');
gr.query();
while(gr.next()){
	if(gr.caller_id==gr.opened_by){
		gs.info(gr.number);
	}
}


// GlideAggregate Challenges
// 7. Count Open Incidents by Priority
// Challenge:
// Use GlideAggregate to count the number of open incidents (state != 7) grouped by priority.
// Print output like:
// Priority 1: 5
// Priority 2: 23
var gr = new GlideAggregate('incident');
gr.addQuery('state','!=',7);
gr.addAggregate('COUNT');
gr.groupBy('priority');
while(gr.next()){
	var priority  = gr.getValue('priority');
	var count = gr.getAggregate('COUNT');
	gs.info('Priority'+ priority+ ';' +count);
	
}

// 8. Average Time to Resolve
// Challenge:
// Use GlideAggregate on the incident table to find the average business_duration for resolved incidents.
gs.print('Hello');
var ga  = new GlideAggregate('incident');
ga.addQuery('state',2);
ga.addAggregate('AVG','business_duration');
ga.query();
while(ga.next()){
	var gaa = ga.getAggregate('AVG','business_duration');
	gs.print('The number of incidents are '+ gaa);
}
gs.print('Reolved');





// 9. Count of Incidents Per Assignment Group
// Challenge:
// Use GlideAggregate to count how many incidents each assignment group currently has open.
// Only include groups with more than 10 open incidents.
while (ga.next()) {
    var count = ga.getAggregate('COUNT');
    if (count > 10) {
        gs.info('Group: ' + ga.assignment_group.getDisplayValue() + ' | Count: ' + count);
    }
}

// 10. Most Active Caller
// Challenge:
// Find the caller who has opened the most incidents in the past 30 days.
// Print their name and total count.
var ga  = new GlideAggregate('incident');
ga.addQuery('sys_created_on','>',gs.daysAgoStart(30));
ga.addAggregate('COUNT');
ga.groupBy('caller_id');
ga.query();
var topcaller = '';
var topcount = 0;
while(ga.next()){
	var count = ga.getAggregate('COUNT');
	var name = ga.caller_id.getDisplayValue();

	if(count>topcount){
		topcount =count;
		topcaller = name;
	}
}
gs.info(topcaller +' '+ topcount);

