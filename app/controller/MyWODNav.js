Ext.define('Crossfit.controller.MyWODNav', {
	extend: 'Ext.app.Controller',
	
    requires: [
        'Crossfit.view.MyWODDetail'
    ],
	
	config: {
		refs: {
			myWODsNav: 'myWODsNav'
		},
		control: {
			'myWODsViewList' : {
				itemsingletap: 'showMyWODsDetail'
			},
			'button[action=showUebungenFromWOD]' : {
				tap: 'showUebungenFromWOD'
			}
		}
	},
	
	showMyWODsDetail: function(list, index, target, record, e, eOpts) {
		list.deselect(index);
		this.getMyWODsNav().push({
			xtype: 'myWODDetail'
		});
	},
	
	showUebungenFromWOD: function(button, e, eOpts) {
		this.getMyWODsNav().push({
			xtype: 'uebungenNav'
		});
	}
	
});
