Ext.define('Crossfit.view.UebungenView', {
	extend: 'Ext.List',
	xtype: 'UebungenView',
	
	config: {
		title: 'Übungen',
		itemTpl: createUebungenViewItemTpl(),
		store: 'Uebungen',
		grouped: true,
		onItemDisclosure: false,
		disableSelection: true,
        allowDeselect: true,
		scrollToTopOnRefresh: false
	}
});

function createUebungenViewItemTpl() {
	var tpl = new Ext.XTemplate(
		'<strong>{name}</strong>',
		'<tpl if="anzahlPerformances &gt; 0">',
			'<div style="float:right;height:20px;width:40px;border-radius:7px;background-color:#537600;text-align:center;box-shadow: 1px 1px 2px #000;">{anzahlPerformances}</div>',
		'</tpl>'
	);
	return tpl;
}