// Example 1: Show Department Name when Caller is selected
// Script Include (Server-side)
var GetDepartment = Class.create();
GetDepartment.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getDept: function() {
        var userId = this.getParameter('sysparm_user');
        var gr = new GlideRecord('sys_user');
        gr.get(userId);

        if (gr.department)
            return gr.department.name;
        else
            return 'No department found';
    }
});

//Client Script (onChange → caller_id)
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') return;

    var ga = new GlideAjax('GetDepartment');
    ga.addParam('sysparm_name', 'getDept');
    ga.addParam('sysparm_user', newValue);
    ga.getXMLAnswer(function(response) {
        g_form.addInfoMessage('Department: ' + response);
    });
}
