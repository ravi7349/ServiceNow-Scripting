//to get the data in json object i mean key value pair
var gr = new GlideRecord('incident');
gr.query();

while (gr.next()) {

    var obj = {
        number: gr.number.toString(),
        caller: gr.caller_id.getDisplayValue(),
        state: gr.state.toString(),
        short_description: gr.short_description.toString(),
        description: gr.description.toString()
    };

    gs.print(JSON.stringify(obj));
}

//10.Script:-display last 5 days records .afrer every 3 records create one problem record..?
var gr = new GlideAggregate('incident');
gr.addQuery('sys_created_on','>=',gs.daysAgoStart(5));
gr.orderBy('sys_created_on');
gr.query();
var counter = 0;
while(gr.next()){
	counter++;
	gs.info(gr.number);
	if(counter%3==0){
		var pr = new GlideRecord('problem');
		pr.initialize();
		pr.short_description = "Incident Number"+gr.number;
		var sysid = pr.insert();
		gs.info(sysid);

	}


}
