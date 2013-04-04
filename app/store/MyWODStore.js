Ext.define('Crossfit.store.MyWODStore', {
   extend: 'Ext.data.Store',
   
   config: {
		sorters: [{
			property: 'datum',
			direction: 'DESC'
		}],
		model: 'Crossfit.model.MyWOD',
		proxy: {
            type: 'ajax',
            url : 'php/wodsPerPerson.php',
            reader: {
				type: 'json'
			}
		}
   }
});