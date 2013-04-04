Ext.define('Crossfit.view.WODsWrapperView', {
	extend: 'Ext.Container',
	xtype: 'WODsWrapperView',
    requires: [
        'Ext.dataview.List',
        'Ext.data.Store',
        'Crossfit.view.WODsView'
    ],
	config: {
	    layout: 'vbox',
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'WODs'
			},
			{
				xtype: 'WODsView',
				flex: 1
			}
		]
	},
	initialize: function () {
		this.callParent(arguments);
	}
});