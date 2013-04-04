Ext.define('Crossfit.controller.ContactController', {
	extend: 'Ext.app.Controller',
	
	config: {
		views: [
			'ContactView'
		],
		refs: {
		},
		control: {
			'button[action=callSarahAction]' : {
				tap: 'callSarahAction'
			},
			'button[action=textSarahAction]' : {
				tap: 'textSarahAction'
			},
			'button[action=mailSarahAction]' : {
				tap: 'mailSarahAction'
			},
			'button[action=callChristofAction]' : {
				tap: 'callChristofAction'
			},
			'button[action=textChristofAction]' : {
				tap: 'textChristofAction'
			},
			'button[action=mailChristofAction]' : {
				tap: 'mailChristofAction'
			}
		}
	},
	
	callSarahAction: function(component, e, eOpts) {
		window.open('tel:+436505516544');
	},

	textSarahAction: function(component, e, eOpts) {
		window.open('sms:+436505516544');
	},

	mailSarahAction: function(component, e, eOpts) {
		window.open('mailto:sarah@laendlecrossfit.com');
	},

	callChristofAction: function(component, e, eOpts) {
		window.open('tel:+436505519390');
	},

	textChristofAction: function(component, e, eOpts) {
		window.open('sms:+436505519390');
	},

	mailChristofAction: function(component, e, eOpts) {
		window.open('mailto:christof@laendlecrossfit.com');
	},

});
