function dateFormat(pDate, pDateFormat){
	/**
	 * M d, Y = Feb 19, 2011
	 */
	if (pDate == null || pDate == '') {
		alert('Date parameter must not be null / empty.');
		return false;
	}
	if (pDateFormat == null || pDateFormat == '') pDateFormat = 'M d, Y'

    return pDate ? pDate.dateFormat( pDateFormat ) : '';
};

function getCurrentDate() {
	return new Date().format("yyyy-mm-dd");;
}

function getFirstDayOfMonth() {
	var newDate = new Date();
	var dd = '01';
	var yy = newDate.getFullYear();
	var curDate = newDate.format("yyyy-mm-dd");
	curDate = curDate.substring(0, curDate.length - 2) + dd;
	return curDate;
}

// Table Row Selection Event
function _fnTableRowSelection(tableObject, rowObject, tableTools) {
	tableTools = tableTools || [];
	if ($(rowObject).hasClass('selected')) {
		$(rowObject).removeClass('selected');
		if (tableTools.length > 0) {
			$.each(tableTools, function(index, tableTool) {
				$('#' + tableTool).prop('disabled', true);
			});
		}
	} else {
		tableObject.$('tr.selected').removeClass('selected');
		$(rowObject).addClass('selected');
		if (tableTools.length > 0) {
			$.each(tableTools, function(index, tableTool) {
				$('#' + tableTool).prop('disabled', false);
			});
		}
	}
}

