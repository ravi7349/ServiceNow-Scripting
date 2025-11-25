//Script includee
var GetUserIncidents = Class.create();
GetUserIncidents.prototype = Object.extendsObject(AbstractAjaxProcessor, {
 
    fetchIncidents: function() {
 
        // Caller sys_id from UI
        var userSysId = this.getParameter('sysparm_user');
        if (!userSysId) {
            return "Caller is empty.";
        }
 
        // Step 1: Get caller details from current instance
        var userGR = new GlideRecord("sys_user");
        if (!userGR.get(userSysId)) {
            return "Caller not found.";
        }
 
        var email = userGR.getValue("email");
        if (!email) {
            return "Caller does not have an email.";
        }
 
        // Step 2: Build REST request to other instance
        var r = new sn_ws.RESTMessageV2();
        r.setEndpoint("https://dev354541.service-now.com/api/now/table/incident?sysparm_query=" +
                      "caller_id.email=" + encodeURIComponent(email));
        r.setHttpMethod("GET");
 
        // Authentication
        r.setBasicAuth("Admin", "c@d6D@OHwi3J");
 
        // Step 3: Execute REST Call
        var response = r.execute();
        var body = JSON.parse(response.getBody());
 
        if (!body.result || body.result.length === 0) {
            return "No incidents found for this caller (" + email + ").";
        }
 
        // Step 4: Build text for the Description field
        var output = "";
        body.result.forEach(function(inc) {
            output += "Incident: " + inc.number +
                      " | Short Description: " + (inc.short_description || "N/A") +
                      "\n";
        });
 
        return output;
    }
 
});



// Client-side function call
function getUserIncidents() {
    var caller = g_form.getValue('caller_id');
 
    if (!caller) {
        alert("Please select a Caller first.");
        return;
    }
 
    var ga = new GlideAjax('GetUserIncidents');
    ga.addParam('sysparm_name', 'fetchIncidents');
    ga.addParam('sysparm_user', caller);
 
    ga.getXMLAnswer(function(response) {
        if (response) {
            g_form.setValue('description', response);
        } else {
            g_form.setValue('description', "No incidents found for this user.");
        }
    });
}