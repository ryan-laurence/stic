/**
 * @summary				EditData for User Details
 * @file					stic-data-user.js
 * @required			JQuery & Bootstrap Core, JQuery DataTables & STIC Functions
 */

/**
  * @desc
	* 	Loads the Data Entry page for User Details with CRUD functions & DataTables integration
  * @params
	*		{String} pkey : Field Id used for CRUD process
	*		{String} objectId : Extra field used for insert & update
	*		{String} modTitle : Module Title for headers and printing
	*		{Boolean} showAllBtns : Flag to show all DataTables buttons or not
	*		{String} formId : DOM Id or Selector for Data Entry form
	*		{String} formSrc : HTML Form location
	*		{Object} cd : Column Definitions for DataTables
	*		{String} ds : Data Source for DataTables
	*		{String} wsList : Web Service for Listing records
	*		{String} wsInsert : Web Service for Inserting records
	*		{String} wsUpdate : Web Service for Updating records
	*		{String} wsDelete : Web Service for Deleting records
*/
function loadEditData(params) {
	var
		// DT Buttons Text
		dtBtnNewTxt = '<i class="fa fa-plus"></i> New',
		dtBtnEditTxt = '<i class="fa fa-pencil"></i> Edit',
		dtBtnDelTxt = '<i class="fa fa-trash-o"></i> Delete',
		dtBtnRelTxt = '<i class="fa fa-refresh"></i> Refresh',
		dtBtnPrintTxt = '<i class="glyphicon glyphicon-print"></i> Print',

		// Modal Form Options
		modalFrmContent = $('<div></div>').load(params.formSrc),
		modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.modTitle,
		modalEditTitle = '<i class="fa fa-pencil"></i> Edit ' + params.modTitle,

		// Modal Buttons Object
		modalBtnSave = {
			label: 'Save',
			icon: 'fa fa-floppy-o',
			cssClass: 'btn-primary',
			action: btnSaveAction
		},
		modalBtnCancel = {
			label: 'Cancel',
			icon: 'fa fa-ban',
			cssClass: 'btn-primary',
			action: function(dialogItself) {
				BootstrapDialog.closeAll();
			}
		},

		// DT Buttons Object
		dtBtnNew = {
			name: 'new',
			text: dtBtnNewTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				BootstrapDialog.show({
					closable: false,
					title: modalNewTitle,
					message: modalFrmContent,
					onshown: btnNewOnShown,
					onhidden: btnOnHidden,
					buttons: [modalBtnSave, modalBtnCancel]
				});
			}
		},
		dtBtnEdit = {
			name: 'edit',
			enabled: false,
			text: dtBtnEditTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				BootstrapDialog.show({
					closable: false,
					title: modalEditTitle,
					message: modalFrmContent,
					onshown: btnEditOnShown,
					onhidden: btnOnHidden,
					buttons: [modalBtnSave, modalBtnCancel]
				});
			}
		},
		dtBtnDelete = {
			name: 'delete',
			enabled: false,
			text: dtBtnDelTxt,
			className: 'btn-primary',
			action: btnDeleteAction
		},
		dtBtnPrint = {
			name: 'print',
			extend: 'print',
			enabled: false,
			autoPrint: true,
			text: dtBtnPrintTxt,
			className: 'btn-primary',
			customize: customPrintData,
			title: params.modTitle
		},
		dtBtnReload = {
			name: 'reload',
			text: dtBtnRelTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				reloadDT();
			}
		};

	// Show only required buttons
	var dtBtns = params.showAllBtns ? [dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnPrint, dtBtnReload]
		: [dtBtnDelete, dtBtnPrint, dtBtnReload];

	// Destroy Input & Select
	var destroyRoleField = function() {
		$('input[data-field="role_id"]').remove();
		$('input[data-field="role_name"]').remove();
		$('select[data-field="role_id"]').selectpicker('destroy');
		$('select[data-field="role_id"]').remove();
		$('input[data-field="user_name"]').prop('disabled', false);
	};

	// Create Role Input
	var newRoleInputField = function(params) {
		var container = params.container,
			defaultId = params.defaultId,
			defaultVal = params.defaultVal;
		container.append('<input type="text" class="form-control" value="' +
			defaultVal + '" data-field="role_name" disabled>');
		container.append('<input type="hidden" value="' +
			defaultId + '" data-field="role_id">');
	};

	// Create Role Select
	var newRoleSelectField = function(params) {
		var JSONUrl = params.JSONUrl,
			JSONData = params.JSONData,
			container = params.container,
			defaultId = params.defaultId,
			defaultVal = params.defaultVal;
		$.getJSON(JSONUrl, function(data) {
			var options = [];
			$.each(data.response, function(a, b) {
				if (a == JSONData) {
					$.each(b, function(c, d) {
						$.each(d, function(e, f) {
							options.push('<option value="' + f.role_id + '">' + f.role_name + '</option>');
						});
					});
				}
			});
			destroyRoleField();
			container.append('<select class="form-control" ' +
					'title="-" ' +
					'data-field="role_id" ' +
					'data-size="5" ' +
					'data-live-search="true" ' +
					'data-fv-notempty="true" ' +
					'data-fv-notempty-msg="Role Name is required.">' +
					options.join('') +
				'</select>');
			$('select[data-field="role_id"]').val(defaultId);
			$('select[data-field="role_id"]').selectpicker('refresh');
			$('select[data-field="role_id"]').selectpicker('val', defaultId);
		});
	};

	// Trigger on New Modal OnShown
	function btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field], select[data-field]');
		$.each(elements, function(idx, elem) { $(elem).val(''); });
		destroyRoleField();
		newRoleSelectField({
			JSONUrl: WS_LIST_ROLES,
			JSONData: 'report-list',
			container: $('#role-box'),
			defaultId: '',
			defaultVal: ''
		});
	}

	// Trigger on Edit Modal OnShown
	function btnEditOnShown(dialogRef) {
		var container = $('#role-box'),
			rowData = dt.row('.selected').data(),
			defaultId = rowData.role_id,
			defaultVal = rowData.role_name,
			modalBody = dialogRef.getModalBody();
		$.each(rowData, function(name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
			modalBody.find('select[data-field="' + name + '"]').val(value);
		});
		modalBody.find('input[data-field="user_password"]').val('');
		destroyRoleField();
		if (defaultId != '1') {
			newRoleSelectField({
				JSONUrl: WS_LIST_ROLES,
				JSONData: 'report-list',
				container: container,
				defaultId: defaultId,
				defaultVal: defaultVal
			});
		} else {
			modalBody.find('input[data-field="user_name"]').prop('disabled', true);
			newRoleInputField({
				container: container,
				defaultId: defaultId,
				defaultVal: defaultVal
			});
		}
	}

	// Trigger on Modal OnHidden
	function btnOnHidden(dialogRef) {
		reloadDT();
		var modalBody = dialogRef.getModalBody();
		modalBody.find('input[data-field="user_name"]').prop('disabled', false);
		$(params.formId).find('input[data-field]').val('');
		$(params.formId).find('select[data-field]').val('');
		STIC.FormValidation({ formId: params.formId, clearHelpBlocks: true });
		destroyRoleField();
	}

	// New & Edit Button Action
	function btnSaveAction(dialogRef) {
		var isValid = STIC.FormValidation({ formId: params.formId });
		if (isValid) {
			var wsPost = '',
				postString = '',
				JSONString = '',
				JSONObject = {},
				infoMessage = '',
				modalBody = dialogRef.getModalBody(),
				pkey = $('input[data-field="' + params.pkey + '"]'),
				elements = modalBody.find('input[data-field], select[data-field]');
			if (pkey.val() != '') {
				wsPost = params.wsUpdate;
				infoTitle = MSG_EDIT_REC_TITLE;
				infoMessage = MSG_EDIT_REC_INFO;
			} else {
				wsPost = params.wsInsert;
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
			JSONString = params.objectId + '=' + JSON.stringify(JSONObject);
			$.post(wsPost, JSONString, function(data, status) {
				reloadDT();
				BootstrapDialog.closeAll();
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
	}

	// Delete Button Action
	function btnDeleteAction(e, dt, node, config) {
		if (dt.row('.selected').data().role_id != '1') {
			BootstrapDialog.confirm({
				title: MSG_TITLE_CONFIRM_DELETE,
				message: MSG_CONFIRM_DELETE_RECORD,
				type: BootstrapDialog.TYPE_DANGER,
				callback: function(result) {
					if (result) {
						var pkeyVal = dt.cell('.selected', 0).data(),
							postData = $.parseJSON('{"' + params.pkey + '":"' + pkeyVal + '"}');
						$.ajax({
							method: 'POST',
							url: params.wsDelete,
							data: postData
						}).done(function(result) {
							reloadDT();
							var response = result.response;
							if (response.type == 'SUCCESS') {
								BootstrapDialog.alert({
									title: MSG_INFO_TITLE,
									message: MSG_DEL_REC_INFO,
									type: BootstrapDialog.TYPE_PRIMARY,
									callback: function() {
										BootstrapDialog.closeAll();
									}
								});
							} else {
								BootstrapDialog.alert({
									title: MSG_WS_ERROR_TITLE,
									message: MSG_WS_ERROR_INFO,
									type: BootstrapDialog.TYPE_DANGER,
									callback: function() {
										BootstrapDialog.closeAll();
									}
								});
							}
						}).fail(function() {
							reloadDT();
							BootstrapDialog.alert({
								title: MSG_WS_ERROR_TITLE,
								message: MSG_WS_ERROR_INFO,
								type: BootstrapDialog.TYPE_DANGER,
								callback: function() {
									BootstrapDialog.closeAll();
								}
							});
						});
					}
				}
			});
		} else {
			reloadDT();
			BootstrapDialog.alert({
				title: MSG_ERROR_TITLE,
				message: 'This is a Super User account. You are not allowed to perform this action.',
				type: BootstrapDialog.TYPE_DANGER,
				callback: function(result) {
					BootstrapDialog.closeAll();
				}
			});
		}
	}

	// Reload DT
	function reloadDT() {
		dt.ajax.reload();
		dt.button('edit:name').disable();
		dt.button('delete:name').disable();
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
	var dt = $('#table-data')
		.DataTable({
			ordering: true,
			searching: true,
			processing: false,
			lengthChange: false,
			dom: '<"dt-toolbar">Bfrtip',
			pageLength: DEFAULT_PAGE_LENGTH,
			columns: params.cd,
			ajax: {
				url: params.wsList,
				dataSrc: function(json) {
					var ds = params.ds.split('.'),
						rec = json[ds[0]][ds[1]][ds[2]];
					return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
				}
			},
			buttons: dtBtns
		})
		.on('draw.dt', function (e, settings, data) {
			dt.data().length > 0 ? dt.button('print:name').enable()
				: dt.button('print:name').disable()
		});

	// DT Default Sorting
	dt.column('0:visible').order('asc').draw();

	// DT Row Click Event
	$('#table-data tbody').on('click', 'tr', function() {
		if (dt.row(this).data()[params.pkey] != '') {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				dt.button('edit:name').disable();
				dt.button('delete:name').disable();
			} else {
				dt.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				dt.button('edit:name').enable();
				dt.row('.selected').data().role_id != '1' ?
					dt.button('delete:name').enable() :
					dt.button('delete:name').disable();
			}
		}
	});
}