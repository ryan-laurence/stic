function showNewModalForm(params) {			
	// Modal Form Options
	var modalFrmContent = $('<div></div>').load(params.formSrc),
	modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.dataType,
	
	// Modal Buttons > Save
	modalBtnSave = {
		label: 'Save Data',
		icon: 'fa fa-floppy-o',
		cssClass: 'btn-primary',
		action: btnSaveAction
	},
	
	// Modal Buttons > Cancel
	modalBtnCancel = {
		label: 'Cancel',
		icon: 'fa fa-ban',
		cssClass: 'btn-default',
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
								clearErrorStyles([field]);
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
							
							if (params.status === 'FIRST_WEIGHT_IN')
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
		buttons: [modalBtnCancel, modalBtnSave]
	});
}

// Toggle Buttons & Fields
function toggleWeightScaleFields(options) {		
	switch(options.status) {
		case 'FIRST_WEIGHT_IN':
			// LCD 
			//$('#weight-status').text('stable');			
			$('.weight-stage .txt1').html('<img src="images/numeric-1-box-outline.png">');
			
			// Main Buttons
			$('#first-weighing').prop('disabled', false); 		
			$('#second-weighing').prop('disabled', true); 	
			$('#cancel-weighing').prop('disabled', false); 	
			$('#reprint-docket').prop('disabled', true); 	
			$('#first-weighing').popover();
			$('#second-weighing').popover('destroy');
			$('#cancel-weighing').popover();
			$('#reprint-docket').popover('destroy');

			// Field Buttons
			$('label[for]').css('color', '#333333');
			$('#new-customer-data').prop('disabled', true); 	
			$('#search-customer-data').prop('disabled', true); 	
			$('#new-destination-data').prop('disabled', true); 	
			$('#search-destination-data').prop('disabled', true); 
			$('#new-product-data').prop('disabled', true); 	
			$('#search-product-data').prop('disabled', true); 	
			$('#new-supplier-data').prop('disabled', true); 
			$('#search-supplier-data').prop('disabled', true); 				
			$('#new-customer-data').popover('destroy');
			$('#search-customer-data').popover('destroy');
			$('#new-destination-data').popover('destroy');
			$('#search-destination-data').popover('destroy');
			$('#new-product-data').popover('destroy');
			$('#search-product-data').popover('destroy');	
			$('#new-supplier-data').popover('destroy');
			$('#search-supplier-data').popover('destroy');	
			
			// Input Fields
			$('input[data-stage="second"][type="hidden"]').val('');
			$('input[data-stage="second"][data-type="varchar"]').val('');
			$('input[data-stage="second"][data-type="float"]').val('0.00');	
			
			$('input[data-stage="second"][data-type="varchar"]').removeClass('bg-white');
			break;
		
		case 'SECOND_WEIGHT_IN':
			// LCD
			//$('#weight-status').text('stable');			
			$('.weight-stage .txt1').html('<img src="images/numeric-2-box-outline.png">');
			
			// Main Buttons
			$('#first-weighing').prop('disabled', true); 			
			$('#second-weighing').prop('disabled', false); 	
			$('#cancel-weighing').prop('disabled', false); 	
			$('#reprint-docket').prop('disabled', false); 	
			$('#first-weighing').popover('destroy');
			$('#second-weighing').popover();
			$('#cancel-weighing').popover();
			$('#reprint-docket').popover();
			
			// Field Buttons
			$('label[for]').css('color', '#333333');
			$('#new-customer-data').popover();
			$('#new-customer-data').prop('disabled', false); 	
			$('#search-customer-data').prop('disabled', false); 	
			$('#new-destination-data').prop('disabled', false); 	
			$('#search-destination-data').prop('disabled', false); 
			$('#new-product-data').prop('disabled', false); 	
			$('#search-product-data').prop('disabled', false); 	
			$('#new-supplier-data').prop('disabled', false); 
			$('#search-supplier-data').prop('disabled', false); 
			$('#new-customer-data').popover();
			$('#search-customer-data').popover();
			$('#new-destination-data').popover();
			$('#search-destination-data').popover();
			$('#new-product-data').popover();
			$('#search-product-data').popover();	
			$('#new-supplier-data').popover();
			$('#search-supplier-data').popover();	
			
			// Input Fields		
			$('input[data-stage="second"][type="hidden"]').val('');
			$('input[data-stage="second"][data-type="varchar"]').val('');
			$('input[data-stage="second"][data-type="float"]').val('0.00');	
			$('input[data-action="enable"]').prop('readonly', false);
			
			$('input[data-stage="second"][data-type="varchar"]').addClass('bg-white');
			break;
		
		case 'CANCEL_WEIGHT_IN':			
			// LCD
			$('#weight-reading').text('+0.00');
			$('#weight-status').text('inactive');
			$('.weight-stage .txt1').html('<img src="images/numeric-0-box-outline.png">');
			
			// Main Buttons
			$('button[data-type="button"]').popover('destroy'); 	
			$('button[data-type="button"]').prop('disabled', true); 	
			
			// Field Buttons
			$('label[for]').css('color', '#333333');
			$('#new-customer-data').popover('destroy');
			$('#new-customer-data').prop('disabled', true); 	
			$('#search-customer-data').prop('disabled', true); 	
			$('#new-destination-data').prop('disabled', true); 	
			$('#search-destination-data').prop('disabled', true); 
			$('#new-product-data').prop('disabled', true); 	
			$('#search-product-data').prop('disabled', true); 	
			$('#new-supplier-data').prop('disabled', true); 
			$('#search-supplier-data').prop('disabled', true); 	
			$('#new-customer-data').popover('destroy');
			$('#search-customer-data').popover('destroy');
			$('#new-destination-data').popover('destroy');
			$('#search-destination-data').popover('destroy');
			$('#new-product-data').popover('destroy');
			$('#search-product-data').popover('destroy');	
			$('#new-supplier-data').popover('destroy');
			$('#search-supplier-data').popover('destroy');	
			
			// Input Fields
			$('input[data-stage="first"][data-type="varchar"]').val('');
			$('input[data-stage="first"][data-type="float"]').val('0.00');		
			$('input[data-stage="second"][type="hidden"]').val('');
			$('input[data-stage="second"][data-type="varchar"]').val('');			
			$('input[data-stage="second"][data-type="float"]').val('0.00');			
			$('input[data-action="enable"]').prop('readonly', true);
			
			$('div.btn-group').find('span.glyphicon').remove();
			$('div.btn-group').removeClass('has-error');
			$('div.btn-group').removeClass('has-feedback');
			$('input[data-stage="second"][data-type="varchar"]').removeClass('bg-white');
			break;
		
		default:
			console.log('Error: Unknown Response Type!');
	}
}

function showErrorStyles(elements) {
	$.each(elements, function (idx, elem) {	
		clearErrorStyles([elem]);
		$('label[for="' + elem + '"]')
			.parent('div.btn-group')
			.addClass('has-error');
		$('input[id="' + elem + '"]')
			.parent('div.btn-group')
			.addClass('has-error')
			.addClass('has-feedback');	
		$('input[id="' + elem + '"]')
			.parent('div.btn-group')
			.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
	});	
}

function clearErrorStyles(elements) {
	$.each(elements, function (idx, elem) {		
		$('label[for="' + elem + '"]')
			.parent('div.btn-group')
			.removeClass('has-error');
		$('input[id="' + elem + '"]')
			.parent('div.btn-group')
			.removeClass('has-error')
			.removeClass('has-feedback');			
		$('div.btn-group input[id="' + elem + '"]')
			.next('span.glyphicon')
			.remove();	
	});	
}