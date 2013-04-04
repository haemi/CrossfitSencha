Ext.define('Crossfit.view.AnmeldungenNavView', {
	extend: 'Ext.navigation.View',
	xtype: 'anmeldungenNavView',
	
	config: {
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    id: 'signOffButton',
                    text: 'Abmelden',
                    align: 'right',
					action: 'signOffButtonAction'
                },
                {
                    xtype: 'button',
                    id: 'registerButton',
                    text: 'Anmelden',
                    ui: 'sencha',
                    align: 'right',
					action: 'registerButtonAction',
					hidden: true
                },
                {
                    xtype: 'button',
                    id: 'showWODButton',
                    text: 'WOD',
                    ui: 'sencha',
                    align: 'right',
					action: 'showWODButtonAction',
					hidden: true
                },
                {
                    xtype: 'button',
                    id: 'logoutButton',
                    text: 'Logout',
                    align: 'right',
					action: 'logoutButtonAction',
					hidden: true
                }
            ]
        },
	
		items: [{
			xtype: 'AnmeldungenWrapper'
		}]
	}
});
