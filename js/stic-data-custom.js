// Customer Data
function loadCustomerData(params) {
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

		// Modal Buttons Object
		_modalBtnSave = {
			label: 'Save',
			cssClass: 'btn-primary',
			icon: 'fa fa-floppy-o',
			action: _btnSaveAction
		},
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

	// Trigger on New Modal OnShown
	function _btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field]');
		$.each(elements, function(idx, elem) { $(elem).val(''); });
	}

	// Trigger on Edit Modal OnShown
	function _btnEditOnShown(dialogRef) {
		var rowData = dt.row('.selected').data(),
			modalBody = dialogRef.getModalBody();
		$.each(rowData, function(name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
		});
	}

	// New & Edit Button Action
	function _btnSaveAction(dialogRef) {
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
	}

	// Delete Button Action
	function _btnDeleteAction(e, dt, node, config) {
		BootstrapDialog.confirm({
			title: MSG_TITLE_CONFIRM_DELETE,
			message: MSG_CONFIRM_DELETE_RECORD,
			type: BootstrapDialog.TYPE_DANGER,
			callback: function(result) {
				if (result) {
					var pkIdVal = dt.cell('.selected', 0).data(),
						postData = $.parseJSON('{"' + params.pk_id + '":"' + pkIdVal + '"}');
					$.ajax({
						method: 'POST',
						url: params.ws_delete,
						data: postData
					}).done(function(a) {
						dt.ajax.reload();
						dt.button('edit:name').disable();
						dt.button('delete:name').disable();
						BootstrapDialog.alert({
							title: MSG_INFO_TITLE,
							message: MSG_DEL_REC_INFO,
							type: BootstrapDialog.TYPE_PRIMARY,
							callback: function() {
								BootstrapDialog.closeAll();
							}
						});
					}).fail(function() {
						dt.ajax.reload();
						dt.button('edit:name').disable();
						dt.button('delete:name').disable();
						BootstrapDialog.alert({
							title: MSG_WS_ERROR_TITLE,
							message: MSG_WS_ERROR_INFO,
							type: BootstrapDialog.TYPE_DANGER,
							callback: function() {
								BootstrapDialog.closeAll();
							}
						});
					});
				} else {
					dt.ajax.reload();
					dt.button('edit:name').disable();
					dt.button('delete:name').disable();
				}
			}
		});
	}

	// Search Button Action
	function _btnSearchAction() {
		BootstrapDialog.alert({
			title: '<i class="fa fa-search"></i> Search',
			message: 'Search form goes here...',
			type: BootstrapDialog.TYPE_PRIMARY,
			callback: function(result) {
				BootstrapDialog.closeAll();
				dt.ajax.reload();
			}
		});
	}

	// Customize Print Preview
	function customPrintData(win) {
		$(win.document.body)
			.css('background', 'transparent')
			.css('font-weight', 'normal')
			.css('font-family', '"Trebuchet MS", Helvetica, sans-serif');
		// Title
		$(win.document.body).find('h1')
			.css('font-size', '16pt')
			.css('text-align', 'center');
		// Message
		$(win.document.body).find('div')
			.css('font-size', '11pt')
			.css('text-align', 'left')
			.css('margin', '20px 0px 15px 0px');
		// Data Table
		$(win.document.body).find('table')
			.removeClass('display')
			.removeClass('compact');
		$(win.document.body).find('table th')
			.css('font-size', '11pt')
			.css('text-align', 'left')
			.css('padding-left', '0px');
		$(win.document.body).find('table td')
			.css('font-size', '10pt')
			.css('text-align', 'left')
			.css('padding-left', '0px')
			.css('padding-top', '10px')
			.css('padding-bottom', '10px')
			.css('font-weight', 'normal');
	}

	// DT Initialization
	var dt = $('#table-customer')
		.DataTable({
			ordering: false,
			searching: false,
			processing: true,
			lengthChange: false,
			dom: '<"dt-toolbar">Brtip',
			pageLength: 5,
			columns: params.dt_cd,
			ajax: { url: params.ws_list, dataSrc: params.dt_ds },
			buttons: [_dtBtnNew, _dtBtnEdit, _dtBtnDelete, _dtBtnPrint, _dtBtnSearch]
		})
		.on('draw.dt', function (e, settings, data) {
			dt.data().length > 0 ? dt.button('print:name').enable()
				: dt.button('print:name').disable()
		});

	return dt;
};

