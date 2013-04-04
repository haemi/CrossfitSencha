Ext.define('Crossfit.controller.PaleoController', {
	extend: 'Ext.app.Controller',
	
	config: {
		views: [
			'PaleoNav', 'PaleoDaysListView', 'CreateEditPaleoDayView'
		],
		refs: {
			paleoNav: 'paleoNav'
		},
		control: {
			'paleoDaysListView' : {
				itemtap: 'showPaleoDayDetail'
			},
		}
	},
	
	loadPaleoDays: function() {
		var store = Ext.StoreManager.get('PaleoDaysStore');
		store.load();
	},
	
	showPaleoDayDetail: function(list, index, target, record, e, eOpts) {
		this.getPaleoNav().push({
			xtype: 'createEditPaleoDayView'
		});
	}
});
