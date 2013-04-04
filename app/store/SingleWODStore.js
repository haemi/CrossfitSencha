Ext.define('Crossfit.store.SingleWODStore', {
   extend: 'Ext.data.Store',
   
   config: {
		model: 'Crossfit.model.WOD',
		proxy: {
			type: 'ajax',
			reader: {
				type: 'json'
			}
		}
   }
});