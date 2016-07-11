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
	*		{String} formSrcNew : HTML New Form location
	*		{String} formSrcEdit : HTML Edit Form location
	*		{String} formSrcCPass : HTML Change Pass Form location
	*		{Object} cd : Column Definitions for DataTables
	*		{String} ds : Data Source for DataTables
	*		{String} wsList : Web Service for Listing records
	*		{String} wsInsert : Web Service for Inserting records
	*		{String} wsUpdate : Web Service for Updating records
	*		{String} wsDelete : Web Service for Deleting records
*/
function loadEditData(params) {
	var

	// Modal Content
	modalFrmNewContent = $('<div></div>').load(params.formSrcNew),
	modalFrmEditContent = $('<div></div>').load(params.formSrcEdit),
	modalCPassFrmContent = $('<div></div>').load(params.formSrcCPass),

	// Modal Title
	modalNewTitle = BTN_LABEL_NEW_RECORD + ' New ' + params.modTitle,
	modalEditTitle = BTN_LABEL_EDIT_RECORD + ' Edit ' + params.modTitle,
	modalCPassTitle = BTN_LABEL_CHANGE_PASS + ' Change Password',

	// Modal Button > Save
	modalBtnSave = {
		label: 'Save Data',
		icon: 'fa fa-floppy-o',
		cssClass: 'btn-primary',
		action: modalBtnSaveAction
	},

	// Modal Button > Change Pass
	modalBtnCPassSave = {
		label: 'Save Changes',
		icon: 'fa fa-floppy-o',
		cssClass: 'btn-primary',
		action: modalSaveCPassAction
	},

	// Modal Button > Cancel
	modalBtnCancel = {
		label: 'Cancel',
		icon: 'fa fa-ban',
		cssClass: 'btn-default',
		action: function (dialogItself) {
			BootstrapDialog.closeAll();
		}
	},

	// DT Buttons > New
	dtBtnNew = {
		name: 'new',
		className: 'btn-primary',
		text: BTN_LABEL_NEW_RECORD,
		titleAttr: BTN_TITLE_NEW_RECORD,
		action: function (e, dt, node, config) {
			BootstrapDialog.show({
				closable: false,
				title: modalNewTitle,
				message: modalFrmNewContent,
				onshown: modalNewOnShown,
				onhidden: modalOnHidden,
				buttons: [modalBtnCancel, modalBtnSave]
			});
		}
	},

	// DT Buttons > Edit
	dtBtnEdit = {
		name: 'edit',
		enabled: false,
		className: 'btn-primary',
		text: BTN_LABEL_EDIT_RECORD,
		titleAttr: BTN_TITLE_EDIT_RECORD,
		action: function (e, dt, node, config) {
			var userId = dt.row('.selected').data().user_id;
			if (userId !== '1' && userId !== '2' && userId !== '3') {
				BootstrapDialog.show({
					closable: false,
					title: modalEditTitle,
					message: modalFrmEditContent,
					onshown: modalEditOnShown,
					onhidden: modalOnHidden,
					buttons: [modalBtnCancel, modalBtnSave]
				});
			} else {
				BootstrapDialog.alert({
					type: 'type-danger',
					title: MSG_TITLE_INFO,
					message: MSG_INFO_DEFAULT_USER_EDIT,
					callback: function (result) {
						BootstrapDialog.closeAll();
					}
				});
			}
		}
	},

	// DT Buttons > Change Password
	dtBtnCPass = {
		name: 'cpass',
		enabled: false,
		className: 'btn-primary',
		text: BTN_LABEL_CHANGE_PASS,
		titleAttr: BTN_TITLE_CHANGE_PASS,
		action: function (e, dt, node, config) {
			BootstrapDialog.show({
				closable: false,
				title: modalCPassTitle,
				message: modalCPassFrmContent,
				onshown: modalCPassOnShown,
				onhidden: modalOnHidden,
				buttons: [modalBtnCancel, modalBtnCPassSave]
			});
		}
	},

	// DT Buttons > Delete
	dtBtnDelete = {
		name: 'delete',
		enabled: false,
		className: 'btn-danger',
		action: dtBtnDeleteAction,
		text: BTN_LABEL_DELETE_RECORD,
		titleAttr: BTN_TITLE_DELETE_RECORD
	},

	// DT Buttons > Refresh
	dtBtnReload = {
		name: 'reload',
		className: 'btn-primary',
		text: BTN_LABEL_REFRESH_RECORD,
		titleAttr: BTN_TITLE_REFRESH_RECORD,
		action: function (e, dt, node, config) {
			dt.ajax.reload();
		}
	},

	// DT Buttons > Copy
	dtBtnCopy = {
		name: 'copy',
		extend: 'copyHtml5',
		className: 'btn-primary',
		text: BTN_LABEL_COPY,
		titleAttr: BTN_TITLE_COPY,
		exportOptions: {
			columns: ':visible',
			modifier: {
				page: 'current'
			}
		}
	},

	// DT Buttons > CSV
	dtBtnCSV = {
		name: 'csv',
		extend: 'csvHtml5',
		className: 'btn-primary',
		text: BTN_LABEL_EXPORT_CSV,
		titleAttr: BTN_TITLE_EXPORT_CSV,
		filename: params.modTitle,
		exportOptions: {
			columns: ':visible'
		}
	},

	// DT Buttons > Excel
	dtBtnExcel = {
		name: 'excel',
		extend: 'excelHtml5',
		className: 'btn-primary',
		text: BTN_LABEL_EXPORT_EXCEL,
		titleAttr: BTN_TITLE_EXPORT_EXCEL,
		filename: params.modTitle,
		sheetName: params.modTitle,
		exportOptions: {
			columns: ':visible'
		}
	},

	// DT Buttons > PDF
	dtBtnPDF = {
		name: 'pdf',
		extend: 'pdfHtml5',
		title: params.modTitle,
		className: 'btn-primary',
		text: BTN_LABEL_EXPORT_PDF,
		titleAttr: BTN_TITLE_EXPORT_PDF,
		customize: dtPDFPrintCustom,
		filename: params.modTitle,
		exportOptions: {
			columns: ':visible'
		}
	},

	// DT Buttons > Web Page Print
	dtBtnPrint = {
		name: 'print',
		extend: 'print',
		enabled: false,
		autoPrint: false,
		title: params.modTitle,
		className: 'btn-primary',
		text: BTN_LABEL_PRINT_RECORD,
		titleAttr: BTN_TITLE_PRINT_RECORD,
		customize: dtWebPagePrintCustom,
		exportOptions: {
			columns: ':visible'
		}
	};

	// Show only required buttons
	var dtBtns = params.showAllBtns ?
		[dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnCPass, dtBtnReload] :
		[dtBtnDelete, dtBtnPrint, dtBtnReload];

	// DT Initialization
	var dt = $('#table-data')
		.DataTable({
			ordering: true,
			searching: true,
			dom: '<"dt-toolbar">Bfrtip',
			pageLength: DFLT_PAGE_SIZE,
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
			var btns = [
				'copy:name',
				'csv:name',
				'excel:name',
				'pdf:name',
				'print:name'
			];
			dt.data().length > 0 ?
				dt.buttons(btns).enable() :
				dt.buttons(btns).disable();
			dt.buttons(['delete:name', 'edit:name', 'cpass:name']).disable();
			dt.$('tr.selected').removeClass('selected');
		});

	// Export & Print DT Buttons
	new $.fn.dataTable.Buttons(dt, {
		buttons: [
			dtBtnCopy,
			dtBtnCSV,
			dtBtnExcel,
			dtBtnPDF,
			dtBtnPrint]
   });

	// Append to DT
	dt.buttons(1, null).container()
		.insertAfter('div.dt-buttons');

	// DT Default Sorting
	dt.column('0:visible').order('asc').draw();

	// DT Row Click Event
	$('#table-data tbody').on('click', 'tr', function() {
		if (dt.row(this).data()[params.pkey] != '') {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				dt.buttons(['delete:name', 'edit:name', 'cpass:name']).disable()
			} else {
				dt.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				dt.button('cpass:name').enable();
				var userId = dt.row('.selected').data().user_id;
				if (userId !== '1' && userId !== '2' && userId !== '3') {
					dt.buttons(['delete:name', 'edit:name']).enable();
				} else {
					dt.buttons(['delete:name', 'edit:name']).disable();
				}
			}
		}
	});

	// Destroy Role Input & Select
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

		// Build select options
		$.getJSON(JSONUrl, function(data) {
			var options = [];
			$.each(data.response, function(a, b) {
				if (a == JSONData) {
					$.each(b, function(c, d) {
						$.each(d, function(e, f) {
							options.push('<option value="' + f.role_id + '">' +
								f.role_name + '</option>');
						});
					});
				}
			});

			// Create select DOM
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
	function modalNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field], select[data-field]');

		// Clear form values
		$.each(elements, function(idx, elem) { $(elem).val(''); });

		// Create Role field
		destroyRoleField();
		newRoleSelectField({
			defaultId: '',
			defaultVal: '',
			JSONUrl: WS_LIST_ROLES,
			JSONData: 'report-list',
			container: $('#role-box')
		});
	}

	// Trigger on Edit Modal OnShown
	function modalEditOnShown(dialogRef) {
		var container = $('#role-box'),
			rowData = dt.row('.selected').data(),
			userId = rowData.user_id,
			defaultId = rowData.role_id,
			defaultVal = rowData.role_name,
			modalBody = dialogRef.getModalBody();

		// Load values from row data
		$.each(rowData, function (name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
			modalBody.find('select[data-field="' + name + '"]').val(value);
		});

		// Clear password value
		modalBody.find('input[data-field="user_password"]').val('');

		// Create Role input or select field
		destroyRoleField();
		if (userId !== '1' && userId !== '2' && userId !== '3') {
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

	// Trigger on Change Pass Modal OnShown
	function modalCPassOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			rowData = dt.row('.selected').data();

		// Set User ID
		modalBody.find('input[data-field="user_id"]').val(rowData.user_id);

		// Set User Name
		modalBody.find('input[data-field="user_name"]').prop('disabled', true);
		modalBody.find('input[data-field="user_name"]').val(rowData.user_name);

		// Set User Password
		modalBody.find('input[data-field="user_password"]').val('');
	}

	// Trigger on Modal OnHidden
	function modalOnHidden(dialogRef) {
		var modalBody = dialogRef.getModalBody();

		// Reset form values
		modalBody.find('input[data-field]').val('');
		modalBody.find('select[data-field]').val('');
		modalBody.find('input[data-field="user_name"]').prop('disabled', false);

		// Clear form validation styles
		STIC.FormValidation({ formId: params.formId, clearHelpBlocks: true });

		// Destroy role field
		destroyRoleField();
	}

	// New & Edit Button Action
	function modalBtnSaveAction(dialogRef) {
		// Form Validation
		var isValid = STIC.FormValidation({ formId: params.formId });

		// Proceed if form is valid
		if (isValid) {
			var wsPost = '', postString = '',
				infoTitle = '', infoMessage = '',
				JSONString = '', JSONObject = {},
				modalBody = dialogRef.getModalBody(),
				pkey = $('input[data-field="' + params.pkey + '"]'),
				elements = modalBody.find('input[data-field], select[data-field]');

			// Switch between insert & update options
			if (pkey.val() != '') {
				wsPost = params.wsUpdate;
				infoTitle = MSG_TITLE_EDIT_REC;
				infoMessage = MSG_INFO_EDIT_REC;
			} else {
				wsPost = params.wsInsert;
				infoTitle = MSG_TITLE_ADD_REC;
				infoMessage = MSG_INFO_ADD_REC;
			}

			var input = $(params.formId).find('input[data-fv-unique="true"]'),
				fieldValue = $(input).val(), fieldName = $(input).attr('data-field'),
				postString = '{"' + fieldName + '": "' + fieldValue + '"}';

			// Check for duplicate entry if required
			if (input.length > 0) {
				if (pkey.val() != '')
					$.extend(JSONObject, $.parseJSON('{"' + params.pkey + '": "' + pkey.val() + '"}'));

				$.extend(JSONObject, $.parseJSON(postString));
				$.post(WS_UNIQUE_CHECK[fieldName], JSONObject)
					.done(function (result, status) {

						// Proceed with insert if no duplicate records found
						if (result.response.type === 'FAILED') {
							insertUpdateData({
								dt: dt,
								url: wsPost,
								title: infoTitle,
								message: infoMessage,
								elements: elements
							});

						// Show errors if there are duplicate records found
						} else {
							STIC.showDuplicateError({
								ukey: fieldName,
								formId: params.formId
							});
						}
					})

					// Show WS Error
					.fail(function () {
						STIC.showWSError({ formId: params.formId });
					});

			// Proceed with insert if not required to check duplicate
			} else {
				insertUpdateData({
					dt: dt,
					url: wsPost,
					title: infoTitle,
					message: infoMessage,
					elements: elements
				});
			}

			// Insert & Update
			function insertUpdateData(o) {
				var postString = '', JSONString = '',
					JSONObject = {};

				// Build post data
				$.each(o.elements, function(idx, elem) {
					var input = $(elem),
						inputValue = input.val(),
						inputField = input.attr('data-field');
					postString = '{"' + inputField + '":"' + inputValue + '"}';
					$.extend(JSONObject, $.parseJSON(postString));
				});

				// Build JSON string
				JSONString = params.objectId + '=' + JSON.stringify(JSONObject);

				// Call WS
				STIC.postData({
					dt: o.dt,
					url: o.url,
					data: JSONString,
					title: o.title,
					message: o.message,
					formId: params.formId
				});
			}
		}
	}

	// Change Password Button Action
	function modalSaveCPassAction(dialogRef) {
		// Form Validation
		var isValid = STIC.FormValidation({ formId: params.formId });

		// Proceed if form is valid
		if (isValid) {
			var JSONObject = {},
				modalBody = dialogRef.getModalBody();

			// Build JSON object
			JSONObject = {
				user_id: modalBody.find('input[data-field="user_id"]').val(),
				user_password: modalBody.find('input[data-field="user_password"]').val()
			};

			// Call WS
			STIC.postData({
				dt: dt,
				url: WS_USER_PASS_UPDATE,
				data: JSONObject,
				title: MSG_TITLE_EDIT_REC,
				message: MSG_INFO_EDIT_REC
			});
		}
	}

	// Delete Button Action
	function dtBtnDeleteAction(e, dt, node, config) {
		var userId = dt.row('.selected').data().user_id;
		if (userId !== '1' && userId !== '2' && userId !== '3') {
			var userRoleId = STIC.User.ReadCookie('roleid');
			if (userRoleId === '1' || userRoleId === '2') {
				// Confirm delete
				BootstrapDialog.confirm({
					type: 'type-danger',
					btnOKLabel: BTN_LABEL_CONFIRM_DELETE,
					btnCancelLabel: BTN_LABEL_CANCEL,
					title: MSG_TITLE_INFO,
					message: MSG_CONFIRM_DELETE_RECORD,
					callback: function (result) {
						if (result) {

							// Build post data
							var pkeyVal = dt.cell('.selected', 0).data(),
								postData = $.parseJSON('{"' + params.pkey + '":"' + pkeyVal + '"}');

							// Call WS
							STIC.postData({
								dt: dt,
								url: params.wsDelete,
								data: postData,
								title: MSG_TITLE_INFO,
								message: MSG_INFO_DEL_REC
							});
						}
					}
				});
			} else {
				BootstrapDialog.alert({
					type: 'type-danger',
					title: MSG_TITLE_INFO,
					message: MSG_INFO_ROLE_INVALID,
					callback: function (result) {
						BootstrapDialog.closeAll();
					}
				});
			}
		} else {
			BootstrapDialog.alert({
				type: 'type-danger',
				title: MSG_TITLE_INFO,
				message: MSG_INFO_DEFAULT_USER_DELETE,
				callback: function (result) {
					BootstrapDialog.closeAll();
				}
			});
		}
	}

	// Customize PDF Print Output
	function dtPDFPrintCustom(doc) {
		// Set Default Styles
		var pdfDoc = STIC.Report.SetPDFStyles({
			doc: doc,
			cd: params.cd
		});
	}

	// Customize Web Page Print Output
	function dtWebPagePrintCustom(win) {
		$(win.document.body)
			.css('background', 'transparent')
			.css('font-weight', 'normal')
			.css('font-family', 'Courier');
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
}