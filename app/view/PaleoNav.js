Ext.define('Crossfit.view.PaleoNav', {
	extend: 'Ext.navigation.View',
	xtype: 'paleoNav',
	
	config: {
		items: [{
			xtype: 'paleoDaysListView'
		}]
	}
});
