Ext.define('Crossfit.controller.UebungenController', {
	extend: 'Ext.app.Controller',
	
	config: {
		views: [
			'UebungenNav',
			'UebungenDetail',
			'UebungsPerformancesListView',
			'CreateEditExerciseView'
		],
		refs: {
			uebungenNav: 'uebungenNav',
			saveExerciseButton: 'button[action=saveExercise]',
			addExerciseButton: 'button[action=addExercise]',
			deleteExerciseButton: 'button[action=deleteExercise]',
			UebungsPerformancesListView: 'UebungsPerformancesListView',
			createEditExerciseView : 'createEditExerciseView'
		},
		control: {
			'UebungenView' : {
				disclose: 'showUebungDetailDisclose',
				itemtap: 'showUebungDetailTap'
			},
			'UebungsPerformancesListView' : {
				itemsingletap: 'showAddExercisePerformanceEdit',
				show: 'handleUebungsPerformancesListViewShow'
			},
			'button[action=addExercise]' : {
				tap: 'showAddExercisePerformanceNew'
			},
			'button[action=saveExercise]' : {
				tap: 'saveExercisePerformance'
			},
			'button[action=deleteExercise]' : {
				tap: 'deleteExercisePerformance'
			},
			'uebungenNav' : {
				show: 'handleNavAppears',
				push: 'pushed',
				pop: 'popped'
			},
			'field' : {
				focus: 'fieldGetsFocus',
				blur: 'fieldLosesFocus'
			},
			'uebungenNav searchfield' : {
				keyup: 'searchUebungenKeyUp',
				clearicontap: 'searchUebungenClearIconTap'
			}
		}
	},
	
<<<<<<< .mine
	fieldGetsFocus: function(comp, e, eOpts) {
		if (Ext.os.is('Android')) {
	        var ost = comp.element.dom.offsetTop;
	        comp.getParent().getScrollable().getScroller().scrollTo(0, ost);
		}
=======
	searchUebungenKeyUp: function(searchfield, e, eOpts) {
		this.searchUebungen(searchfield.getValue());
	},
	
	searchUebungenClearIconTap: function(searchfield, e, eOpts) {
		this.searchUebungen('');
	},
	
	searchUebungen: function(text) {
		var store = Ext.StoreMgr.get('Uebungen');
		
		store.clearFilter();
		
		store.filter(function(record) {
			var name = record.get('name');
			
			if (null == name) {
				return false;
			} else {
				return name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
			}
		});
	},
	
	textareafieldGetsFocus: function(comp, e, eOpts) {
		// console.log(e.target.clientHeight);
		// console.log(comp.getParent().getScrollable().getScroller());
		// comp.getParent().getParent().getScrollable().getScroller().scrollTo(0, e.target.clientHeight);
>>>>>>> .r66
	},
	
	fieldLosesFocus: function(comp, e, eOpts) {
		if (Ext.os.is('Android')) {
		}
	},
	
	loadUebungen: function() {
		var store = Ext.StoreManager.get('Uebungen');
		
		store.getProxy().setExtraParams({
			'benutzerId': Crossfit.app.getBenutzerId()
		});
		
		store.load();
	},
	
	handleNavAppears: function() {
		this.getAddExerciseButton().hide();
		this.getSaveExerciseButton().hide();
		this.getDeleteExerciseButton().hide();
	},
	
	pushed: function(nav, view, opts) {
		if (view == this.getUebungsPerformancesListView()) {
			this.getAddExerciseButton().show();
			this.getSaveExerciseButton().hide();
			this.getDeleteExerciseButton().hide();
		} else if (view == this.getCreateEditExerciseView()) {
			this.getAddExerciseButton().hide();
			this.getSaveExerciseButton().show();
			this.getDeleteExerciseButton().show();
		}
	},
	
	popped: function(nav, view, opts) {
		if (view == this.getUebungsPerformancesListView()) {
			this.getAddExerciseButton().hide();
			this.getSaveExerciseButton().hide();
			this.getDeleteExerciseButton().hide();
		} else if (view == this.getCreateEditExerciseView()) {
			this.getAddExerciseButton().show();
			this.getSaveExerciseButton().hide();
			this.getDeleteExerciseButton().hide();
		}
	},
	
	handleUebungsPerformancesListViewShow: function() {
		var store = Ext.StoreMgr.get('UebungsPerformanceStore');
		store.load(function(records, operation, success) {
		}, this);
	},
	
	showUebungDetailTap: function(list, index, target, record, e, eOpts) {
		this.showUebungDetail(list, record, index);
	},
	
	showUebungDetailDisclose: function(list, record, target, index, e, eOpts ) {
		this.showUebungDetail(list, record, index);
	},
	
	showUebungDetail: function(list, record, index) {
		if (list.currentlyScrolling) {
			return;
		}
		
		list.deselect(index);
		
		var store = Ext.StoreMgr.get('UebungsPerformanceStore');
		store.getProxy().setUrl('php/uebungsPerformances.php?directlyCalled=1&benutzerId=' + Crossfit.app.getBenutzerId() + '&uebungsId=' + record.getData().id);
		
		this.getUebungenNav().push({
			xtype: 'UebungsPerformancesListView',
			title: record.data.name,
			data: record.data
		});
	},
	
	showAddExercisePerformanceNew: function(button, e, eOpts) {
		var data = Ext.create('Crossfit.model.UebungsPerformanceModel').getData();
		data.uebungsid = this.getUebungsPerformancesListView().getData().id;

		this.getUebungenNav().push({
			data: data,
			xtype: 'createEditExerciseView'
		});
	},
	
	showAddExercisePerformanceEdit: function(listItem, index, target, record, e, eOpts ) {
		this.getUebungenNav().push({
			xtype: 'createEditExerciseView',
			data: record.data
		});
	},
	
	saveExercisePerformance: function(button, e, eOpts) {
		var recordToSave = this.getCreateEditExerciseView().getData();
		
		var isNew = false;
		
		if (recordToSave.kommentarid == null) {
			isNew = true;
		}

		recordToSave.kg = Ext.ComponentQuery.query('#gewicht')[0].getValue();
		recordToSave.sekunden = Ext.ComponentQuery.query('#sekunden')[0].getValue();
		recordToSave.wiederholungen = Ext.ComponentQuery.query('#wiederholungen')[0].getValue();
		recordToSave.minuten = Ext.ComponentQuery.query('#minuten')[0].getValue();
		recordToSave.datum = Ext.ComponentQuery.query('#datum')[0].getValue();
		recordToSave.cm = Ext.ComponentQuery.query('#meter')[0].getValue() * 100 + Ext.ComponentQuery.query('#centimeter')[0].getValue();
		recordToSave.kommentar = Ext.ComponentQuery.query('#kommentar')[0].getValue().replace(/\n/g, "<br/>");
		var datumFormatted = Ext.Date.format(recordToSave.datum, 'Y-m-d');

		var url;
		
		var kommentar = Ext.util.Format.htmlEncode(recordToSave.kommentar);

		var benutzerId = Crossfit.app.getBenutzerId() || '';
		var uebungsId = recordToSave.uebungsid || '';
		var kg = recordToSave.kg || '';
		var wiederholungen = recordToSave.wiederholungen || '';
		var minuten = recordToSave.minuten || '';
		var sekunden = recordToSave.sekunden || '';
		var cm = recordToSave.cm || '';
		var kommentar = recordToSave.kommentar || '';
		var kommentarId = recordToSave.kommentarid || '';
		
		if (isNew) {
			url = 'php/createUebungsKommentar.php?benutzerid=' + benutzerId + '&uebungsid=' + uebungsId + '&kg=' + kg + '&wh=' + wiederholungen + '&min=' + minuten + '&sek=' + sekunden + '&cm=' + cm + '&datum=' + datumFormatted + '&kommentar=' + kommentar;
		} else {
			url = 'php/changeUebungsKommentar.php?id=' + kommentarId + '&benutzerid=' + benutzerId + '&uebungsid=' + uebungsId + '&kg=' + kg + '&wh=' + wiederholungen + '&min=' + minuten + '&sek=' + sekunden + '&cm=' + cm + '&datum=' + datumFormatted + '&kommentar=' + kommentar;
		}
		
		var uebungenNav = this.getUebungenNav();

		Ext.Ajax.request(
			{
				url: url,
				
				callback: function(options, success, response) {
					if (response.status == 200) {
						uebungenNav.pop(1);
						Ext.Msg.alert('', response.responseText, Ext.emptyFn, null);
					}
				}
		}, this);
	},
	
	deleteExercisePerformance: function(button, e, eOpts) {
		Ext.Msg.confirm("Wirklich l&ouml;schen?", "das L&ouml;schen kann nicht mehr r&uuml;ckgängig gemacht werden!", function(buttonId, value, opt) {
			if (buttonId == 'yes') {
				var url = 'php/deleteUebungsKommentar.php?id=' + this.getCreateEditExerciseView().getData().kommentarid;
				
				var uebungenNav = this.getUebungenNav();
				
				Ext.Ajax.request(
				{
						url: url,

						callback: function(options, success, response) {
							if (response.status == 200) {
								uebungenNav.pop(1);
								Ext.Msg.alert('', 'Eintrag wurde gel&ouml;scht!', Ext.emptyFn, null);
							}
						}
				}, this);
			}
		}, this);
	}
});
