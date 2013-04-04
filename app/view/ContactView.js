Ext.define('Crossfit.view.ContactView', {
	extend: 'Ext.form.Panel',
	xtype: 'contactView',
	config: {
	    layout: 'vbox',
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Kontakt'
			},
			{
				html: '<h1>Kontakt</h1>'
			},
			{
				xtype: 'panel',
				layout: 'hbox',
				margin: '20',
				items:[
				{
					html: '<h3>Sarah</h3>',
					width: '20%'
				},
				{
					xtype: 'button',
					text: 'anrufen',
					action: 'callSarahAction',
					width: '15%',
					margin: '0 5 0 5'
				},
				{
					xtype: 'button',
					text: 'sms',
					action: 'textSarahAction',
					width: '15%',
					margin: '0 5 0 5'
				},
				{
					xtype: 'button',
					text: 'mail',
					action: 'mailSarahAction',
					width: '15%',
					margin: '0 5 0 5'
				}
				]
			},
			{
				xtype: 'panel',
				layout: 'hbox',
				margin: '20',
				items:[
				{
					html: '<h3>Christof</h3>',
					width: '20%'
				},
				{
					xtype: 'button',
					text: 'anrufen',
					action: 'callChristofAction',
					width: '15%',
					margin: '0 5 0 5'
				},
				{
					xtype: 'button',
					text: 'sms',
					action: 'textChristofAction',
					width: '15%',
					margin: '0 5 0 5'
				},
				{
					xtype: 'button',
					text: 'mail',
					action: 'mailChristofAction',
					width: '15%',
					margin: '0 5 0 5'
				}
				]
			}
		]
	}
});