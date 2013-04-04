Ext.define('Crossfit.model.PaleoDay', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
		{name: 'datum', type: 'date', dateFormat: 'Y-m-d'},
        {
            name: 'formattedDate',
            type: 'string',
            convert: function (value, record) {
				if (record.get('datum') != null) {
					return Ext.Date.format(record.get('datum'), 'd.m.Y');
				} else {
					return '';
				}
             }
        },
		]
	}
});