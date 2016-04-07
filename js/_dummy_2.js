var EditDataCustom = (function () {
	
	var _loadCustDT = function (params) {
		var 
		// DT Buttons Text
		_dtBtnNewTxt = '<i class="fa fa-plus"></i> New',
		_dtBtnEditTxt = '<i class="fa fa-pencil"></i> Edit',
		_dtBtnDelTxt = '<i class="fa fa-trash-o"></i> Delete',
		_dtBtnPrintTxt = '<i class="glyphicon glyphicon-print"></i> Print',
		_dtBtnSrchTxt = '<i class="fa fa-search"></i> Search',
		
		// Modal Form Options
		_modalFrmContent = $('<div></div>').load(params.frm_html),
		_modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.report_title,
		_modalEditTitle = '<i class="fa fa-pencil"></i> Edit ' + params.report_title,
		
		// Panel Options
		_destPanelTitle = '<i class="fa fa-map-marker"></i> <strong>Destination Data</strong>',
		_prodPanelTitle = '<i class="fa fa-product-hunt"></i> <strong>Product Data</strong>',
		
		// Modal Buttons Object
		_modalBtnSave = {
			label: 'Save',
			cssClass: 'btn-primary',
			icon: 'fa fa-floppy-o',
			action: _btnSaveAction
		};/*,
		_modalBtnCancel = {
			label: 'Cancel',
			icon: 'fa fa-ban',
			action: function(dialogItself) {
				BootstrapDialog.closeAll();	
				dt.ajax.reload();
				dt.button('edit:name').disable();
				dt.button('delete:name').disable();	
			}
		},
		
		// DT Buttons Object
		_dtBtnNew = {		
			name: 'new',
			text: _dtBtnNewTxt,						
			action: function(e, dt, node, config) {
				BootstrapDialog.show({
					closable: false,
					title: _modalNewTitle,
					message: _modalFrmContent,
					onshown: _btnNewOnShown,
					buttons: [_modalBtnSave, _modalBtnCancel]
				});
			}			
		},
		_dtBtnEdit = {	
			name: 'edit',
			enabled: false,
			text: _dtBtnEditTxt,				
			action: function(e, dt, node, config) {
				BootstrapDialog.show({
					closable: false,
					title: _modalEditTitle,
					message: _modalFrmContent,
					onshown: _btnEditOnShown,
					buttons: [_modalBtnSave, _modalBtnCancel]
				});
			}			
		},
		_dtBtnDelete = {	
			name: 'delete',
			enabled: false,
			text: _dtBtnDelTxt,						
			action: _btnDeleteAction	
		},
		_dtBtnPrint = {						
			name: 'print',
			extend: 'print',				
			enabled: false,
			autoPrint: true,
			text: _dtBtnPrintTxt,							
			customize: customPrintData,
			title: params.report_title
		},
		_dtBtnSearch = {	
			name: 'search',
			enabled: true,
			text: _dtBtnSrchTxt,						
			action: _btnSearchAction	
		};
		
		// Show only required buttons
		var _dtBtns = params.dt_btns_all ? [_dtBtnNew, _dtBtnEdit, _dtBtnDelete, _dtBtnPrint, _dtBtnSearch]
			: [_dtBtnDelete, _dtBtnPrint, _dtBtnSearch];*/
	};
	
	// New & Edit Button Action 
	var _btnSaveAction = function(dialogRef) {
		var wsPost = '',			
			postString = '',
			JSONString = '',
			JSONObject = {},
			infoMessage = '',
			modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field]'),
			pkId = $('input[data-field="' + params.pk_id + '"]');

		if (pkId.val() != '') {
			wsPost = params.ws_update;
			infoTitle = MSG_EDIT_REC_TITLE;
			infoMessage = MSG_EDIT_REC_INFO;
		} else {
			wsPost = params.ws_insert;
			infoTitle = MSG_ADD_REC_TITLE;			
			infoMessage = MSG_ADD_REC_INFO;
		}
		
		$.each(elements, function(idx, elem) {
			var input = $(elem), 	
				inputValue = input.val(),
				inputField = input.attr('data-field');						
			postString = '{"' + inputField + '":"' + inputValue + '"}';
			$.extend(JSONObject, $.parseJSON(postString)); 
		});	
		
		JSONString = params.root_node + '=' + JSON.stringify(JSONObject);	
		
		$.post(wsPost, JSONString, function(data, status) {
			BootstrapDialog.closeAll();	
			dt.ajax.reload();	
			dt.button('edit:name').disable();
			dt.button('delete:name').disable();		
			BootstrapDialog.alert({
				title: infoTitle,
				message: infoMessage,	
				type: BootstrapDialog.TYPE_PRIMARY,
				callback: function(result) {
					BootstrapDialog.closeAll();								
				}
			});				
		});
		
	};
	
	var init = function (params) {
		console.log('public!');
		_loadCustDT(params);
	};
	
	return {
		init: init
	}
})();



//console.log(EditDataCustom.test);
	EditDataCustom.init({
		pk_id: 'cust_id',
		root_node: 'custInfo',
		report_title: 'Customer Data',
		frm_html: FORM_CUSTOMER_DATA,
		dt_btns_all: true,
		dt_cd: CD_CUSTOMER_LIST,
		dt_ds: DS_CUSTOMER_LIST,
		ws_list: WS_CUSTOMER_LIST,
		ws_insert: WS_CUSTOMER_INSERT,
		ws_update: WS_CUSTOMER_UPDATE,
		ws_delete: WS_CUSTOMER_DELETE
	});