var demoglideajax = Class.create();
demoglideajax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	countInc :function(){

		var prb_id = this.getParameter('sysparm_prbid');
		var grI = new GlideAggregate('incident');
		grI.addAggregate('COUNT');
		grI.addQuery('problem_id',prb_id);
		grI.query();
		while(gr1.next()){

			var countofinc = grI.getAggregate('COUNT');


		}

		return countofinc;



	},


    type: 'demoglideajax'
});