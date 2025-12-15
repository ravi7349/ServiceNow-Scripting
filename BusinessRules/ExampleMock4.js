//prevent deleting if someone try to delet the incidnets
(function executeRule(current, previous /*null when async*/) {

	// Add your code h
	gs.addErrorMessage("we cannot delete ");
	current.setAbortAction(true);

})(current, previous);

//When child incidnet worknotes changes it sholud relate to related problem record