// 1️⃣: Find High-Priority Open Incidents

// Question:
// Find all active incidents where:

// priority = 1

// state != 7 (not closed)

// assigned_to is not empty.
// Print short_description and assigned user’s name.

var ga = new GlideRecord('incident');
ga.addQuery('priority',1);
ga.addQuery('state','!=',7);
ga.addNotNullQuery('assigned_to');
ga.query();
while(ga.next()){
	gs.info(ga.number+" "+ga.short_description+" assigned to "+ ga.assigned_to.getDisplayValue());
}


// Question:
// Find all incidents updated in the last 24 hours and print their
// number and sys_updated_on fields.

var ga = new GlideRecord('incident');
ga.addQuery('sys_updated_on','>=',gs.daysAgoStart(1));
ga.query();
while(ga.next()){
	gs.info(ga.number+" "+ga.sys_updated_on);
}

// Question 3️⃣: Tickets Without a Caller

// Question:
// Find all incidents where the caller_id field is empty,
// and print how many such incidents exist.
var ga = new GlideAggregate('incident');
ga.addNullQuery('caller_id');
ga.addAggregate('COUNT');
ga.query();
while(ga.next()){
	var counting = ga.getAggregate('COUNT');
	gs.info(counting);
}

// Question 4️⃣: Related Record Query

// Question:
// Find all incidents where the caller’s department is "IT",
// and print the incident number and caller’s name.
var ga  = new GlideRecord('incident');
ga.addQuery('caller_id.department.name','IT');
ga.query();
while(ga.next()){
	gs.info(ga.number+" "+ ga.caller_id.getDisplayValue());
}

// Question 5️⃣: Escalation Needed

// Question:
// Find all incidents where:

// priority = 1 or 2

// state NOT IN (6,7)

// sys_created_on is more than 3 days ago

// Print:
// number, priority, and created date.
var ga  = new GlideRecord('incident');
ga.addQuery('sys_created_on','<',gs.daysAgoStart(3));
ga.addQuery('state', 'NOT IN','6,7');
ga.addQuery('priority','<=',2);
ga.query();
while(ga.next()){
	gs.info(ga.number+" "+ga.priority+" "+ga.sys_created_on);
}

// Caller is Opened By

// Question:
// Find all incidents where the caller is the same person who opened the ticket.
// Print the incident number for those records.
var ga  = new GlideRecord('incident');
ga.addQuery();
while(ga.next()){
	if(ga.caller_id==ga.opened_by){
		gs.info(ga.number);
	}
}


// Question 7️⃣: Count Open Incidents by Priority

// Question:
// Count all open incidents (where state != 7)
// and group them by priority,
// then print each priority and its total count.

var ga = new GlideAggregate('incident');
ga.addQuery('state','!=',7);
ga.groupBy('priority');
ga.addAggregate('COUNT');
ga.query();
while(ga.next()){
	var counting = ga.getAggregate('COUNT');
	gs.info(ga.priority+"        "+ counting);
}


// Question:
// Find the average resolution time (in business_duration) for all incidents
// where the state = 6 (Resolved).
// Print the average time.

var ga = new GlideAggregate('incident');
ga.addQuery('state',6);
ga.addAggregate('AVG','business_duration');
ga.query();
while(ga.next()){
	var counting = ga.getAggregate('AVG','business_duration');
	gs.info(counting);
}

// Question:
// Find all open incidents (state != 7)
// and count how many belong to each assignment group.
// Only print the groups that have more than 10 incidents.
var gr = new GlideAggregate('incident');
gr.addQuery('state','!=',7);
gr.groupBy('assignment_group');
gr.addAggregate('COUNT');
gr.query();
while(gr.next()){
	var counting  = gr.getAggregate('COUNT');
	if(counting>10){
		gs.info(gr.assignment_group.getDisplayValue());
	}
}


// Question:
// Count how many Task SLAs have been breached and how many have not been breached.
// Print the breach status and the count.

// 🧩 Hint:

// Use the task_sla table.

// The field has_breached is a boolean (true/false).

// Use groupBy('has_breached') and COUNT.
var ga = new GlideAggregate('task_sla');
ga.groupBy('has_breached');
ga.addAggregate('COUNT');
ga.query();
while(ga.next()){
	var counting = ga.getAggregate('COUNT');
	gs.info(ga.has_breached+"  "+  counting );
}

// Question 12️⃣: Multi-Aggregate — Total, Oldest, Newest
// Question:
// From the incident table, find:
// Total number of incidents
// The oldest (minimum) created date
// The newest (maximum) created date
// Print all three values.

var ga = new GlideAggregate('incident');
ga.groupBy('priority');

ga.addAggregate('COUNT');
ga.addAggregate('MIN','sys_created_on');
ga.addAggregate('MAX','sys_created_on');
ga.query();
while(ga.next()){
	var total = ga.getAggregate('COUNT');
	var oldest = ga.getAggregate('MIN','sys_created_on');
	var newest = ga.getAggregate('MAX','sys_created_on');
	gs.info("Total incidents"+ total);
	gs.info("Oldest incident"+ oldest);
	gs.info("Newest incident created"+ newest);
}

// Find all open incidents (state != 7) and group them by assignment group.
// For each group, calculate:

// The total number of open incidents

// The average priority

// Print only the groups where the average priority ≤ 2 (high or critical

var ga  = new GlideAggregate('incident');
ga.addQuery('state','!=',7);
ga.groupBy('assignment_group');
ga.addAggregate('COUNT');
ga.addAggregate('AVG','priority');
ga.query();
while(ga.next()){
	var counting = ga.getAggregate('COUNT');
	var avgpriority = ga.getAggregate('AVG','priority');
	if(avgpriority<=2){
		gs.info(ga.assignment_group.getDisplayValue() + counting+ avgpriority);
	}
}


// 1️⃣ It looks at the Incident table.
// 2️⃣ It joins it with the User table (sys_user) using the caller_id field (the user who created the incident).
// 3️⃣ It filters — only take incidents where the caller’s department is IT.
// 4️⃣ It shows the incident number and caller name for those incidents.
var ga = new GlideRecord('incident');
var joinuser = ga.addJoinQuery('sys_user','caller_id','sys_id');
joinuser.addOrCondition('department.name',	'IT');
ga.query();
while(ga.next()){
	gs.info(ga.number+" "+ ga.caller_id.getDisplayValue());
}

// 6. Find All Incidents Created by VIP Users
var gr = new GlideRecord('incident');
gr.addQuery('caller_id.vip',true);
gr.query();
while(gr.next()){
	gs.info(gr.number);
}

// 7. Get Users Who Logged in Last 7 Days
var ga = new GlideRecord('sys_user');
ga.addQuery('last_login_time','>=',gs.daysAgoStart(7));
ga.query();
while(ga.next()){
	gs.info(ga.name);
}

// 8. Retrieve Open Tasks Older Than 10 Days
var ga = new GlideRecord('task');
ga.addActiveQuery();
ga.addQuery('sys_created_on','<',gs.daysAgoStart(10));
ga.query();
while(ga.next()){
	gs.info(ga.number);
}

// 9. Get Change Requests with 'Risk' = 'High' and State = 'Scheduled'
var ga = new GlideRecord('change_request');
ga.addQuery('risk','High');
ga.addQuery('state',4);
ga.query();
while(ga.next()){
	gs.info(ga.number);
}
