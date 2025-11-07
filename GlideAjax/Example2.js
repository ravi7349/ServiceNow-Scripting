
// You are working on the Incident form.
// When the user selects a Caller (field: caller_id), you need to display the manager name of that caller in an info message on the form.
// 👉 Hint:
// 	• You can’t access another table’s data directly from the client script.
// 	• You need to use GlideAjax and Script Include for this.
// Your task:
// 	1. Create a Script Include that gets the manager’s name of a given user.
// 	2. Create a Client Script (onChange of caller_id) that calls that Script Include using GlideAjax and displays the manager name.

const { use } = require("react");

var GetManagerName = Class.create();
GetManagerName.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getManager: function() {
        var userId = this.getParameter('sysparm_user');  // get user ID from client
        var user = new GlideRecord('sys_user');
        user.get(userId);

        if (user.manager)
            return user.manager.name;   // return manager name
        else
            return 'No manager found';
    }

});
// 🧠 Simple explanation:
// Name of Script Include → GetManagerName

// Function → getManager()

// It takes a user ID from the client side (sysparm_user).

// It looks for that user in the sys_user table.

// If that user has a manager → returns the manager’s name.

// If not → returns “No manager found”.

// ✅ Don’t forget:

// Check the box Client Callable = true while creating this Script Include.

// Now that this part is done,
// 👉 shall I give you the client script that calls this using GlideAjax (the easy version)?







// You said:
// now gowith clientscript



// ChatGPT said:
// Awesome 🔥 Ravi! Let’s now go with the Client Script (easy version) — this will call the Script Include using GlideAjax and show the manager name.

// 💻 Client Script (onChange on Caller field)
// Go to Incident → Client Scripts → New
// and use this code 👇

// javascript
// Copy code
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    // Create GlideAjax object
    var ga = new GlideAjax('GetManagerName'); // Script Include name
    ga.addParam('sysparm_name', 'getManager'); // function name in Script Include
    ga.addParam('sysparm_user', newValue);     // send caller_id value
    ga.getXMLAnswer(function(response) {
        g_form.addInfoMessage('Manager Name: ' + response);
    });
}
// 🧠 Easy Explanation:
// This runs when you change the Caller field on the form.

// It sends the selected caller’s sys_id (newValue) to the Script Include.

// The Script Include finds the manager name and returns it.

// g_form.addInfoMessage() shows it on the form.

// ✅ Steps summary:

// Create Script Include → GetManagerName (Client Callable ✅)

// Create Client Script → onChange on caller_id

// Test: Change the Caller field → you’ll see “Manager Name: ____” message.



// 1. Summary in plain English:
// 	1. sys_user → table name (used for queries)
// 	2. sys_id → unique record ID
// 	3. sysparm_ → used to send data from client script to script include
// (you can name anything after it — just match both sides!)

