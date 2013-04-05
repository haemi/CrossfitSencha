Ext.define('Crossfit.store.LocalUserStore', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.LocalStorage',
		'Ext.data.identifier.Uuid'
	],
	xtype: 'localUserStore',
	
	config: {
		model: 'Crossfit.model.LocalUser',
		autoLoad: true,
		autoSync: true
	}
});