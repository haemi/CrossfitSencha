Ext.define('Crossfit.model.Angemeldeter', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
		{name: 'vorname', type: 'string'},
		{name: 'nachname', type: 'string'},
		{name: 'displayName', type: 'string'},
		{name: 'benutzerid', type: 'string'},
		{name: 'abmeldenKurseId', type: 'string'},
		{name: 'errorMessage', type: 'string'}
		]
	}
});