//
var EditData = function(params) {
	// DT options
	this.dtDs = params.dt.ds;
	this.dtCd = params.dt.cd;
	this.dtDomId = params.dt.domId;
	this.dtTools = params.dt.tools;
	this.pgLngth = DEFAULT_PAGE_LENGTH;
	
	// WS URL
	this.wsList = params.ws.list;
	this.wsCreate = params.ws.create;
	this.wsUpdate = params.ws.update;
	this.wsRemove = params.ws.remove;
	
	// Form Settings
	this.formPath = params.form.path;
	this.formData = params.form.data;
	
	// DT Buttons
	this.btnNewTxt = '<i class="fa fa-plus"></i> New';
	this.btnEditTxt = '<i class="fa fa-plus"></i> Edit';
	
	// Modal Form options 
	this.formContent = $('<div></div>').load(this.formPath);
	this.formTitleNew = '<i class="fa fa-plus"></i> New ' + this.formData;
	this.formTitleEdit = '<i class="fa fa-pencil"></i> Edit ' + this.formData;
};

// DT New Button
EditData.prototype.btnNew = {	
	text: this.btnNewTxt,		
	className: 'btn-primary',		
	action: function(e, dt, node, config) {
		BootstrapDialog.show({
			closable: false,
			title: this.formTitleNew,	
			message: this.formContent,					
			onshown: function(dialogRef) {
				console.log('New Supplier Window Event: onshown');
			},
			buttons: [{
				label: 'Save Changes',
				cssClass: 'btn-primary',
				icon: 'fa fa-floppy-o',
				action: function() {
					console.log('New Supplier Window: form action...');								
				}
			}, {
				label: 'Cancel',
				icon: 'fa fa-ban',
				action: function(dialogItself) {
					BootstrapDialog.closeAll();							
				}
			}]
		});
	}			
};

// DT Edit Button
EditData.prototype.btnEdit = {		
	text: this.btnEditTxt,	
	className: 'btn-primary',	
	action: function(e, dt, node, config) {
		BootstrapDialog.show({
			closable: false,
			title: this.formTitleEdit,	
			message: this.formContent,					
			onshown: function(dialogRef) {
				console.log('Edit Supplier Window Event: onshown');
			},
			buttons: [{
				label: 'Save Changes',
				cssClass: 'btn-primary',
				icon: 'fa fa-floppy-o',
				action: function() {
					console.log('Edit Supplier Window: form action...');								
				}
			}, {
				label: 'Cancel',
				icon: 'fa fa-ban',
				action: function(dialogItself) {
					BootstrapDialog.closeAll();							
				}
			}]
		});
	}			
};

// DT Initial
EditData.prototype.initDT = function() {
	this.dtObj = $('#' + this.dtDomId)
		.DataTable({			
			ordering: false,
			searching: false,
			processing: true,
			lengthChange: false,			
			columns: this.dtCd,
			pageLength: this.pgLngth,
			dom: '<"dt-toolbar">Brtip',
			ajax: { url: this.wsList, dataSrc: this.dtDs },
			buttons: [ this.btnNew, this.btnEdit ]
		});
};