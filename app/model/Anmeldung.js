Ext.define('Crossfit.model.Anmeldung', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
			{name: 'abmeldenKursId', type: 'int'},
			{name: 'anmeldungen', type: 'int'},
			{name: 'beginn', type: 'string'},
			{name: 'beschreibung', type: 'string'},
			{name: 'datum', type: 'string'},
			{name: 'ichbinangemeldet', type: 'int'},
			{name: 'id', type: 'int'},
			{name: 'kursid', type: 'string'},
			{name: 'single', type: 'string'},
			{name: 'teilnehmermax', type: 'int'},
	        {
	            name: 'formattedDate',
	            type: 'string',
	            convert: function (value, record) {
					if (record.get('datum') != null) {
						return Ext.Date.format(Ext.Date.parse(record.get('datum'), 'Y-m-d'), 'l, d.m.Y');
					} else {
						return '';
					}
	             }
	        },
	        {
	            name: 'timeWithoutSeconds',
	            type: 'string',
	            convert: function (value, record) {
					if (record.get('beginn') != null) {
						return Ext.Date.format(Ext.Date.parse(record.get('beginn'), 'H:i:s'), 'H:i');
					} else {
						return '';
					}
	             }
	        }
		]
	}
});