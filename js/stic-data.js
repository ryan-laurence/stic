/**
 * @summary				EditData
 * @file					stic-data.js
 * @required			JQuery & Bootstrap Core, JQuery DataTables & STIC Functions
 */

/**
  * @desc
	* 	Loads the Data Entry page with CRUD functions & DataTables integration
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
	// Modal Form Options
	var modalFrmContent = '';
	if (params.formSrc !== '') {
		modalFrmContent = $('<div></div>').load(params.formSrc);
	}

	var modalNewTitle = BTN_LABEL_NEW_RECORD + ' New ' + params.modTitle,
	modalEditTitle = BTN_LABEL_EDIT_RECORD + ' Edit ' + params.modTitle,

	// Modal Buttons > Save
	modalBtnSave = {
		label: 'Save Data',
		icon: 'fa fa-floppy-o',
		cssClass: 'btn-primary',
		action: modalBtnSaveAction
	},

	// Modal Buttons > Cancel
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
				message: modalFrmContent,
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
			BootstrapDialog.show({
				closable: false,
				title: modalEditTitle,
				message: modalFrmContent,
				onshown: modalEditOnShown,
				onhidden: modalOnHidden,
				buttons: [modalBtnCancel, modalBtnSave]
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
		[dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnReload] :
		[dtBtnDelete, dtBtnReload];

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
				dataSrc: function (json) {
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
			dt.button('edit:name').disable();
			dt.button('delete:name').disable();
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
	$('#table-data tbody').on('click', 'tr', function () {
		if (dt.row(this).data()[params.pkey] != '') {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				dt.button('edit:name').disable();
				dt.button('delete:name').disable();
			} else {
				dt.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				dt.button('edit:name').enable();
				dt.button('delete:name').enable();
			}
		}
	});

	// Trigger on New Modal onshown event
	function modalNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody();
		modalBody.find('input[data-field], select[data-field]').val('');
	}

	// Trigger on Edit Modal onshown event
	function modalEditOnShown(dialogRef) {
		var rowData = dt.row('.selected').data(),
			modalBody = dialogRef.getModalBody();
		$.each(rowData, function (name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
			modalBody.find('select[data-field="' + name + '"]').val(value);
		});
	}

	// Trigger on Modal onhidden event
	function modalOnHidden(dialogRef) {
		var modalBody = dialogRef.getModalBody();
		modalBody.find('input[data-field]').val('');
		modalBody.find('select[data-field]').val('');
		STIC.clearHelpBlocks({ formId: params.formId });
	}

	// New & Edit Save Button Action
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
				$.each(o.elements, function (idx, elem) {
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

	// Delete Button Action
	function dtBtnDeleteAction(e, dt, node, config) {
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