// Global Namespace
var STIC = {

	// Modules Functions
	Modules: {

		// Load allowed modules to user
		Init: function () {
			var JSONObject = {
				roleModuleId: STIC.User.ReadCookie('roleid')
			};

			// Call WS to get allowed modules
			$.getJSON(WS_UI_MODULES_LIST, JSONObject)
				.done(function (results, status) {
					var response = results.response;

					// Proceed if there are allowed modules to user
					if (response.type === 'SUCCESS') {
						var navItems = [], navLabel = '',
							prevParentId = '', currParentId = '',
							modules = response['report-list'].report;

						// Build navigation list
						$.each(modules, function (i, m) {
							currParentId = m.mod_parent;
							navLabel = m.mod_icon != '' ?
								'<i class="' + m.mod_icon + '"></i> ' + m.mod_label :
								m.mod_label;

							// Set drop down menu closing tags
							if (prevParentId != '' && currParentId > prevParentId) {
								navItems.push('</ul></li>');
							} else if (prevParentId != '' && currParentId == '') {
								navItems.push('</ul></li>');
							}

							// Set navigation list
							if (m.mod_type == 'group') {
								navItems.push(
									'<li class="dropdown" data-mod-id="' + m.mod_id + '">' +
										'<a href="#" class="dropdown-toggle" data-toggle="dropdown" ' +
											'role="button" aria-expanded="false">' +
											navLabel +
											' <span class="caret"></span>' +
										'</a>' +
										'<ul class="dropdown-menu" role="menu">'
								);
							} else {
								navItems.push(
									'<li>' +
										'<a href="#" ' +
											'data-mod-parent="' + m.mod_parent + '" ' +
											'data-mod-name="' + m.mod_name + '">' +
											navLabel +
										'</a>' +
									'</li>');
							}

							prevParentId = currParentId;
						});

						// Append Navigation List
						$('#nav-wrapper').html(navItems.join(''));

						// Navigation onClick Event
						$('[data-mod-name]').on('click', function () {
							var modName = $(this).attr('data-mod-name'),
								 modParent = $(this).attr('data-mod-parent');

							// Clear active modules style
							$('#nav-wrapper')
								.find('li.active')
								.removeClass('active');

							// Set active module style
							if (modParent != '') {
								$('#nav-wrapper')
									.find('li[data-mod-id="' + modParent + '"]')
									.addClass('active');
							} else {
								$(this)
									.parent()
									.addClass('active');
							}

							// Load module page
							STIC.Modules.LoadPage({ modName: modName });
						});

					// Show alert if there are no modules assigned to user
					} else {
						BootstrapDialog.alert({
							type: 'type-danger',
							title: MSG_TITLE_INFO,
							message: 'There are no modules currently assigned to your account. For more information, please contact your system administrator.',
							callback: function(result) {
								BootstrapDialog.closeAll();
							}
						});
					}
				});
		},

		// Load module page
		LoadPage: function (params) {
			var wrapper = DEFAULT_WRAPPER_ID,
				pageLoc = DEFAULT_PAGE_LOC,
				pageExt = DEFAULT_PAGE_FILE_EXT;
			$(wrapper).load(pageLoc + params.modName + pageExt);
		}
	},

	// Enable Buttons
	enableButtons: function (buttons) {
		btns = buttons || [];
		if (btns.length > 0) {
			$.each(btns, function(idx, btn) {
				$(btn).prop('disabled', false);
			});
		}
	},

	// Disable Buttons
	disableButtons: function (buttons) {
		btns = buttons || [];
		if (btns.length > 0) {
			$.each(btns, function(idx, btn) {
				$(btn).prop('disabled', true);
			});
		}
	},

	// DT toggle Row Select
	dtToggleRowSelect: function (params) {
		var pid = params.pid,
			row = params.row,
			table = params.table,
			buttons = params.buttons || [];
		if (table.row(row).data()[pid] != '') {
			if ($(row).hasClass('selected')) {
				$(row).removeClass('selected');
				this.disableButtons(buttons);
			} else {
				table.$('tr.selected').removeClass('selected');
				$(row).addClass('selected');
				this.enableButtons(buttons);
			}
		}
	},

	// Docket Style Functions
	DocketStyle: {
		destroyMsgField: function() {
			$('select[data-field="dt_message"]').selectpicker('destroy');
			$('select[data-field="dt_message"]').remove();
			$('input[data-field="dt_message"]').remove();
		},
		newMsgInputField: function(params) {
			var _container = params.container,
				_defaultVal = params.defaultVal;
			_container.append('<input type="text" class="form-control" value="' +
				_defaultVal + '" data-field="dt_message" data-fv-notempty="true">');
		},
		newMsgSelectField: function(params) {
			var _JSONUrl = params.JSONUrl,
				_JSONData = params.JSONData,
				_container = params.container,
				_defaultVal = params.defaultVal;
			$.getJSON(_JSONUrl, function(data) {
				var options = [];
				$.each(data.response, function(a, b) {
					if (a == _JSONData) {
						$.each(b, function(c, d) {
							$.each(d, function(e, f) {
								options.push('<option value="' + f.df_id + '">' + f.df_alias + '</option>');
							});
						});
					}
				});
				_container.append('<select class="selectpicker form-control" title="-"' +
					' data-field="dt_message" data-fv-notempty="true" data-live-search="true" data-size="5">' +
					options.join('') + '</select>');
				$('select[data-field="dt_message"]').selectpicker('refresh');
				$('select[data-field="dt_message"]').selectpicker('val', _defaultVal);
			});
		},
		toggleMsgField: function(params) {
			var _JSONUrl = params.JSONUrl,
				_JSONData = params.JSONData,
				_container = $('#message-field-box'),
				_dataSrc = (typeof params.dataSrc != 'undefined' ? params.dataSrc : 'data'),
				_defaultVal = (typeof params.defaultVal != 'undefined' ? params.defaultVal : '');
			this.destroyMsgField();
			if (_dataSrc == 'data') {
				this.newMsgSelectField({
					JSONUrl: _JSONUrl,
					JSONData: _JSONData,
					container: _container,
					defaultVal: _defaultVal
				});
			} else {
				this.newMsgInputField({
					container: _container,
					defaultVal: _defaultVal
				});
			}
		}
	},

	// Show Duplicate Error messages on form after submit
	showDuplicateError: function (params) {
		var div = $(params.formId).find('label[for="' + params.ukey + '"]').parent(),
			input = $(params.formId).find('input[data-field="' + params.ukey + '"]');

		// Remove error messages & styles
		this.clearHelpBlocks({ formId: params.formId });

		// Show duplicate error message
		$(params.formId).prepend(MSG_ALERT_DUPLICATE_REC);

		// Show form error messages & styles
		div.addClass('has-error has-feedback');
		div.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
		div.append('<small class="help-block">' + input.attr('data-fv-unique-msg') + '</small>');
	},

	// Show WS Error message on form after submit
	showWSError: function (params) {
		var params = typeof params !== 'undefined' ? params : {};
		if (typeof params.formId !== 'undefined') {
			var formId = params.formId;
			$(formId).find('div.alert').remove();
			$(formId).prepend(MSG_ALERT_WS_ERROR);
		} else {
			BootstrapDialog.closeAll();
			BootstrapDialog.alert({
				type: 'type-danger',
				title: MSG_TITLE_WS_ERROR,
				message: MSG_INFO_WS_ERROR,
				callback: function(result) {
					BootstrapDialog.closeAll();
				}
			});
		}
	},

	// Remove error messages & styles
	clearHelpBlocks: function (params) {
		$(params.formId).find('div.form-group')
			.removeClass('has-error has-feedback')
			.removeClass('has-success has-feedback');
		$(params.formId).find('div.alert, span.glyphicon, small.help-block')
			.remove();
	},

	// Form Validation
	FormValidation: function (options) {
		var clearHelpBlocks = (typeof options.clearHelpBlocks != 'undefined'
			? options.clearHelpBlocks : false);

		// Clear Help Blocks
		if (clearHelpBlocks) {

			// Remove error messages & styles
			this.clearHelpBlocks({ formId: options.formId });

			return true;

		// Validate Form
		} else {
			var totalErrors = 0, postString = '',
				elems = $(options.formId).find('input[data-field], select[data-field]');

			// Remove error messages & styles
			this.clearHelpBlocks({ formId: options.formId });

			// Validate each field
			$.each(elems, function(idx, elem) {
				if ($(elem).attr('type') == 'hidden' || $(elem).attr('type') == 'checkbox')
					return;

				var errorMsg = '', stringMax = 0, fieldErrors = 0,
					fieldValue = $(elem).val(), fieldName = $(elem).attr('data-field'),

					// Field container
					div = $(options.formId).find('label[for="' + fieldName + '"]').parent();

				// Check if Empty
				if ($(elem).data('fv-notempty') === true) {
					errorMsg = MSG_FV_NOTEMPTY;
					if (fieldValue === '')
						fieldErrors++;
				}

				// Check for Special Characters
				if ($(elem).data('fv-specialchars') === true && fieldErrors <= 0) {
					var pattern = new RegExp(/[^\w ]/g);
					errorMsg = MSG_FV_SPECIAL_CHARS;
					if (pattern.test(fieldValue) === true)
						fieldErrors++;
				}

				// Check Input Length
				if ($(elem).data('fv-stringlength') === true && fieldErrors <= 0) {
					errorMsg = $(elem).data('fv-stringlength-msg');
					if (fieldValue.length > parseInt($(elem).data('fv-stringlength-max')))
						fieldErrors++;
				}

				// Check Field Match
				if ($(elem).data('fv-fieldmatch') === true && fieldErrors <= 0) {
					errorMsg = $(elem).data('fv-fieldmatch-msg');
					if (fieldValue !== $($(elem).data('fv-fieldmatch-dom')).val())
						fieldErrors++;
				}

				// Check if Integer
				if ($(elem).data('fv-integer') === true && fieldErrors <= 0) {
					var pattern = new RegExp(/^\d+$/g);
					errorMsg = MSG_FV_INTEGER;
					if (pattern.test(fieldValue) === false)
						fieldErrors++;
				}

				// Check if Float
				if ($(elem).data('fv-float') === true && fieldErrors <= 0) {
					var pattern = new RegExp(/^\d*(\.\d{1,2})?$/g);
					errorMsg = MSG_FV_FLOAT;
					if (pattern.test(fieldValue) === false)
						fieldErrors++;
				}

				// Toggle error messages & styles
				if (fieldErrors > 0) {
					div.addClass('has-error has-feedback');
					$(elem).parent().addClass('has-error has-feedback');
					if (!$(elem).is('select'))
						$(elem).after(
							'<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>' +
							'<small class="help-block">' + errorMsg + '</small>'
						);
					else
						$(elem).parent().after('<small class="help-block" style="margin-top: 5px">' + errorMsg + '</small>');
				} else {
					div.addClass('has-success has-feedback');
					$(elem).parent().addClass('has-success has-feedback');
					if (!$(elem).is('select'))
						$(elem).after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
				}

				// Accumulate Error count
				totalErrors += fieldErrors;
			});

			if (totalErrors > 0)
				$(options.formId).prepend(MSG_ALERT_FORM_ERROR);

			return totalErrors > 0 ? false : true;
		}
	},

	// Default AJAX Post
	postData: function (params) {
		// Check if callback is passed
		var callback = (typeof params.callback !== 'undefined'
			? params.callback : '');

		$.post(params.url, params.data)
			.done(function(result, status) {
				// Execute callback function
				$.isFunction(callback.func)
					? callback.func(callback.args) : '';

				// Reload DT
				(typeof params.dt !== 'undefined'
					? params.dt.ajax.reload() : '');

				var response = result.response;

				// on Success
				if (response.type == 'SUCCESS') {
					BootstrapDialog.closeAll();
					BootstrapDialog.alert({
						type: 'type-primary',
						title: params.title,
						message: params.message,
						callback: function(result) {
							BootstrapDialog.closeAll();
						}
					});

				// on WS Error
				} else {
					STIC.showWSError({ formId: params.formId });
				}
			})

			// on Request Error
			.fail(function() {
				STIC.showWSError({ formId: params.formId });
			});
	},
	
	// Report Functions
	Report: {
		
		// Format Number
		FormatNumber: function (sum) {
			return sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		},
		
		// Set PDF Styles
		SetPDFStyles: function (params) {
			var doc = params.doc,			
				footerData = params.footerData || [];
			
			// Get Column Widths & Set Footer Columns
			var widths = [], footerCols = [];
			$.each(params.cd, function (idx, column) {
				if (typeof column.visible === 'undefined') {

					// Get Column Width
					var width = typeof column.width !== 'undefined' ? column.width : '*';
					widths.push(width);

					// Set Table Footer
					if (footerData.length > 0) {
						var hasMatch = 0;
						$.each(footerData, function (idy, footer) {
							if (footer.data === column.data) {
								hasMatch++;
								footerCols.push({
									text: footer.text,
									style: 'tableFooter',
									alignment: 'left'
								});
							} 
						});
						if (hasMatch === 0)
							footerCols.push({ text: '' });
					} else {
						footerCols.push({ text: '' });
					}					
				}
			});		
			
			// Default Styles
			doc.defaultStyle.columnGap = 5;

			// Table Header Styles overrides
			doc.styles.tableHeader.fillColor = '';
			doc.styles.tableHeader.color = '#000000';
			doc.styles.tableHeader.alignment = 'left';
			doc.styles.tableHeader.margin = [0, 12, 0, 2];

			// Table Body Styles overrides
			doc.styles.tableBodyOdd.fillColor = '';
			doc.styles.tableBodyEven.fillColor = '';

			// Table Footer Styles overrides
			doc.styles.tableFooter.bold = true;
			doc.styles.tableFooter.fillColor = '';
			doc.styles.tableFooter.color = '#000000';

			// Table Widths
			doc.content[1]['table']['widths'] = widths;

			// Table Layout
			doc.content[1]['layout'] = {
				hLineWidth: function (i, node) {
					return (i === 1 || i === (node.table.body.length - 1)) ? 1 : 0;
				},
				hLineColor: function (i, node) {
					return (i === 1 || i === (node.table.body.length - 1)) ? 'black' : '';
				},
				vLineWidth: function (i, node) { return 0; },
				vLineColor: function (i, node) { return ''; },
				paddingLeft: function (i, node) { return 2; },
				paddingRight: function (i, node) { return 2; },
				paddingTop: function (i, node) { return 6; },
				paddingBottom: function (i, node) { return 6; }
			};
			
			// Table Footer
			var rowCount = doc.content[1]['table']['body'].length;
			doc.content[1]['table']['body'].splice(rowCount, 0, footerCols);
			
			return doc;
		}		
	},

	// User Functions
	User: {

		// Create Cookie
		CreateCookie: function (name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = '; expires=' + date.toGMTString();
			}
			else var expires = '';
			document.cookie = name + '=' + value + expires + '; path=/';
		},

		// Read Cookie
		ReadCookie: function (name) {
			var nameEQ = name + '=', ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0)
					return c.substring(nameEQ.length, c.length);
			}
			return null;
		},

		// Erase Cookie
		EraseCookie: function (name) {
			this.CreateCookie(name, '', -1);
		},

		// Remove from Audit Trail
		RemoveToContext: function () {
			if (this.ReadCookie('username') !== null) {
				var JSONObject = {
					user_name: this.ReadCookie('username')
				};
				$.post(WS_USER_REMOVE_FROM_AUDIT, JSONObject)
					.done(function (results, status) {
						if (results.response.type === 'FAILED') {
							STIC.showWSError();
						}
					})
					.fail(function () {
						STIC.showWSError();
					});
			}
		},

		// Check if User is valid
		CheckIfValid: function (logout) {
			var roleId = this.ReadCookie('roleid'),
				userId = this.ReadCookie('userid'),
				userName = this.ReadCookie('username'),
				forceLogOut = typeof logout !== 'undefined' 
					? logout : true;

			if (roleId !== null && userId !== null && userName !== null) {
				var JSONObject = {
					user_id: userId,
					user_name: userName
				};

				// Call WS Validation
				$.post(WS_USER_AUTHENTICATE, JSONObject)
					.done(function (results, status) {
						if (results.response.type === 'SUCCESS') {
							$('#current-user').text(userName);
							if (!forceLogOut)
								window.location = DEFAULT_ROOT + 'main.html';
						} else {
							if (forceLogOut)
								this.Logout();
						}
					})
					.fail(function () {
						STIC.showWSError();
					});
			} else {
					if (forceLogOut) {
						this.Logout();
					} else {
						this.RemoveToContext();
						this.EraseCookie('username');
						this.EraseCookie('userid');
						this.EraseCookie('roleid');
					}
			}
		},

		// Login
		Login: function () {
			var totalErrors = 0,
				username = $('#username').val(),
				password = $('#password').val();

			// Clear error messages & styles
			$('.login-form').find('div.form-group')
				.removeClass('has-error has-feedback')
				.removeClass('has-success has-feedback');
			$('.login-form').find('div.form-group').find('span.glyphicon, small.help-block')
				.remove();
			$('.login-form').find('div.alert')
				.remove();

			// Validate user name
			var divInputGroup = $('.login-form').find('#username').parent(),
					divFormGroup = $('.login-form').find('#username').parent().parent();
			if (username == '') {
				divFormGroup.addClass('has-error has-feedback');
				divFormGroup.append('<small class="help-block" style="text-align: left">Username is required.</small>');
				divInputGroup.append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
				totalErrors++;
			} else {
				divFormGroup.addClass('has-success has-feedback');
				divInputGroup.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
			}

			// Validate user password
			var divInputGroup = $('.login-form').find('#password').parent(),
					divFormGroup = $('.login-form').find('#password').parent().parent();
			if (password == '') {
				divFormGroup.addClass('has-error has-feedback');
				divFormGroup.append('<small class="help-block" style="text-align: left">Password is required.</small>');
				divInputGroup.append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
				totalErrors++;
			} else {
				divFormGroup.addClass('has-success has-feedback');
				divInputGroup.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
			}

			// Authenticate user
			if (totalErrors <= 0 ) {
				$.post(WS_USER_CHECK, { user_name: username, user_password: password })
					.done(function (result, status) {
						var response = result.response;

						// Authenticated
						if (response.type === 'SUCCESS') {
							var user = response['users-list'].user;

							// Create Cookies
							STIC.User.CreateCookie('username', user.user_name, 1);
							STIC.User.CreateCookie('userid', user.user_id, 1);
							STIC.User.CreateCookie('roleid', user.role_id, 1);

							window.location = DEFAULT_ROOT + 'main.html';

						// Not Authorized
						} else {
							// Clear error messages & styles
							$('.login-form').find('div.form-group')
								.removeClass('has-error has-feedback')
								.removeClass('has-success has-feedback');
							$('.login-form').find('div.form-group').find('span.glyphicon, small.help-block')
								.remove();
							$('.login-form').find('div.alert')
								.remove();

							// Show error messages & styles
							$('.login-form hr:first').after(MSG_ALERT_INVALID_LOGIN);
							$('.login-form').find('#username, #password').parent()
								.append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
							$('.login-form').find('#username, #password').parent().parent()
								.addClass('has-error has-feedback');
							$('.login-form').find('#username').parent().parent()
								.append('<small class="help-block" style="text-align: left">Username is invalid.</small>');
							$('.login-form').find('#password').parent().parent()
								.append('<small class="help-block" style="text-align: left">Password is invalid.</small>');
						}
					})

					// Show WS Error
					.fail(function () {
						STIC.showWSError();
					})
			} else {
				$('.login-form hr:first').after(MSG_ALERT_LOGIN_FORM_ERROR);
			}
		},

		// Confirm Logout
		ConfirmLogout: function () {
			BootstrapDialog.confirm({
				title: MSG_TITLE_CONFIRM_LOGOUT,
				message: MSG_CONFIRM_LOGOUT,
				callback: function (result) {
					if (result) {
						STIC.User.Logout();
					}
				}
			});
		},

		// Logout
		Logout: function () {
			this.RemoveToContext();
			this.EraseCookie('username');
			this.EraseCookie('userid');
			this.EraseCookie('roleid');
			window.location = DEFAULT_ROOT;
		},

		// Change Password
		ChangePassword: function () {
			// Modal Options
			var modalFormTitle = '<i class="fa fa-key"></i> Change Password',
				modalFormContent = $('<div></div>').load(FORM_CHANGE_PASS_DATA),

			// Modal Buttons
			modalBtnSave = {
				label: 'Save',
				icon: 'fa fa-floppy-o',
				cssClass: 'btn-primary',
				action: modalBtnSaveAction
			},
			modalBtnCancel = {
				label: 'Cancel',
				icon: 'fa fa-ban',
				cssClass: 'btn-primary',
				action: function (dialogItself) {
					dialogItself.close();
				}
			};

			// Modal Form
			BootstrapDialog.show({
				closable: false,
				title: modalFormTitle,
				message: modalFormContent,
				onshown: function (dialogItself) {
					var modalBody = dialogItself.getModalBody();
					modalBody.find('input[data-field]').val('');
				},
				onhidden: function (dialogItself) {
					var modalBody = dialogItself.getModalBody();
					modalBody.find('input[data-field]').val('');
				},
				buttons: [modalBtnSave, modalBtnCancel]
			});

			// Modal Button > Save Action
			function modalBtnSaveAction(dialogItself) {
				// Form Validation
				var formId = '#formChangePassword',
					isValid = STIC.FormValidation({ formId: formId });

				// Proceed if form is valid
				if (isValid) {
					var userName = STIC.User.ReadCookie('username'),
						oldPass = $(formId + ' input[data-field="old_password"]').val(),
						newPass = $(formId + ' input[data-field="new_password"]').val(),
						confPass = $(formId + ' input[data-field="confirm_password"]').val(),
						JSONSObject = { user_name: userName, user_password: oldPass };

					// Check old password
					$.post(WS_USER_PASS_CHECK, JSONSObject)
						.done(function (results, status) {

							// Proceed if old password is valid
							if (results.response.type == 'SUCCESS') {
								var userId = STIC.User.ReadCookie('userid'),
									JSONSObject = { user_id: userId, user_password: newPass };

								// Call WS
								$.post(WS_USER_PASS_UPDATE, JSONSObject)
									.done(function (results, status) {

										// Password is updated
										if (results.response.type == 'SUCCESS') {
											BootstrapDialog.closeAll();
											BootstrapDialog.alert({
												type: 'type-primary',
												title: MSG_TITLE_INFO,
												message: MSG_INFO_LOGOUT_AFTER_CPASS,
												callback: function (dialogItself) {
													$(formId + ' input[data-field]').val('');
													BootstrapDialog.closeAll();
													STIC.User.Logout();
												}
											});

										// Show WS Error
										} else {
											STIC.showWSError({ formId: formId });
										}
									})

									// Show WS Error
									.fail(function () {
										STIC.showWSError({ formId: formId });
									});

							// Old Password is invalid
							} else {
								var div = $(formId).find('label[for="old_password"]').parent();

								// Remove error messages & styles
								$(formId).find('div.alert').remove();
								div.removeClass('has-success has-feedback');
								div.find('span.glyphicon, small.help-block').remove();

								// Show invalid old password message
								$(formId).prepend(MSG_ALERT_INVALID_OLD_PASS);

								// Show form error messages & styles
								div.addClass('has-error has-feedback');
								div.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
								div.append('<small class="help-block">Old password is invalid.</small>');
							}
						});
				}
			}
		}
	}
};

