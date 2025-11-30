// 1. Use GlideRecord to insert a new record in the alm_asset table with fields: name, 
// asset tag, model category, and assigned user. Fields to Populate: 
// a. name: Lenovo ThinkPad T14 Gen 2 
// b. model_category: Hardware 
// c. asset_tag: LTP-T14-001 
// d. assigned_to: Current logged-in user 
// e. manufacturer: Lenovo 
// f. location: San Diego Office (Use Display Value) 
// g. install_date: Current date/time 
// h. comments: New laptop assigned to employee
var gr = new GlideRecord('alm_asset');
gr.newRecord();
gr.display_name = 'Lenovo ThinkPad T14 Gen 2';
gr.model_category = 'Hardware';
gr.asset_tag='LTP-T14-001 ';
gr.assigned_to = gs.getUserID();
gr.model = 'Lenovo';
gr.location = 'san-diego';
gr.install_date = new GlideDateTime();
gr.comments = 'New laptop assigned to employee ';
var sys_id = gr.insert();
gs.info('Asset created'+ sys_id);

// 2. Retrieve all active incidents assigned to the currently logged-in user and print their 
// number and short description.
var gr = new GlideRecord('incident');

gr.addActiveQuery();
gr.addQuery('assigned_to',gs.getUserID());
gr.query();
while(gr.next()){
	gs.info(gr.number+"   "+gr.short_description);
}


// 3. Retrieve all active incidents created by the currently logged-in user and print their 
// number and short description.
var gr = new GlideRecord('incident');

gr.addActiveQuery();
gr.addQuery('sys_created_by',gs.getUserID());
gr.query();
while(gr.next()){
	gs.info(gr.number+"   "+gr.short_description);
}


// 4. Retrieve all active incidents created by Abel Tuter and print their number and short 
// description.
var gr = new GlideRecord('incident');
gr.addActiveQuery();
gr.addQuery('sys_created_by','abel.tuter');
gr.query();
while(gr.next()){
	gs.info(gr.number+"      "+gr.short_description);
}

// 5. Retrieve all active incidents assigned to Service Desk group and print their number 
// and short description. 

//  Retrieve all active incidents assigned to Service Desk group and print their number 
// and short description.
var gr = new GlideRecord('incident');
gr.addActiveQuery();
gr.addQuery('assignment_group.name', 'Service Desk');  // dot-walk
gr.query();

while (gr.next()) {
    gs.info(gr.number + " | " + gr.short_description);
}



// 6. Find all Priority 1 incidents and change their priority to 2, then update the record.
var gr = new GlideRecord('incident');
gr.addQuery('priority',1);
gr.query();
while(gr.next()){
	gr.setValue('impact',1);
	gr.setValue('urgency',2);
	gr.update();
	gs.info('Updated succefully');
}

// Fetch all incidents that are either assigned to the current user or created by them 
// and print Number and Short Description 


var ga  = new GlideRecord('incident');
ga.addQuery('assigned_to',gs.getUserID()).addOrCondition('sys_created_by',gs.getUserName());

ga.query();
while(ga.next()){
	gs.info(ga.number+"  "+ga.short_description);
}
// 9. Close all incidents older than 30 days with priority 4 and update the close notes.
var ga  = new GlideRecord('incident');
ga.addActiveQuery();
ga.addQuery('sys_created_on','<=',gs.daysAgoStart(30));
ga.query();
while(ga.next()){
	ga.state = 7;
	ga.close_notes = "Hello worlddd";
	ga.update();
	gs.info("Created succufully");
}

// 9. Close all incidents older than 30 days with priority 4 and update the close notes.
var ga  = new GlideRecord('incident');
ga.addActiveQuery();
ga.addQuery('sys_created_on','<=',gs.daysAgoStart(30));
ga.addQuery('priority',4);
ga.query();
while(ga.next()){
	ga.state = 7;
	ga.close_notes = "Hello worlddd";
	ga.update();
	gs.info("Created succufully");
}


// 1. Get Active Incidents Assigned to a Specific Group
var ga  = new GlideRecord('incident');
ga.addActiveQuery();
ga.addQuery('assignment_group.name','Network');
ga.query();
var ga1 = ga.getRowCount();
gs.info("No of incidnets are"+ ga1);


while(ga.next()){
	gs.info(ga.number+"   "+ ga.short_description);
	
}
// assignment_group.name        → Get the Assignment Group's Name
// assignment_group.manager     → Get the Manager of that group

// caller_id.name               → Get the Caller’s Name
// caller_id.email              → Get the Caller’s Email
// caller_id.phone              → Get the Caller’s Phone

// assigned_to.name             → Get the Assignee’s Name
// assigned_to.email            → Get the Assignee’s Email
// assigned_to.department       → Get the Assignee's Department

// location.city                → Get the City of the Location
// location.country             → Get the Country of the Location

// u_requested_for.name         → Get Requested For person's Name
// u_requested_for.email        → Get Requested For person's Email

// opened_by.name               → Get the user who opened the record
// opened_by.company            → Get that user’s Company

// category.manager             → Get the manager of the selected Category


// 2. Find Users Without an Email Address
var ga = new GlideRecord('incident');
ga.addNullQuery('caller_id.email');


ga.query();
var ga1 = ga.getRowCount();
gs.print(ga1);
while(ga.next()){
	gs.info(ga.number);
}
// FINAL SIMPLE FORMULA
// 🔵 Use >= when requirement says "LAST", "FROM", "SINCE"(LFS)
// 🔴 Use < when requirement says "OLDER THAN", "BEFORE", "PAST"
// 3. Get All Changes in the Last 30 Days
var ga = new GlideRecord('change_request');
ga.addQuery('sys_updated_on','>=',gs.daysAgoStart(30));
ga.query();
while(ga.next()){
	gs.info(ga.number);
}

// 4. List All Incidents with Related Problem Records
var ga = new GlideRecord('incident');
ga.addNotNullQuery('problem_id');
ga.query();
while(ga.next()){
	gs.info(ga.number);
}

// 5. Fetch Catalog Requests with Items Costing More Than ₹10,000
var ga = new GlideRecord('sc_req_item');
ga.addQuery('price','>',10);
ga.query();
while(ga.next()){
	gs.info(ga.number);
}