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
