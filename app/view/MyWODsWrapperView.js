Ext.define('Crossfit.view.MyWODsWrapperView', {
	extend: 'Ext.navigation.View',
	xtype: 'MyWODsWrapperView',
    requires: [
        'Ext.dataview.List',
        'Ext.data.Store',
		'Ext.field.Search'
    ],
	config: {
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    id: 'saveMyWODButton',
                    action: 'saveMyWOD',
                    ui: 'sencha',
                    align: 'right',
                    iconCls: 'floppy',
                    iconMask: true,
					hidden: true,
                }
            ]
        },
		items: [
		{
			xtype: 'panel',
			layout: 'vbox',
			title: 'My WODs',
			items: [
				{
					xtype: 'toolbar',
					docked: 'top',

					items: [
					{
						xtype: 'spacer'
					},
					{
						xtype: 'searchfield',
						placeHolder: 'Suche...'
					},
					{
						xtype: 'spacer'
					}
					]
				},
				{
					xtype: 'myWODsViewList',
					flex: 1
				}
				]
		}
		]
	},
	initialize: function () {
		this.callParent(arguments);
	}
});