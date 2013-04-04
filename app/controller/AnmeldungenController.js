Ext.define('Crossfit.controller.AnmeldungenController', {
	extend: 'Ext.app.Controller',
	
	requires: [
		'Ext.util.DelayedTask'
	],
	
	config: {
		views: [
			'AnmeldungenNavView',
			'AnmeldungenListView',
			'AnmeldungenFuerKursView',
			'AnmeldungenWrapperView',
			'WODsWrapperView',
			'WODView'
		],
		
		refs: {
			anmeldungenNav: 'anmeldungenNavView',
			signOffButton: 'button[action=signOffButtonAction]',
			registerButton: 'button[action=registerButtonAction]',
			logoutButton: 'button[action=logoutButtonAction]',
			showWODButton: 'button[action=showWODButtonAction]',
			anmeldungenFuerKursView : 'anmeldungenFuerKursView',
			anmeldungenSegmentedButton: 'AnmeldungenWrapper #anmeldungenSegmentedButton',
			anmeldungenListView: 'anmeldungenListView',
			anmeldungenWrapper: 'AnmeldungenWrapper',
			WODView: 'WODView'
		},
		
		control: {
			'anmeldungenListView' : {
				disclose: 'showAnmeldungenListDetailDisclose',
				itemtap: 'showAnmeldungenListDetailTap',
				initialize: 'showingAnmeldungenListView'
			},
			'anmeldungenWrapper' : {
				initialize: 'anmeldungenListViewShows'
			},
			'AnmeldungenWrapper #anmeldungenSegmentedButton' : {
				toggle: 'anmeldungenSegmentedButtonChanged'
			},
			'anmeldungenNavView' : {
				activeitemchange: 'handleNavigationPushOrPop'
			},
			'button[action=login]' : {
				tap: 'tryToLogin'
			},
			'button[action=showWODButtonAction]' : {
				tap: 'showWOD'
			},
			'button[action=signOffButtonAction]' : {
				tap: 'signOff'
			},
			'button[action=registerButtonAction]' : {
				tap: 'registerCheck'
			},
			'button[action=logoutButtonAction]' : {
				tap: 'logout'
			},
			'list': {
				initialize: 'anmeldungenListViewInitialized'
			}
		}	
	},
	
	showingAnmeldungenListView: function() {
	},
	
	handleNavigationPushOrPop: function(nav, value, oldValue, eOpts) {
		if (value == this.getAnmeldungenWrapper()) {
			this.anmeldungenListViewShows();
		} else if (value == this.getAnmeldungenFuerKursView()) {
			this.anmeldungenFuerKursViewShows();
		} else if (value == this.getWODView()) {
			this.singleWODViewShows();
		}
		
		if (oldValue == this.getAnmeldungenWrapper()) {
			this.anmeldungenListViewHides();
		} else if (oldValue == this.getAnmeldungenFuerKursView()) {
			this.anmeldungenFuerKursViewHides();
		} else if (oldValue == this.getWODView()) {
		}
	},
	
	anmeldungenListViewHides: function() {
		this.getLogoutButton().hide();
	},
	
	anmeldungenFuerKursViewHides: function() {
		this.getShowWODButton().hide();
		this.getSignOffButton().hide();
		this.getRegisterButton().hide();
	},
	
	anmeldungenFuerKursViewShows: function() {
		this.setButtonsAccordingly();
		this.getShowWODButton().show();
	},
	
	singleWODViewShows: function() {
	},
	
	showWOD: function() {
		var singleWODStore = Ext.StoreMgr.get('SingleWODStore');
		
		var datum = this.getAnmeldungenFuerKursView().getData().getData().datum;
		
		singleWODStore.getProxy().setUrl('php/wodForDay.php?datum=' + datum);

		singleWODStore.load(function(records, operation, success) {
			if (records.length > 0) {
				var wod = records[0].getData();
				this.getAnmeldungenNav().push({
					xtype: 'WODView',
					flex: 1,
					html: wod.beschreibung
				});
			} else {
				Ext.Msg.alert('', 'noch kein WOD eingetragen f&uuml;r diesen Tag!', Ext.emptyFn, null);
			}
		}, this);
	},
	
	anmeldungenListViewInitialized: function(list, eOpts) {
		list.getScrollable().getScroller().on({
            scrollstart: function() {
				list.currentlyScrolling = true;
            }
		});

		list.getScrollable().getScroller().on('scrollend', function() {
	        var task = Ext.create('Ext.util.DelayedTask', function () {
				list.currentlyScrolling = false;
	        });
            task.delay(200);
		});
	},
	
	anmeldungenSegmentedButtonChanged: function(container, button, pressed) {
		var anmeldungenStore = Ext.StoreMgr.get('Anmeldungen');

		if (pressed && button.getText() == 'angemeldet') {
			anmeldungenStore.clearFilter();
			anmeldungenStore.filter([Ext.create('Ext.util.Filter', {property: "ichbinangemeldet", value: 1})]);
		} else if (pressed && button.getText() == 'freie Pl&auml;tze') {
			
			var filter = Ext.create('Ext.util.Filter', {
					filterFn: function(item) {
						var anmeldungen = item.get('anmeldungen');
						var teilnehmermax = item.get('teilnehmermax');
						var freiePlaetze = teilnehmermax - anmeldungen;
						return freiePlaetze > 0;
					}
				});
			
			anmeldungenStore.clearFilter();
			anmeldungenStore.filter(filter);
		} else if (pressed) {
			anmeldungenStore.clearFilter();
		}
		
		this.getAnmeldungenListView().getScrollable().getScroller().scrollTo(0, 0);
	},
	
	anmeldungenListViewShows: function() {
		if (this.getLogoutButton() != undefined) {
			this.getLogoutButton().show();
		}
		if (this.getRegisterButton() != undefined) {
			this.getRegisterButton().hide();
		}
		
		if (this.getSignOffButton() != undefined) {
			this.getSignOffButton().hide();
		}
		
		if (this.getShowWODButton() != undefined) {
			this.getShowWODButton().hide();
		}
		
		Crossfit.app.loadWochenUebersicht();
	},
	
	launch: function() {
	},
	
	logout: function() {
		Crossfit.app.fireEvent('authorizationFailed');
	},
	
	showAnmeldungenListDetailTap: function(list, index, target, record, e, eOpts) {
		this.showAnmeldungenListDetail(list, record, index);
	},
	
	showAnmeldungenListDetailDisclose: function(list, record, target, index, e, eOpts ) {
		this.showAnmeldungenListDetail(list, record, index);
	},
	
	showAnmeldungenListDetail: function(list, record, index) {
		Ext.each(Ext.ComponentQuery.query('anmeldungenListView'), function(object) {
			console.log('tttttttt');
		 	console.log(object.down('.x-list-item-body'));
		});
		
		return;
		
		if (list.currentlyScrolling) {
			return;
		}
		
		list.deselect(index);

		Ext.StoreMgr.get('AngemeldeteStore').getProxy().setUrl('php/anmeldungenFuerKurse.php?directlyCalled=1&benutzerId=' + Crossfit.app.getBenutzerId() + '&datum=' + record.data.datum + '&uhrzeit=' + record.data.beginn);
		
		Ext.StoreMgr.get('AngemeldeteStore').load(function(records, operation, success) {
			if (success || records.length == 0) {
				this.getAnmeldungenNav().push({
					xtype: 'anmeldungenFuerKursView',
					flex: 1,
					title: record.data.beginn.substring(0,5),
					data: record
				});
			
				this.getAnmeldungenFuerKursView().beginn = record.data.beginn;
				this.getAnmeldungenFuerKursView().datum = record.data.datum;
				this.getAnmeldungenFuerKursView().teilnehmermax = record.data.teilnehmermax;
				this.getAnmeldungenFuerKursView().kursid = record.data.kursid;
				this.getAnmeldungenFuerKursView().single = record.data.single;
				
				this.getAnmeldungenFuerKursView().records = records;

				this.setButtonsAccordingly();
			}
		}, this);
	},
	
	setButtonsAccordingly: function() {
		var records = this.getAnmeldungenFuerKursView().records;
		
		if (records != undefined) {
			var signupPossible = this.signupPossible(records);
			var signoutPossible = this.signoutPossible(records);
			
			if (signupPossible) {
				this.getRegisterButton().show();
				this.getSignOffButton().hide();
			} else if (signoutPossible) {
				this.getRegisterButton().hide();
				this.getSignOffButton().show();
				var anmeldung = this.getAnmeldungFromRecords(records);
				this.getSignOffButton().abmeldenKurseId = anmeldung.abmeldenKurseId;
			} else {
				this.getRegisterButton().hide();
				this.getSignOffButton().hide();
			}
		}
	},
	
	tryToLogin: function(button, e, eOpts) {
		// this.getLoginPanel().login();
	},
	
	getAnmeldungFromRecords: function(records) {
		for (var i = 0; i < records.length; i++) {
			var record = records[i].data;
			if (Crossfit.app.getBenutzerId() == record.benutzerid) {
				return record;
			}
		}
		
		return null;
	},
	
	showAlertIfNecessary: function(error) {
		if (error != null && error.length > 0) {
			Ext.Msg.alert('', error, Ext.emptyFn, null);
		}
	},
	
	signOff: function(button, e, eOpts) {
		var storeProxy = Ext.StoreMgr.get('AngemeldeteStore').getProxy();

		storeProxy.setUrl('php/abmelden.php?benutzerId=' + Crossfit.app.getBenutzerId() + '&datum=' + this.getAnmeldungenFuerKursView().datum + '&uhrzeit=' + this.getAnmeldungenFuerKursView().beginn + '&kursId=' + button.abmeldenKurseId);

		Ext.StoreMgr.get('AngemeldeteStore').load(function(records, operation, success) {
			if (records.length > 0) {
				var firstAngemeldeter = records[0];
				var errorMessage = firstAngemeldeter.getData().errorMessage;
				this.showAlertIfNecessary(errorMessage);
			}
			
			this.getAnmeldungenFuerKursView().records = records;
			
			this.setButtonsAccordingly();
		}, this);
	},
	
	registerCheck: function(button, e, eOpts) {
		var startDateIsInFuture = this.startDateIsInFuture(this.getAnmeldungenFuerKursView().datum);
		
		if (startDateIsInFuture) {
			this.register();
		} else {
			Ext.Msg.confirm("Willst du dich wirklich anmelden?", "Am selben Tag ist keine Abmeldung mehr möglich!", function(buttonId, value, opt) {
				if (buttonId == 'yes') {
					this.register();
				}
			}, this);
		}
	},
	
	register: function() {
		var storeProxy = Ext.StoreMgr.get('AngemeldeteStore').getProxy();
		storeProxy.setUrl('php/anmelden.php?kursId=' + this.getAnmeldungenFuerKursView().kursid + '&benutzerId=' + Crossfit.app.getBenutzerId() + '&datum=' + this.getAnmeldungenFuerKursView().datum + '&uhrzeit=' + this.getAnmeldungenFuerKursView().beginn + '&single=' + this.getAnmeldungenFuerKursView().single);
		
		Ext.StoreMgr.get('AngemeldeteStore').load(function(records, operation, success) {
			if (records.length > 0) {
				var firstAngemeldeter = records[0];
				var errorMessage = firstAngemeldeter.getData().errorMessage;
				this.showAlertIfNecessary(errorMessage);
			}
			
			this.getAnmeldungenFuerKursView().records = records;
			this.setButtonsAccordingly();
		}, this);
	},
	
	startDateIsInFuture: function(dateToCheck) {
		var anmeldungDate = Ext.Date.parse(dateToCheck, 'Y-m-d');

		var now = new Date();
		var nowStringWithoutTime = Ext.Date.format(now, 'Y-m-d');
		var nextDay = Ext.Date.parse(nowStringWithoutTime, 'Y-m-d');
		nextDay = Ext.Date.add(nextDay, Ext.Date.DAY, 1);
		
		return nextDay.getTime() <= anmeldungDate.getTime();
	},
	
	signupPossible: function(records) {
		// - not yet signed up
		// - empty places
		// - start date is in future

		var signedUp = null != this.getAnmeldungFromRecords(records);
		
		var emptyPlaces = records.length < this.getAnmeldungenFuerKursView().teilnehmermax;
		
		var now = new Date();
		var anmeldungDate = Ext.Date.parse(this.getAnmeldungenFuerKursView().datum + ' ' + this.getAnmeldungenFuerKursView().beginn, 'Y-m-d H:i:s');
		
		var startDateInFuture = now.getTime() < anmeldungDate.getTime();
		
		return !signedUp && emptyPlaces && startDateInFuture;
	},

	signoutPossible: function(records) {
		// - signed up
		// - date is after today
		var signedUp = null != this.getAnmeldungFromRecords(records);

		var startDateInFuture = this.startDateIsInFuture(this.getAnmeldungenFuerKursView().datum);

		return signedUp && startDateInFuture;
	}
});

