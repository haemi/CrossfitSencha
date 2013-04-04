Ext.define('Crossfit.view.MyWodsView', {
	extend: 'Ext.List',
	xtype: 'myWODsViewList',
	
	config: {
		title: 'My WODs',
		itemTpl: createMyWODTemplate(),
		store: 'MyWODStore',
		onItemDisclosure: false,
		disableSelection: true,
        allowDeselect: true
	}
});

function createMyWODTemplate() {
	var tpl = new Ext.XTemplate(
		'<strong>{datum}</strong>',
		'<tpl if="hatKommentar &gt; 0">',
			'<div style="float:right;margin-right:5px;height:20px;width:100px;border-radius:7px;background-color:#537600;text-align:center;box-shadow: 1px 1px 2px #000;">Kommentar</div>',
		'</tpl>',
		'<tpl if="isPR &gt; 0">',
			'<div style="float:right;margin-right:5px;height:20px;width:40px;border-radius:7px;background-color:#f00;text-align:center;box-shadow: 1px 1px 2px #000;">PR</div>',
		'</tpl>'
	);
	return tpl;
}