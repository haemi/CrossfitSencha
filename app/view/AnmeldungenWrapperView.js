Ext.define('Crossfit.view.AnmeldungenWrapperView', {
	extend: 'Ext.Container',
	xtype: 'AnmeldungenWrapper',
	config: {
		layout: 'vbox',
		title: 'Anmeldungen',
		items: [{
			xtype: 'segmentedbutton',
			layout: {
				align: 'middle',
				pack: 'center'
			},
			itemId: 'anmeldungenSegmentedButton',
			padding: '10 0 10 0',
			items: [{
				text: 'alle',
				pressed: 'true'
			}, {
				text: 'angemeldet'
			}, {
				text: 'freie Pl&auml;tze'
			}]
		}, {
			xtype: 'anmeldungenListView',
			flex: 1
		}]
	},
	initialize: function() {
		this.callParent(arguments);
	}
});
