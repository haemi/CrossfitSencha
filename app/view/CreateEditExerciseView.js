Ext.define('Crossfit.view.CreateEditExerciseView', {
	extend: 'Ext.form.Panel',
	xtype: 'createEditExerciseView',
	requires: ['Ext.SegmentedButton', 'Ext.field.DatePicker', 'Ext.form.FieldSet', 'Ext.field.Number'],
	config: {
		items: [
        {
            xtype: 'numberfield',
            label: 'Reps',
			itemId: 'wiederholungen',
            name: 'wiederholungen',
            placeHolder: 'Anzahl'
        },
        {
            xtype: 'numberfield',
            label: 'Gewicht',
			itemId: 'gewicht',
            name: 'gewicht',
            placeHolder: 'kg'
        },
		{
			xtype: 'numberfield',
			label: 'Minuten',
			itemId: 'minuten',
			name: 'dauerMin'
		},
		{
			xtype: 'numberfield',
			label: 'Sekunden',
			itemId: 'sekunden',
			name: 'dauerSec'
		},
        {
			xtype: 'numberfield',
			label: 'Meter',
			itemId: 'meter',
			name: 'weiteHoehe'
        },
        {
			xtype: 'numberfield',
			label: 'Zentimeter',
			itemId: 'centimeter',
			name: 'weiteHoehe'
        },
		{
			xtype: 'datepickerfield',
			destroyPickerOnHide: true,
			name : 'date',
			label: 'Datum',
			itemId: 'datum',
			value: new Date(),
			picker: {
				yearFrom: 2012,
				yearTo: 2020
			}
		},
		{
			xtype: 'textareafield',
			label: 'Kommentar',
			itemId: 'kommentar',
			maxRows: 4,
			name: 'kommentar',
			padding: 10,
			autoCorrect: false
		}
		]
	},
	initialize: function () {
		this.callParent(arguments);
		
		var wiederholungen = Ext.ComponentQuery.query('#wiederholungen')[0];
		var gewicht = Ext.ComponentQuery.query('#gewicht')[0];
		var sekunden = Ext.ComponentQuery.query('#sekunden')[0];
		var minuten = Ext.ComponentQuery.query('#minuten')[0];
		var datum = Ext.ComponentQuery.query('#datum')[0];
		var kommentar = Ext.ComponentQuery.query('#kommentar')[0];
		var meter = Ext.ComponentQuery.query('#meter')[0];
		var centimeter = Ext.ComponentQuery.query('#centimeter')[0];
	
		wiederholungen.setValue(this.getData().wiederholungen);
		gewicht.setValue(this.getData().kg);
		sekunden.setValue(this.getData().sekunden);
		minuten.setValue(this.getData().minuten);
		
		if (this.getData().cm) {
			meter.setValue(this.floor(this.getData().cm / 100));
			centimeter.setValue(this.getData().cm % 100);
		}
		
		if (this.getData().datum != null) {
			var datumToSet = Ext.Date.parse(this.getData().datum, 'Y-m-d');
			datum.setValue(datumToSet);
		}

		if (this.getData().kommentar != null) {
			var kommentarText = Ext.util.Format.htmlDecode(this.getData().kommentar).replace(/<br\/>/g, "\n");
		
			kommentar.setValue(kommentarText);
		}
	},
	floor: function(value) {
		return value | 0;
	}
});