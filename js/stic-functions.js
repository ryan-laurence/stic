// Global Namespace
var STIC = {

	// Interval ID Process for Scale Reader
	INTERVAL_ID: "",

	// Current Module Page
	CURRENT_PAGE: "",

	// Current Module Page ID
	CURRENT_PAGEID: "",

	// Flag for Ajax Loader
	SHOW_PROGRESS: true,

	// Load index page
	loadIndex: function(pageType) {
		if (pageType == 'activate') {
			STIC.User.RemoveToContext();
			STIC.User.EraseCookie('userid');
			STIC.User.EraseCookie('roleid');
			STIC.User.EraseCookie('username');
		}
		$(document.body).html("");
		$(document.body).load(DFLT_PAGE_DIR + pageType + DFLT_PAGE_EXT, function() {
			if (pageType == 'main') {
				$("#current-user").text(STIC.User.ReadCookie("username"));
			}
		});
	},

	// Load navigation bar
	loadNavBar: function() {
		$.getJSON(WS_UI_MODULES_LIST, {
			roleModuleId: STIC.User.ReadCookie('roleid')
		})
		.done(function(results, status) {
			var response = results.response;
			if (response.type === 'SUCCESS') {
				var navItems = [],
					navLabel = '',
					prevParentId = '',
					currParentId = '',
					report = response['report-list'].report,
					modules = $.isArray(report) === true ? report : [report];
				$.each(modules, function(i, m) {
					currParentId = m.mod_parent;
					navLabel = m.mod_icon != '' ?
						'<i class="' + m.mod_icon + '"></i> ' + m.mod_label :
						m.mod_label;
					if (prevParentId != '' && currParentId > prevParentId) {
						navItems.push('</ul></li>');
					} else if (prevParentId != '' && currParentId == '') {
						navItems.push('</ul></li>');
					}
					if (m.mod_type == 'group') {
						navItems.push(
							'<li class="dropdown" data-mod-id="' + m.mod_id + '">' +
								'<a class="dropdown-toggle" data-toggle="dropdown" ' +
									'role="button" aria-expanded="false">' +
									navLabel +
									' <span class="caret"></span>' +
								'</a>' +
								'<ul class="dropdown-menu" role="menu">'
						);
					} else {
						navItems.push(
							'<li>' +
								'<a ' +
									'data-mod-id="' + m.mod_id + '" ' +
									'data-mod-parent="' + m.mod_parent + '" ' +
									'data-mod-name="' + m.mod_name + '">' +
									navLabel +
								'</a>' +
							'</li>');
					}
					prevParentId = currParentId;
				});
				$('#nav-wrapper').html(navItems.join(''));
				$('[data-mod-name]').on('click', function() {
					var modParent = $(this).attr('data-mod-parent');
					$('#nav-wrapper')
						.find('li.active')
						.removeClass('active');
					if (modParent != '') {
						$('#nav-wrapper')
							.find('li[data-mod-id="' + modParent + '"]')
							.addClass('active');
					} else {
						$(this)
							.parent()
							.addClass('active');
					}
					STIC.loadModule({
						modId: $(this).attr('data-mod-id'),
						modName: $(this).attr('data-mod-name')
					});
				});
			} else {
				BootstrapDialog.alert({
					type: 'type-danger',
					title: MSG_TITLE_INFO,
					message: MSG_INFO_NO_MODULES_ERROR
				});
			}
		})
		.fail(function() {
			STIC.showWSError();
		});
	},

	// Load module page
	loadModule: function(params) {
		STIC.checkSession('mod', function(response) {
			$.post(WS_UI_MODULES_CHECK, {
				mod_id: params.modId,
				role_id: STIC.User.ReadCookie('roleid')
			})
			.done(function(results, status) {
				if (results.response.type === 'SUCCESS') {
					var modPage = DFLT_PAGE_DIR + 
							params.modName + DFLT_PAGE_EXT;
					if (STIC.CURRENT_PAGE === 'weight-scale' ||
							STIC.CURRENT_PAGE === 'others-calibration') {
						clearInterval(STIC.INTERVAL_ID);
						$.post(WS_SCALE_DISCONNECT, { compId: 1 },
							function(results, status) {
								$(DFLT_WRPR_ID).load(modPage);
							});
					} else {
						$(DFLT_WRPR_ID).load(modPage);
					}				
					STIC.CURRENT_PAGE = params.modName;
					STIC.CURRENT_PAGEID = params.modId;
				} else {
					BootstrapDialog.alert({
						type: 'type-danger',
						title: MSG_TITLE_INFO,
						message: MSG_INFO_ROLE_ACCESS_ERROR
					});
				}
			})
			.fail(function() {
				STIC.showWSError();
			});
		});
	},

	// Redirect to activation page
	loadActivate: function() {
		STIC.User.RemoveToContext();
		STIC.User.EraseCookie('userid');
		STIC.User.EraseCookie('roleid');
		STIC.User.EraseCookie('username');
		window.location = DFLT_ROOT + 'activation.html';
	},

	// Verify if all cookies are active
	checkUserCookies: function() {
		return STIC.User.ReadCookie('roleid') !== null
			&& STIC.User.ReadCookie('userid') !== null
			&& STIC.User.ReadCookie('username') !== null;
	},

	// Check License & User Session
	checkSession: function(scope, callback) {
		waitingDialog.show();
		$.post(WS_LICENSE_NOTIFY, { id: 1 });
		// Check License
		$.post(WS_CHECK_LICENSE, { id: 1 })
		.done(function(results, status) {
			waitingDialog.hide();
			var response = results.response;
			// License is valid
			if (response.type === 'SUCCESS') {
				// License & HD Serial is valid
				if (response.is_license === 'YES' &&  
						response.is_hd_serial_number_valid === 'YES') {
					// Cookies are still active
					if (STIC.checkUserCookies()) {
						// Check User
						$.post(WS_USER_AUTHENTICATE, {
							user_id: STIC.User.ReadCookie('userid'),
							user_name: STIC.User.ReadCookie('username')
						})
						.done(function(results, status) {
							// User is valid
							if (results.response.type === 'SUCCESS') {
								if (scope === 'idx')
									STIC.loadIndex('main');
								$.isFunction(callback) ? callback({ type: 'SUCCESS'}) : '';
							// User is invalid
							} else {
								BootstrapDialog.alert({
									type: 'type-danger',
									title: MSG_TITLE_INFO,
									message: MSG_INFO_INVALID_USER,
									callback: function() {
										STIC.User.Logout();
									}
								});
							}
						})
						.fail(function () {
							STIC.showWSError();
						});
					// Cookies are expired
					} else {
						if (scope === 'mod') {
							BootstrapDialog.alert({
								type: 'type-danger',
								title: MSG_TITLE_INFO,
								message: MSG_INFO_INVALID_SESSION,
								callback: function() {
									STIC.User.Logout();
								}
							});
						} else {
							STIC.User.Logout();
						}
					}
				// HD Serial is invalid
				} else if (hdSerialValid === 'NO') {
					BootstrapDialog.alert({
						type: 'type-danger',
						title: MSG_TITLE_INFO,
						message: MSG_INFO_INVALID_HD,
						callback: function() {
							STIC.loadActivate();
						}
					});
				} else {
					BootstrapDialog.alert({
						type: 'type-danger',
						title: MSG_TITLE_INFO,
						message: MSG_INFO_SYSTEM_INACTIVE,
						callback: function() {
							STIC.loadActivate();
						}
					});
				}
			} else {
				STIC.showWSError();
			}
		})
		.fail(function () {
			waitingDialog.hide();
			STIC.showWSError();
		});
	},

	// Connect to Scale Reader
	openScaleReader(callback) {
		clearInterval(STIC.INTERVAL_ID)
		$.post(WS_SCALE_DISCONNECT, { compId: 1 })
			.done(function(results, status) {
				$.post(WS_SCALE_INIT, { compId: 1 })
					.done(function(results, status) {
						var response = results.response;
						if (response.type === 'SUCCESS') {
							callback({ type: 'SUCCESS' });
						} else {
							STIC.ISRError();
							callback({ type: 'FAIL' });
						}
					})
					.fail(function() {				
						STIC.ISRError();
						callback({ type: 'FAIL' });
					});
			})
	},

	// Enable Buttons
	enableButtons: function (buttons) {
		btns = buttons || [];
		if (btns.length > 0) {
			$.each(btns, function (idx, btn) {
				$(btn).prop('disabled', false);
			});
		}
	},

	// Disable Buttons
	disableButtons: function (buttons) {
		btns = buttons || [];
		if (btns.length > 0) {
			$.each(btns, function (idx, btn) {
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

		// Destroy Message Field
		destroyMsgField: function() {
			$('select[data-field="dt_message"]').selectpicker('destroy');
			$('select[data-field="dt_message"]').remove();
			$('input[data-field="dt_message"]').remove();
		},

		// New Message Input Field
		newMsgInputField: function(params) {
			var container = params.container,
				defaultVal = params.defaultVal;
			container.append('<input type="text" class="form-control" value="' +
				defaultVal + '" data-field="dt_message" data-fv-notempty="true">');
		},

		// New Message Select Field
		newMsgSelectField: function(params) {
			var JSONUrl = params.JSONUrl,
				JSONData = params.JSONData,
				container = params.container,
				defaultVal = params.defaultVal;

			$.getJSON(JSONUrl, function(data) {
				var options = [];
				$.each(data.response, function(a, b) {
					if (a == JSONData) {
						$.each(b, function(c, d) {
							$.each(d, function(e, f) {
								options.push('<option value="' + f.df_id + '">' + f.df_alias + '</option>');
							});
						});
					}
				});

				container.append('<select class="selectpicker form-control" title="-"' +
					' data-field="dt_message" data-fv-notempty="true" data-live-search="true" data-size="5">' +
					options.join('') + '</select>');

				$('select[data-field="dt_message"]').selectpicker('refresh');
				$('select[data-field="dt_message"]').selectpicker('val', defaultVal);
			});
		},

		// Toggle Message Field
		toggleMsgField: function(params) {
			var JSONUrl = params.JSONUrl,
				JSONData = params.JSONData,
				container = $('#message-field-box'),
				dataSrc = (typeof params.dataSrc != 'undefined' ? params.dataSrc : 'data'),
				defaultVal = (typeof params.defaultVal != 'undefined' ? params.defaultVal : '');

			this.destroyMsgField();

			if (dataSrc == 'data') {
				this.newMsgSelectField({
					JSONUrl: JSONUrl,
					JSONData: JSONData,
					container: container,
					defaultVal: defaultVal
				});
			} else {
				this.newMsgInputField({
					container: container,
					defaultVal: defaultVal
				});
			}
		}
	},

	// Show Duplicate Error messages on form after submit
	showDuplicateError: function (params) {
		var div = $(params.formId).find('label[for="' + params.ukey + '"]').parent(),
			input = $(params.formId).find('input[data-field="' + params.ukey + '"]');

		// Remove error messages & styles
		div
			.removeClass('has-error has-feedback')
			.removeClass('has-success has-feedback');
		input.next('span.glyphicon, small.help-block')
			.remove();
		$(params.formId).find('div.alert-info')
			.hide();

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
				title: MSG_TITLE_INFO,
				message: MSG_INFO_WS_ERROR,
				callback: function (result) {
					BootstrapDialog.closeAll();
				}
			});
		}
	},

	// Show Scale Reader Init Error
	ISRError: function () {
		BootstrapDialog.alert({
			type: 'type-danger',
			title: MSG_TITLE_INFO,
			message: MSG_INFO_ISR_ERROR
		});
	},

	// Remove error messages & styles
	clearHelpBlocks: function (params) {
		$(params.formId).find('div.form-group')
			.removeClass('has-error has-feedback')
			.removeClass('has-success has-feedback');
		$(params.formId).find('div.alert-danger, span.glyphicon, small.help-block')
			.remove();
		$(params.formId).find('div.alert-info').show();
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

			if (totalErrors > 0) {
				$(options.formId).find('div.alert-info').hide();
				$(options.formId).prepend(MSG_ALERT_FORM_ERROR);
			}

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
							// Reload DT
							(typeof params.dt !== 'undefined'
								? params.dt.ajax.reload() : '');
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
		CreateCookie: function (name, value, hours) {
			if (hours) {
				var date = new Date();
				date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
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
			this.CreateCookie(name, '', -DFLT_CKIE_LIFE);
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

		// Check License
		CheckLicense: function (logout, callback) {
			$.post(WS_CHECK_LICENSE, { id: 1 })
				.done(function (results, status) {
					var response = results.response;
					if (response.type === 'SUCCESS') {
						if (response.is_license === 'YES' &&  
							response.is_hd_serial_number_valid === 'YES') {
							/*$.isFunction(callback)
								? callback(response) : '';*/
							STIC.User.Authenticate(logout, callback);
						} else if (hdSerialValid === 'NO') {
							BootstrapDialog.alert({
								type: 'type-danger',
								title: MSG_TITLE_INFO,
								message: MSG_INFO_INVALID_HD,
								callback: function () {
									STIC.User.RemoveToContext();
									STIC.User.EraseCookie('userid');
									STIC.User.EraseCookie('roleid');
									STIC.User.EraseCookie('username');
									window.location = DFLT_ROOT + 'activation.html';
								}
							});
						} else {
							BootstrapDialog.alert({
								type: 'type-danger',
								title: MSG_TITLE_INFO,
								message: MSG_INFO_SYSTEM_INACTIVE,
								callback: function () {
									STIC.User.RemoveToContext();
									STIC.User.EraseCookie('userid');
									STIC.User.EraseCookie('roleid');
									STIC.User.EraseCookie('username');
									window.location = DFLT_ROOT + 'activation.html';
								}
							});
						}
					} else {
						STIC.showWSError();
					}
				})
				.fail(function () {
					STIC.showWSError();
				});
		},

		// Check if system is activated
		CheckIfActivated: function () {
			$.post(WS_CHECK_LICENSE, { id: 1 })
				.done(function (results, status) {
					if (results.response.type === 'SUCCESS') {
						if (results.response.is_license === 'YES') {
							window.location = DFLT_ROOT;
						}
					} else {
						STIC.showWSError();
					}
				})
				.fail(function () {
					STIC.showWSError();
				});
		},

		// Check if User is valid
		Authenticate: function (logout, callback) {
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
							//console.log(forceLogOut)
							if (forceLogOut === false) {
								STIC.loadIndex('main');
							}
						} else {
							if (forceLogOut)
								this.Logout();
						}
					})
					.fail(function () {
						STIC.showWSError();
					});
			} else {
					this.Logout();
					/*if (forceLogOut) {
						this.Logout();
					} else {
						this.RemoveToContext();
						this.EraseCookie('username');
						this.EraseCookie('userid');
						this.EraseCookie('roleid');
					}*/
			}
		},

		//
		LoginCheck: function () {
			$.post(WS_CHECK_LICENSE, { id: 1 })
				.done(function (results, status) {
					var response = results.response;
					if (response.type === 'SUCCESS') {
						if (response.is_license === 'YES' &&  
							response.is_hd_serial_number_valid === 'YES') {
							STIC.User.Login();
						} else if (hdSerialValid === 'NO') {
							BootstrapDialog.alert({
								type: 'type-danger',
								title: MSG_TITLE_INFO,
								message: MSG_INFO_INVALID_HD,
								callback: function() {
									STIC.User.RemoveToContext();
									STIC.User.EraseCookie('userid');
									STIC.User.EraseCookie('roleid');
									STIC.User.EraseCookie('username');
									window.location = DFLT_ROOT + 'activation.html';
								}
							});
						} else {
							BootstrapDialog.alert({
								type: 'type-danger',
								title: MSG_TITLE_INFO,
								message: MSG_INFO_SYSTEM_INACTIVE,
								callback: function() {
									STIC.User.RemoveToContext();
									STIC.User.EraseCookie('userid');
									STIC.User.EraseCookie('roleid');
									STIC.User.EraseCookie('username');
									window.location = DFLT_ROOT + 'activation.html';
								}
							});
						}
					} else {
						STIC.showWSError();
					}
				})
				.fail(function() {
					STIC.showWSError();
				});
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
				$.post(WS_USER_CHECK, { user_name: username, user_password: password, id: 1 })
					.done(function (result, status) {
						var response = result.response;

						// Authenticated
						if (response.type === 'SUCCESS') {
							var user = response['users-list'].user;

							// Create Cookies
							STIC.User.CreateCookie('username', user.user_name, DFLT_CKIE_LIFE);
							STIC.User.CreateCookie('userid', user.user_id, DFLT_CKIE_LIFE);
							STIC.User.CreateCookie('roleid', user.role_id, DFLT_CKIE_LIFE);

							STIC.loadIndex('main');

						// Not Authorized
						} else {
							// Clear error messages & styles
							$('.login-form').find('div.form-group')
								.removeClass('has-error has-feedback')
								.removeClass('has-success has-feedback');
							$('.login-form').find('div.form-group').find('span.glyphicon, small.help-block')
								.remove();
							$('.login-form').find('div.alert-danger')
								.remove();
							$('.login-form').find('div.alert-info')
								.hide();

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
				$('.login-form').find('div.alert-danger').remove();
				$('.login-form').find('div.alert-info').hide();
				$('.login-form hr:first').after(MSG_ALERT_LOGIN_FORM_ERROR);
			}
		},

		// Confirm Logout
		ConfirmLogout: function () {
			BootstrapDialog.confirm({
				title: MSG_TITLE_INFO,
				message: MSG_CONFIRM_LOGOUT,
				btnOKLabel: BTN_LABEL_CONFIRM_LOGOUT,
				btnCancelLabel: BTN_LABEL_CANCEL,
				callback: function (result) {
					if (result) {
						STIC.User.Logout();
					}
				}
			});
		},

		// Logout
		Logout: function () {
			BootstrapDialog.closeAll();
			this.RemoveToContext();
			this.EraseCookie('username');
			this.EraseCookie('userid');
			this.EraseCookie('roleid');

			// Disconnect Scale Reader
			clearInterval(STIC.INTERVAL_ID)
			$.post(WS_SCALE_DISCONNECT, { compId: 1 },
				function(results, status) {
					STIC.loadIndex('login');
				});
		},

		// Change Password
		ChangePassword: function () {
			// Modal Options
			var modalFormTitle = '<i class="fa fa-key"></i> Change Password',
				modalFormContent = $('<div></div>').load(FORM_CHANGE_PASS_DATA),

			// Modal Buttons
			modalBtnSave = {
				label: 'Save Changes',
				icon: 'fa fa-floppy-o',
				cssClass: 'btn-primary',
				action: modalBtnSaveAction
			},
			modalBtnCancel = {
				label: 'Cancel',
				icon: 'fa fa-ban',
				cssClass: 'btn-default',
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
				buttons: [modalBtnCancel, modalBtnSave]
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
	// Set Default Date
	var today = new Date(),
		defEnd = moment(today).format(DFLT_DATE_FRMT),
		defStart = moment().startOf('month').format(DFLT_DATE_FRMT),
		defWsURL = params.ws + 'dateFrom=' + defStart + '&dateTo=' + defEnd,

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
		exportOptions: {
			columns: ':visible'
		}
	},

	// DT Buttons > PDF
	dtBtnPDF = {
		name: 'pdf',
		extend: 'pdfHtml5',
		title: params.title,
		className: 'btn-primary',
		text: BTN_LABEL_EXPORT_PDF,
		titleAttr: BTN_TITLE_EXPORT_PDF,
		customize: dtPDFPrintCustom,
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
		title: params.title,
		className: 'btn-primary',
		text: BTN_LABEL_PRINT_RECORD,
		titleAttr: BTN_TITLE_PRINT_RECORD,
		customize: dtWebPagePrintCustom,
		exportOptions: {
			columns: ':visible'
		}
	};

	// DT Init
	var dtSummary = $('#table-summary')
		.DataTable({
			pageLength: 10,
			ordering: true,
			searching: false,
			columns: params.cd,
			ajax: {
				url: defWsURL,
				dataSrc: function (json) {
					var ds = params.ds.split('.'),
						rec = json[ds[0]][ds[1]][ds[2]];
					return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
				}
			},
			dom: '<"dt-toolbar">B<"dt-total">rtip',
			buttons: [dtBtnCopy, dtBtnCSV, dtBtnExcel, dtBtnPDF, dtBtnPrint]
		})
		.on('draw.dt', function (e, settings, data) {
			var btns = [
				'copy:name',
				'csv:name',
				'excel:name',
				'pdf:name',
				'print:name'
			];
			dtSummary.data().length > 0 ?
				dtSummary.buttons(btns).enable() :
				dtSummary.buttons(btns).disable();

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

	// Total Net Weight
	if (params.showTotal) {
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
		$('div.dt-total').css('float', 'right');
	}

	// Date Range Filter
	$('div.dt-toolbar').html(
		'<div class="btn-toolbar" role="toolbar">' +
			'<div class="btn-group pull-left no-padding-left form-inline" role="group" style="margin-bottom: 0px">'	+
				'<div class="input-group date" id="dp1">' +
					'<span class="input-group-addon"><i class="fa fa-calendar"></i> <strong>Start</strong></span>' +
					'<input type="text" class="form-control date-lookup" id="start-date" placeholder="Select Date">' +
				'</div>' +
				'<div class="input-group date" id="dp2">' +
					'<span class="input-group-addon date-lookup-label"><i class="fa fa-calendar"></i> <strong>End</strong></span>' +
					'<input type="text" class="form-control date-lookup" id="end-date" placeholder="Select Date">' +
				'</div>' +
				'<button type="button" class="btn btn-primary" id="search-report" title="Search Report"><i class="fa fa-search"></i></button>' +
				'<button type="button" class="btn btn-danger" id="reset-report" title="Reset Report"><i class="fa fa-ban"></i></button>' +
			'</div>' +
		'</div>'
	);
	$('div.dt-toolbar').css('float', 'left');
	$('div.dt-toolbar').css('margin-right', '5px');

	var dp1 = $('#dp1'),
		dp2 = $('#dp2'),
		inEndDt = $('#end-date'),
		inStartDt = $('#start-date');

	// Date Picker Init
	dp1.datetimepicker({
		format: DFLT_DATE_FRMT
	});
	dp2.datetimepicker({
		format: DFLT_DATE_FRMT
	});

	// Set Default Date
	dp1.data('DateTimePicker').defaultDate(defStart);
	dp2.data('DateTimePicker').defaultDate(defEnd);

	// Set Min & Max dates
	dp1.on('dp.change', function (e) {
		dp2.data('DateTimePicker').minDate(e.date);
	});
	dp2.on('dp.change', function (e) {
		dp1.data('DateTimePicker').maxDate(e.date);
	});

	// Search Report
	$('#search-report').on('click', function () {
		var wsURL = params.ws +
			'dateFrom=' + inStartDt.val() +
			'&dateTo=' + inEndDt.val();
		dtSummary.ajax.url(wsURL).load();
	});

	// Reset Report
	$('#reset-report').on('click', function () {
		inEndDt.val(defEnd);
		inStartDt.val(defStart);
		dtSummary.ajax.url(defWsURL).load();
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
		var fromLabel = { width: 30, bold: true, text: 'From :' },
			toLabel = { width: 30, bold: true, text: 'To :' },
			fromDate = { width: 'auto', text: $('#start-date').val() },
			toDate = { width: 'auto', text: $('#end-date').val() };
		pdfDoc.content.splice(1, 0, { columns: [fromLabel, fromDate] });
		pdfDoc.content.splice(2, 0, { columns: [toLabel, toDate] });
	}

	// Customize Web Page Print Output
	function dtWebPagePrintCustom(win) {
		$(win.document.body)
			.css('background', 'none')
			.css('font-weight', 'normal')
			.css('font-family', 'Monospaced');
		// Title
		$(win.document.body).find('h1')
			.css('font-size', '16pt')
			.css('text-align', 'center');
		// Message
		$(win.document.body).find('div')
			.css('font-size', '11pt')
			.css('text-align', 'left')
			.css('margin', '20px 0px 15px 0px')
			.html('From: ' + $('#start-date').val() + ' <br />To: ' + $('#end-date').val());
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
		//console.log($(win.document.body).html());
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
		dtPl = (typeof options.pl != 'undefined' ? options.pl : DFLT_PAGE_SIZE);
		dt = $('#' + dtDomId)
			.DataTable({
				pageLength: dtPl,
				ordering: dtOd,
				searching: true,
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
					className: 'btn-primary',
					text: BTN_LABEL_REFRESH_RECORD,
					titleAttr: BTN_TITLE_REFRESH_RECORD,
					action: function (e, dt, node, config) {
						dt.ajax.reload();
					}
				}]
			});
		dt.column('0:visible').order('asc').draw();
		return dt;
}