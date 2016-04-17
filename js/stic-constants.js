// Default Constants
var CONSOLE_LOG = true;
var DEFAULT_ROOT = '/forms/';
var DEFAULT_PAGE_LOC = 'pages/';
var DEFAULT_PAGE_FILE_EXT = '.html';
var DEFAULT_PAGE_LENGTH = 10;
var DEFAULT_WRAPPER_ID = '#main-wrapper';
var DEFAULT_DS_REPORTS = 'response.report-list.report';
var DEFAULT_DATASOURCE = 'response.record-list.record';

// Weighing Screen
var CD_CHECK_TRUCK_CODE_LIST = [
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
var WS_SECOND_WEIGHING_UPDATE = '/scaletech/services/WeightReadingInfoServices/updateWeightReadings?response=application/json&';
var WS_FIRST_WEIGHING_DELETE = '/scaletech/services/WeightReadingInfoServices/deleteWeighReadingById?response=application/json&';
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
	{ data: 'dest_zipcode' },
	{ data: 'dest_name' },
	{ data: 'dest_location' }
];
var DS_DESTINATION_LIST = 'response.destinations-list.destination';
var WS_DESTINATION_LIST = '/scaletech/services/DestinationsInfoServices/getAllDestinationsNotInCustDestList?response=application/json&';

// Product Data
var CD_PRODUCT_LIST = [
	{ data: 'prod_id', visible: false, searchable: false },
	{ data: 'prod_code' },
	{ data: 'prod_name' },
	{ data: 'unit_price' }
];
var DS_PRODUCT_LIST = 'response.products-list.product';
var WS_PRODUCT_LIST = '/scaletech/services/ProductsInfoServices/getAllProductsList?response=application/json&';
var WS_PRODUCT_INSERT = '/scaletech/services/ProductsInfoServices/addProducts?response=application/json&';
var WS_PRODUCT_UPDATE = '/scaletech/services/ProductsInfoServices/updateProducts?response=application/json&';
var WS_PRODUCT_DELETE = '/scaletech/services/ProductsInfoServices/updateProductsByIsDeleted?response=application/json&isDeleted=0&';

// Customer Destination Data
var CD_CUSTDEST_LIST = [
	{ data: 'cd_id', visible: false, searchable: false },
	{ data: 'cust_id', visible: false, searchable: false },
	{ data: 'dest_id', visible: false, searchable: false },
	{ data: 'dest_zipcode' },
	{ data: 'dest_name' },
	{ data: 'dest_location' }
];
var PICKER_CUSTDEST_DATA = 'pages/data-customer-destination-picker.html';
var DS_CUSTDEST_LIST = 'response.custDest-list.customerDestination';
var WS_CUSTDEST_LIST = '/scaletech/services/CustDestInfoServices/getAllCustDestList?response=application/json&';
var WS_CUSTDEST_INSERT = '/scaletech/services/CustDestInfoServices/addCustDest?response=application/json&';
var WS_CUSTDEST_DELETE = '/scaletech/services/CustDestInfoServices/updateCustDestByIsDeleted?response=application/json&isDeleted=0&';

