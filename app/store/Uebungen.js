Ext.define('Crossfit.store.Uebungen', {
   extend: 'Ext.data.Store',
   
   config: {
		sorters: ['datum'],
		model: 'Crossfit.model.Uebung',
		grouper: {
     		groupFn: function(record) {
          		return record.get('name')[0];
          	}
        },
        proxy: {
            type: 'ajax',
            url : 'php/uebungen.php',
            reader: {
				type: 'json'
			}
        }
   }
});