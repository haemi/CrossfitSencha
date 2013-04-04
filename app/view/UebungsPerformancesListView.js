Ext.define('Crossfit.view.UebungsPerformancesListView', {
	extend: 'Ext.List',
	xtype: 'UebungsPerformancesListView',

	config: {
		title: '',
		emptyText: 'du hast f&uuml;r diese &Uuml;bung noch keine Ergebnisse erfasst',
		itemTpl: createUebungenItemTpl(),
		store: 'UebungsPerformanceStore',
        allowDeselect: true,
		cls: 'smaller-font-in-list',
		disableSelection: true,
		grouped: true
	}
});

function createUebungenItemTpl() {
	var tpl = new Ext.XTemplate(
		'<tpl if="kg">',
			'<div style="width: 15%;{cellStyle}">{kg} kg</div>',
		'<tpl else>',
			'<div style="width: 15%;{cellStyle}">-</div>',
		'</tpl>',
		'<tpl if="wiederholungen">',
			'<div style="width: 15%;{cellStyle}">{wiederholungen}x</div>',
		'<tpl else>',
			'<div style="width: 15%;{cellStyle}">-</div>',
		'</tpl>',
		'<div style="width: 15%;{cellStyle}">{formattedTime}</div>',
		'<tpl if="cm">',
			'<tpl if="cm &gt; 100">',
				'<div style="width: 15%;{cellStyle}">{cm/100} m</div>',
			'<tpl else>',
				'<div style="width: 15%;{cellStyle}">{cm} cm</div>',
			'</tpl>',
		'<tpl else>',
			'<div style="width: 15%;{cellStyle}">-</div>',
		'</tpl>',
		'<div style="width: 40%;{cellStyle}">{formattedKommentar}</div>',
		{
			formatDate: function(dateToFormat) {
				return Ext.Date.format(Ext.Date.parse(dateToFormat, 'Y-m-d'), 'd.m.Y');
			}
		}
	);
	return tpl;
}