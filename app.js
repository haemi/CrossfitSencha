//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Crossfit': 'app',
	Ux : 'ux'
});
//</debug>

Ext.application({
    name: 'Crossfit',

    requires: [
        'Ext.MessageBox',
		'Ext.DateExtras',
		'Ext.data.proxy.LocalStorage'
    ],
	
	listeners: {
		'authorizationFailed' : 'handleAuthorizationFailed',
		'authorizationSuccess' : 'handleAuthorizationSuccess'
	},
	
    controllers: ['AnmeldungenController', 'UebungenController', 'MyWODsController', 'ViewPortController', 'ContactController', 'PaleoController'],

    stores: ['Anmeldungen', 'WODStore', 'Uebungen', 'AngemeldeteStore', 'LocalUserStore', 'UebungsPerformanceStore', 'MyWODStore', 'MyWODDetailStore', 'SingleWODStore', 'PaleoDaysStore'],
    
    models: ['Anmeldung', 'Angemeldeter', 'WOD', 'Uebung', 'LocalUser', 'UebungsPerformanceModel', 'MyWOD', 'MyWODDetail', 'PaleoDay'],
	
	views: ['LoginView'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
	
    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
		'640x1096': 'resources/startup/640x1136.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
	
    launch: function() {
		var MB = Ext.MessageBox;
		Ext.apply(MB, {
				YES: { text: 'Ja', itemId: 'yes', ui: 'action' },
				NO: { text: 'Nein', itemId: 'no' }
		});
		
		Ext.apply(MB, {
				YESNO: [MB.NO, MB.YES]
		});
		
		var android = false;
		
		Ext.Ajax.on({
			beforerequest: function(conn, options, eOpts) {
				var auth = Crossfit.app.createAuthHeader();
				Ext.Ajax.setDefaultHeaders({
					Authorization: auth
				});

				if (android) {
		            options.url = "http://www.laendlecrossfit.com/mobile/" + options.url;
				}
				
				Ext.Viewport.setMasked({
					xtype: 'loadmask',
					indicator: true
				});
			},
			requestcomplete: function() {
				Ext.Viewport.setMasked(false);
			},
			requestexception: function(conn, response, options) {
				if (response.status == 403) {
					Crossfit.app.fireEvent('authorizationFailed');
				}
			}
		});

        // Destroy the #appLoadingIndicator element
        Ext.fly('removeMe').destroy();
		
        // Initialize the main view
        var tabBar = Ext.create('Crossfit.view.ViewPort');
        Ext.Viewport.add(tabBar);
    },
	
	loadWochenUebersicht: function() {
		var anmeldungenStore = Ext.StoreManager.get('Anmeldungen');
		var authHeader = this.createAuthHeader();
		
		if (authHeader) {
			anmeldungenStore.getProxy().setUrl(this.createAnmeldungenUrl());
			
			anmeldungenStore.load(function(records, operation, success) {
			});
		}
	},
	
	createAnmeldungenUrl: function() {
		var today = new Date();

		var end = Ext.Date.add(today, Ext.Date.DAY, 14);

		var todayString = Ext.Date.format(today, 'Y-m-d');
		var endString = Ext.Date.format(end, 'Y-m-d');
		return 'php/wochenUebersicht_sencha.php?benutzerId=' + Crossfit.app.getBenutzerId() + '&startDerWoche=' + todayString + '&endeDerWoche=' + endString;
	},

	createAuthHeader: function() {
		var localUserRecord = Ext.StoreManager.get('LocalUserStore').getAt(0);
		
		if (localUserRecord != undefined) {
			var username = localUserRecord.getData().email;
			var password = localUserRecord.getData().password;
			
			if (username != null && username.length > 0 && password != null && password.length > 0) {
				return 'Basic ' + btoa(username + ':' + password);
			} else {
				Crossfit.app.fireEvent('authorizationFailed');
			}
		} else {
			Crossfit.app.fireEvent('authorizationFailed');
		}
	},
	
	getBenutzerId: function() {
		var store = Ext.StoreManager.get('LocalUserStore');
		
		if (store == undefined) {
			return 0;
		} else {
			var localUserRecord = store.getAt(0);
		
			if (localUserRecord != undefined) {
				return localUserRecord.getData().benutzerid;
			}
		
			return 0;
		}
	},
	
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
	
	handleAuthorizationFailed: function() {
		Ext.StoreManager.get('LocalUserStore').removeAll();
		
		var loginViews = Ext.ComponentQuery.query('LoginView');
		var loginCurrentlyVisible = loginViews.length > 0 && false == loginViews[0].isHidden();
		var tabPanelArray = Ext.ComponentQuery.query('tabPanel');
		var tabPanel = tabPanelArray[0];
		
		if (loginCurrentlyVisible) {
			var loginFailedLabel = Ext.ComponentQuery.query('#signInFailedLabel')[0];
			loginFailedLabel.setHidden(false);
		} else {
			if (tabPanel) {
				tabPanel.setHidden(true);
			}

			if (loginViews.length == 0) {
				var loginPanel = Ext.create('Crossfit.view.LoginView');
				Ext.Viewport.add(loginPanel);
				loginPanel.show();
			} else {
				loginViews[0].setHidden(false);
			}
		}
	},
	
	handleAuthorizationSuccess: function(username, password, benutzerid) {
		var store = Ext.StoreManager.get('LocalUserStore');
		store.removeAll();
		
		store.add({benutzerid: benutzerid, email: username, password: sha256_digest(password)});

		var loginViews = Ext.ComponentQuery.query('LoginView');
		var loginView = loginViews[0];
		var loginCurrentlyVisible = loginViews.length > 0 && false == loginView.isHidden();
		var tabPanelArray = Ext.ComponentQuery.query('tabPanel');
		var tabPanel = tabPanelArray[0];
		
		if (loginCurrentlyVisible) {
			loginView.setHidden(true);
			tabPanel.setHidden(false);

			this.loadWochenUebersicht();
		}
	}
});
