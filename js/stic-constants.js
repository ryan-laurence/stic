// Default Constants
var DEFAULT_ROOT = '/forms/';
var DEFAULT_PAGE_LENGTH = 10;
var DEFAULT_PAGE_LOC = 'pages/';
var DEFAULT_PAGE_FILE_EXT = '.html';
var DEFAULT_WRAPPER_ID = '#main-wrapper';
var DEFAULT_DS_REPORTS = 'response.report-list.report';
var DEFAULT_DATASOURCE = 'response.record-list.record';

// Default DataTables Settings
var DEFAULT_DT_SETTINGS = {
	pagingType: 'full',
	language: {
		paginate: {
			first: '<i class="fa fa-fast-backward"></i> First',
			previous: '<i class="fa fa-backward"></i> Previous',
			next: 'Next <i class="fa fa-forward"></i>',
			last: 'Last <i class="fa fa-fast-forward"></i>'
		}
	}
}

// Weighing Screen
var CD_TRUCK_IN_LIST = [
	{ data: 'wr_id', visible: false, searchable: false, orderable: false },
	{ data: 'truck_code' },
	{ data: 'date_in' },
	{ data: 'time_in' },
	{ data: 'weight_in_reading' },
	{ data: 'weight_unit' },
	{ data: 'user_name' },
	{ data: 'docket_no', visible: false, searchable: false, orderable: false }
];
var FORM_CUST_PRODUCT_DATA = 'pages/data-customer-product-form.html'
var WS_CHECK_TRUCK_CODE_LIST = '/scaletech/services/WeightReadingInfoServices/checkTruckCodeList?response=application/json&';
var WS_FIRST_WEIGHING_INSERT = '/scaletech/services/WeightReadingInfoServices/addWeightReadings?response=application/json&';
var WS_FIRST_WEIGHING_DELETE = '/scaletech/services/WeightReadingInfoServices/deleteWeighReadingById?response=application/json&';
var WS_SECOND_WEIGHING_UPDATE = '/scaletech/services/WeightReadingInfoServices/updateWeightReadings?response=application/json&';
var WS_CUST_PRODUCT_INSERT = '/scaletech/services/ProductsInfoServices/addProductsAndCustomerProducts?response=application/json&'

