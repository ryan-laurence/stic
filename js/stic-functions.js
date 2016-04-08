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

// Clear Form Values
function _fnClearFormValues(fields, buttons) {
	buttons = buttons || [];
	$.each(fields, function(index, fieldId) {
		$('#' + fieldId).val("");
	});
	if (buttons.length > 0) {
		$.each(buttons, function(index, buttonId) {
			$('#' + buttonId).addClass('disabled');
			(CONSOLE_LOG ? console.log('Disabled: ' + buttonId) : '');
		});	
	}
}

// Set Data Table
function _fnSetDataTable(tableId, dataURL, dataSrc, colDef, pageLen, forceNull) {
	var t;
	var status;
	pageLen = pageLen || 5;
	forceNull = forceNull || false;
	
	$.ajax({
		dataType: "json",
		url: dataURL,
		async: false
	}).done(function(data) {
		status = data.response.type;
	});

	console.log('Response Status: ' + status);

	if (forceNull) {
		t = $('#' + tableId).DataTable({
			"dom": 'frtip',
			ordering: true,
			"lengthChange": false,
			"pageLength": pageLen,
			"processing": true,
			"data": [],
			"columns": colDef 
		});
	} else if (status != 'FAILED') {
		t = $('#' + tableId).DataTable({
			"dom": 'frtip',
			ordering: true,
			"lengthChange": false,
			"pageLength": pageLen,
			"processing": true,
			"ajax": { 
				"url": dataURL, 
				"dataSrc": dataSrc
			},
			"columns": colDef 
		});
	} else {
		t = $('#' + tableId).DataTable({
			"dom": 'frtip',
			ordering: true,
			"lengthChange": false,
			"pageLength": pageLen,
			"processing": true,
			"data": [],
			"columns": colDef 
		});
	}
	
	return t;
}

// Custom Table
function _fnSetCustomTable(tableId, dataURL, dataSrc, colDef) { 
	return $('#' + tableId)
		.DataTable({
			dom: 'rtip',
			pageLength: 5,
			ordering: true,
			searching: false,
			processing: true,
			lengthChange: false,
			columns: colDef,
			ajax: { 
				url: dataURL, 
				dataSrc: function(json) {
					var ds = dataSrc.split('.'),
						rec = json[ds[0]][ds[1]][ds[2]];
					console.log('DT Ajax JSON Array? ' + $.isArray(rec));
					console.log('DT JSON: ' + JSON.stringify(rec));					
					return ($.isArray(rc) === true ? rec :(rec !== '' ? [rec] : []));
				} 
			}
		});
}

// Table Row Selection Event
function _fnTableRowSelection(tableObject, rowObject, tableTools) {
	tableTools = tableTools || [];
	if ($(rowObject).hasClass('selected')) {
		$(rowObject).removeClass('selected');					
		if (tableTools.length > 0) {
			$.each(tableTools, function(index, tableTool) {
				$('#' + tableTool).addClass('disabled');
			});	
		}						
	} else {
		tableObject.$('tr.selected').removeClass('selected');
		$(rowObject).addClass('selected');				
		if (tableTools.length > 0) {
			$.each(tableTools, function(index, tableTool) {
				$('#' + tableTool).removeClass('disabled');
			});	
		}		
	}		
}

// Show Alert Modal
function _fnShowAlertModal(options) {
	$('#alert-modal #alert-title').html(options.title);
	$('#alert-modal #alert-message').html(options.content);				
	$('#alert-modal').modal('show');
}

// Common Function for saving data
function _fnSaveFormData(options) {
	var string = '';
	var data_json = '';
	var o_table = options.table;
	var o_modal = $('#' + options.modalId);	
	$.each(options.fields, function(index, field_name) {
		var field_value = o_modal.find('.modal-body #' + field_name).val();
		if (typeof field_value != 'undefined') {
			if (string != '') string = string + ', ';
			string = string + '"' + field_name + '": "' + field_value + '"';
		}
	});
	data_json = options.holder + '={' + string + '}';
	$.post(options.url, data_json, function(data, status){
		o_table.ajax.reload();
		o_modal.modal('hide');
		_fnClearFormValues(options.fields, options.tools);
		//_fnShowAlertModal({ title: options.alertTitle, content: options.alertContent });
		BootstrapDialog.alert({
			title: options.alertTitle,
			message: options.alertContent,
			type: BootstrapDialog.TYPE_PRIMARY,
			callback: function(result) {
				BootstrapDialog.closeAll();
			}
		});
	});
}

