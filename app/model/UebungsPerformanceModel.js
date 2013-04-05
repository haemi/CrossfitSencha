Ext.define('Crossfit.model.UebungsPerformanceModel', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
		{name: 'kommentarid', type: 'string'},
		{name: 'id', type: 'string'},
		{name: 'uebungsid', type:'string'},
		{name: 'kg', type: 'int'},
		{name: 'wiederholungen', type: 'string'},
		{name: 'minuten', type: 'string'},
		{name: 'datum', type: 'string'},
		{name: 'sekunden', type: 'string'},
		{name: 'kommentar', type: 'string'},
		{name: 'cm', type: 'string'},
        {
            name: 'formattedDate',
            type: 'string',
            convert: function (value, record) {
				if (record.get('datum') != null) {
					return Ext.Date.format(Ext.Date.parse(record.get('datum'), 'Y-m-d'), 'd.m.Y');
				} else {
					return '';
				}
             }
        },
        {
            name: 'formattedTime',
            type: 'string',
            convert: function (value, record) {
				var minuten = record.get('minuten');
				var sekunden = record.get('sekunden');
				
				if (null == minuten) {
					minuten = 0;
				}
				
				if (null == sekunden) {
					sekunden = 0;
				}
				
				if (minuten > 0 || sekunden > 0) {
					if (sekunden < 10) {
						sekunden = '0' + sekunden;
					}
					return minuten + ':' + sekunden;
				} else {
					return '';
				}
             }
        },
		{
			name: 'formattedKommentar',
			type: 'string',
			convert: function (value, record) {
				var kommentarUnformatted = record.get('kommentar');
				
				if (kommentarUnformatted == null) {
					return '';
				}
				
				return Ext.util.Format.htmlDecode(kommentarUnformatted).replace(/<br\/>/g, "\n");
			}
		},
        {
            name: 'cellStyle',
            type: 'string',
            convert: function (value, record) {
				return 'text-align:center;float: left'; // ;border-width:0px 1px 0px 0px;border;border-style:solid;padding:5px
            }
        }
		]
	}
});
