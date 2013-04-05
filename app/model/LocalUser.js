Ext.define('Crossfit.model.LocalUser', {
    extend: 'Ext.data.Model',
    config: {
		identifier: {
	    	type: 'uuid'
		},
        fields: [
		{
        	name: 'benutzerid',
			type: 'int'
        },
		{
			name: 'email',
			type: 'string'
		},
		{
			name: 'password',
			type: 'string'
		}
		],
        proxy: {
            type: 'localstorage',
            id  : 'localUser'
        }
    }
});