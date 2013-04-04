Ext.define('Crossfit.controller.MyWODsController', {
	extend: 'Ext.app.Controller',
	
	config: {
		views: [
			'MyWODsWrapperView',
			'MyWodsView',
			'MyWODDetail',
			'MyWODDetail'
		],
		refs: {
			myWODsNav: 'MyWODsWrapperView',
			myWODDetail: 'myWODDetail',
			saveWODButton: '#saveMyWODButton',
			myWODsViewList: 'myWODsViewList'
		},
		control: {
			'button[action=saveMyWOD]': {
				tap: 'saveWodDetail'	
			},
			'myWODsViewList': {
				disclose: 'showMyWODDetailDisclose',
				itemtap: 'showMyWODDetailTap'
			},
			'MyWODsWrapperView' : {
				activeitemchange: 'handleMyWODNavigationPushOrPop'
			},
			'MyWODsWrapperView searchfield' : {
				keyup: 'searchMyWODsKeyUp',
				clearicontap: 'searchMyWODsClearIconTap'
			}
		}
	},
	
	handleMyWODNavigationPushOrPop: function(nav, value, oldValue, eOpts) {
		console.log(value);
		console.log(oldValue);

		if (value == this.getMyWODsViewList()) {
			this.getApplication().getController('MyWODsController').loadMyWODs();
		}
		
		if (oldValue == this.getMyWODDetail()) {
			this.getSaveWODButton().hide();	
		}
	},
	
	searchMyWODsKeyUp: function(searchfield, e, eOpts) {
		this.searchMyWODs(searchfield.getValue());
	},
	
	searchMyWODsClearIconTap: function(searchfield, e, eOpts) {
		this.searchMyWODs('');
	},
	
	searchMyWODs: function(text) {
		var store = Ext.StoreMgr.get('MyWODStore');
		
		store.clearFilter();
		
		store.filter(function(record) {
			var beschreibung = record.get('beschreibung');
			
			if (null == beschreibung) {
				return false;
			} else {
				return beschreibung.toLowerCase().indexOf(text.toLowerCase()) !== -1;
			}
		});
	},
	
	showMyWODDetailTap: function(list, index, target, record, e, eOpts) {
		this.showMyWODDetail(list, record, index);
	},
	
	showMyWODDetailDisclose: function(list, record, target, index, e, eOpts ) {
		this.showMyWODDetail(list, record, index);
	},
	
	showMyWODDetail: function(list, record, index) {
		if (list.currentlyScrolling) {
			return;
		}

		list.deselect(index);
		
		var store = Ext.StoreMgr.get('MyWODDetailStore');
		
		store.getProxy().setUrl('php/wodDetail.php?&benutzerId=' + Crossfit.app.getBenutzerId() + '&datum=' + record.getData().datum);

		store.load(function(records, operation, success) {
			if (success && records.length > 0) {
				records[0].getData().datum = record.data.datum;
				this.getSaveWODButton().show();
				
				this.getMyWODsNav().push({
	   		 		xtype: 'myWODDetail',
					title: record.data.datum,
					data: records[0].data
				 });
			}
		}, this);
	},
	
	saveWodDetail: function(nav, view, eOpts ) {
		
		var record = this.getMyWODDetail().getData();
		var isNew = record.wodDetailId == undefined || record.wodDetailId == 0;
		
		var kommentar = Ext.ComponentQuery.query('#kommentar')[0].getValue().replace(/\n/g, "<br/>");
		
		var segmentedButtons = Ext.ComponentQuery.query('#prButtons')[0];
		
		var isPR = segmentedButtons.isPressed(Ext.ComponentQuery.query('#prButtons')[0].getItems().get(1));
		
		isPR = isPR == true ? '1' : '0';
		
		var benutzerId = Crossfit.app.getBenutzerId() || '';

		var datum = record.datum;
		
		if (isNew) {
			url = 'php/createKursKommentar.php?benutzerid=' + benutzerId + '&kommentar=' + kommentar + '&datum=' + datum + '&isPR=' + isPR;
		} else {
			url = 'php/changeKursKommentar.php?id=' + record.wodDetailId + '&benutzerid=' + benutzerId + '&kommentar=' + kommentar + '&datum=' + datum + '&isPR=' + isPR;
		}
		
		var myWODsNav = this.getMyWODsNav();
		
		Ext.Ajax.request(
			{
				url: url,
				
				callback: function(options, success, response) {
					if (response.status == 200) {
						myWODsNav.pop(1);
						Ext.Msg.alert('', response.responseText, Ext.emptyFn, null);
					}
				}
		}, this);
	},

	loadMyWODs: function() {
		var store = Ext.StoreManager.get('MyWODStore');
		
		store.getProxy().setExtraParams({
			'benutzerId': Crossfit.app.getBenutzerId()
		});
		
		store.load();
	}
});
