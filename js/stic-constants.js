// Default Constants
var DFLT_ROOT = '/stic/';
var DFLT_CKIE_LIFE = 3;
var DFLT_PICK_SIZE = 5;
var DFLT_PAGE_SIZE = 10;
var DFLT_PAGE_EXT = '.html';
var DFLT_PAGE_DIR = 'pages/';
var DFLT_DATE_FRMT = 'MM/DD/YYYY';
var DFLT_WRPR_ID = '#main-wrapper';
var DFLT_DS = 'response.record-list.record';
var DFLT_DS_RPTS = 'response.report-list.report';

// Default DataTables Settings
var DFLT_DT_CONF = {
	scrollX: true,
	processing: true,
	lengthChange: false,
	pagingType: 'full',
	language: {
		paginate: {
			next: '<i class="fa fa-forward"></i>',
			last: '<i class="fa fa-fast-forward"></i>',
			previous: '<i class="fa fa-backward"></i>',
			first: '<i class="fa fa-fast-backward"></i>'
		},
		processing:
			'<div class="indicator">' +
				'<i class="fa fa-cog fa-spin fa-2x fa-fw margin-bottom"></i> ' +
				'Please wait, loading data.' +
			'</div>',
		search: '<i class="fa fa-search"></i>'
	}
}

// Weighing Screen
var SR_INTERVAL = 1000;
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
var WS_CHECK_TRUCK_CODE_LIST = '/stic/services/WeightReadingInfoServices/checkTruckCodeList?response=application/json&';
var WS_FIRST_WEIGHING_INSERT = '/stic/services/WeightReadingInfoServices/addWeightReadings?response=application/json&';
var WS_FIRST_WEIGHING_DELETE = '/stic/services/WeightReadingInfoServices/deleteWeighReadingById?response=application/json&';
var WS_SECOND_WEIGHING_UPDATE = '/stic/services/WeightReadingInfoServices/updateWeightReadings?response=application/json&';
var WS_CUST_PRODUCT_INSERT = '/stic/services/ProductsInfoServices/addProductsAndCustomerProducts?response=application/json&'

var WS_SCALE_INIT = '/stic/services/ScaleReaderInfoServices/initReader?response=application/json';
var WS_SCALE_DISCONNECT = '/stic/services/ScaleReaderInfoServices/disconnect?response=application/json';
var WS_SCALE_READER = '/stic/services/ScaleReaderInfoServices/readScaleReading?response=application/json';
var WS_DOCKET_PRINT = '/stic/DocketPrintReportService?';

