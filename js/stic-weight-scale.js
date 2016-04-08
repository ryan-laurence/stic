function showNewModalForm(params) {			
	var 
	
	formId = params.form_id,

	// Modal Form Options
	_modalFrmContent = $('<div></div>').load(params.frm_html),
	_modalNewTitle = '<i class="fa fa-plus"></i> New ' + params.data_type,
	
	// Modal Buttons Object
	_modalBtnSave = {
		label: 'Save',
		icon: 'fa fa-floppy-o',
		cssClass: 'btn-primary',
		action: _btnSaveAction
	},
	_modalBtnCancel = {
		label: 'Cancel',
		icon: 'fa fa-ban',
		cssClass: 'btn-primary',
		action: function(dialogItself) {
			BootstrapDialog.closeAll();
		}
	};
	
	// Trigger on Modal onshown event
	function _btnNewOnShown(dialogRef) {
		var modalBody = dialogRef.getModalBody(),
			elements = modalBody.find('input[data-field]');
		$.each(elements, function(idx, elem) { $(elem).val(''); });
	}		
	
	// Save Action
	function _btnSaveAction(dialogRef) {
		var isValid = STIC.FormValidation({
			formId: formId
		});		
		if (isValid) {
			var postString = '',
				JSONString = '',
				JSONObject = {},
				modalBody = dialogRef.getModalBody(),
				elements = modalBody.find('input[data-field]');
			$.each(elements, function(idx, elem) {
				var input = $(elem), 	
					inputValue = input.val(),
					inputField = input.attr('data-field');		
				postString = '{"' + inputField + '":"' + inputValue + '"}';
				$.extend(JSONObject, $.parseJSON(postString)); 
			});					
			if (typeof params.data != 'undefined')
				$.extend(JSONObject, params.data);
			JSONString = params.root_node + '=' + JSON.stringify(JSONObject);		
			$.post(params.ws_insert, JSONString, function(data, status, jqXHR) {
				var result = $.parseJSON(jqXHR.responseText);
				$.each(JSONObject, function(field, value) {
					$('input[id="' + field + '"]').val(value);
				});				
				if (params.root_node == 'custInfo')
					$('#cust_id').val(result.response.newId);				
				else if (params.root_node == 'prodInfo')
					$('#prod_id').val(result.response.newId);
				else if (params.root_node == 'suppInfo')
					$('#supp_id').val(result.response.newId);
				BootstrapDialog.closeAll();	
				if (params.status == 'FIRST_WEIGHT_IN')
					toggleWeightScaleFields({ status: params.status });
				/*BootstrapDialog.alert({
					title: MSG_ADD_REC_TITLE,
					message: MSG_ADD_REC_INFO,	
					type: BootstrapDialog.TYPE_PRIMARY,
					callback: function(result) {
						BootstrapDialog.closeAll();
						if (params.status == 'FIRST_WEIGHT_IN')
							toggleWeightScaleFields({ status: params.status });
					}
				});*/				
			});
		}
	}

	// Show Add Form
	BootstrapDialog.show({
		closable: false,
		title: _modalNewTitle,
		message: _modalFrmContent,
		onshown: _btnNewOnShown,
		buttons: [_modalBtnSave, _modalBtnCancel]
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
			alert('Error: Unknown Response Type!');
	}
}