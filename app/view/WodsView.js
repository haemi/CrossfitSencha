Ext.define('Crossfit.view.WODsView', {
	extend: 'Ext.List',
	xtype: 'WODsView',

	config: {
		title: 'WODs',
		itemTpl: '<strong>{datum}</strong><br />{beschreibung}',
		store: 'WODStore',
        allowDeselect: true,
		disableSelection: true
	}
});