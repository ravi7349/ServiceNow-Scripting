// 1. Scenario: Show how many active incidents a caller has (onChange on caller)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var ga = new GlideAjax('GetUserIncidentCount');
    ga.addParam('sysparm_name', 'getCount');
    ga.addParam('sysparm_user', newValue);
    ga.getXML(function(response) {
        var count = response.responseXML.documentElement.getAttribute("count");
        g_form.addInfoMessage("Caller has " + count + " active incidents");
    });
}

// -------------------------------------------------------------

// 2. Scenario: Stop submit if short_description is empty (onSubmit)

function onSubmit() {
    if (g_form.getValue('short_description') === '') {
        g_form.addErrorMessage("Short description cannot be empty");
        return false;
    }
}

// -------------------------------------------------------------

// 3. Scenario: If priority is 1, make assignment_group mandatory (onChange)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue == '1') {
        g_form.setMandatory('assignment_group', true);
    } else {
        g_form.setMandatory('assignment_group', false);
    }
 }

// -------------------------------------------------------------

// 4. Scenario: If category is Hardware, set subcategory = Laptop (onChange)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue === 'hardware') {
        g_form.setValue('subcategory', 'laptop');
    }
}

// -------------------------------------------------------------

// 5. Scenario: OnLoad hide description if user is not admin

function onLoad() {
    if (!g_user.hasRole('admin')) {
        g_form.setDisplay('description', false);
    }
}

// -------------------------------------------------------------

// 6. Scenario: If impact and urgency are high, set priority 1 (onChange)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    var impact = g_form.getValue('impact');
    var urgency = g_form.getValue('urgency');

    if (impact == '1' && urgency == '1') {
        g_form.setValue('priority', '1');
    }
}

// -------------------------------------------------------------

// 7. Scenario: Show error if email field is cleared (onChange)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue === '') {
        g_form.addErrorMessage("Email cannot be empty");
    }
}

// -------------------------------------------------------------

// 8. Scenario: When caller selected and assignment group empty, show message (onChange)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue && g_form.getValue('assignment_group') === '') {
        g_form.addInfoMessage("Please select assignment group");
    }
}

// -------------------------------------------------------------

// 9. Scenario: Disable submit if mandatory fields empty (onSubmit)

function onSubmit() {
    if (!g_form.areMandatoryFieldsComplete()) {
        g_form.addErrorMessage("Please fill all mandatory fields");
        return false;
    }
}

// -------------------------------------------------------------

// 10. Scenario: Auto fill location when caller selected (onChange with GlideAjax)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var ga = new GlideAjax('GetCallerLocation');
    ga.addParam('sysparm_name', 'getLocation');
    ga.addParam('sysparm_user', newValue);
    ga.getXML(function(response) {
        var loc = response.responseXML.documentElement.getAttribute("location");
        g_form.setValue('location', loc);
    });
}

// -------------------------------------------------------------

//11. Scenario: If type = Change, hide incident-related fields (onChange)

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    if (newValue == 'change') {
        g_form.setDisplay('subcategory', false);
        g_form.setDisplay('impact', false);
    } else {
        g_form.setDisplay('subcategory', true);
        g_form.setDisplay('impact', true);
    }
}

//-------------------------------------------------------------
