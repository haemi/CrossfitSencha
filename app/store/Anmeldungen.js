Ext.define('Crossfit.store.Anmeldungen', {
	extend: 'Ext.data.Store',
	
	config: {
		grouper:{
           property: 'formattedDate',
		   sortProperty: 'datum'
	    },
		sorters: ['datum', 'beginn'],
		model: 'Crossfit.model.Anmeldung',
        proxy: {
            type: 'ajax',
            url : '',
            reader: {
				type: 'json'
			}
        }
	}
});