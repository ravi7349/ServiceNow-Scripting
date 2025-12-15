//16. Fetch incidents where short description contains the word “Error”.
var gr = new GlideRecord('incident');
gr.addQuery('short_description','CONTAINS','ERROR');
gr.query();
while(gr.next()){
	gs.info(gr.number+"---"+gr.short_description);
}

//create problem incident along with 3 problem takss

var gr = new GlideRecord('incident');
gr.initialize();
gr.short_description = "Parent problem incident";
var problemId = gr.insert();

if(problemId){
	for(i = 0;i<3;i++){
		var wr = new GlideRecord('problem_task');
	wr.initialize();
	wr.short_description = "Child "+i;
	var sys_id = wr.insert();
	gs.info("created succufu;;y"+ wr.number);
	}
}

var gr = new GlideRecord('incident');
gr.addQuery('assignment_group.name','STARTSWITH','Service');
gr.query();
while(gr.next()){
	gs.info(gr.number+"---"+gr.assignment_group.getDisplayValue());
}