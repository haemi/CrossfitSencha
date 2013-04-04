Ext.define('Crossfit.view.LoginView', {
	extend: 'Ext.form.Panel',
	xtype: 'LoginView',
	requires: ['Ext.field.Password', 'Ext.Label', 'Ext.field.Email'],
	config: {
	    layout: 'vbox',
		items: [
            {
                xtype: 'label',
                html: 'Login fehlgeschlagen; Benutzer/Passwort stimmen nicht &uuml;berein.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'emailfield',
                        placeHolder: 'E-Mail',
                        itemId: 'usernameTextField',
                        name: 'usernameTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Passwort',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                    }
                ]
            },
            {
            	xtype: 'button',
            	action: 'login',
				itemId: 'loginButton',
				ui: 'action',
				padding: '10px',
            	text: 'Anmelden'
            }
		],
		refs: {
			username: '#usernameTextField',
			password: '#passwordTextField'
		},
		listeners: [{
			delegate: '#loginButton',
			event: 'tap',
			fn: 'login'
		}]
	},
	initialize: function () {
		this.callParent(arguments);
	},
	login: function() {
		var username = Ext.ComponentQuery.query('#usernameTextField')[0].getValue();
		var password = Ext.ComponentQuery.query('#passwordTextField')[0].getValue();
		var loginFailedLabel = Ext.ComponentQuery.query('#signInFailedLabel')[0];
		loginFailedLabel.setHidden(true);
		
		var auth = 'Basic ' + btoa(username + ':' + sha256_digest(password));
		
		Ext.Ajax.request({
    		url: 'php/login.php?directlyCalled=1&email=' + username,
    		headers : { Authorization : auth },
    		
    		callback: function(options, success, response) {
				if (response.status == 200) {
					var test = Ext.JSON.decode(response.responseText);
					var benutzerid = test.benutzerid;
					Crossfit.app.fireEvent('authorizationSuccess', username, password, benutzerid);
				}
    		}
		}, this);
	}
});