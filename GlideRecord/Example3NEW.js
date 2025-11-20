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