// # Business Rules:
// 1. Write a business rule script to change the Work Notes of the children of an Incident when the
// parent incident Work Notes change.
//After Update

if(current.work_notes.changes()){
	var child = new GlideRecord('incident');
	child.addQuery('parent_incident',current.sys_id);
	child.query();
	while(child.next()){
		child.work_notes.setJournalEntry(current.work_notes);

		
        
	}
}
// 3. Whenever a new Incident is created, the system should automatically create two child
// incidents linked to it.

if (!current.parent_incident) {
    var child = new GlideRecord('incident');
    child.parent_incident = current.sys_id;
    child.short_description = current.short_description + "( Descriptionn)";
    child.insert();
}


(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	for( var i = 1;i<=3;i++){
		if(!current.parent_incident){
		var child = new GlideRecord('incident');
		child.initialize();
		child.parent_incident = current.sys_id;
		child.short_description = current.short_description+ "-child"+i;
		child.insert();
	}
	}

})(current, previous);


Scenario:

// You want to display a message when Priority becomes P1.

// ❌ Wrong Business Rule:
if (current.priority == 1) {
    gs.addInfoMessage("P1 ticket");  
    current.update();   // ❌ this is the problem
}
if(current.priority==1){
	gs.addInfoMessage("hllo there");
	current.update();
}

// What will happen?
// User updates the record
// BR runs → message displayed → update() is called
// update() saves the record again → BR runs again
// BR runs again → message again → update() again
// This becomes infinite loop

// if the priority chnages to 1 set assignement group
(function executeRule(current, previous /*null when async*/) {

	if(current.priority.changesTo('1')){
		current.assignment_group = '019ad92ec7230010393d265c95c260dd';
	}

})(current, previous);