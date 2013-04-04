Ext.define('Crossfit.store.UebungsPerformanceStore', {
	extend: 'Ext.data.Store',
	
	config: {
		grouper:{
           property: 'formattedDate',
		   sortProperty: 'datum'
	    },
		groupDir: 'DESC',
		sorters: [{
			property: 'datum',
			direction: 'DESC'
		}],
		model: 'Crossfit.model.UebungsPerformanceModel',
		filters: [{
			filterFn: function(item) {
				return item.get('kommentarid') > 0;
			}
		}],
        proxy: {
            type: 'ajax',
            url : '',
            reader: {
				type: 'json'
			}
        }
	}
});