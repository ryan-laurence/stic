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
		// DT Buttons Text
		dtBtnNewTxt = '<i class="fa fa-plus"></i> New',
		dtBtnEditTxt = '<i class="fa fa-pencil"></i> Edit',
		dtBtnDelTxt = '<i class="fa fa-trash-o"></i> Delete',
		dtBtnRelTxt = '<i class="fa fa-refresh"></i> Refresh',
		dtBtnCPassTxt = '<i class="fa fa-key"></i> Change Password',
		dtBtnPrintTxt = '<i class="glyphicon glyphicon-print"></i> Print',

		// Modal Form Options > New Details
		modalFrmNewContent = $('<div></div>').load(params.formSrcNew),
		modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.modTitle,

		// Modal Form Options > Edit Details
		modalFrmEditContent = $('<div></div>').load(params.formSrcEdit),
		modalEditTitle = '<i class="fa fa-pencil"></i> Edit ' + params.modTitle,

		// Modal Form Options > Change Password
		modalCPassFrmContent = $('<div></div>').load(params.formSrcCPass),
		modalCPassTitle = '<i class="fa fa-key"></i> Change Password',

		// Modal Buttons > Save
		modalBtnSave = {
			label: 'Save',
			icon: 'fa fa-floppy-o',
			cssClass: 'btn-primary',
			action: btnSaveAction
		},

		// Modal Buttons > Save > CPass
		modalBtnCPassSave = {
			label: 'Save',
			icon: 'fa fa-floppy-o',
			cssClass: 'btn-primary',
			action: btnSaveCPassAction
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
				BootstrapDialog.show({
					closable: false,
					title: modalNewTitle,
					message: modalFrmNewContent,
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
					message: modalFrmEditContent,
					onshown: btnEditOnShown,
					onhidden: btnOnHidden,
					buttons: [modalBtnSave, modalBtnCancel]
				});
			}
		},

		// DT Buttons > Change Password
		dtBtnCPass = {
			name: 'cpass',
			enabled: false,
			text: dtBtnCPassTxt,
			className: 'btn-primary',
			action: function(e, dt, node, config) {
				BootstrapDialog.show({
					closable: false,
					title: modalCPassTitle,
					message: modalCPassFrmContent,
					onshown: btnCPassOnShown,
					onhidden: btnOnHidden,
					buttons: [modalBtnCPassSave, modalBtnCancel]
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

	// Show only required buttons
	var dtBtns = params.showAllBtns ?
		[dtBtnNew, dtBtnEdit, dtBtnDelete, dtBtnCPass, dtBtnPrint, dtBtnReload] :
		[dtBtnDelete, dtBtnPrint, dtBtnReload];

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
							options.push('<option value="' + f.role_id + '">' + f.role_name + '</option>');
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
	function btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field], select[data-field]');

		// Clear form values
		$.each(elements, function(idx, elem) { $(elem).val(''); });

		// Create Role field
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

		// Load values from row data
		$.each(rowData, function(name, value) {
			modalBody.find('input[data-field="' + name + '"]').val(value);
			modalBody.find('select[data-field="' + name + '"]').val(value);
		});

		// Clear password value
		modalBody.find('input[data-field="user_password"]').val('');

		// Create Role input or select field
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

	// Trigger on Change Pass Modal OnShown
	function btnCPassOnShown(dialogRef) {
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
	function btnOnHidden(dialogRef) {
		reloadDT();
		var modalBody = dialogRef.getModalBody();

		// Reset form values
		modalBody.find('input[data-field="user_name"]').prop('disabled', false);
		$(params.formId).find('input[data-field]').val('');
		$(params.formId).find('select[data-field]').val('');

		// Clear form validation styles
		STIC.FormValidation({ formId: params.formId, clearHelpBlocks: true });

		// Destroy role field
		destroyRoleField();
	}

	// New & Edit Button Action
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

	// Change Password Button Action
	function btnSaveCPassAction(dialogRef) {
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
				url: WS_USER_PASS_UPDATE,
				data: JSONObject,
				title: MSG_TITLE_EDIT_REC,
				message: MSG_INFO_EDIT_REC
			});
		}
	}

	// Delete Button Action
	function btnDeleteAction(e, dt, node, config) {
		// Check if user is not super user
		if (dt.row('.selected').data().role_id != '1') {
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

		// Restrict delete if super user
		} else {
			reloadDT();
			BootstrapDialog.alert({
				type: 'type-danger',
				title: MSG_TITLE_INFO,
				message: 'This is a Super User account. You are not allowed to perform this action.',
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
		dt.button('cpass:name').disable();
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
	var dt = $('#table-data')
		.DataTable({
			ordering: true,
			searching: true,
			processing: false,
			lengthChange: false,
			dom: '<"dt-toolbar">Bfrtip',
			//pagingType: 'full_numbers',
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
			dt.buttons(['delete:name', 'edit:name', 'cpass:name']).disable();
		});

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
				dt.row('.selected').data().role_id != '1' ?
					dt.buttons(['delete:name', 'edit:name']).enable() :
					dt.buttons(['delete:name', 'edit:name']).disable();
			}
		}
	});
}