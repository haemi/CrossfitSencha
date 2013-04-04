Ext.define('Crossfit.controller.ViewPortController', {
	extend: 'Ext.app.Controller',
	
	config: {
		views: [
			'ViewPort'
		],
		refs: {
			anmeldungenNavView: 'anmeldungenNavView',
			MyWODsWrapperView: 'MyWODsWrapperView',
			WODsWrapperView: 'WODsWrapperView',
			uebungenNav: 'uebungenNav',
			paleoNav: 'paleoNav'
		},
		control: {
			'tabPanel' : {
				activeitemchange: 'handleActiveItemChange'
			}
		}
	},
	
	handleActiveItemChange: function(component, value, oldValue, eOpts) {
		// oldValue.removeInnerAt(0);

		if (value == this.getAnmeldungenNavView()) {
			// for (var i = 0; i < component.items.length; i++) {
			// 	console.log(component.items.get(i));
			// }
			// 
			// var anmeldungen = Ext.create('Crossfit.view.AnmeldungenNavView');
			// value.items[0] = anmeldungen;
			// 
			// 
			// 
			this.getApplication().getController('AnmeldungenController').anmeldungenListViewShows();
		} else if (value == this.getMyWODsWrapperView()) {
			this.getApplication().getController('MyWODsController').loadMyWODs();
		} else if (value == this.getWODsWrapperView()) {
			var anmeldungenStore = Ext.StoreManager.get('WODStore');
			anmeldungenStore.load();
		} else if (value == this.getUebungenNav()) {
			this.getApplication().getController('UebungenController').loadUebungen();
		} else if (value == this.getPaleoNav()) {
			this.getApplication().getController('PaleoController').loadPaleoDays();
		}
	}
});
