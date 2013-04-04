Ext.define('Crossfit.view.UebungenNav', {
	extend: 'Ext.navigation.View',
	xtype: 'uebungenNav',
	
	requires: ['Crossfit.view.UebungenView'],
	
	config: {
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    id: 'addExerciseButton',
                    action: 'addExercise',
                    ui: 'sencha',
                    align: 'right',
                    iconCls: 'add',
                    iconMask: true
                },
                {
                    xtype: 'button',
                    id: 'saveExerciseButton',
                    action: 'saveExercise',
                    ui: 'sencha',
                    align: 'right',
                    iconCls: 'floppy',
                    iconMask: true
                },
                {
                    xtype: 'button',
                    id: 'deleteExerciseButton',
                    action: 'deleteExercise',
                    ui: 'sencha',
                    align: 'right',
                    iconCls: 'trash',
                    iconMask: true
                }
            ]
        },
		items: [
		{
			xtype: 'panel',
			layout: 'vbox',
			title: '&Uuml;bungen',
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
					xtype: 'UebungenView',
					flex: 1
				}
				]
		}
		]
	}
});
