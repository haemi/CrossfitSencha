Ext.define('Crossfit.view.ViewPort', {
    extend : 'Ext.tab.Panel',
	xtype: 'tabPanel',
	
    requires : [
        'Ux.tab.OptimizedTab'
    ],
	
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',
        defaultType    : 'optimized-tab',

		defaults: {
    		styleHtmlContent: true
		},

		items: [
		{
    		title: 'Anmeldungen',
    		iconCls: 'anmeldungen',
    		xtype: 'anmeldungenNavView',
			flex: 1
		},
		{
			title: 'My WODs',
		    iconCls: 'myWODs',
		    xtype: 'MyWODsWrapperView'
		},
		{
    		title: 'WODs',
    		iconCls: 'WODs',
    		xtype: 'WODsWrapperView'
		},
		{
    		title: '&Uuml;bungen',
    		iconCls: 'uebungen',
    		xtype: 'uebungenNav'
		// },
		// {
		//     		title: 'Kontakt',
		//     		iconCls: 'uebungen',
		//     		xtype: 'contactView'
		}
		]
	}
});