// Supplier Data
var CD_SUPPLIER_LIST = [
	{ data: 'supp_id', visible: false, searchable: false },
	{ data: 'supp_code', width: '30%' },
	{ data: 'supp_name', width: '40%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_SUPPLIER_DATA = 'pages/data-supplier-form.html';
var DS_SUPPLIER_LIST = 'response.suppliers-list.supplier';
var WS_SUPPLIER_LIST = '/scaletech/services/SuppliersInfoServices/getAllSuppliersList?response=application/json&';
var WS_SUPPLIER_INSERT = '/scaletech/services/SuppliersInfoServices/addSuppliers?response=application/json&';
var WS_SUPPLIER_UPDATE = '/scaletech/services/SuppliersInfoServices/updateSuppliers?response=application/json&';
var WS_SUPPLIER_DELETE = '/scaletech/services/SuppliersInfoServices/updateSuppliersByIsDeleted?response=application/json&isDeleted=0&';

// Category Data
var CD_CATEGORY_LIST = [
	{ data: 'cat_id', visible: false, searchable: false },
	{ data: 'cat_code', width: '30%' },
	{ data: 'cat_name', width: '40%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_CATEGORY_DATA = 'pages/data-category-form.html';
var DS_CATEGORY_LIST = 'response.categories-list.cateory';
var WS_CATEGORY_LIST = '/scaletech/services/CategoriesInfoService/getAllCategoriesList?response=application/json';
var WS_CATEGORY_INSERT = '/scaletech/services/CategoriesInfoService/addCategories?response=application/json&';
var WS_CATEGORY_UPDATE = '/scaletech/services/CategoriesInfoService/updateCategories?response=application/json&';
var WS_CATEGORY_DELETE = '/scaletech/services/CategoriesInfoService/updateCategoriesByIsDeleted?response=application/json&isDeleted=0&';

// Customer Data
var CD_CUSTOMER_LIST = [
	{ data: 'cust_id', visible: false, searchable: false },
	{ data: 'cust_code', width: '30%' },
	{ data: 'cust_name', width: '40%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_CUSTOMER_DATA = 'pages/data-customer-form.html';
var DS_CUSTOMER_LIST = 'response.customers-list.customer';
var WS_CUSTOMER_INSERT = '/scaletech/services/CustomerInfoServices/addCustomers?response=application/json&';
var WS_CUSTOMER_UPDATE = '/scaletech/services/CustomerInfoServices/updateCustomers?response=application/json&';
var WS_CUSTOMER_DELETE = '/scaletech/services/CustomerInfoServices/updateCustomersByIsDeleted?response=application/json&isDeleted=0&';
var WS_CUSTOMER_LIST = '/scaletech/services/CustomerInfoServices/getAllCustomersList?response=application/json&';

// Destination Data
var CD_DESTINATION_LIST = [
	{ data: 'dest_id', visible: false, searchable: false },
	{ data: 'dest_zipcode', width: '20%' },
	{ data: 'dest_name', width: '50%' },
	{ data: 'dest_location', width: '30%' }
];
var DS_DESTINATION_LIST = 'response.destinations-list.destination';
var WS_DESTINATION_LIST = '/scaletech/services/DestinationsInfoServices/getAllDestinationsNotInCustDestList?response=application/json&';

// Product Data
var CD_PRODUCT_LIST = [
	{ data: 'prod_id', visible: false, searchable: false },
	{ data: 'prod_code', width: '30%' },
	{ data: 'prod_name', width: '50%' },
	{ data: 'unit_price', width: '20%' }
];
var DS_PRODUCT_LIST = 'response.products-list.product';
var WS_PRODUCT_LIST = '/scaletech/services/ProductsInfoServices/getAllProductsList?response=application/json&';
var WS_PRODUCT_INSERT = '/scaletech/services/ProductsInfoServices/addProducts?response=application/json&';
var WS_PRODUCT_UPDATE = '/scaletech/services/ProductsInfoServices/updateProducts?response=application/json&';
var WS_PRODUCT_DELETE = '/scaletech/services/ProductsInfoServices/updateProductsByIsDeleted?response=application/json&isDeleted=0&';

// Customer Destination Data
var CD_CUSTDEST_LIST = [
	{ data: 'cd_id', name: 'cd_id', visible: false, searchable: false },
	{ data: 'cust_id', name: 'cust_id', visible: false, searchable: false },
	{ data: 'dest_id', name: 'dest_id', visible: false, searchable: false },
	{ data: 'dest_zipcode', name: 'dest_zipcode', width: '20%' },
	{ data: 'dest_name', name: 'dest_name', width: '50%' },
	{ data: 'dest_location', name: 'dest_location', width: '30%' }
];
var PICKER_CUSTDEST_DATA = 'pages/data-customer-destination-picker.html';
var DS_CUSTDEST_LIST = 'response.custDest-list.customerDestination';
var WS_CUSTDEST_LIST = '/scaletech/services/CustDestInfoServices/getAllCustDestList?response=application/json&';
var WS_CUSTDEST_INSERT = '/scaletech/services/CustDestInfoServices/addCustDest?response=application/json&';
var WS_CUSTDEST_DELETE = '/scaletech/services/CustDestInfoServices/updateCustDestByIsDeleted?response=application/json&isDeleted=0&';

// Customer Product Data
var CD_CUSTPROD_LIST = [
	{ data: 'cp_id', name: 'cp_id', visible: false, searchable: false },
	{ data: 'cust_id', name: 'cust_id', visible: false, searchable: false },
	{ data: 'prod_id', name: 'prod_id', visible: false, searchable: false },
	{ data: 'prod_code', name: 'prod_code', width: '30%' },
	{ data: 'prod_name', name: 'prod_name', width: '50%' },
	{ data: 'unit_price', name: 'unit_price', width: '20%' }
];
var PICKER_CUSTPROD_DATA = 'pages/data-customer-product-picker.html';
var DS_CUSTPROD_LIST = 'response.custProducts-list.customerProduct';
var WS_CUSTPROD_LIST = '/scaletech/services/CustProductsInfoServices/getAllCustProdList?response=application/json&';
var WS_CUSTPROD_INSERT = '/scaletech/services/CustProductsInfoServices/addCustProd?response=application/json&';
var WS_CUSTPROD_DELETE = '/scaletech/services/CustProductsInfoServices/updateCustProdByIsDeleted?response=application/json&isDeleted=0&';

// Truck Data
var CD_TRUCK_LIST = [
	{ data: 'truck_id', visible: false, searchable: false },
	{ data: 'truck_code', width: '50%' },
	{ data: 'date_modified', width: '50%' }
];
var FORM_TRUCK_DATA = 'pages/data-truck-form.html';
var DS_TRUCK_LIST = 'response.trucks-list.truck';
var WS_TRUCK_LIST = '/scaletech/services/TrucksInfoServices/getAllTrucksList?response=application/json&';
var WS_TRUCK_INSERT = '/scaletech/services/TrucksInfoServices/addTrucks?response=application/json&';
var WS_TRUCK_UPDATE = '/scaletech/services/TrucksInfoServices/updateTrucks?response=application/json&';
var WS_TRUCK_DELETE = '/scaletech/services/TrucksInfoServices/updateTrucksByIsDeleted?response=application/json&isDeleted=0&';

// User Data
var CD_USER_LIST = [
	{ data: 'user_id', visible: false, searchable: false },
	{ data: 'role_id', visible: false, searchable: false },
	{ data: 'ur_id', visible: false, searchable: false },
	{ data: 'user_name', width: '35%' },
	{ data: 'role_name', width: '35%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_USER_NEW_DATA = 'pages/others-user-details-form-new.html';
var FORM_USER_EDIT_DATA = 'pages/others-user-details-form-edit.html';
var FORM_USER_CPASS_DATA = 'pages/others-user-details-form-cpass.html';
var FORM_CHANGE_PASS_DATA = 'pages/user-change-pass-form.html';
var DS_USER_LIST = 'response.users-list.user';
var WS_USER_LIST = '/scaletech/services/UserInfoServices/getAllUserList?response=application/json&';
var WS_USER_INSERT = '/scaletech/services/UserInfoServices/addUser?response=application/json&';
var WS_USER_UPDATE = '/scaletech/services/UserInfoServices/updateUser?response=application/json&';
var WS_USER_DELETE = '/scaletech/services/UserInfoServices/updateUserByIsDeleted?response=application/json&is_deleted=0&';
var WS_USER_PASS_CHECK = '/scaletech/services/UserInfoServices/getUserByNamePassList?response=application/json&';
var WS_USER_PASS_UPDATE = '/scaletech/services/UserInfoServices/updateUserPassword?response=application/json&';
var WS_USER_CHECK = '/scaletech/services/UserInfoServices/getUserByNamePassList?response=application/json&';
var WS_USER_AUTHENTICATE = '/scaletech/services/UserInfoServices/checkIfUserIsAuthentication?response=application/json&';
var WS_USER_REMOVE_FROM_AUDIT = '/scaletech/services/UserInfoServices/removeUser?response=application/json&'

// Roles Data
var WS_LIST_ROLES = '/scaletech/services/RolesInfoServices/getAllRolesList?response=application/json&roleId=1&';

// Supplier Summary
var CD_SUMMARY_SUPPLIER = [
	{ data: 'supp_name', name: 'supp_name', width: '35%' },
	{ data: 'prod_name', name: 'prod_name', width: '35%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_SUPPLIER = 'Supplier Summary';
var WS_SUMMARY_SUPPLIER = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportBySupplierList?response=application/json&';

// Customer Summary
var CD_SUMMARY_CUSTOMER = [
	{ data: 'cust_code', name: 'cust_code', width: '35%' },
	{ data: 'cust_name', name: 'cust_name', width: '35%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_CUSTOMER = 'Customer Summary';
var WS_SUMMARY_CUSTOMER = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByCustomerList?response=application/json&';

// Destination Summary
var CD_SUMMARY_DESTINATION = [
	{ data: 'dest_name', name: 'dest_name', width: '45%' },
	{ data: 'cust_name', name: 'cust_name', width: '25%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_DESTINATION = 'Destination Summary';
var WS_SUMMARY_DESTINATION = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDestinationList?response=application/json&';

// Product Summary
var CD_SUMMARY_PRODUCT = [
	{ data: 'prod_name', name: 'prod_name', width: '40%' },
	{ data: 'net_weight', name: 'net_weight', width: '40%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '20%' }
];
var REPORT_TITLE_PRODUCT = 'Product Summary';
var WS_SUMMARY_PRODUCT = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByProductList?response=application/json&';

// Reprint Count Summary
var CD_SUMMARY_REPRINT_COUNT = [
	{ data: 'reprint_date', name: 'reprint_date', width: '25%' },
	{ data: 'docket_no', name: 'docket_no', width: '25%' },
	{ data: 'reprint_count', name: 'reprint_count', width: '25%' },
	{ data: 'user_name', name: 'user_name', width: '25%' }
];
var REPORT_TITLE_REPRINT_COUNT = 'Reprint Count Summary';
var WS_SUMMARY_REPRINT_COUNT = '/scaletech/services/DocketPrintLogInfoServices/getAllDocketPrintLogList?response=application/json&';

// Truck Summary
var CD_SUMMARY_TRUCK = [
	{ data: 'truck_code', name: 'truck_code', width: '35%' },
	{ data: 'no_of_count', name: 'no_of_count', width: '35%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_TRUCK = 'Truck Summary';
var WS_SUMMARY_TRUCK = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByTruckList?response=application/json&';

// Detailed  Truck Summary
var CD_SUMMARY_DETAILED_TRUCK = [
	{ data: 'truck_code', name: 'truck_code', _width: '10%' },
	{ data: 'date_in', name: 'date_in', _width: '15%' },
	{ data: 'time_in', name: 'time_in', _width: '15%' },
	{ data: 'date_out', name: 'date_out', _width: '15%' },
	{ data: 'time_out', name: 'time_out', _width: '15%' },
	{ data: 'net_weight', name: 'net_weight', _width: '15%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '5%' },
	{ data: 'user_name', name: 'user_name', width: '10%' }
];
var REPORT_TITLE_DETAILED_TRUCK = 'Detailed Truck Summary';
var WS_SUMMARY_DETAILED_TRUCK = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDetailedTruckList?response=application/json&';

// Summary Custom
var CD_SUMMARY_CUSTOM_DOCKET = [
	{ data: 'docket_no', name: 'docket_no' },
	{ data: 'prod_name', name: 'prod_name' },
	{ data: 'cust_name', name: 'cust_name' },
	{ data: 'truck_code', name: 'truck_code' },
	{ data: 'user_name', name: 'user_name', width: '10%' },
	{ data: 'weight_in_reading', name: 'weight_in_reading' },
	{ data: 'weight_out_reading', name: 'weight_out_reading' },
	{ data: 'net_weight', name: 'net_weight' },
	{ data: 'weight_unit', name: 'weight_unit', width: '5%' },
	{ data: 'compensation', name: 'compensation' }
];
var WS_SUMMARY_CUSTOM_DOCKET = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingByFilterList?response=application/json&';

// Event Log
var CD_EVENT_LOG_LIST = [
	{ data: 'id', visible: false },
	{ data: 'user_id', visible: false },
	{ data: 'rec_timestamp' },
	{ data: 'activity' },
	{ data: 'user_name' }
];
var REPORT_TITLE_EVENT_LOG = 'Event Log';
var DS_EVENT_LOG_LIST = 'response.audittrail-list.audittrail';
var WS_EVENT_LOG_LIST = '/scaletech/services/AuditInfoService/getAuditTrailList?response=application/json&';

// Docket Styles
var CD_LIST_DOCKET_STYLES = [
	{ "data": "dt_id", "visible": false, orderable: false },
	{ "data": "dt_row",  },
	{ "data": "dt_column" },
	{ "data": "dt_message" },
	{ "data": "dt_font_size" },
	{ "data": "dt_font_uppercase" },
	{ "data": "dt_font_underline" },
	{ "data": "dt_source", "visible": false },
	{ "data": "dt_type", "visible": false },
	{ "data": "dt_field", "visible": false }
];
var PG_DOCKET_STYLES_FORM = 'pages/docket-template-style-form.html';
var	DS_DOCKET_STYLES = 'response.docketTemplate-list.docketTemplate';
var	WS_LIST_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/getAllDocketTemplateByTypeList?response=application/json&';
var	WS_INSERT_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/addDocketTemplate?response=application/json&';
var	WS_UPDATE_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/updateDocketTemplate?response=application/json&';
var	WS_DELETE_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/deleteDocketTemplate?response=application/json&';

// Docket Fields
var WS_LIST_DOCKET_FIELDS = '/scaletech/services/DocketFieldsInfoServices/getAllDocketFieldsByAvailableList?response=application/json&';

// System Config
var WS_LIST_CONFIG_COMPANY = '/scaletech/services/CompanyInfoServices/getAllCompanyList?response=application/json&id=1&';
var WS_UPDATE_CONFIG_COMPANY = '/scaletech/services/CompanyInfoServices/updateCompany?response=application/json&id=1&';
var WS_LIST_CONFIG_DOCKET = '/scaletech/services/PrinterConfigurationInfoServices/getAllPrintersList?response=application/json&printerId=1&';
var WS_UPDATE_CONFIG_DOCKET = '/scaletech/services/PrinterConfigurationInfoServices/updatePrinter?response=application/json&id=1&';

// Roles Data
var CD_ROLES_LIST = [
	{ data: 'role_id', visible: false, searchable: false },
	{ data: 'role_name', width: '50%' },
	{ data: 'date_modified', width: '50%' }
];
var FORM_ROLES_DATA = 'pages/others-role-details-form.html';
var WS_ROLES_LIST = '/scaletech/services/RolesInfoServices/getAllRolesList?response=application/json&';
var WS_ROLES_INSERT = '/scaletech/services/RolesInfoServices/addRoles?response=application/json&';
var WS_ROLES_UPDATE = '/scaletech/services/RolesInfoServices/updateRoles?response=application/json&';
var WS_ROLES_DELETE = '/scaletech/services/RolesInfoServices/updateRolesByIsDeleted?response=application/json&isDeleted=0&';

// Role Modules Data
var WS_ROLE_MODULES_LIST = '/scaletech/services/ModulesInfoServices/getAllModulesList?response=application/json&';
var WS_ROLE_MODULES_INSERT = '/scaletech/services/RoleModulesInfoService/addRoleModules?response=application/json&'
var WS_ROLE_MODULES_DELETE = '/scaletech/services/RoleModulesInfoService/updateRoleModulesByIsDeleted?response=application/json&isDeleted=0'
var WS_UI_MODULES_LIST = '/scaletech/services/RoleModulesInfoService/getAllRoleModulesList?response=application/json&isDeleted=0&';

// Calibration
var FORM_CALIBRATION_SPAN = 'pages/others-calibration-span-form.html';

// Unique Checking
var WS_UNIQUE_CHECK = [];
WS_UNIQUE_CHECK['supp_code'] = '/scaletech/services/SuppliersInfoServices/getSuppliersByCodeList?response=application/json&';
WS_UNIQUE_CHECK['cat_code'] = '/scaletech/services/CategoriesInfoService/getCategoriesByCodeList?response=application/json&';
WS_UNIQUE_CHECK['prod_code'] = '/scaletech/services/ProductsInfoServices/getProductsByCodeList?response=application/json&';
WS_UNIQUE_CHECK['cust_code'] = '/scaletech/services/CustomerInfoServices/getCustomersByCodeList?response=application/json&';
WS_UNIQUE_CHECK['truck_code'] = '/scaletech/services/TrucksInfoServices/getTrucksByCodeList?response=application/json&';
WS_UNIQUE_CHECK['role_name'] = '/scaletech/services/RolesInfoServices/getAllRolesByRoleNameList?response=application/json&';
WS_UNIQUE_CHECK['user_name'] = '/scaletech/services/UserInfoServices/getUserByNameList?response=application/json&';

// Button Labels
var BTN_LABEL_NEW_RECORD = '<i class="fa fa-plus"></i> New';
var BTN_LABEL_EDIT_RECORD = '<i class="fa fa-pencil"></i> Edit';
var BTN_LABEL_DELETE_RECORD = '<i class="fa fa-trash-o"></i> Delete';
var BTN_LABEL_REFRESH_RECORD = '<i class="fa fa-refresh"></i> Refresh';
var BTN_LABEL_PRINT_RECORD = '<i class="glyphicon glyphicon-print"></i> Print';
var BTN_LABEL_CONFIRM_DELETE = '<i class="fa fa-trash-o"></i> Confirm Delete';
var BTN_LABEL_CANCEL_DELETE = '<i class="fa fa-ban"></i> Cancel';

// Form Validation Messages
var MSG_FV_NOTEMPTY = 'This field is required and should not be empty.';
var MSG_FV_SPECIAL_CHARS = 'Special and non alphanumeric characters are not allowed.';
var MSG_FV_INTEGER = 'An integer value is required for this field. (e.g. 1999)';
var MSG_FV_FLOAT = 'The correct numeric formats are ".99", "1999.99", "1999.9" or "1999".';

// Weigh Scale messages
var MSG_TRUCK_DATA_EMPTY = 'Please add or select a <strong>Truck Code</strong> to continue.';
var MSG_CUSTOMER_DATA_EMPTY = 'Please add or select a <strong>Customer Data</strong> to continue.';
var MSG_FIRST_WEIGHING_CONFIRM = 'Please make sure all details provided for <strong>First Weighing</strong> are correct. Press <strong>OK</strong> to continue.';
var MSG_SECOND_WEIGHING_CONFIRM = 'Please make sure all details provided for <strong>Second Weighing</strong> are correct. Press <strong>OK</strong> to continue.';
var MSG_FIRST_WEIGHING_SUCCESS = '<strong>Success</strong>. The <strong>First Weighing</strong> details you have entered were <strong>successfully created</strong> in the system. Press <strong>OK</strong> to continue.';
var MSG_SECOND_WEIGHING_SUCCESS = '<strong>Success</strong>. The <strong>Second Weighing</strong> details you have entered were <strong>successfully updated</strong> in the system. Press <strong>OK</strong> to continue.';

// Message Title
var MSG_TITLE_INFO = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_ADD_REC = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_EDIT_REC = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_DEL_REC = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_WS_ERROR = '<i class="fa fa-exclamation-circle"></i> Web Service Error';
var MSG_TITLE_CONFIRM_LOGOUT = '<i class="fa fa-info-circle"></i> Confirm Logout';
var MSG_TITLE_CONFIRM_SAVE = '<i class="fa fa-question-circle"></i> Confirm Update';
var MSG_TITLE_CONFIRM_DELETE = '<i class="fa fa-question-circle"></i> Confirm Deletion';
var MSG_TITLE_CONFIRM_FIRST_WEIGHT = '<i class="fa fa-question-circle"></i> Confirm First Weighing';
var MSG_TITLE_CONFIRM_SECOND_WEIGHT = '<i class="fa fa-question-circle"></i> Confirm Second Weighing';

// CRUD Messages
var MSG_INFO_ADD_REC = '<strong>Success</strong>. A new record has been <strong>created</strong> in the system.';
var MSG_INFO_EDIT_REC = '<strong>Success</strong>. The selected record was <strong>updated</strong> in the system.';
var MSG_INFO_DEL_REC = '<strong>Success</strong>. The selected record was <strong>deleted</strong> from the system.';
var MSG_INFO_LOGOUT_AFTER_CPASS = 'You have <strong>successfully</strong> updated your password. Please take note that you will be logged out of the system after this.'
var MSG_INFO_WS_ERROR = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Your request was <strong>not successful</strong> because there was an <strong>error</strong> in the Web Service response. If issue still persists, please contact your System Administrator.</div>';
var MSG_INFO_ROLE_INVALID = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Your current role privileges does <strong>not allow</strong> you to perform this action. For more information, please contact your System Administrator.</div>';

// Confirm Messages
var MSG_CONFIRM_LOGOUT = 'Are you sure you want to logout of the system?';
var MSG_CONFIRM_DELETE_RECORD = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you are requesting will <strong>delete</strong> the selected record from the system. Please <strong>confirm</strong> if you want to perform this action. Press <strong>Confirm Delete</strong> to continue.</div>';
var MSG_CONFIRM_SAVE_COM_PORT = 'This will <strong>update</strong> the current Communication Port settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_CONFIG_WEIGHIN = 'This will <strong>update</strong> the current Weigh In settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_CONFIG_COMPANY = 'This will <strong>update</strong> the current Company Details settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_CONFIG_DOCKET = 'This will <strong>update</strong> the current Docket settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_REMOVE_MODULES = 'This will <strong>remove</strong> all modules assigned to the selected role. Press <strong>OK</strong> to continue.';

// Alert Messages
var MSG_ALERT_LOGIN_FORM_ERROR = '<div class="alert alert-danger" role="alert" style="text-align: left; margin-bottom: 20px;"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Your request was <strong>not submitted</strong> because of the following <strong>errors</strong>. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_ALERT_INVALID_OLD_PASS = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you requested were <strong>not submitted</strong> because you provided an <strong>invalid old password</strong>. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_ALERT_INVALID_LOGIN = '<div class="alert alert-danger" role="alert" style="text-align: left; margin-bottom: 20px;"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> You are <strong>not allowed</strong> to access the system. Please enter a valid <strong>Username</strong> and <strong>Password</strong> to continue.</div>';
var MSG_ALERT_FORM_ERROR = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you requested were <strong>not submitted</strong> because of the following <strong>errors</strong>. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_ALERT_DUPLICATE_REC = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you requested were <strong>not submitted</strong> because they would create <strong>duplicate data</strong> in the system. Change the value of the field(s) that contains duplicate data and try again.</div>';
var MSG_ALERT_WS_ERROR = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Your request was <strong>not successful</strong> because there was an <strong>error</strong> in the Web Service response. If issue still persists, please contact your System Administrator.</div>';