var STIC = {
	initDataTable: function(options) {
		var t = $('#' + options.id).DataTable({
			"dom": 'lfrtip',
			"processing": true,
			"lengthChange": true,
			"columns": options.cd,
			"pageLength": options.pl,
			"ajax": {
				"url": options.ws,
				"dataSrc": options.ds
			}
		});
		return t;
	},
	setTableRowClickEvent: function(options) {
		var rowObject = options.rowObject;
		var tableTools = options.tableTools;
		var tableObject = options.tableObject;
		if ($(rowObject).hasClass('selected')) {
			$(rowObject).removeClass('selected');
			if (tableTools.length > 0) {
				$.each(tableTools, function(index, tableTool) {
					$('#' + tableTool).addClass('disabled');
				});
			}
		} else {
			tableObject.$('tr.selected').removeClass('selected');
			$(rowObject).addClass('selected');
			if (tableTools.length > 0) {
				$.each(tableTools, function(index, tableTool) {
					$('#' + tableTool).removeClass('disabled');
				});
			}
		}
	},
	clearFormData: function(fields, buttons) {
		fields = fields || [];
		buttons = buttons || [];
		if (fields.length > 0) {
			$.each(fields, function(index, fieldId) {
				$('#' + fieldId).val("");
			});
		}
		if (buttons.length > 0) {
			$.each(buttons, function(index, buttonId) {
				$('#' + buttonId).addClass('disabled');
			});
		}
	},
	showSystemMessage: function(msgType, msgTitle, msgContent) {
		switch(msgType) {
			case 'success':
				$('#success-modal #success-title').html(msgTitle);
				$('#success-modal #success-message').html(msgContent);
				$('#success-modal').modal('show');
				break;
			case 'confirm-delete':
				$('#confirm-modal #confirm-title').html(msgTitle);
				$('#confirm-modal #confirm-message').html(msgContent);
				$('#confirm-modal').modal('show');
				break;
			case 'error':
				var message = MSG_ERROR_ICON + ' ' + msgContent;
				$('#error-modal #error-title').html(msgTitle);
				$('#error-modal #error-message').html(message);
				$('#error-modal').modal('show');
				break;
		}
	},
	loadPage: function(options) {
		var wrapper = DEFAULT_WRAPPER_ID,
			page_loc = DEFAULT_PAGE_LOC,
			page_ext = DEFAULT_PAGE_FILE_EXT,
			page_name = options.page_name;
		
		$(wrapper).load(page_loc + page_name + page_ext);
	},
	
	// Disable Buttons
	disableButtons: function(buttons) {
		btns = buttons || [];
		if (btns.length > 0) {
			$.each(btns, function(idx, btn) {
				$('button[data-btn="' + btn + '"]').addClass('disabled');
			});	
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
				_defaultVal + '" data-field="dt_message" data-fv-notempty="true" data-fv-notempty-msg="Message is required.">');				
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
					' data-field="dt_message" data-fv-notempty="true" data-fv-notempty-msg="Message is required." data-live-search="true" data-size="5">' + 
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
	
	// Form Validation
	FormValidation: function(options) {
		var clearHelpBlocks = (typeof options.clearHelpBlocks != 'undefined' ? options.clearHelpBlocks : false);
		if (clearHelpBlocks) {
			var elems = $(options.formId).find('input[data-field], select[data-field]');
			$.each(elems, function(idx, elem) {
				var div = $(elem).parent(),
					span = $(div).children('span'),
					small = $(div).children('small');
				var div2 = $('label[for="' + $(elem).attr('data-field') + '"]').parent();
				span.remove();
				small.remove();
				div.removeClass('has-error has-feedback');	
				div.removeClass('has-success has-feedback');	
				div2.removeClass('has-error has-feedback');
				div2.removeClass('has-success has-feedback');
				console.log('Removed Help Block for: ' + $(elem).attr('data-field'));
			});
			return true;
		} else {
			var errors = 0,
				elems = $(options.formId).find('input[data-field], select[data-field]');
			//console.log('Start Form Validation for: ' + options.formId);
			$.each(elems, function(idx, elem) {
				var input = $(elem).val(),
					div = $(elem).parent(),
					hidden = $(elem).attr('type'),
					span = $(div).children('span'),
					small = $(div).children('small'),				
					notempty = $(elem).attr('data-fv-notempty'),
					notempty_msg = $(elem).attr('data-fv-notempty-msg'),				
					stringlength = $(elem).attr('data-fv-stringlength'),
					stringlength_max = parseInt($(elem).attr('data-fv-stringlength-max')),
					stringlength_msg = $(elem).attr('data-fv-stringlength-msg');
				
				//console.log('Checking ' + $(elem).attr('data-field') + ' : ' + input);
				//console.log($('label[for="' + $(elem).attr('data-field') + '"]').parent());
				
				var div2 = $('label[for="' + $(elem).attr('data-field') + '"]').parent();
				
				span.remove();
				small.remove();
				div.removeClass('has-error has-feedback');
				div2.removeClass('has-error has-feedback');
				
				// Check if Empty
				if (notempty == 'true') {				
					if (input == '') {	
						errors++;
						div.addClass('has-error has-feedback');
						div2.addClass('has-error has-feedback');
						//div.append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
						div.append('<small class="help-block">' + notempty_msg + '</small>');
					} else {
						div.addClass('has-success has-feedback');			
						div2.addClass('has-success has-feedback');			
						//div.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
					}
				} 
				
				// Check Input Length
				if (stringlength == 'true') {
					if (input.length > stringlength_max) {
						errors++;
						div.addClass('has-error has-feedback');
						div2.addClass('has-error has-feedback');
						//div.append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
						div.append('<small class="help-block">' + stringlength_msg + '</small>');
					} else {
						div.addClass('has-success has-feedback');			
						div2.addClass('has-success has-feedback');							
						//div.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
					}
				}
			});					
			//console.log('End Form Validation for: ' + options.formId);
			return errors > 0 ? false : true;
		}
	}
}

function getXMLData(objXML, sFindTag) {
	//alert('Find Tag: '+ sFindTag);
	var value = '';
	$(objXML).find(sFindTag).each(function() {
		val = $(this).text();
		//console.log('Value: '+ val +'...');
		if (val == 'SUCCESS') value = $(this).text();
	});
	return val;
};

// Load Summary Reports
function loadSummaryReport(params) {
	// Default Date
	var today = new Date(),
		defString = 'YYYY-MM-DD HH:mm:ss',				
		defEnd = moment(today).format(defString),
		//defStart = moment(today).subtract(1, 'days').format(defString),
		defStart = moment().startOf('month').format(defString),
		defWsURL = params.ws + 'dateFrom=' + defStart + '&dateTo=' + defEnd;	
		console.log('datetime: ' + defWsURL);
	
	// DT Initial
	var dtSummary = $('#table-summary')
		.DataTable({						
			pageLength: 10,
			ordering: true,
			searching: false,
			processing: true,
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
			buttons: [{						
				name: 'print',
				extend: 'print',				
				enabled: false,
				autoPrint: true,
				title: params.title,	
				className: 'btn-primary',				
				customize: dtPrintCustom,
				text: '<i class="glyphicon glyphicon-print" aria-hidden="true"></i> Print'						
			}, {						
				name: 'reload',
				text: '<i class="fa fa-refresh"></i> Refresh',						
				className: 'btn-primary',
				action: function(e, dt, node, config) {
					dt.ajax.reload();
				}	
			}]
		})
		.on('draw.dt', function (e, settings, data) {
			dtSummary.data().length > 0 ? 
				dtSummary.button('print:name').enable() :
				dtSummary.button('print:name').disable();
		});	
		
	// Load Toolbar Elements
	$('div.dt-toolbar').css('float', 'left');
	$('div.dt-buttons').css('float', 'left');
	$('div.dt-buttons').css('padding-left', '5px');			
	$('div.dt-toolbar').load('pages/summary-date-filter.html', 
		function(response, status, xhr) {		
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
		
	// Customize Print Preview
	function dtPrintCustom(win) {
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
		dtOd = (typeof options.od != 'undefined' ? options.od : false)
		dtPl = (typeof options.pl != 'undefined' ? options.pl : DEFAULT_PAGE_LENGTH);	
		
		dt = $('#' + dtDomId)
			.DataTable({						
				pageLength: dtPl,
				ordering: dtOd,
				searching: true,
				processing: true,
				lengthChange: false,					
				columns: dtCd,
				dom: 'frtip',
				ajax: { 
					url: dtWs, 
					dataSrc: function(json) {
						var ds = dtDs.split('.'),
							rec = json[ds[0]][ds[1]][ds[2]];
						return ($.isArray(rec) === true ? rec : (rec !== '' ? [rec] : []));
					}  
				}
			});				
		return dt;
}