// On demand//classless script inclde
//COntains only one function
// name of the function must macth the script incude name
//can be called form anyserver side scripting
//cant be callled from client side


// Use case

// When you update incident work notes, then it should also update the same work notes for the associate problem record.
// (Using Classless/on demand Script include)


function UpdateWorkNotesOndemand(problemId,worknotes){
	var gr = new GlideRecord('problem');
	gr.addquery('sys_id',problemId);
	gr.query();
		if(gr.next()){
			gr.work_notes = worknotes;
			gr.update();
		}

}


//Business rulee

(function executeRule(current, previous /*null when async*/) {

	var worknotes = current.work_notes.getJournalEntry(-1);
	updateWorkNotes(current.problem_id,worknotes);

})(current, previous);