Ext.define('Crossfit.store.MyWODs', {
   extend: 'Ext.data.Store',
   
   config: {
		sorters: ['datum'],
		model: 'Crossfit.model.MyWOD',
		autoLoad: 'true',
		data: [
			{ datum: 'Dienstag, 05. März 2013' },
			{ datum: 'Montag, 04. März 2013' },
			{ datum: 'Freitag, 01. März 2013' },
			{ datum: 'Samstag, 02. März 2013' },
			{ datum: 'Dienstag, 19. Februar 2013' }
        ]
   }
});