// Supplier Data
var CD_SUPPLIER_LIST = [
	{ data: 'supp_id', visible: false, searchable: false },
	{ data: 'supp_code', width: '30%' },
	{ data: 'supp_name', width: '40%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_SUPPLIER_DATA = 'pages/data-supplier-form.html';
var DS_SUPPLIER_LIST = 'response.suppliers-list.supplier';
var WS_SUPPLIER_LIST = '/stic/services/SuppliersInfoServices/getAllSuppliersList?response=application/json&';
var WS_SUPPLIER_INSERT = '/stic/services/SuppliersInfoServices/addSuppliers?response=application/json&';
var WS_SUPPLIER_UPDATE = '/stic/services/SuppliersInfoServices/updateSuppliers?response=application/json&';
var WS_SUPPLIER_DELETE = '/stic/services/SuppliersInfoServices/updateSuppliersByIsDeleted?response=application/json&isDeleted=0&';

// Category Data
var CD_CATEGORY_LIST = [
	{ data: 'cat_id', visible: false, searchable: false },
	{ data: 'cat_code', width: '30%' },
	{ data: 'cat_name', width: '40%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_CATEGORY_DATA = 'pages/data-category-form.html';
var DS_CATEGORY_LIST = 'response.categories-list.cateory';
var WS_CATEGORY_LIST = '/stic/services/CategoriesInfoService/getAllCategoriesList?response=application/json';
var WS_CATEGORY_INSERT = '/stic/services/CategoriesInfoService/addCategories?response=application/json&';
var WS_CATEGORY_UPDATE = '/stic/services/CategoriesInfoService/updateCategories?response=application/json&';
var WS_CATEGORY_DELETE = '/stic/services/CategoriesInfoService/updateCategoriesByIsDeleted?response=application/json&isDeleted=0&';
var WS_CATEGORY_DEL_CHECK = '/stic/services/ProductsInfoServices/checkTagCatIdList?response=application/json&';

// Customer Data
var CD_CUSTOMER_LIST = [
	{ data: 'cust_id', visible: false, searchable: false },
	{ data: 'cust_code', width: '30%' },
	{ data: 'cust_name', width: '40%' },
	{ data: 'date_modified', width: '30%' }
];
var FORM_CUSTOMER_DATA = 'pages/data-customer-form.html';
var DS_CUSTOMER_LIST = 'response.customers-list.customer';
var WS_CUSTOMER_INSERT = '/stic/services/CustomerInfoServices/addCustomers?response=application/json&';
var WS_CUSTOMER_UPDATE = '/stic/services/CustomerInfoServices/updateCustomers?response=application/json&';
var WS_CUSTOMER_DELETE = '/stic/services/CustomerInfoServices/updateCustomersByIsDeleted?response=application/json&isDeleted=0&';
var WS_CUSTOMER_LIST = '/stic/services/CustomerInfoServices/getAllCustomersList?response=application/json&';

// Destination Data
var CD_DESTINATION_LIST = [
	{ data: 'dest_id', name: 'dest_id', visible: false, searchable: false },
	{ data: 'dest_zipcode', name: 'dest_zipcode', width: '15%' },
	{ data: 'dest_name', name: 'dest_name', width: '35%' },
	{ data: 'dest_location', name: 'dest_location', width: '25%' },
	{ data: 'date_modified', name: 'date_modified', width: '25%' }
];
var DS_DESTINATION_LIST = 'response.destinations-list.destination';
var WS_DESTINATION_LIST = '/stic/services/DestinationsInfoServices/getAllDestinationsNotInCustDestList?response=application/json&';

// Product Data
var CD_PRODUCT_LIST = [
	{ data: 'prod_id', name: 'prod_id', visible: false, searchable: false },
	{ data: 'prod_code', name: 'prod_code', width: '25%' },
	{ data: 'prod_name', name: 'prod_name', width: '25%' },
	{ data: 'cat_name', name: 'cat_name', width: '25%' },
	{ data: 'date_modified', name: 'date_modified', width: '25%' }
];
var DS_PRODUCT_LIST = 'response.products-list.product';
var WS_PRODUCT_LIST = '/stic/services/ProductsInfoServices/getAllProductsList?response=application/json&';
var WS_PRODUCT_INSERT = '/stic/services/ProductsInfoServices/addProducts?response=application/json&';
var WS_PRODUCT_UPDATE = '/stic/services/ProductsInfoServices/updateProducts?response=application/json&';
var WS_PRODUCT_DELETE = '/stic/services/ProductsInfoServices/updateProductsByIsDeleted?response=application/json&isDeleted=0&';
var WS_PRODCAT_INSERT = '/stic/services/ProductCategoriesInfoServices/addProdCategories?response=application/json&';
var WS_PRODCAT_DELETE = '/stic/services/ProductCategoriesInfoServices/updateProdCategoriesByIsDeleted?response=application/json&isDeleted=0&';

// Customer Destination Data
var CD_CUSTDEST_LIST = [
	{ data: 'cd_id', name: 'cd_id', visible: false, searchable: false },
	{ data: 'cust_id', name: 'cust_id', visible: false, searchable: false },
	{ data: 'dest_id', name: 'dest_id', visible: false, searchable: false },
	{ data: 'dest_zipcode', name: 'dest_zipcode', width: '15%' },
	{ data: 'dest_name', name: 'dest_name', width: '35%' },
	{ data: 'dest_location', name: 'dest_location', width: '70%' },
	{ data: 'date_modified', name: 'date_modified', width: '30%' }
];
var PICKER_CUSTDEST_DATA = 'pages/data-customer-destination-picker.html';
var DS_CUSTDEST_LIST = 'response.custDest-list.customerDestination';
var WS_CUSTDEST_LIST = '/stic/services/CustDestInfoServices/getAllCustDestList?response=application/json&';
var WS_CUSTDEST_INSERT = '/stic/services/CustDestInfoServices/addCustDest?response=application/json&';
var WS_CUSTDEST_DELETE = '/stic/services/CustDestInfoServices/updateCustDestByIsDeleted?response=application/json&isDeleted=0&';

// Customer Product Data
var CD_CUSTPROD_LIST = [
	{ data: 'cp_id', name: 'cp_id', visible: false, searchable: false },
	{ data: 'cust_id', name: 'cust_id', visible: false, searchable: false },
	{ data: 'prod_id', name: 'prod_id', visible: false, searchable: false },
	{ data: 'prod_code', name: 'prod_code', width: '25%' },
	{ data: 'prod_name', name: 'prod_name', width: '25%' },
	{ data: 'cat_name', name: 'cat_name', width: '25%' },
	{ data: 'date_modified', name: 'date_modified', width: '25%' }
];
var PICKER_CUSTPROD_DATA = 'pages/data-customer-product-picker.html';
var DS_CUSTPROD_LIST = 'response.custProducts-list.customerProduct';
var WS_CUSTPROD_LIST = '/stic/services/CustProductsInfoServices/getAllCustProdList?response=application/json&';
var WS_CUSTPROD_INSERT = '/stic/services/CustProductsInfoServices/addCustProd?response=application/json&';
var WS_CUSTPROD_DELETE = '/stic/services/CustProductsInfoServices/updateCustProdByIsDeleted?response=application/json&isDeleted=0&';

// Truck Data
var CD_TRUCK_LIST = [
	{ data: 'truck_id', visible: false, searchable: false },
	{ data: 'truck_code', width: '50%' },
	{ data: 'date_modified', width: '50%' }
];
var FORM_TRUCK_DATA = 'pages/data-truck-form.html';
var DS_TRUCK_LIST = 'response.trucks-list.truck';
var WS_TRUCK_LIST = '/stic/services/TrucksInfoServices/getAllTrucksList?response=application/json&';
var WS_TRUCK_INSERT = '/stic/services/TrucksInfoServices/addTrucks?response=application/json&';
var WS_TRUCK_UPDATE = '/stic/services/TrucksInfoServices/updateTrucks?response=application/json&';
var WS_TRUCK_DELETE = '/stic/services/TrucksInfoServices/updateTrucksByIsDeleted?response=application/json&isDeleted=0&';

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
var WS_USER_LIST = '/stic/services/UserInfoServices/getAllUserList?response=application/json&';
var WS_USER_INSERT = '/stic/services/UserInfoServices/addUser?response=application/json&';
var WS_USER_UPDATE = '/stic/services/UserInfoServices/updateUser?response=application/json&';
var WS_USER_DELETE = '/stic/services/UserInfoServices/updateUserByIsDeleted?response=application/json&is_deleted=0&';
var WS_USER_PASS_CHECK = '/stic/services/UserInfoServices/getUserByNamePassList?response=application/json&';
var WS_USER_PASS_UPDATE = '/stic/services/UserInfoServices/updateUserPassword?response=application/json&';
var WS_USER_CHECK = '/stic/services/UserInfoServices/getUserByNamePassList?response=application/json&';
var WS_USER_AUTHENTICATE = '/stic/services/UserInfoServices/checkIfUserIsAuthentication?response=application/json&';
var WS_USER_REMOVE_FROM_AUDIT = '/stic/services/UserInfoServices/removeUser?response=application/json&'

// License Validation
var WS_LICENSE_UPLOAD = '/stic/FileUploadService';
var WS_CHECK_LICENSE = '/stic/services/CompanyInfoServices/checkIsLicense?response=application/json&';
var WS_LICENSE_NOTIFY = '/stic/services/CompanyInfoServices/getDaysBetweenDates?response=application/json&';
var WS_VALIDATE_LICENSE = '/stic-admin/services/ClientsInfoServices/validateLicenseKey?response=application/json&';
var WS_UPDATE_COMPANY_LICENSE = '/stic/services/CompanyInfoServices/updateCompanyLicenseKey?response=application/json&';
var WS_GET_LICENSE_DETAILS = '/stic-admin/services/ClientLicensesInfoServices/getLicenseKey?response=application/json&';
var WS_CONFIRM_LICENSE_DETAILS = '/stic-admin/services/ClientLicensesInfoServices/updateClientLicensesByConfirm?response=application/json&';
var WS_GET_HD_SERIAL_NUM = '/stic/services/CompanyInfoServices/getHardDiskSerialNumber?response=application/json&';

// Roles Data
var WS_LIST_ROLES = '/stic/services/RolesInfoServices/getAllRolesList?response=application/json&roleId=1&';

// Supplier Summary
var CD_SUMMARY_SUPPLIER = [
	{ data: 'supp_name', name: 'supp_name', width: '25%' },
	{ data: 'cat_name', name: 'cat_name', width: '25%' },
	{ data: 'prod_name', name: 'prod_name', width: '25%' },
	{ data: 'net_weight', name: 'net_weight', width: '15%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_SUPPLIER = 'Supplier Summary';
var WS_SUMMARY_SUPPLIER = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportBySupplierList?response=application/json&';

// Customer Summary
var CD_SUMMARY_CUSTOMER = [
	{ data: 'cust_code', name: 'cust_code', width: '35%' },
	{ data: 'cust_name', name: 'cust_name', width: '35%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_CUSTOMER = 'Customer Summary';
var WS_SUMMARY_CUSTOMER = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByCustomerList?response=application/json&';

// Destination Summary
var CD_SUMMARY_DESTINATION = [
	{ data: 'dest_zipcode', name: 'dest_zipcode', width: '10%' },
	{ data: 'dest_name', name: 'dest_name', width: '25%' },
	{ data: 'dest_location', name: 'dest_location', width: '20%' },
	{ data: 'cust_name', name: 'cust_name', width: '20%' },
	{ data: 'net_weight', name: 'net_weight', width: '15%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_DESTINATION = 'Destination Summary';
var WS_SUMMARY_DESTINATION = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDestinationList?response=application/json&';

// Product Summary
var CD_SUMMARY_PRODUCT = [
	{ data: 'cat_name', name: 'cat_name', width: '30%' },
	{ data: 'prod_name', name: 'prod_name', width: '30%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '20%' }
];
var REPORT_TITLE_PRODUCT = 'Product Summary';
var WS_SUMMARY_PRODUCT = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByProductList?response=application/json&';

// Reprint Count Summary
var CD_SUMMARY_REPRINT_COUNT = [
	{ data: 'reprint_date', name: 'reprint_date', width: '25%' },
	{ data: 'docket_no', name: 'docket_no', width: '25%' },
	{ data: 'reprint_count', name: 'reprint_count', width: '25%' },
	{ data: 'user_name', name: 'user_name', width: '25%' }
];
var REPORT_TITLE_REPRINT_COUNT = 'Reprint Count Summary';
var WS_SUMMARY_REPRINT_COUNT = '/stic/services/DocketPrintLogInfoServices/getAllDocketPrintLogList?response=application/json&';

// Truck Summary
var CD_SUMMARY_TRUCK = [
	{ data: 'truck_code', name: 'truck_code', width: '35%' },
	{ data: 'no_of_count', name: 'no_of_count', width: '35%' },
	{ data: 'net_weight', name: 'net_weight', width: '20%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '10%' }
];
var REPORT_TITLE_TRUCK = 'Truck Summary';
var WS_SUMMARY_TRUCK = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByTruckList?response=application/json&';

// Detailed  Truck Summary
var CD_SUMMARY_DETAILED_TRUCK = [
	{ data: 'truck_code', name: 'truck_code', _width: '10%' },
	{ data: 'cat_name', name: 'cat_name', _width: '15%' },
	{ data: 'prod_name', name: 'prod_name', _width: '15%' },
	{ data: 'date_in', name: 'date_in', _width: '15%' },
	{ data: 'time_in', name: 'time_in', _width: '15%' },
	{ data: 'date_out', name: 'date_out', _width: '15%' },
	{ data: 'time_out', name: 'time_out', _width: '15%' },
	{ data: 'net_weight', name: 'net_weight', _width: '15%' },
	{ data: 'weight_unit', name: 'weight_unit', width: '5%' },
	{ data: 'user_name', name: 'user_name', width: '10%' }
];
var REPORT_TITLE_DETAILED_TRUCK = 'Detailed Truck Summary';
var WS_SUMMARY_DETAILED_TRUCK = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDetailedTruckList?response=application/json&';

// Summary Custom
var CD_SUMMARY_CUSTOM_DOCKET = [
	{ data: 'docket_no', name: 'docket_no' },
	{ data: 'cat_name', name: 'cat_name' },
	{ data: 'prod_name', name: 'prod_name' },
	{ data: 'cust_name', name: 'cust_name' },
	{ data: 'truck_code', name: 'truck_code' },
	{ data: 'user_name', name: 'user_name' },
	{ data: 'date_in', name: 'date_in' },
	{ data: 'time_in', name: 'time_in' },
	{ data: 'weight_in_reading', name: 'weight_in_reading' },
	{ data: 'date_out', name: 'date_out' },
	{ data: 'time_out', name: 'time_out' },
	{ data: 'weight_out_reading', name: 'weight_out_reading' },
	{ data: 'net_weight', name: 'net_weight' },
	{ data: 'weight_unit', name: 'weight_unit', width: '5%' },
	{ data: 'compensation', name: 'compensation' }
];
var WS_SUMMARY_CUSTOM_DOCKET = '/stic/services/WeighingReadingSummInfoServices/getAllWeightReadingByFilterList?response=application/json&';

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
var WS_EVENT_LOG_LIST = '/stic/services/AuditInfoService/getAuditTrailList?response=application/json&';

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
var	WS_LIST_DOCKET_STYLES = '/stic/services/DocketTemplateInfoService/getAllDocketTemplateByTypeList?response=application/json&';
var	WS_INSERT_DOCKET_STYLES = '/stic/services/DocketTemplateInfoService/addDocketTemplate?response=application/json&';
var	WS_UPDATE_DOCKET_STYLES = '/stic/services/DocketTemplateInfoService/updateDocketTemplate?response=application/json&';
var	WS_DELETE_DOCKET_STYLES = '/stic/services/DocketTemplateInfoService/deleteDocketTemplate?response=application/json&';

// Docket Fields
var WS_LIST_DOCKET_FIELDS = '/stic/services/DocketFieldsInfoServices/getAllDocketFieldsByAvailableList?response=application/json&';

// System Config
var WS_LIST_CONFIG_COMPANY = '/stic/services/CompanyInfoServices/getAllCompanyList?response=application/json&id=1&';
var WS_UPDATE_CONFIG_COMPANY = '/stic/services/CompanyInfoServices/updateCompany?response=application/json&id=1&';
var WS_LIST_CONFIG_DOCKET = '/stic/services/PrinterConfigurationInfoServices/getAllPrintersList?response=application/json&printerId=1&';
var WS_UPDATE_CONFIG_DOCKET = '/stic/services/PrinterConfigurationInfoServices/updatePrinter?response=application/json&id=1&';

// Roles Data
var CD_ROLES_LIST = [
	{ data: 'role_id', visible: false, searchable: false },
	{ data: 'role_name', width: '50%' },
	{ data: 'date_modified', width: '50%' }
];
var FORM_ROLES_DATA = 'pages/others-role-details-form.html';
var WS_ROLES_LIST = '/stic/services/RolesInfoServices/getAllRolesList?response=application/json&';
var WS_ROLES_INSERT = '/stic/services/RolesInfoServices/addRoles?response=application/json&';
var WS_ROLES_UPDATE = '/stic/services/RolesInfoServices/updateRoles?response=application/json&';
var WS_ROLES_DELETE = '/stic/services/RolesInfoServices/updateRolesByIsDeleted?response=application/json&isDeleted=0&';

// Role Modules Data
var WS_ROLE_MODULES_LIST = '/stic/services/ModulesInfoServices/getAllModulesList?response=application/json&';
var WS_ROLE_MODULES_INSERT = '/stic/services/RoleModulesInfoService/addRoleModules?response=application/json&'
var WS_ROLE_MODULES_DELETE = '/stic/services/RoleModulesInfoService/updateRoleModulesByIsDeleted?response=application/json&isDeleted=0'
var WS_UI_MODULES_LIST = '/stic/services/RoleModulesInfoService/getAllRoleModulesList?response=application/json&isDeleted=0&';
var WS_UI_MODULES_CHECK = '/stic/services/RoleModulesInfoService/getAllModulesIdRoleIdList?response=application/json&';

// Calibration
var FORM_CALIBRATION_SPAN = 'pages/others-calibration-span-form.html';
var WS_CALIBRATION_ZERO = '/stic/services/ScaleReaderInfoServices/calibrateSpanToZero?response=application/json&';
var WS_CALIBRATION_SPAN = '/stic/services/ScaleReaderInfoServices/calibrateSpanToNumber?response=application/json&';

// Backup & Restore DB
var CD_DB_HISTORY = [
	{ data: 'id', name: 'id', visible: false, searchable: false },
	{ data: 'date_process', name: 'date_process', width: '25%' },
	{ data: 'status', name: 'status', width: '25%' },
	{ data: 'database_file', name: 'database_file', width: '25%' },
	{ data: 'user', name: 'user', width: '25%' }
];
var DS_DB_HISTORY = 'response.database-list.database';
var WS_BACKUP_DB = '/stic/services/CompanyInfoServices/backUpDatabase?response=application/json&id=1&';
var WS_RESTORE_DB = '/stic/services/CompanyInfoServices/restoreDatabase?response=application/json&';
var WS_BACKUP_DB_HISTORY = '/stic/services/CompanyInfoServices/getAllDatabaseHistoryByTypeDateList?response=application/json&type=BACKUP&';
var WS_RESTORE_DB_HISTORY = '/stic/services/CompanyInfoServices/getAllDatabaseHistoryByTypeDateList?response=application/json&type=RESTORE&';

// Unique Checking
var WS_UNIQUE_CHECK = [];
WS_UNIQUE_CHECK['supp_code'] = '/stic/services/SuppliersInfoServices/getSuppliersByCodeList?response=application/json&';
WS_UNIQUE_CHECK['cat_code'] = '/stic/services/CategoriesInfoService/getCategoriesByCodeList?response=application/json&';
WS_UNIQUE_CHECK['prod_code'] = '/stic/services/ProductsInfoServices/getProductsByCodeList?response=application/json&';
WS_UNIQUE_CHECK['cust_code'] = '/stic/services/CustomerInfoServices/getCustomersByCodeList?response=application/json&';
WS_UNIQUE_CHECK['truck_code'] = '/stic/services/TrucksInfoServices/getTrucksByCodeList?response=application/json&';
WS_UNIQUE_CHECK['role_name'] = '/stic/services/RolesInfoServices/getAllRolesByRoleNameList?response=application/json&';
WS_UNIQUE_CHECK['user_name'] = '/stic/services/UserInfoServices/getUserByNameList?response=application/json&';

// Report Filter
var REPORT_FILTER = {
	supp_name: {
		df: 'supp_name',
		inputLabel: 'Supplier Name',
		ws: WS_SUPPLIER_LIST,
		ds: 'suppliers-list'
	},
	cat_name: {
		df: 'cat_name',
		inputLabel: 'Category Name',
		ws: WS_CATEGORY_LIST,
		ds: 'categories-list'
	},
	prod_name: {
		df: 'prod_name',
		inputLabel: 'Product Name',
		ws: WS_PRODUCT_LIST,
		ds: 'products-list'
	},
	cust_name: {
		df: 'cust_name',
		inputLabel: 'Customer Name',
		ws: WS_CUSTOMER_LIST,
		ds: 'customers-list'
	},
	dest_zipcode: {
		df: 'dest_zipcode',
		inputLabel: 'Zip Code',
		ws: WS_DESTINATION_LIST,
		ds: 'destinations-list'
	},
	dest_name: {
		df: 'dest_name',
		inputLabel: 'District Name',
		ws: WS_DESTINATION_LIST,
		ds: 'destinations-list'
	},
	dest_location: {
		df: 'dest_location',
		inputLabel: 'Municipality Name',
		ws: WS_DESTINATION_LIST,
		ds: 'destinations-list'
	},
	docket_no: {
		df: 'docket_no',
		inputLabel: 'Docket No.',
		inputText: 'Enter Docket No.'
	},
	truck_code: {
		df: 'truck_code',
		inputLabel: 'Truck Code',
		ws: WS_TRUCK_LIST,
		ds: 'trucks-list'
	},
	user_name: {
		df: 'user_name',
		inputLabel: 'User Name',
		ws: WS_USER_LIST,
		ds: 'users-list'
	}
};

// Button Title Attribute
var BTN_TITLE_NEW_RECORD = 'New Data';
var BTN_TITLE_EDIT_RECORD = 'Edit Data';
var BTN_TITLE_DELETE_RECORD = 'Delete Data';
var BTN_TITLE_REFRESH_RECORD = 'Refresh Data Table';
var BTN_TITLE_COPY = 'Copy Data to Clipboard';
var BTN_TITLE_EXPORT_CSV = 'Export Data to CSV File';
var BTN_TITLE_EXPORT_EXCEL = 'Export Data to Excel File';
var BTN_TITLE_EXPORT_PDF = 'Export Data to PDF File';
var BTN_TITLE_PRINT_RECORD = 'Print Data';
var BTN_TITLE_CHANGE_PASS = 'Change User Password';
var BTN_TITLE_BACKUP_DB = 'Backup Database';
var BTN_TITLE_RESTORE_DB = 'Restore Database';
var BTN_TITLE_FILTER_REPORT = 'Filter Report';

// Button Labels
var BTN_LABEL_NEW_RECORD = '<i class="fa fa-plus"></i>';
var BTN_LABEL_EDIT_RECORD = '<i class="fa fa-pencil"></i>';
var BTN_LABEL_DELETE_RECORD = '<i class="fa fa-trash-o"></i>';
var BTN_LABEL_REFRESH_RECORD = '<i class="fa fa-refresh"></i>';
var BTN_LABEL_ADD_ITEM = '<i class="fa fa-plus-circle"></i>';
var BTN_LABEL_REMOVE_ITEM = '<i class="fa fa-minus-circle"></i>';
var BTN_LABEL_COPY = '<i class="fa fa-clone"></i>';
var BTN_LABEL_EXPORT_CSV = '<i class="fa fa-file-text-o"></i>';
var BTN_LABEL_EXPORT_EXCEL = '<i class="fa fa-file-excel-o"></i>';
var BTN_LABEL_EXPORT_PDF = '<i class="fa fa-file-pdf-o"></i>';
var BTN_LABEL_PRINT_RECORD = '<i class="glyphicon glyphicon-print"></i>';
var BTN_LABEL_CONFIRM_UPDATE = '<i class="fa fa-pencil"></i> Confirm Update';
var BTN_LABEL_CONFIRM_DELETE = '<i class="fa fa-trash-o"></i> Confirm Delete';
var BTN_LABEL_CONFIRM_SAVE = '<i class="fa fa-floppy-o"></i> Confirm Save';
var BTN_LABEL_CONFIRM_LOGOUT = '<i class="fa fa-sign-out"></i> Confirm Logout';
var BTN_LABEL_CONFIRM_FW = '<i class="fa fa-tag"></i> Confirm First Weighing';
var BTN_LABEL_CONFIRM_SW = '<i class="fa fa-tags"></i> Confirm Second Weighing';
var BTN_LABEL_CONFIRM_BACKUP = '<i class="fa fa-floppy-o"></i> Confirm Backup';
var BTN_LABEL_CONFIRM_RESTORE = '<i class="fa fa-undo"></i> Confirm Restore';
var BTN_LABEL_CONFIRM_CAL_ZERO = '<i class="fa fa-undo"></i> Confirm Zero';
var BTN_LABEL_CANCEL = '<i class="fa fa-ban"></i> Cancel';
var BTN_LABEL_CHANGE_PASS = '<i class="fa fa-key"></i>';
var BTN_LABEL_BACKUP_DB = '<i class="fa fa-floppy-o"></i>';
var BTN_LABEL_RESTORE_DB = '<i class="fa fa-undo"></i>';
var BTN_LABEL_FILTER_REPORT = '<i class="fa fa-filter"></i>';

// Form Validation Messages
var MSG_FV_NOTEMPTY = 'This field is required and should not be empty.';
var MSG_FV_SPECIAL_CHARS = 'Special and non alphanumeric characters are not allowed.';
var MSG_FV_INTEGER = 'An integer value is required for this field. (e.g. 1999)';
var MSG_FV_FLOAT = 'The correct numeric formats are ".99", "1999.99", "1999.9" or "1999".';

// Weigh Scale
var MSG_TRUCK_DATA_EMPTY = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Please create a new Truck Data or select an existing Truck Data from the Truck Data Lookup to continue.</div>';
var MSG_CUSTOMER_DATA_EMPTY = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Please create a new Customer Data or select an existing Customer Data from the Customer Data Lookup to continue.</div>';
var MSG_CATEGORY_DATA_EMPTY = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Please create a new Category Data or select an existing Category Data from the Category Data Lookup to continue.</div>';
var MSG_CONFIRM_FIRST_WEIGHING = '<div class="alert alert-info" role="alert" style="margin-bottom: 5px;"><i class="fa fa-question-circle fa-3x fa-pull-left"></i> Please make sure all details provided for First Weighing are correct. Press Confirm First Weighing to continue.</div>';
var MSG_CONFIRM_SECOND_WEIGHING = '<div class="alert alert-info" role="alert" style="margin-bottom: 5px;"><i class="fa fa-question-circle fa-3x fa-pull-left"></i> Please make sure all details provided for Second Weighing are correct. Press Confirm Second Weighing to continue.</div>';
var MSG_FIRST_WEIGHING_SUCCESS = '<div class="alert alert-success" role="alert" style="margin-bottom: 5px;"><i class="fa fa-check-circle fa-3x fa-pull-left"></i>First Weighing is successful. The details you submitted were successfully encoded in the system.</div>';
var MSG_SECOND_WEIGHING_SUCCESS = '<div class="alert alert-success" role="alert" style="margin-bottom: 5px;"><i class="fa fa-check-circle fa-3x fa-pull-left"></i>Second Weighing is successful. The details you submitted were successfully encoded in the system.</div>';
var MSG_WEIGHING_FORM_ERROR = '<div class="alert alert-danger" role="alert" style="margin-bottom: 5px;"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The details you provided were not submitted. Change the value of the field(s) that contains errors and try again.</div>';

// Message Title
var MSG_TITLE_INFO = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_ADD_REC = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_EDIT_REC = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_DEL_REC = '<i class="fa fa-info-circle"></i> Information';

// CRUD
var MSG_INFO_ADD_REC = '<div class="alert alert-success all-middle no-margin-bottom" role="alert"><i class="fa fa-check-circle fa-2x"></i> The new record was created successfully in the system.</div>';
var MSG_INFO_EDIT_REC = '<div class="alert alert-success all-middle no-margin-bottom" role="alert"><i class="fa fa-check-circle fa-2x"></i> The selected record was updated successfully in the system.</div>';
var MSG_INFO_DEL_REC = '<div class="alert alert-success all-middle no-margin-bottom" role="alert"><i class="fa fa-check-circle fa-2x"></i> The selected record was deleted successfully from the system.</div>';
var MSG_INFO_LOGOUT_AFTER_CPASS = '<div class="alert alert-success no-margin-bottom" role="alert"><i class="fa fa-check-circle fa-3x fa-pull-left"></i>You have successfully updated your password. Please take note that you will be logged out of the system after this.</div>'
var MSG_INFO_WS_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Your request was not successful because there was an error in the Web Service response. If issue still persists, please contact your System Administrator.</div>';
var MSG_INFO_SAVE_CONFIG = '<div class="alert alert-success all-middle no-margin-bottom" role="alert"><i class="fa fa-check-circle fa-3x"></i>The system\'s configuration settings were updated successfully.</div>';
var MSG_INFO_ISR_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> An error occured while connecting to the platform scale. Please check if the connection to the platform scale is configured properly. Press F5 or reload the page to try again.</div>';
var MSG_INFO_CAT_DEL_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> You are not allowed to delete this Category because there are Products currently tagged to this record. Untag all Products first from this Category then try again.</div>';

// Role Access
var MSG_INFO_ROLE_INVALID = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Your current role privileges does not allow you to perform this action. Please contact your System Administrator for more information.</div>';
var MSG_INFO_NO_MODULES_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> There are no modules currently assigned to your account. Please contact your System Administrator for more information.</div>';
var MSG_INFO_ROLE_ACCESS_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Your current role privileges does not allow you to access this page. Please contact your System Administrator for more information.</div>';

// Users
var MSG_INFO_DEFAULT_USER_EDIT = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The user that you are about to edit is a system default user. You are not allowed to perform this action.</div>';
var MSG_INFO_DEFAULT_USER_DELETE = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The user that you are about to delete is a system default user. You are not allowed to perform this action.</div>';

var MSG_INFO_BACKUP_DB_OK = '<div class="alert alert-info no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The STIC database was backed up successfully. Please refer to the backup history table for more information.</div>';
var MSG_INFO_BACKUP_DB_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Unable to back up the STIC database. Please refer to the backup history table for more information.</div>';
var MSG_INFO_RESTORE_DB_OK = '<div class="alert alert-info no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The STIC database was restored successfully. Please refer to the restore history table for more information.</div>';
var MSG_INFO_RESTORE_DB_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Unable to restore the STIC database. Please refer to the restore history table for more information.</div>';

var MSG_INFO_CALIBRATE_ZERO_OK = '<div class="alert alert-info no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-2x fa-pull-left"></i> The platform scale has been successfully calibrated to zero value.</div>';
var MSG_INFO_CALIBRATE_ZERO_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> An error occurred while calibrating the platform scale to zero value. Please try again.</div>';

var MSG_INFO_CALIBRATE_SPAN_OK = '<div class="alert alert-info no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The platform scale has been successfully calibrated to the weight value of the current makeweight.</div>';
var MSG_INFO_CALIBRATE_SPAN_ERROR = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> An error occurred while calibrating the platform scale to the weight value of the current makeweight. Please try again.</div>';

// License Activation
var MSG_INFO_SYSTEM_INACTIVE = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The system has been deactivated because your current license is expired. Please enter a new license key in the activation page to be able to use the system.</div>';
var MSG_INFO_INVALID_HD = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The system has been deactivated because the current hard disk specifications are invalid. Please contact ScaleTech for more information on this error.</div>';
var MSG_INFO_INVALID_FILE_FORMAT = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Please select a valid license file in this format (e.g. "companyname-yyyymmddhhmmss.lcns") and try again.</div>';
var MSG_INFO_INVALID_LICENSE_FILE = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The license file you have uploaded is invalid. Please select a valid license file to start the system activation process.</div>';
var MSG_INFO_INVALID_LICENSE_KEY = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The license key you have provided is invalid, expired or might be already in use. Please contact ScaleTech for more information on this error.</div>';
var MSG_INFO_LICENSE_NORMAL = '<div class="alert alert-success no-margin-bottom" role="alert"><i class="fa fa-check-circle fa-3x fa-pull-left"></i> No worries! Your current license status is normal. You still have $P{daysLeft} days left before your current license expires.</div>';
var MSG_INFO_LICENSE_WARNING = '<div class="alert alert-warning no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> You only have $P{daysLeft} days left before your current license expires. To ensure uninterrupted service and support, please contact ScaleTech and request a new license key.</div>';
var MSG_INFO_LICENSE_DANGER = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> You only have $P{daysLeft} days left before your current license expires. To ensure uninterrupted service and support, please contact ScaleTech and request a new license key.</div>';
var MSG_INFO_LICENSE_EMPTY = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> Please make sure that you have entered valid values for PC Number and License Key fields.</div>';
var MSG_INFO_LICENSE_ACTIVE = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The license key you have provided is already activated and currently in use. Please contact ScaleTech for more information on this error.</div>';
var MSG_INFO_LICENSE_EXPIRED = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The license key you have provided is already expired. Please contact ScaleTech for more information on this error.</div>';
var MSG_INFO_LICENSE_INVALID = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The license key you have provided is invalid and does not exist in the system. Please contact ScaleTech for more information on this error.</div>';

var MSG_INFO_INVALID_USER = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x fa-pull-left"></i> The system has detected that you are using an invalid account! Please contact the System Administrator if you want to access the system.';

var MSG_INFO_INVALID_SESSION = '<div class="alert alert-danger all-middle no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-3x"></i>Your current session has expired. Please Login to continue using the system.';

// Confirm Messages
var MSG_CONFIRM_LOGOUT = '<div class="alert alert-info no-margin-bottom" role="alert"><i class="fa fa-question-circle fa-3x fa-pull-left"></i> Your request will log you out of the system. Please make sure all changes are saved. Press Confirm Logout to continue.</div>';
var MSG_CONFIRM_DELETE_RECORD = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you are requesting will delete the selected record from the system. Please confirm if you want to perform this action. Press Confirm Delete to continue.</div>';
var MSG_CONFIRM_SAVE_CONFIG = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you are requesting will update the current system settings. Please confirm if you want to perform this action. Press Confirm Save to continue.</div>';
var MSG_CONFIRM_REMOVE_MODULES = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you are requesting will remove all modules from the selected role. Please confirm if you want to perform this action. Press Confirm Save to continue.</div>';
var MSG_CONFIRM_RESTORE_DB = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you are requesting will restore the database from a backup copy. Please confirm if you want to perform this action. Press Confirm Restore to continue.</div>';
var MSG_CONFIRM_BACKUP_DB = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you are requesting will create a backup copy of the database. Please confirm if you want to perform this action. Press Confirm Backup to continue.</div>';
var MSG_CONFIRM_CAL_ZERO = '<div class="alert alert-danger no-margin-bottom" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Please confirm there is no makeweight on the platform scale and assure the current weight value of the platform scale is zero. Press Confirm Zero to continue.</div>';

// Alert Messages
var MSG_ALERT_LOGIN_FORM_ERROR = '<div class="alert alert-danger" role="alert" style="text-align: left; margin-bottom: 20px;"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Your request was not submitted. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_ALERT_INVALID_OLD_PASS = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you requested were not submitted because you provided an invalid old password. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_ALERT_INVALID_LOGIN = '<div class="alert alert-danger" role="alert" style="text-align: left; margin-bottom: 20px;"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> You are not allowed to access the system. Please enter a valid Username and Password to continue.</div>';
var MSG_ALERT_FORM_ERROR = '<div class="alert alert-danger all-middle" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you requested were not submitted because of the following errors. Change the value of the field(s) that contains errors and try again.</div>';
var MSG_ALERT_DUPLICATE_REC = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> The changes you requested were not submitted because they would create duplicate data in the system. Change the value of the field(s) that contains duplicate data and try again.</div>';
var MSG_ALERT_WS_ERROR = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle fa-4x fa-pull-left"></i> Your request was not successful because there was an error in the Web Service response. If issue still persists, please contact your System Administrator.</div>';