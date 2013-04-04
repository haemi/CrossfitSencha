Ext.define('Crossfit.store.MyWODDetailStore', {
   extend: 'Ext.data.Store',
   
   config: {
		model: 'Crossfit.model.MyWODDetail',
		proxy: {
            type: 'ajax',
            url : '',
            reader: {
				type: 'json'
			}
		}
   }
});