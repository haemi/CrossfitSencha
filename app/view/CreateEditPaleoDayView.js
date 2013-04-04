Ext.define('Crossfit.view.CreateEditPaleoDayView', {
	extend: 'Ext.form.Panel',
	xtype: 'createEditPaleoDayView',
	requires: ['Ext.SegmentedButton', 'Ext.field.DatePicker', 'Ext.form.FieldSet', 'Ext.field.Number', 'Ext.field.Spinner'],
	config: {
		items: [
        {
            xtype: 'spinnerfield',
            label: 'Paleo Meals',
			itemId: 'wiederholungen',
		    minValue: 0,
		    maxValue: 3,
		    stepValue: 1,
		    cycle: true
        },
        {
            xtype: 'checkboxfield',
            label: 'Post WOD Meal',
			itemId: 'wiederholungen',
            name: 'wiederholungen'
        },
        {
            xtype: 'checkboxfield',
            label: 'Water',
			itemId: 'wiederholungen',
            name: 'wiederholungen'
        },
        {
            xtype: 'spinnerfield',
            label: 'Fish',
			itemId: 'wiederholungen',
            name: 'wiederholungen',
		    minValue: 0,
		    maxValue: 3,
		    stepValue: 1,
		    cycle: true
        },
        {
            xtype: 'checkboxfield',
            label: 'WOD',
			itemId: 'wiederholungen',
            name: 'wiederholungen'
        },
        {
            xtype: 'checkboxfield',
            label: 'Sleep',
			itemId: 'wiederholungen',
            name: 'wiederholungen',
        },
        {
            xtype: 'spinnerfield',
            label: 'Alcohol',
			itemId: 'wiederholungen',
            name: 'wiederholungen',
		    minValue: 0,
		    maxValue: 30,
		    stepValue: 1,
		    cycle: true
        },
        {
            xtype: 'spinnerfield',
            label: 'Cheats',
			itemId: 'wiederholungen',
            name: 'wiederholungen',
		    minValue: 0,
		    maxValue: 30,
		    stepValue: 1,
		    cycle: true
        },
        {
            xtype: 'checkboxfield',
            label: 'Gone Wild',
			itemId: 'wiederholungen',
            name: 'wiederholungen'
        },
        {
            xtype: 'panel',
            label: 'Daily points',
			itemId: 'wiederholungen'
        }
		]
	},
	initialize: function () {
		this.callParent(arguments);
	}
});
