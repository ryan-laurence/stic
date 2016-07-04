$(function() {
	// Init Select Field
	$('select[data-field="port"]').selectpicker();
	$('select[data-field="baudrate"]').selectpicker();

	// Pre load com port settings
	loadComPort();

	// Save com port settings
	$('#save-com-port').on('click', function() {
		BootstrapDialog.confirm({
			type: 'type-danger',
			title: MSG_TITLE_INFO,
			message: MSG_CONFIRM_SAVE_CONFIG,
			btnOKLabel: BTN_LABEL_CONFIRM_SAVE,
			btnCancelLabel: BTN_LABEL_CANCEL,
			callback: function(result) {
				if (result) {
					var jsonObject = {}, jsonString = '';
					$('input[data-field="port_baudrate"]').val(
						$('select[data-field="port"]').val() + '=' +
							$('select[data-field="baudrate"]').val()
					);
					$.each($('input[data-field]'), function(index, elem) {
						var postString = '{"' + $(elem).attr('data-field') + '":"' + 
							$(elem).val() + '"}';
						$.extend(jsonObject, $.parseJSON(postString));
					});
					jsonString = 'companyInfo=' + JSON.stringify(jsonObject);
					$.post(WS_UPDATE_CONFIG_COMPANY, jsonString)
						.done(function(results, status) {
							var response = results.response;
							if (response.type === 'SUCCESS') {
								BootstrapDialog.alert({
									type: 'type-primary',
									title: MSG_TITLE_INFO,
									message: MSG_INFO_SAVE_CONFIG,
									callback: function(dialogItself) {
										loadComPort();
										STIC.openScaleReader();
									}
								});
							} else {
								STIC.showWSError();
							}
						})
						.fail(function() {
							STIC.showWSError();
						})
				}
			}
		});
	});

	// Reset com port settings
	$('#reset-com-port').on('click', function() {
		loadComPort();
	});

	// Pre load com port settings
	function loadComPort() {
		$.get(WS_LIST_CONFIG_COMPANY)
			.done(function(results, status) {
				var response = results.response;
				if (response.type === 'SUCCESS') {
					var data = response['company-list'].company,
						pb = data.port_baudrate.split('=');
					$.each(data, function(field, value) {
						$('input[data-field="' + field + '"]').val(value);
					});
					$('select[data-field="port"]').val(pb[0]);
					$('select[data-field="baudrate"]').val(pb[1]);
					$('select[data-field="port"]').selectpicker('val', pb[0]);
					$('select[data-field="baudrate"]').selectpicker('val', pb[1]);
				} else {
					STIC.showWSError();
				}
			})
			.fail(function() {
				STIC.showWSError();
			})
	}
});
