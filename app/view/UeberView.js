Ext.define('Crossfit.view.UeberView', {
	extend: 'Ext.List',
	xtype: 'UeberView',
	
	config: {
		title: 'Anmeldungen',
		itemTpl: '{datum} - {beginn}',
		store: 'Anmeldungen',
		grouped: true,
		onItemDisclosure: true,
        allowDeselect: true
	}
});