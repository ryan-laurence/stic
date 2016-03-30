var EditData = function(
		tableDomId,
		columnDefinition,
		dataSource,
		wsList,
		wsInsert,
		wsUpdate,
		wsDelete,
		tableTools,
		inputFields
) {
	this.pageLength = 10;
	this.wsList = wsList;
	this.wsInsert = wsInsert;
	this.wsUpdate = wsUpdate;
	this.wsDelete = wsDelete;
	this.dataSource = dataSource;
	this.tableDomId = tableDomId;
	this.tableTools = tableTools;
	this.inputFields = inputFields;
	this.columnDefinition = columnDefinition;
};

// Set Data Table
EditData.prototype.setDataTable = function() {
	this.tableObject = $('#' + this.tableDomId).DataTable({
		"dom": 'lfrtip',
		"processing": true,
		"lengthChange": true,
		"pageLength": this.pageLength,
		"columns": this.columnDefinition,
		"ajax": {
			"url": this.wsList,
			"dataSrc": this.dataSource
		}
	});
};

// Set Table Row Click Event
EditData.prototype.setTableRowClickEvent = function(rowObject) {
	this.rowObject =  rowObject;
	var tableTools = this.tableTools;
	var tableObject = this.tableObject;
	if ($(this.rowObject).hasClass('selected')) {
		$(this.rowObject).removeClass('selected');
		if (tableTools.length > 0) {
			$.each(tableTools, function(index, tableTool) {
				$('#' + tableTool).addClass('disabled');
			});
		}
	} else {
		tableObject.$('tr.selected').removeClass('selected');
		$(this.rowObject).addClass('selected');
		if (tableTools.length > 0) {
			$.each(tableTools, function(index, tableTool) {
				$('#' + tableTool).removeClass('disabled');
			});
		}
	}
};

// Load Row Data
EditData.prototype.loadRowData = function(modalId) {
	var modalObject = $('#' + modalId);
	var tableObject = this.tableObject;
	modalObject.on('show.bs.modal', function (event) {
		var modal = $(this)
		$.each(tableObject.row('.selected').data(), function(field_name, field_value) {
			modal.find('.modal-body #' + field_name).val(field_value);
		});
	});
	modalObject.modal('show');
}

// Insert Record
EditData.prototype.insertRecord = function(modalId, dataHolder) {
	var jsonData = '';
	var jsonString = '';
	var modalObject = $('#' + modalId);
	var tableObject = this.tableObject;
	$.each(this.inputFields, function(index, fieldName) {
		var fieldValue = modalObject.find('.modal-body #' + fieldName).val();
		if (typeof fieldValue != 'undefined') {
			if (jsonString != '') jsonString = jsonString + ', ';
			jsonString = jsonString + '"' + fieldName + '": "' + fieldValue + '"';
		}
	});
	jsonData = dataHolder + '={' + jsonString + '}';
	$.post(this.wsInsert, jsonData, function(data, status) {
		tableObject.ajax.reload();
		modalObject.modal('hide');
	});
	STIC.showSystemMessage('success', MSG_TITLE, MSG_SUCCESS_CREATE);
	STIC.clearFormData(this.inputFields, this.tableTools);
};

// Update Record
EditData.prototype.updateRecord = function(modalId, dataHolder) {
	var jsonData = '';
	var jsonString = '';
	var modalObject = $('#' + modalId);
	var tableObject = this.tableObject;
	$.each(this.inputFields, function(index, fieldName) {
		var fieldValue = modalObject.find('.modal-body #' + fieldName).val();
		if (typeof fieldValue != 'undefined') {
			if (jsonString != '') jsonString = jsonString + ', ';
			jsonString = jsonString + '"' + fieldName + '": "' + fieldValue + '"';
		}
	});
	jsonData = dataHolder + '={' + jsonString + '}';
	$.post(this.wsUpdate, jsonData, function(data, status) {
		tableObject.ajax.reload();
		modalObject.modal('hide');
	});
	STIC.showSystemMessage('success', MSG_TITLE, MSG_SUCCESS_UPDATE);
	STIC.clearFormData(this.inputFields, this.tableTools);
};

// Delete Record by GET
EditData.prototype.deleteRecord = function(recordId, dataHolder, modalId) {
	var modalObject = $('#' + modalId);
	var tableObject = this.tableObject;
	$.ajax({
		method: "GET",
		url: this.wsDelete + dataHolder + '=' + recordId,
	}).done(function(msg) {
		tableObject.row('.selected').remove().draw(false);
		tableObject.ajax.reload();
		modalObject.modal('hide');			
	});
	STIC.showSystemMessage('success', MSG_TITLE, MSG_SUCCESS_DELETE);
	STIC.clearFormData(this.inputFields, this.tableTools);
}

// Delete Record by POST
EditData.prototype.postDeleteRecord = function(recordId, recordIdField, dataHolder, modalId) {
	var modalObject = $('#' + modalId);
	var tableObject = this.tableObject;
	var jsonData = dataHolder + '={ "is_deleted": 0, '
		+ '"' + recordIdField + '": "' + recordId + '" }';
	$.post(this.wsDelete, jsonData, function(data, status){
		tableObject.row('.selected').remove().draw(false);
		tableObject.ajax.reload();
		modalObject.modal('hide');		
	});
	STIC.showSystemMessage('success', MSG_TITLE, MSG_SUCCESS_DELETE);
	STIC.clearFormData(this.inputFields, this.tableTools);
}
