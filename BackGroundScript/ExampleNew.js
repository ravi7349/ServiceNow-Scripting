//to get caller_id as vip and group by
var gr = new GlideAggregate('incident');
gr.addQuery('caller_id.vip',true);
gr.groupBy('caller_id');
gr.addAggregate('count');
gr.query();

while(gr.next()){

	var count = gr.getAggregate('count');
	gs.info(gr.caller_id.getDisplayValue()+"--"+count);
}

//calcualte how manys days to bw the new state and close state


var gr = new GlideRecord('incident');
gr.addQuery('number','INC0000017');
gr.query();
while(gr.next()){
	var createon = new GlideDateTime(gr.opened_at);
	var closeon = new GlideDateTime(gr.closed_at);
	var durationtime = GlideDateTime.subtract(createon,closeon);
	
	var days = durationtime.getDayPart();
	gs.info(gr.number+"---"+ days);

}

//or


var gr = new GlideRecord('incident');
gr.addQuery('sys_id','46e482d9a9fe198101d3e3f3e2a14459');
gr.query();
while(gr.next()){
	var created = new GlideDateTime(gr.sys_created_on);
	var close = new GlideDateTime(gr.closed_at);
	var diff = GlideDateTime.subtract(created,close);
	gs.info(diff.getDisplayValue());
}
