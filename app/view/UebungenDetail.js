Ext.define('Crossfit.view.UebungenDetail', {
	extend: 'Ext.Container',
	xtype: 'UebungenDetail',
	requires: ['Ext.SegmentedButton'],
	config: {
	    layout: 'vbox',
		items: [
	        {
	            xtype: 'button',
	            text: 'Youtube',
	            iconCls: 'action',
	            iconMask: true,
	            padding: 10
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