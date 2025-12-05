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
var gr = new  ('incident');
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

//6.Get the record from the api and store the getting record to another api 
//using background script and show the successful msg in background script .

var restmessage  = new sn_ws.RESTMessageV2();
restmessage.setEndpoint('https://jsonplaceholder.typicode.com/posts');
restmessage.setHttpMethod('get');
var response = restmessage.execute();
var responseBody = response.getBody();
//gs.info(responseBody);

var restmessage2 = new sn_ws.RESTMessageV2();
restmessage2.setEndpoint('https://jsonplaceholder.typicode.com/posts');
restmessage2.setHttpMethod('post');
restmessage2.setRequestBody(responseBody);
var responsePost = restmessage2.execute();
var responseBodyPost = responsePost.getBody();
var statuscode = responsePost.getStatusCode();
if(statuscode==200||statuscode==201){
	gs.info("sent succusfullly");
}
else{
	gs.info("failed"+ statuscode);
}
gs.info(statuscode);

// to get the Work NOtes of incident
var gr = new GlideRecord('incident');
gr.addQuery('number','INC0015391');
gr.query();
while(gr.next()){
	var wr = new GlideRecord('sys_journal_field');
	wr.addQuery('element_id',gr.sys_id);
	wr.addQuery('element','work_notes');
	wr.orderBy('sys_created_on');
	wr.query();
	while(wr.next()){
		gs.print(wr.sys_created_on +"-----"+ wr.value);
	}
}

//how many incidnets are there in partivular assigment group

var gr = new GlideRecord('sys_user_group');
gr.addQuery('name', 'Hardware');
gr.query();
while (gr.next()) {
    var wr = new GlideRecord('incident');
    wr.addQuery('assignment_group', gr.sys_id);
    wr.query();
    while(wr.next()){
		gs.info(wr.number);
	}
}
//or 

var gr  = new GlideRecord('incident');
gr.addQuery('assignment_group.name','HardWare');
gr.query();
while(gr.next()){
	gs.info(gr.number);
}


// to count the number of incident in particular user
var gr = new GlideRecord('sys_user');
gr.addQuery('name', 'ITIL User');
gr.query();
if (gr.next()) {
	var wr = new GlideRecord('incident');
	wr.addQuery('assigned_to',gr.sys_id);
	wr.query();
	while(wr.next()){
		gs.info(wr.number);
	} 
}

// to get no of incidents in assigned to user
var gr = new GlideRecord('incident');
gr.addQuery('assigned_to.name','ITIL User');
gr.query();
while(gr.next()){
	gs.info(gr.number);
}

//DIff bw two times

var time1 = new GlideDateTime("2025-01-01 10:30:00");
var time2 = new GlideDateTime("2025-01-01 15:34:30");
var dif = GlideTime.subtract(time1,time2);
gs.print(dif.getDisplayValue());
