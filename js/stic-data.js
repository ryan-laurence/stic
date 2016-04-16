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
			icon: 'fa fa-floppy-o',
			cssClass: 'btn-primary',
			action: btnSaveAction
		},

		// Modal Buttons > Cancel
		modalBtnCancel = {
			label: 'Cancel',
			icon: 'fa fa-ban',
			cssClass: 'btn-primary',
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
				// Show New Modal Form
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
				// Show Edit Modal Form
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
			className: 'btn-primary',
			action: btnDeleteAction
		},

		// DT Buttons > Print
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

		// DT Buttons > Refresh
		dtBtnReload = {
			name: 'reload',
			text: dtBtnRelTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				reloadDT();
			}
		};

	// Show only required buttons
	var dtBtns = params.showAllBtns ?
		[dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnPrint, dtBtnReload] :
		[dtBtnDelete, dtBtnPrint, dtBtnReload];

	// Trigger on New Modal onshown event
	function btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field], select[data-field]');

		// Reset form values
		$.each(elements, function(idx, elem) { $(elem).val(''); });
	}

	// Trigger on Edit Modal onshown event
	function btnEditOnShown(dialogRef) {
		var rowData = dt.row('.selected').data(),
			modalBody = dialogRef.getModalBody();

		// Load form values from DT row data
		$.each(rowData, function(name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
			modalBody.find('select[data-field="' + name + '"]').val(value);
		});
	}

	// Trigger on Modal OnHidden
	function btnOnHidden(dialogRef) {		
		// Reload DT
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
				infoTitle = MSG_EDIT_REC_TITLE;
				infoMessage = MSG_EDIT_REC_INFO;
			} else {
				wsPost = params.wsInsert;
				infoTitle = MSG_ADD_REC_TITLE;
				infoMessage = MSG_ADD_REC_INFO;
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
		// Confirm delete
		BootstrapDialog.confirm({
			title: MSG_TITLE_CONFIRM_DELETE,
			message: MSG_CONFIRM_DELETE_RECORD,
			type: BootstrapDialog.TYPE_DANGER,
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
						title: MSG_INFO_TITLE,
						message: MSG_DEL_REC_INFO
					});
				}
			}
		});
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
			dt.data().length > 0 ?
				dt.button('print:name').enable() :
				dt.button('print:name').disable();
			dt.button('edit:name').disable();
			dt.button('delete:name').disable();
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
				dt.button('delete:name').enable();
			}
		}
	});
}