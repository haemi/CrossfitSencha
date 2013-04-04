Ext.define('Crossfit.view.PaleoDaysListView', {
	extend: 'Ext.List',
	xtype: 'paleoDaysListView',
	
	config: {
		title: 'Paleo',
		itemTpl: createPaleoDaysListViewItemTpl(),
		store: 'PaleoDaysStore',
		onItemDisclosure: false,
		disableSelection: true,
        allowDeselect: true,
		scrollToTopOnRefresh: false
	}
});

function createPaleoDaysListViewItemTpl() {
	var tpl = new Ext.XTemplate(
		'<strong>{formattedDate}</strong>'
	);
	return tpl;
}