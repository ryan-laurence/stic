function showNewModalForm(params) {			
	var 

	// Modal Form Options
	modalFrmContent = $('<div></div>').load(params.formSrc),
	modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.dataType,
	
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
	};
	
	// Trigger on New Modal onShown event
	function btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field]');
			
		// Clear form values
		$.each(elements, function(idx, elem) { $(elem).val(''); });
	}		
	
	// Save Action
	function btnSaveAction(dialogRef) {
		// Form Validation
		var isValid = STIC.FormValidation({ formId: params.formId });		
		
		// Proceed if form is valid
		if (isValid) {
			var postString = '', JSONString = '', JSONObject = {},
				modalBody = dialogRef.getModalBody(),
				elements = modalBody.find('input[data-field]');
				
			var input = $(params.formId).find('input[data-fv-unique="true"]'),
				fieldValue = $(input).val(), fieldName = $(input).attr('data-field'),
				postString = '{"' + fieldName + '": "' + fieldValue + '"}';		
				
			// Check for duplicate entry if required
			if (input.length > 0) {
				$.post(WS_UNIQUE_CHECK[fieldName], $.parseJSON(postString))
					.done(function (result, status) {
						
						// Proceed with insert if no duplicate records found
						if (result.response.type === 'FAILED') {
							insertData({ elements: elements });
							
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
				insertData({ elements: elements });
			}
			
			// Insert & Update
			function insertData(o) {
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

				// Add extra data object passed to post data
				if (typeof params.data != 'undefined')
					$.extend(JSONObject, params.data);				

				// Build JSON String
				JSONString = params.objectId + '=' + JSON.stringify(JSONObject);		
				
				// Call WS
				$.post(params.wsInsert, JSONString)
					.done(function (result, status) {
						if (result.response.type === 'SUCCESS') {
							// Load form values
							$.each(JSONObject, function(field, value) {
								$('input[id="' + field + '"]').val(value);
							});				
							
							// New Id for Customer
							if (params.objectId === 'custInfo')
								$('#cust_id').val(result.response.newId);				
							
							// New Id for Product
							else if (params.objectId === 'prodInfo')
								$('#prod_id').val(result.response.newId);
							
							// New Id for Supplier
							else if (params.objectId === 'suppInfo')
								$('#supp_id').val(result.response.newId);
							
							BootstrapDialog.closeAll();	
							
							if (params.status == 'FIRST_WEIGHT_IN')
								toggleWeightScaleFields({ status: params.status });		
						
						// Show WS Error
						} else {
							STIC.showWSError({ formId: params.formId });
						}	
					})
					
					// Show WS Error
					.fail(function () {
						STIC.showWSError({ formId: params.formId });
					});
			}
		}
	}

	// Show Add Form
	BootstrapDialog.show({
		closable: false,
		title: modalNewTitle,
		message: modalFrmContent,
		onshown: btnNewOnShown,
		buttons: [modalBtnSave, modalBtnCancel]
	});
}

// Toggle Buttons & Fields
function toggleWeightScaleFields(options) {		
	switch(options.status) {
		case 'FIRST_WEIGHT_IN':
			console.log('FIRST_WEIGHT_IN');
			// Main Buttons
			$('#first-weighing').removeClass('disabled'); 		
			$('#second-weighing').addClass('disabled');
			$('#cancel-weighing').removeClass('disabled');
			$('#reprint-docket').removeClass('disabled');
			// Field Buttons
			$('#new-customer-data').addClass('disabled');
			$('#new-destination-data').addClass('disabled');
			$('#new-product-data').addClass('disabled');
			$('#new-supplier-data').addClass('disabled');
			$('#search-customer-data').addClass('disabled');
			$('#search-destination-data').addClass('disabled');
			$('#search-product-data').addClass('disabled');
			$('#search-supplier-data').addClass('disabled');
			// Input Fields
			$('input[data-stage="second"][type="hidden"]').val('');
			$('input[data-stage="second"][data-type="varchar"]').val('');
			$('input[data-stage="second"][data-type="float"]').val('0.00');	
			break;
		case 'SECOND_WEIGHT_IN':
			console.log('SECOND_WEIGHT_IN');
			// Main Buttons
			$('#first-weighing').addClass('disabled'); 					
			$('#second-weighing').removeClass('disabled');	
			$('#cancel-weighing').removeClass('disabled');
			$('#reprint-docket').removeClass('disabled');
			// Field Buttons
			$('#new-customer-data').removeClass('disabled');
			$('#new-destination-data').removeClass('disabled');
			$('#new-product-data').removeClass('disabled');
			$('#new-supplier-data').removeClass('disabled');
			$('#search-customer-data').removeClass('disabled');
			$('#search-destination-data').removeClass('disabled');
			$('#search-product-data').removeClass('disabled');
			$('#search-supplier-data').removeClass('disabled');
			// Input Fields		
			$('input[data-stage="second"][type="hidden"]').val('');
			$('input[data-stage="second"][data-type="varchar"]').val('');
			$('input[data-stage="second"][data-type="float"]').val('0.00');	
			$('input[data-action="enable"]').prop('disabled', false);
			$('input[data-action="enable"]').prop('readonly', false);
			break;
		case 'CANCEL_WEIGHT_IN':
			console.log('CANCEL_WEIGHT_IN');
			// Main Buttons
			$('button[data-type="button"]').addClass('disabled');	
			// Field Buttons
			$('#new-customer-data').addClass('disabled');
			$('#new-destination-data').addClass('disabled');
			$('#new-product-data').addClass('disabled');
			$('#new-supplier-data').addClass('disabled');
			$('#search-customer-data').addClass('disabled');
			$('#search-destination-data').addClass('disabled');
			$('#search-product-data').addClass('disabled');
			$('#search-supplier-data').addClass('disabled');
			// Input Fields
			$('input[data-stage="first"]').val('');
			$('input[data-stage="second"][type="hidden"]').val('');
			$('input[data-stage="second"][data-type="varchar"]').val('');
			$('input[data-stage="second"][data-type="float"]').val('0.00');			
			$('input[data-action="enable"]').prop('disabled', true);
			$('input[data-action="enable"]').prop('readonly', true);
			break;
		default:
			console.log('Error: Unknown Response Type!');
	}
}