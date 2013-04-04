Ext.define('Crossfit.view.AnmeldungenFuerKursView', {
	extend: 'Ext.List',
	xtype: 'anmeldungenFuerKursView',

	config: {
		title: 'Anmeldungen',
		itemTpl: '{displayName}',
		store: 'AngemeldeteStore',
        allowDeselect: true,
		disableSelection: true
	}
});
