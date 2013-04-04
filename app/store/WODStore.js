Ext.define('Crossfit.store.WODStore', {
   extend: 'Ext.data.Store',
   
   config: {
		model: 'Crossfit.model.WOD',
		sorters: [
		{
			property: 'datum',
			direction: 'DESC'
		}],
		proxy: {
			type: 'ajax',
			url: 'php/wods.php',
			reader: {
				type: 'json'
			}
		}
   }
});