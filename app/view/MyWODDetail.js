Ext.define('Crossfit.view.MyWODDetail', {
	extend: 'Ext.form.Panel',
	xtype: 'myWODDetail',
	requires: ['Ext.SegmentedButton'],
	config: {
		items: [
	        {
	            xtype: 'panel',
				itemId: 'beschreibung',
                scrollable: true,
                height: 300,
	            padding: 10
	        },
	        {
		    	xclass: 'Ext.SegmentedButton',
	            padding: 10,
				itemId: 'prButtons',
		    	items: [
		    		{
			    		text: 'no PR',
			    		pressed: true
		    		},
		    		{
			    		text: 'personal record'
		    		}
		    	]
	        },
            {
                xtype: 'textareafield',
                label: 'Kommentar',
                maxRows: 4,
                name: 'kommentar',
				itemId: 'kommentar',
                padding: 10
            }
		]
	},
	initialize: function () {
		this.callParent(arguments);
		var beschreibung = Ext.ComponentQuery.query('#beschreibung')[0];
		var kommentar = Ext.ComponentQuery.query('#kommentar')[0];
		var prButtons = Ext.ComponentQuery.query('#prButtons')[0];
		
		if (this.getData().beschreibung != null) {
			beschreibung.setHtml(this.getData().beschreibung);
		}
		
		if (this.getData().kommentar != null) {
			kommentar.setValue(Ext.util.Format.htmlDecode(this.getData().kommentar).replace(/<br\/>/g, "\n").replace(/<br \/>/g, "\n"));
		}

		var buttons = prButtons.getItems();
		
		var noPRButton = buttons.get(0);
		var prButton = buttons.get(1);
		
		var buttonArray = new Array();
		
		if (this.getData().isPR > 0) {
			buttonArray[0] = prButton;
			prButtons.setPressedButtons(buttonArray);
		} else {
			buttonArray[0] = noPRButton;
			prButtons.setPressedButtons(buttonArray);
		}
	}
});