/**
 * @summary				EditData for Customer, Destination & Product Details
 * @file					stic-data-custom.js
 * @required			JQuery & Bootstrap Core, JQuery DataTables & STIC Functions
 */

/**
  * @desc
	* 	Loads the Data Entry section for Customer Destinations & Products Details with CRUD functions & DataTables integration.
  * @params
	*		{String} pkey1 : Field Id used for CRUD process in picker DataTable
	*		{String} pkey2 : Field Id used for CRUD process in list DataTable
	*		{String} objectId1 : Extra field used for insert post data
	*		{String} objectId2 : Extra field used for delete post data
	*		{String} domId1 : DOM Id of list DataTable
	*		{String} domId2 : DOM Id of picker DataTable
	*		{Object} cd1 : Column Definitions for list DataTable
	*		{Object} cd2 : Column Definitions for picker DataTable
	*		{String} ds1 : Data Source for list DataTable
	*		{String} ds2 : Data Source for picker DataTable
	*		{String} wsList1 : Web Service for Listing records in list DataTable
	*		{String} wsList2 : Web Service for Listing records in picker DataTable
	*		{String} wsInsert : Web Service for Inserting records
	*		{String} wsDelete : Web Service for Deleting records
	*		{String} modTitle : Module Title for headers and printing
	*		{String} formSrc : HTML Form location
	*		{Object} dtCustomer : DataTable object for Customers Data
	* @return
	*		{Object} dt : DataTable object
  */
