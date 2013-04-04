Ext.define('Crossfit.view.AnmeldungenListView', {
	extend: 'Ext.List',
	xtype: 'anmeldungenListView',
	
	config: {
		itemTpl: createItemTpl(),
		store: 'Anmeldungen',
		scrollToTopOnRefresh: false,
		grouped: true,
		onItemDisclosure: false,
		disableSelection: true,
        allowDeselect: true,
		cls: 'angemeldeteList'
	}
});

function createItemTpl() {
	console.log('test');
	var tpl = new Ext.XTemplate(
		'<tpl if="ichbinangemeldet">',
<<<<<<< .mine
			'<div style="padding:10px;background-color:rgba(169, 180, 14, 1.0);border-radius:10px;" class="angemeldetRow"><strong>{timeWithoutSeconds} (angemeldet)</strong>',
			//'<div style="padding:10px;"><strong>{timeWithoutSeconds} (angemeldet)</strong>',
=======
			'<div style="padding:10px;background-color:#A9B40E;border-radius:10px;"><strong>{timeWithoutSeconds} (angemeldet)</strong>',
>>>>>>> .r66
		'<tpl else>',
			'<div style="padding:10px"><strong>{timeWithoutSeconds}</strong>',
		'</tpl>',
		'<br />{beschreibung}',
		'<tpl if="ichbinangemeldet || anmeldungen &lt; teilnehmermax">',
			'<div style="float:right;height:20px;width:40px;border-radius:7px;background-color:#537600;text-align:center;box-shadow: 1px 1px 2px #000;font-size:12px;">{anmeldungen}/{teilnehmermax}</div>',
		'<tpl else>',
			'<div style="float:right;height:20px;width:40px;border-radius:7px;background-color:#f00;text-align:center;box-shadow: 1px 1px 2px #000;font-size:12px;">{anmeldungen}/{teilnehmermax}</div>',
		'</div></tpl>'
	);
	return tpl;
}