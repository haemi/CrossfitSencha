Ext.define('Crossfit.view.MyWODsNav', {
	extend: 'Ext.navigation.View',
	xtype: 'myWODsNav',
	
	requires: ['Crossfit.view.MyWodsView'],
	
	config: {
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    itemId: 'uebungenButton',
                    action: 'showUebungenFromWOD',
                    text: '&Uuml;bungen',
                    ui: 'sencha',
                    align: 'right',
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },
		items: [{
			xtype: 'myWODsViewList'
		}]
	}
});