function loadDestProdData(params) {
	var
		dtDDP,
		selectedDataId = '',
		dtCustomer = params.dtCustomer,

		// DT Buttons Text
		dtBtnNewTxt = '<i class="fa fa-plus-circle"></i> Add',
		dtBtnDelTxt = '<i class="fa fa-minus-circle"></i> Remove',
		dtBtnRelTxt = '<i class="fa fa-refresh"></i> Refresh',
		dtBtnPrintTxt = '<i class="glyphicon glyphicon-print"></i> Print',

		// Modal Form Options
		modalFrmContent = $('<div></div>').load(params.formSrc),
		modalNewTitle = '<i class="fa fa-plus-circle"></i> Add ' + params.modTitle,

		// Modal Buttons > Save
		modalBtnSave = {
			label: 'Select Item',
			id: 'modalBtnSave',
			icon: 'fa fa-check-square-o',
			cssClass: 'btn-primary disabled',
			action: modalBtnSaveAction
		},

		// Modal Buttons > Cancel
		modalBtnCancel = {
			label: 'Cancel',
			cssClass: 'btn-default',
			icon: 'fa fa-ban',
			action: function (dialogItself) {
				BootstrapDialog.closeAll();
			}
		},

		// DT Buttons > Add
		dtBtnNew = {
			name: 'new',
			className: 'btn-primary',
			text: BTN_LABEL_ADD_ITEM,
			titleAttr: 'Add ' + params.modTitle,
			action: function (e, dt, node, config) {
				BootstrapDialog.show({
					size: 'size-wide',
					closable: false,
					title: modalNewTitle,
					message: modalFrmContent,
					onshown: modalNewOnShown,
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
			text: BTN_LABEL_REMOVE_ITEM,
			titleAttr: 'Remove ' + params.modTitle,
			action: dtBtnDeleteAction
		},

		// DT Buttons > Refresh
		dtBtnReload = {
			name: 'reload',
			className: 'btn-primary',
			text: BTN_LABEL_REFRESH_RECORD,
			titleAttr: 'Refresh ' + params.modTitle,
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

	// DT Initialization
	var dt = $('#' + params.domId1)
		.DataTable({
			ordering: true,
			searching: true,
			dom: '<"dt-toolbar">Bfrtip',
			pageLength: 5,
			columns: params.cd1,
			ajax: {
				url: params.wsList1,
				dataSrc: function(json) {
					var ds = params.ds1.split('.'),
						rec = json[ds[0]][ds[1]][ds[2]];
					return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
				}
			},
			buttons: [dtBtnNew, dtBtnDelete, dtBtnReload]
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
		.insertAfter('#' + params.domId1 + '_wrapper div.dt-buttons');

	// DT Default Sorting
	dt.column('0:visible').order('asc').draw();

	// DT Row Click Event
	$('#' + params.domId1 + ' tbody').on('click', 'tr', function() {
		if (dt.row(this).data()[params.pkey2] != '') {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				dt.button('delete:name').disable();
			} else {
				dt.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				dt.button('delete:name').enable();
			}
		}
	});

	// Trigger on New Modal OnShown
	function modalNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			modalFooter = dialogRef.getModalFooter(),
			custId = dtCustomer.row('.selected').data().cust_id;

		// Destroy DT if already initialized
		if ($.fn.DataTable.isDataTable('#' + params.domId2)) {
			dtDDP.destroy();
		}

		// Initialize DT
		dtDDP = initDT_Picker({
			pl: 5,
			domId: params.domId2,
			ds: params.ds2,
			cd: params.cd2,
			ws: params.wsList2 + 'cust_id=' + custId
		});

		// DT Row Click event
		$('#' + params.domId2 + ' tbody')
			.on('click', 'tr', function() {
				// Set selected data id
				selectedDataId = dtDDP.row(this).data()[params.pkey1];

				if (selectedDataId != '') {
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
						modalFooter.find('#modalBtnSave').addClass('disabled');
					} else {
						dtDDP.$('tr.selected').removeClass('selected');
						$(this).addClass('selected');
						modalFooter.find('#modalBtnSave').removeClass('disabled');
					}
				}
			});
	}

	// Trigger on Modal OnHidden
	function modalOnHidden(dialogRef) {
		dtDDP.clear().draw();
		dtDDP.destroy();
	}

	// Add Button Action
	function modalBtnSaveAction(dialogRef) {
		var custId = dtCustomer.row('.selected').data().cust_id,
			postString = params.objectId1 + '={ "cust_id": "' + custId + '", "' + params.pkey1 + '": "' + selectedDataId + '"}';
			$.post(params.wsInsert, postString, function(data, status) {
				BootstrapDialog.closeAll();
				dt.ajax.reload();
			});
	}

	// Delete Button Action
	function dtBtnDeleteAction(e, dt, node, config) {
		var userRoleId = STIC.User.ReadCookie('roleid');
		if (userRoleId === '1' || userRoleId === '2') {
			var custId = dtCustomer.row('.selected').data().cust_id,
				pkey2Val = dt.row('.selected').data()[params.pkey2],
				postData = $.parseJSON('{ "' + params.pkey2 + '": "' + pkey2Val + '" }');
				$.ajax({
					method: 'POST',
					url: params.wsDelete,
					data: postData
				}).done(function(result) {
					dt.ajax.reload();
					BootstrapDialog.closeAll();
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
			cd: params.cd1
		});

		// Set add. messages
		var rowData = dtCustomer.row('.selected').data(),
			codeLabel = { width: 80, bold: true, text: 'Customer Code :' },
			nameLabel = { width: 80, bold: true, text: 'Customer Name :' },
			custCode = { width: 'auto', text: rowData.cust_code },
			custName = { width: 'auto', text: rowData.cust_name };
		pdfDoc.content.splice(1, 0, { columns: [codeLabel, custCode] });
		pdfDoc.content.splice(2, 0, { columns: [nameLabel, custName] });
	}

	// Customize Web Page Print Output
	function dtWebPagePrintCustom(win) {
		var rowData = dtCustomer.row('.selected').data();

		$(win.document.body)
			.css('background', 'transparent')
			.css('font-weight', 'normal')
			.css('font-family', 'Courier');
		// Title
		$(win.document.body).find('h1')
			.css('font-size', '14pt')
			.css('text-align', 'center');
		// Message
		$(win.document.body).find('div')
			.css('font-size', '12pt')
			.css('text-align', 'left')
			.css('margin', '20px 0px 20px 0px')
			.html('<strong>Customer Code :</strong> ' + rowData.cust_code + ' <br /><strong>Customer Name :</strong> ' + rowData.cust_name);
		// Data Table
		$(win.document.body).find('table')
			.removeClass('display')
			.removeClass('compact');
		$(win.document.body).find('table th')
			.css('font-size', '12pt')
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

	return dt;
};


/**
  * @desc
	* 	Loads the Data Entry section for Customer Details with CRUD functions & DataTables integration
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
function loadCustomerData(params) {
	// Modal Form Options
	var modalFrmContent = $('<div></div>').load(params.formSrc),
	modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.modTitle,
	modalEditTitle = '<i class="fa fa-pencil"></i> Edit ' + params.modTitle,

	// Modal Buttons > Save
	modalBtnSave = {
		label: 'Save Data',
		cssClass: 'btn-primary',
		icon: 'fa fa-floppy-o',
		action: modalBtnSaveAction
	},

	// Modal Buttons > Cancel
	modalBtnCancel = {
		label: 'Cancel',
		cssClass: 'btn-default',
		icon: 'fa fa-ban',
		action: function (dialogItself) {
			BootstrapDialog.closeAll();
		}
	},

	// DT Buttons > New
	dtBtnNew = {
		name: 'new',
		className: 'btn-primary',
		text: BTN_LABEL_NEW_RECORD,
		titleAttr: 'New ' + params.modTitle,
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
		titleAttr: 'Edit ' + params.modTitle,
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
		titleAttr: 'Delete ' + params.modTitle,
	},

	// DT Buttons > Refresh
	dtBtnReload = {
		name: 'reload',
		className: 'btn-primary',
		text: BTN_LABEL_REFRESH_RECORD,
		titleAttr: 'Refresh ' + params.modTitle,
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

	// DT Initialization
	var dt = $('#table-customer')
		.DataTable({
			ordering: true,
			searching: true,
			dom: '<"dt-toolbar">Bfrtip',
			pageLength: 5,
			columns: params.cd,
			ajax: {
				url: params.wsList,
				dataSrc: function(json) {
					var ds = params.ds.split('.'),
						rec = json[ds[0]][ds[1]][ds[2]];
					return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
				}
			},
			buttons: [dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnReload]
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

	// Trigger on New Modal OnShown event
	function modalNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field]');

		// Reset form values
		$.each(elements, function(idx, elem) { $(elem).val(''); });
	}

	// Trigger on Edit Modal OnShown event
	function modalEditOnShown(dialogRef) {
		var rowData = dt.row('.selected').data(),
			modalBody = dialogRef.getModalBody();

		// Load form values from DT row data
		$.each(rowData, function(name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
		});
	}

	// Trigger on Modal OnHidden
	function modalOnHidden(dialogRef) {
		// Reset form values
		$(params.formId).find('input[data-field]').val('');
		$(params.formId).find('select[data-field]').val('');

		// Clear form validation styles
		STIC.FormValidation({ formId: params.formId, clearHelpBlocks: true });
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
				callback: function(result) {
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

	return dt;
};