// Customer Product Data
var CD_CUSTPROD_LIST = [
	{ data: 'cp_id', visible: false, searchable: false },
	{ data: 'cust_id', visible: false, searchable: false },
	{ data: 'prod_id', visible: false, searchable: false },
	{ data: 'prod_code' },
	{ data: 'prod_name' },
	{ data: 'unit_price' }
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
	{ data: 'user_name' },
	{ data: 'role_name' },
	{ data: 'date_modified' }
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
var WS_USER_CHECK = '/scaletech/services/UserInfoServices/getUserByNamePassList?response=application/json&'

// Roles Data
var WS_LIST_ROLES = '/scaletech/services/RolesInfoServices/getAllRolesList?response=application/json&roleId=1&';

// Supplier Summary
var CD_SUMMARY_SUPPLIER = [
	{ data: 'supp_name' },
	{ data: 'prod_name' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' }
];
var REPORT_TITLE_SUPPLIER = 'Supplier Summary';
var WS_SUMMARY_SUPPLIER = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportBySupplierList?response=application/json&';

// Customer Summary
var CD_SUMMARY_CUSTOMER = [
	{ data: 'cust_code' },
	{ data: 'cust_name' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' }
];
var REPORT_TITLE_CUSTOMER = 'Customer Summary';
var WS_SUMMARY_CUSTOMER = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByCustomerList?response=application/json&';

// Destination Summary
var CD_SUMMARY_DESTINATION = [	
	{ data: 'dest_name' },
	{ data: 'cust_name' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' }
];
var REPORT_TITLE_DESTINATION = 'Destination Summary';
var WS_SUMMARY_DESTINATION = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDestinationList?response=application/json&';

// Product Summary
var CD_SUMMARY_PRODUCT = [
	{ data: 'prod_name' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' }
];
var REPORT_TITLE_PRODUCT = 'Product Summary';
var WS_SUMMARY_PRODUCT = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByProductList?response=application/json&';

// Reprint Count Summary
var CD_SUMMARY_REPRINT_COUNT = [
	{ data: 'reprint_date' },
	{ data: 'docket_no' },
	{ data: 'reprint_count' },
	{ data: 'user_name' }
];
var REPORT_TITLE_REPRINT_COUNT = 'Reprint Count Summary';
var WS_SUMMARY_REPRINT_COUNT = '/scaletech/services/DocketPrintLogInfoServices/getAllDocketPrintLogList?response=application/json&';

// Truck Summary
var CD_SUMMARY_TRUCK = [
	{ data: 'truck_code' },
	{ data: 'no_of_count' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' }
];
var REPORT_TITLE_TRUCK = 'Truck Summary';
var WS_SUMMARY_TRUCK = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByTruckList?response=application/json&';

// Detailed  Truck Summary
var CD_SUMMARY_DETAILED_TRUCK = [
	{ data: 'truck_code' },
	{ data: 'date_in' },
	{ data: 'time_in' },
	{ data: 'date_out' },
	{ data: 'time_out' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' },
	{ data: 'user_name' }
];
var REPORT_TITLE_DETAILED_TRUCK = 'Detailed Truck Summary';
var WS_SUMMARY_DETAILED_TRUCK = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDetailedTruckList?response=application/json&';

// Summary Custom
var CD_SUMMARY_CUSTOM_DOCKET = [
	{ data: 'docket_no' },
	{ data: 'prod_name' },
	{ data: 'cust_name' },
	{ data: 'truck_code' },
	{ data: 'user_name' },
	{ data: 'weight_in_reading' },
	{ data: 'weight_out_reading' },
	{ data: 'net_weight' },
	{ data: 'weight_unit' },
	{ data: 'compensation' }
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

// Roles
var CD_ROLES_LIST = [
	{ data: 'role_id', visible: false, searchable: false },
	{ data: 'role_name' },
	{ data: 'date_modified' }
];
var FORM_ROLES_DATA = 'pages/others-role-details-form.html';
var WS_ROLES_LIST = '/scaletech/services/RolesInfoServices/getAllRolesList?response=application/json&';
var WS_ROLES_INSERT = '/scaletech/services/RolesInfoServices/addRoles?response=application/json&';
var WS_ROLES_UPDATE = '/scaletech/services/RolesInfoServices/updateRoles?response=application/json&';
var WS_ROLES_DELETE = '/scaletech/services/RolesInfoServices/updateRolesByIsDeleted?response=application/json&isDeleted=0&';

// Role Modules
var WS_ROLE_MODULES_LIST = '/scaletech/services/ModulesInfoServices/getAllModulesList?response=application/json&';
var WS_ROLE_MODULES_INSERT = '/scaletech/services/RoleModulesInfoService/addRoleModules?response=application/json&'
var WS_ROLE_MODULES_DELETE = '/scaletech/services/RoleModulesInfoService/updateRoleModulesByIsDeleted?response=application/json&isDeleted=0'
var WS_UI_MODULES_LIST = '/scaletech/services/RoleModulesInfoService/getAllRoleModulesList?response=application/json&isDeleted=0&';

var WS_UNIQUE_CHECK = [];
WS_UNIQUE_CHECK['supp_code'] = '/scaletech/services/SuppliersInfoServices/getSuppliersByCodeList?response=application/json&';
WS_UNIQUE_CHECK['cat_code'] = '/scaletech/services/CategoriesInfoService/getCategoriesByCodeList?response=application/json&';
WS_UNIQUE_CHECK['prod_code'] = '/scaletech/services/ProductsInfoServices/getProductsByCodeList?response=application/json&';
WS_UNIQUE_CHECK['cust_code'] = '/scaletech/services/CustomerInfoServices/getCustomersByCodeList?response=application/json&';
WS_UNIQUE_CHECK['truck_code'] = '/scaletech/services/TrucksInfoServices/getTrucksByCodeList?response=application/json&';
WS_UNIQUE_CHECK['role_name'] = '/scaletech/services/RolesInfoServices/getAllRolesByRoleNameList?response=application/json&';
WS_UNIQUE_CHECK['user_name'] = '/scaletech/services/UserInfoServices/getUserByNameList?response=application/json&';

// ******************************************************************************************************************************************************8

// System Messages
var MESSAGE_TITLE = '<i class="fa fa-info-circle"></i> System Message';
var DEFAULT_MESSAGE_STATUS = 'info';
var DEFAULT_MESSAGE_TITLE = '<i class="fa fa-info-circle"></i> System Message';
var MESSAGE_SUCCESS_NEW = '<strong>Success!</strong> New record has been created.';
var MESSAGE_SUCCESS_EDIT = '<strong>Success!</strong> Record has been updated.';
var MESSAGE_SUCCESS_DELETE = '<strong>Success!</strong> Record has been deleted.';
var MESSAGE_CONFIRM_DELETE = '<strong>Confirm Delete!</strong> Are you sure you want to delete this record?';

// System Messages
var MSG_STATUS = 'info';
var MSG_TITLE = '<i class="fa fa-info-circle"></i> System Message';
var MSG_SUCCESS_CREATE = 'Record has been created.';
var MSG_SUCCESS_UPDATE = 'Record has been updated.';
var MSG_SUCCESS_DELETE = 'Record has been deleted.';
var MSG_CONFIRM_DELETE = 'Are you sure you want to delete this record?';
var MSG_WARNING_ICON = '<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>';
var MSG_ERROR_ICON = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>';
var MSG_FIRST_WEIGHING_SUCCESS = 'Truck Code added for Second Weighing.';
var MSG_FIRST_WEIGHING_CONFIRM = 'Continue to Second Weighing? Press OK to continue.';
var MSG_SEARCH_PRODUCT_ERROR_1 = 'Please enter or select a Customer Data to continue.';
var MSG_SEARCH_DESTINATION_ERROR_1 = 'Please enter or select a Customer Data to continue.';
var MSG_SEARCH_CUSTOMER_ERROR_1 = 'Please enter or select a Truck Data to continue.';
var MSG_SECOND_WEIGHING_CONFIRM = 'Please make sure all details provided are correct. Press OK to continue.';

var MSG_WEIGHT_INPUT_ERROR_TITLE = '<i class="fa fa-exclamation-circle"></i> Input Error';
var MSG_ERROR_TITLE = '<i class="fa fa-exclamation-circle"></i> Error';
var MSG_TITLE_LOGIN_ERROR = '<i class="fa fa-exclamation-circle"></i> Login Error';
var MSG_INFO_LOGIN_ERROR = '<strong>Invalid</strong> login credentials. You are <strong>not allowed</strong> to access the system.';
var MSG_INFO_LOGIN_ERROR_INLINE = '<div class="alert alert-danger" role="alert" style="text-align: left"><i class="fa fa-exclamation-circle"></i> <strong>Invalid</strong> login credentials. You are <strong>not allowed</strong> to access the system. In case of forgotten password, please contact your system administrator.</div>';

var MSG_INFO_TITLE = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_CONFIRM_SAVE = '<i class="fa fa-question-circle"></i> Confirm Update';
var MSG_TITLE_CONFIRM_DELETE = '<i class="fa fa-question-circle"></i> Confirm Deletion';
var MSG_TITLE_CONFIRM_FIRST_WEIGHT = '<i class="fa fa-question-circle"></i> Confirm First Weighing';
var MSG_TITLE_CONFIRM_SECOND_WEIGHT = '<i class="fa fa-question-circle"></i> Confirm Second Weighing';

// Generic CRUD Messages
var MSG_ADD_REC_TITLE = '<i class="fa fa-info-circle"></i> Information';
var MSG_EDIT_REC_TITLE = '<i class="fa fa-info-circle"></i> Information';
var MSG_DEL_REC_TITLE = '<i class="fa fa-info-circle"></i> Information';
var MSG_WS_ERROR_TITLE = '<i class="fa fa-exclamation-circle"></i> Web Service Error';
var MSG_DUPLICATE_REC_TITLE = '<i class="fa fa-exclamation-circle"></i> Duplicate Entry';
var MSG_ADD_REC_INFO = '<strong>Success</strong>. A new record has been <strong>created</strong> in the system.';
var MSG_EDIT_REC_INFO = '<strong>Success</strong>. The selected record was <strong>updated</strong> in the system.';
var MSG_DEL_REC_INFO = '<strong>Success</strong>. The selected record was <strong>deleted</strong> from the system.';
var MSG_WS_ERROR_INFO = 'The changes you requested were <strong>not successful</strong> because there was an error in the Web Service response. If issue still persists, please contact your System Administrator.';
var MSG_WS_ERROR_INLINE = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i> The changes you requested were <strong>not successful</strong> because there was an error in the Web Service response. If issue still persists, please contact your System Administrator.</div>';
var MSG_DUPLICATE_REC_INLINE = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i> The changes you requested were <strong>not submitted</strong> because they would create duplicate data in the system. Change the value of the field(s) that contains duplicate data and try again.</div>';
var MSG_FORM_ERROR_INLINE = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle"></i> The changes you requested were <strong>not submitted</strong>. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_LOGIN_ERROR_INLINE = '<div class="alert alert-danger" role="alert" style="text-align: left"><i class="fa fa-exclamation-circle"></i> Your request was <strong>not submitted</strong>. Change the value of the field(s) that contains errors and try again.</div>';

var MSG_CONFIRM_REMOVE_MODULES = 'This will <strong>remove</strong> all modules assigned to the selected role. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_DELETE_RECORD = 'This will <strong>delete</strong> the selected record. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_COM_PORT = 'This will <strong>update</strong> the current Communication Port settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_CONFIG_WEIGHIN = 'This will <strong>update</strong> the current Weigh In settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_CONFIG_COMPANY = 'This will <strong>update</strong> the current Company Details settings. Press <strong>OK</strong> to continue.';
var MSG_CONFIRM_SAVE_CONFIG_DOCKET = 'This will <strong>update</strong> the current Docket settings. Press <strong>OK</strong> to continue.';
