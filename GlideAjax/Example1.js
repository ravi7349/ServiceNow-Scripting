// Scenario 1 — Get Manager Name of Logged-in User

// 🧩 Question (interview-style):

// In ServiceNow, when a user opens the Incident form, we want to automatically show the logged-in user’s Manager name in an info message.

// How can you do this using GlideAjax?


// Step 1: Script Include

// Name: UserDetailsUtil
// Client Callable: ✅ Yes

var UserDetailsUtil = Class.create();
UserDetailsUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getManagerName: function() {
        var userId = gs.getUserID();  // get current logged-in user
        var user = new GlideRecord('sys_user');
        user.get(userId);

        if (user.manager)
            return user.manager.getDisplayValue(); // return manager name
        else
            return 'No manager assigned';
    }

});

//✅ Step 2: Client Script

//Type: onLoad
//Table: Incident

function onLoad() {
    var ga = new GlideAjax('UserDetailsUtil'); // Script Include name
    ga.addParam('sysparm_name', 'getManagerName'); // function name
    ga.getXMLAnswer(function(answer) {
        g_form.addInfoMessage('Your Manager: ' + answer);
    });
}