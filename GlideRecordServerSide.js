// ------------------------------
// 1️⃣ PRINTING & SIMPLE ADDITION
// ------------------------------
gs.print("Hello world"); 

var a = 10;
var b = 20;
var c = a + b; // adds two numbers
gs.print(c);   // prints the sum in system logs


// -----------------------------------
// 2️⃣ FETCHING ALL ACTIVE INCIDENTS
// -----------------------------------
var inc = new GlideRecord('incident'); // open incident table
inc.addActiveQuery(); // filter only active = true
inc.query(); // run the query
while (inc.next()) { // loop through each record
    gs.print(inc.number); // print the incident number
}


// --------------------------------------
// 3️⃣ FETCHING ALL INACTIVE INCIDENTS
// --------------------------------------
var v1 = new GlideRecord('incident'); // open incident table
v1.addInactiveQuery(); // filter only inactive = true
v1.query(); // run the query
while (v1.next()) { // loop through each record
    gs.print(v1.number); // print the incident number
}


// -----------------------------------
// 4️⃣ FILTERING USING addQuery()
// -----------------------------------
var inc = new GlideRecord('incident'); // open incident table
inc.addQuery('category', 'network'); // filter category = network
inc.addQuery('priority'); // ensure priority field is not empty
inc.addQuery('active', true); // filter active incidents
inc.query(); // run the query
while (inc.next()) { // loop through results
    gs.print(inc.number); // print each matching incident
}

var inc = new GlideRecord('incident');
inc.addQuery('category','network');
inc.addQuery('priority');
inc.addQuery('active',true);
inc.query();
while(inc.next()){
    gs.print(inc.number);
}


// -----------------------------------
// 5️⃣ FILTERING USING ENCODED QUERY
// -----------------------------------
var inc = new GlideRecord('incident'); // open incident table
// combine multiple conditions in one line using ^
inc.addEncodedQuery('active=true^category=network^priority=1');
inc.query(); // run the query
while (inc.next()) {
    gs.print(inc.number); // print the matching incident numbers
}


// ----------------------------------------------
// 6️⃣ GETTING LATEST 5 HIGH-PRIORITY INCIDENTS
// ----------------------------------------------
var inc = new GlideRecord('incident'); // open incident table
inc.addQuery('priority', 1); // filter only high-priority incidents
inc.orderByDesc('sys_created_on'); // sort by newest created first
inc.setLimit(5); // limit to top 5 results
inc.query(); // run the query
while (inc.next()) {
    gs.print(inc.number); // print the incident numbers
}


// ou need to fetch all incidents created in the last 7 days that are still active, and print their number and short description.

// 🧠 Hint: You’ll need to compare sys_created_on date using gs.daysAgo() or gs.nowDateTime() with addQuery().

var inc = new GlideRecord('incident');
inc.addQuery('active', true);
inc.addQuery('sys_created_on', '>=', gs.daysAgoStart(7)); // last 7 days
inc.query();
while (inc.next()) {
    gs.print(inc.number + " - " + inc.short_description);
}
// ----------------------------------------------


// Fetch all resolved incidents (state = 6) whose priority is either 1 or 2,
// and print their number, priority, and resolved_by fields.

var inc = new GlideRecord('incident');
var q = inc.addQuery('state',6);
q.addorcondition('priority',1);
q.addorcondition('priority',2);
inc.query();
while(inc.next()){
    gs.print(inc.number + " | Priority: " + inc.priority + " | Resolved By: " + inc.resolved_by);   
}



// You need to fetch all incidents assigned to the “Network Support” group
// and created today, then print the incident number, assignment group name, and created time.

// 🧠 Hint: You’ll use gs.beginningOfToday() and gs.endOfToday() for the date filter.

var inc = new GlideRecord('incident');
inc.addQuery('Assignment_group.name','Network_Support');
inc.addQuery('sys_created_on', '>=',gs.beginningofToday());
inc.query();
while(inc.next()){
    gs.print(gs.number+" "+gs.assignment_group.name+" "+Created_time);
}


// You need to find all incidents created more than 30 days ago (older ones)
// and set them as inactive (active = false).

var inc = new GlideRecord('incident');
inc.addQuery('sys_created_on', '<', gs.daysAgoStart(30));
inc.query();
while(inc.next()){
    inc.setvalue('active',false);
    inc.update();
    gs.print(inc.number());
}


//You need to delete all incidents where the short_description field is empty or null.


var inc = new GlideRecord('incident');
inc.addNullQuery('short_description'); // find records with empty short description
inc.query();

while (inc.next()) {
    gs.print("Deleting Incident: " + inc.number);
    inc.deleteRecord(); // delete the record
}



// Question 6: Fetch incidents where caller is VIP next?

var inc = new GlideRecord('incident');
inc.query();
while(inc.next()){
    if(inc.caller_id.vip==true){
        gs.print(inc.number)
    }
}

// Question 7:

// Write a script to fetch all incidents that are not assigned to any user
// (that means the field assigned_to is empty or null).

// Print their incident number and short description.

var inc = new GlideRecord('incident');
inc.addNullQuery('assigned_to');
inc.query();
while(inc.next()){
    gs.print(inc.number);
}

var userId = this.getparameter('sysparm_user');
var user = new GlideRecord('sys_user');
user.get(userId);
if(user.manager){
    returnuser.manager;
}
else{
    return 'No mamager ssigned';
}

var ga = new GlideRecord('Getmanager');
gs.addparam('sysparam','sys_user');
ga.addparam('sysparam',newvalue)
ga.addXmlanswer(function(response){
    gs.print(response)
})
)