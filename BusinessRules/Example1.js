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