// Load Summary Reports
function loadSummaryReport(params) {
	// Default Date
	var today = new Date(),
		defString = 'YYYY-MM-DD HH:mm:ss',
		defEnd = moment(today).format(defString),
		//defStart = moment(today).subtract(1, 'days').format(defString),
		defStart = moment().startOf('month').format(defString),
		defWsURL = params.ws + 'dateFrom=' + defStart + '&dateTo=' + defEnd,
		//console.log('datetime: ' + defWsURL);

	// DT Button Text
	dtBtnReloadTxt = '<i class="fa fa-refresh"></i> Refresh',
	dtBtnPrintTxt = '<i class="glyphicon glyphicon-print"></i> Print',

	// DT Button PDF Print
	dtBtnPDFPrint = {
		name: 'print',
		extend: 'pdfHtml5',
		download: 'open',
		text: dtBtnPrintTxt,
		title: params.title,
		className: 'btn-primary',
		exportOptions: { columns: ':visible' },
		customize: dtPDFPrintCustom
	},

	// DT Button Reload
	dtBtnReload = {
		name: 'reload',
		text: dtBtnReloadTxt,
		className: 'btn-primary',
		action: function (e, dt, node, config) {
			dt.ajax.reload();
		}
	};

	// DT Initial
	var dtSummary = $('#table-summary')
		.DataTable({
			pageLength: 10,
			ordering: true,
			searching: false,
			processing: false,
			lengthChange: false,
			columns: params.cd,
			dom: '<"dt-toolbar">B<"dt-total">Rrtip',
			ajax: {
				url: defWsURL,
				dataSrc: function(json) {
					var ds = params.ds.split('.'),
						rec = json[ds[0]][ds[1]][ds[2]];
					return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
				}
			},
			buttons: [dtBtnPDFPrint, dtBtnReload]
		})
		.on('draw.dt', function (e, settings, data) {
			// Toggle Print Button
			dtSummary.data().length > 0 ?
				dtSummary.button('print:name').enable() :
				dtSummary.button('print:name').disable();

			// Set Total Net Weight
			if (params.showTotal) {
				var totalNetWeight = dtSummary
					.column('net_weight:name')
					.data().sum(),
				formattedTotal = STIC.Report
					.FormatNumber(totalNetWeight);					
				$('#total_net_weight').val(formattedTotal);			}
		});

	// DT Default Sorting
	dtSummary.column('0:visible').order('asc').draw();

	// Show Total Net Weight
	if (params.showTotal) {
		$('div.dt-total').css('float', 'right');
		$('div.dt-total').html(
			'<div class="input-group">' +
				'<span class="input-group-addon">' + 
					'<i class="fa fa-calculator"></i> ' +
					'<strong>Total Net Weight</strong>' +
				'</span>' +
				'<input type="text" class="form-control" id="total_net_weight" ' +
					'value="0.00" style="width: 150px; background: #FFFFFF;" readonly>' +
			'</div>'
		);
	}

	// Load Toolbar Elements
	$('div.dt-toolbar').css('float', 'left');
	$('div.dt-buttons').css('float', 'left');
	$('div.dt-buttons').css('padding-left', '5px');
	$('div.dt-toolbar').load('pages/summary-date-filter.html',
		function (response, status, xhr) {
			var dp1 = $('#dp1'),
				dp2 = $('#dp2'),
				inEndDt = $('#end-date'),
				inStartDt = $('#start-date'),
				btnToolSearch = $('#tools-search-report');

			// Date Picker Initial
			dp1.datetimepicker();
			dp2.datetimepicker();

			// Set Default Date
			//dp1.data('DateTimePicker').date(moment(today).subtract(1, 'days'));
			dp1.data('DateTimePicker').date(moment().startOf('month'));
			dp2.data('DateTimePicker').date(moment(today));

			// Set Min & Max dates
			dp1.on('dp.change', function(e) {
				dp2.data('DateTimePicker').minDate(e.date);
			});
			dp2.on('dp.change', function(e) {
				dp1.data('DateTimePicker').maxDate(e.date);
			});

			// Search Report
			btnToolSearch.on('click', function() {
				var end = moment(new Date(inEndDt.val())).format(defString),
					start = moment(new Date(inStartDt.val())).format(defString),
					wsURL = params.ws + 'dateFrom=' + start + '&dateTo=' + end;
				dtSummary.ajax.url(wsURL).load();
			});
		});
		
	// Customize PDF Print Output
	function dtPDFPrintCustom(doc) {	
		var footerData = [];
		if (params.showTotal) {
			footerData.push(
				{ data: 'weight_unit', text: 'kg' },
				{ data: 'net_weight', text: $('#total_net_weight').val() }
			);
		}

		// Set Default Styles
		var pdfDoc = STIC.Report.SetPDFStyles({
			doc: doc,
			cd: params.cd,
			footerData: footerData		
		});

		// Set add. messages
		var defString = 'MM/DD/YYYY hh:mm A',
			startDate = new Date($('#start-date').val()),
			endDate = new Date($('#end-date').val()),			
			fromLabel = { width: 30, bold: true, text: 'From :' },			
			toLabel = { width: 30, bold: true, text: 'To :' },
			fromDate = { width: 'auto', text: moment(startDate).format(defString) },
			toDate = { width: 'auto', text: moment(endDate).format(defString) };
		pdfDoc.content.splice(1, 0, { columns: [fromLabel, fromDate] });
		pdfDoc.content.splice(2, 0, { columns: [toLabel, toDate] });
	}
}

// Create DT for Picker
function initDT_Picker(options) {
	var dt,
		dtCd = options.cd,
		dtDs = options.ds,
		dtWs = options.ws,
		dtDomId = options.domId,
		dtOd = (typeof options.od != 'undefined' ? options.od : true)
		dtPl = (typeof options.pl != 'undefined' ? options.pl : DEFAULT_PAGE_LENGTH);
		dt = $('#' + dtDomId)
			.DataTable({
				pageLength: dtPl,
				ordering: dtOd,
				searching: true,
				processing: false,
				lengthChange: false,
				columns: dtCd,
				dom: '<"dt-toolbar">Bfrtip',
				ajax: {
					url: dtWs,
					dataSrc: function(json) {
						var ds = dtDs.split('.'),
							rec = json[ds[0]][ds[1]][ds[2]];
						return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
					}
				},
				buttons: [{
					name: 'reload',
					text: '<i class="fa fa-refresh"></i> Refresh',
					className: 'btn-primary',
					action: function(e, dt, node, config) {
						dt.ajax.reload();
					}
				}]
			});
		dt.column('0:visible').order('asc').draw();
		return dt;
}