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
			label: 'Save',
			id: 'modalBtnSave',
			icon: 'fa fa-floppy-o',
			cssClass: 'btn-primary disabled',
			action: btnSaveAction
		},

		// Modal Buttons > Cancel
		modalBtnCancel = {
			label: 'Cancel',
			cssClass: 'btn-primary',
			icon: 'fa fa-ban',
			action: function(dialogItself) {
				BootstrapDialog.closeAll();
			}
		},

		// DT Buttons > New
		dtBtnNew = {
			name: 'new',
			text: dtBtnNewTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				BootstrapDialog.show({
					size: 'size-wide',
					closable: false,
					title: modalNewTitle,
					message: modalFrmContent,
					onshown: btnNewOnShown,
					onhidden: btnOnHidden,
					buttons: [modalBtnSave, modalBtnCancel]
				});
			}
		},

		// DT Buttons > Delete
		dtBtnDelete = {
			name: 'delete',
			enabled: false,
			text: dtBtnDelTxt,
			className: 'btn-danger',
			action: btnDeleteAction
		},

		// DT Buttons > Print	
		dtBtnPrint = {
			name: 'print',
			extend: 'pdfHtml5',
			download: 'open',
			text: dtBtnPrintTxt,
			title: params.modTitle,
			className: 'btn-primary',
			exportOptions: { columns: ':visible' },
			customize: dtPDFPrintCustom
		},

		// DT Buttons > Refresh
		dtBtnReload = {
			name: 'reload',
			text: dtBtnRelTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				reloadDT();
			}
		};

	// Trigger on New Modal OnShown
	function btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			modalFooter = dialogRef.getModalFooter(),
			custId = dtCustomer.row('.selected').data().cust_id;

		// Destroy DT if already initialized
		if ($.fn.DataTable.isDataTable('#' + params.domId2)) {
			dtDDP.destroy();
		}

		// Initialize DT
		dtDDP = initDT_Picker({
			pl: 10,
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
	function btnOnHidden(dialogRef) {
		dtDDP.clear().draw();
		dtDDP.destroy();
		reloadDT();
	}

	// Add Button Action
	function btnSaveAction(dialogRef) {
		var custId = dtCustomer.row('.selected').data().cust_id,
			postString = params.objectId1 + '={ "cust_id": "' + custId + '", "' + params.pkey1 + '": "' + selectedDataId + '"}';
			$.post(params.wsInsert, postString, function(data, status) {
				BootstrapDialog.closeAll();
				console.log(data);
			});
	}

	// Delete Button Action
	function btnDeleteAction(e, dt, node, config) {
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
					reloadDT();
					BootstrapDialog.closeAll();
					console.log(result);
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

	// Reload DT
	function reloadDT() {
		dt.ajax.reload();
		dt.button('delete:name').disable();
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

	// DT Initialization
	var dt = $('#' + params.domId1)
		.DataTable({
			ordering: true,
			searching: true,
			processing: false,
			lengthChange: false,
			dom: '<"dt-toolbar">Bfrtip',
			//pagingType: 'full_numbers',
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
			buttons: [dtBtnNew, dtBtnDelete, dtBtnPrint, dtBtnReload]
		})
		.on('draw.dt', function (e, settings, data) {
			dt.data().length > 0 ?
				dt.button('print:name').enable() :
				dt.button('print:name').disable();
			dt.button('delete:name').disable();
		});

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

		// Modal Buttons > Save
		modalBtnSave = {
			label: 'Save',
			cssClass: 'btn-primary',
			icon: 'fa fa-floppy-o',
			action: btnSaveAction
		},

		// Modal Buttons > Cancel
		modalBtnCancel = {
			label: 'Cancel',
			cssClass: 'btn-primary',
			icon: 'fa fa-ban',
			action: function(dialogItself) {
				BootstrapDialog.closeAll();
			}
		},

		// DT Buttons > New
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

		// DT Buttons > Edit
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

		// DT Buttons > Delete
		dtBtnDelete = {
			name: 'delete',
			enabled: false,
			text: dtBtnDelTxt,
			className: 'btn-danger',
			action: btnDeleteAction
		},

		// DT Buttons > Print
		dtBtnPrint = {
			name: 'print',
			extend: 'pdfHtml5',
			download: 'open',
			text: dtBtnPrintTxt,
			title: params.modTitle,
			className: 'btn-primary',
			exportOptions: { columns: ':visible' },
			customize: dtPDFPrintCustom
		},

		// DT Buttons > Refresh
		dtBtnReload = {
			name: 'reload',
			text: dtBtnRelTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				reloadDT();
			}
		};

	// Trigger on New Modal OnShown event
	function btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field]');

		// Reset form values
		$.each(elements, function(idx, elem) { $(elem).val(''); });
	}

	// Trigger on Edit Modal OnShown event
	function btnEditOnShown(dialogRef) {
		var rowData = dt.row('.selected').data(),
			modalBody = dialogRef.getModalBody();

		// Load form values from DT row data
		$.each(rowData, function(name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
		});
	}

	// Trigger on Modal OnHidden
	function btnOnHidden(dialogRef) {
		reloadDT();

		// Reset form values
		$(params.formId).find('input[data-field]').val('');
		$(params.formId).find('select[data-field]').val('');

		// Clear form validation styles
		STIC.FormValidation({ formId: params.formId, clearHelpBlocks: true });
	}

	// New & Edit Save Button Action
	function btnSaveAction(dialogRef) {
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
	function btnDeleteAction(e, dt, node, config) {
		var userRoleId = STIC.User.ReadCookie('roleid');		
		if (userRoleId === '1' || userRoleId === '2') {
			// Confirm delete
			BootstrapDialog.confirm({
				type: 'type-danger',
				btnOKLabel: BTN_LABEL_CONFIRM_DELETE,
				btnCancelLabel: BTN_LABEL_CANCEL_DELETE,
				title: MSG_TITLE_CONFIRM_DELETE,
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

	// Reload DT
	function reloadDT() {
		dt.ajax.reload();
		dt.button('edit:name').disable();
		dt.button('delete:name').disable();
	}
	
	// Customize PDF Print Output
	function dtPDFPrintCustom(doc) {		
		// Set Default Styles
		var pdfDoc = STIC.Report.SetPDFStyles({
			doc: doc,
			cd: params.cd		
		});
	}

	// DT Initialization
	var dt = $('#table-customer')
		.DataTable({
			ordering: true,
			searching: true,
			processing: false,
			lengthChange: false,
			dom: '<"dt-toolbar">Bfrtip',
			//pagingType: 'full_numbers',
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
			buttons: [dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnPrint, dtBtnReload]
		})
		.on('draw.dt', function (e, settings, data) {
			dt.data().length > 0 ?
				dt.button('print:name').enable() :
				dt.button('print:name').disable();
			dt.button('edit:name').disable();
			dt.button('delete:name').disable();
		});

	// DT Default Sorting
	dt.column('0:visible').order('asc').draw();

	return dt;
};

