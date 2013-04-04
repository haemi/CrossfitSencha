Ext.define('Crossfit.store.AngemeldeteStore', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'Crossfit.model.Angemeldeter',
		filters: [{
			filterFn: function(item) {
				if (item.get('displayName') != null) {
					return item.get('displayName').length > 0;
				} else {
					return false;
				}
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