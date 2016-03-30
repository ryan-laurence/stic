// Default Constants
var CONSOLE_LOG = true;
var DEFAULT_ROOT = '/forms/';
var DEFAULT_PAGE_LOC = 'pages/';
var DEFAULT_PAGE_FILE_EXT = '.html';
var DEFAULT_WRAPPER_ID = '#main-wrapper';
var DEFAULT_DS_REPORTS = 'response.report-list.report';
var DEFAULT_DATASOURCE = 'response.record-list.record';

// Supplier Data
var CD_SUPPLIER_LIST = [
	{ "data": "supp_id", "visible": false },
	{ "data": "supp_code" },
	{ "data": "supp_name" }
];
var DS_SUPPLIER_LIST = 'response.suppliers-list.supplier';
var WS_SUPPLIER_INSERT = '/scaletech/services/SuppliersInfoServices/addSuppliers';
var WS_SUPPLIER_UPDATE = '/scaletech/services/SuppliersInfoServices/updateSuppliers';
var WS_SUPPLIER_DELETE = '/scaletech/services/SuppliersInfoServices/updateSuppliersByIsDeleted?isDeleted=0&';
var WS_SUPPLIER_LIST = '/scaletech/services/SuppliersInfoServices/getAllSuppliersList?response=application/json';

// Category Data
var CD_CATEGORY_LIST = [
	{ "data": "cat_id", "visible": false },
	{ "data": "cat_code" },
	{ "data": "cat_name" }
];
var DS_CATEGORY_LIST = 'response.categories-list.cateory';
var WS_CATEGORY_INSERT = '/scaletech/services/CategoriesInfoService/addCategories';
var WS_CATEGORY_UPDATE = '/scaletech/services/CategoriesInfoService/updateCategories';
var WS_CATEGORY_DELETE = '/scaletech/services/CategoriesInfoService/updateCategoriesByIsDeleted?isDeleted=0&';
var WS_CATEGORY_LIST = '/scaletech/services/CategoriesInfoService/getAllCategoriesList?response=application/json';

// Customer Data
var CD_CUSTOMER_LIST = [
	{ "data": "cust_id", "visible": false },
	{ "data": "cust_code" },
	{ "data": "cust_name" }
];
var DS_CUSTOMER_LIST = 'response.customers-list.customer';
var WS_CUSTOMER_INSERT = '/scaletech/services/CustomerInfoServices/addCustomers';
var WS_CUSTOMER_UPDATE = '/scaletech/services/CustomerInfoServices/updateCustomers';
var WS_CUSTOMER_DELETE = '/scaletech/services/CustomerInfoServices/updateCustomersByIsDeleted?isDeleted=0&';
var WS_CUSTOMER_LIST = '/scaletech/services/CustomerInfoServices/getAllCustomersList?response=application/json';

// Destination Data
var CD_DESTINATION_LIST = [
	{ "data": "dest_id", "visible": false },
	{ "data": "dest_zipcode" },
	{ "data": "dest_name" },
	{ "data": "dest_location"}
];
var DS_DESTINATION_LIST = 'response.destinations-list.destination';
var WS_DESTINATION_INSERT = '';
var WS_DESTINATION_UPDATE = '';
var WS_DESTINATION_DELETE = '';
var WS_DESTINATION_LIST = '/scaletech/services/DestinationsInfoServices/getAllDestinationsNotInCustDestList?response=application/json&cust_id=';

// Product Data
var CD_PRODUCT_LIST = [
	{ "data": "prod_id", "visible": false },
	{ "data": "prod_code" },
	{ "data": "prod_name" },
	{ "data": "unit_price" }
];
var DS_PRODUCT_LIST = 'response.products-list.product';
var WS_PRODUCT_INSERT = '/scaletech/services/ProductsInfoServices/addProducts';
var WS_PRODUCT_UPDATE = '/scaletech/services/ProductsInfoServices/updateProducts';
var WS_PRODUCT_DELETE = '/scaletech/services/ProductsInfoServices/updateProductsByIsDeleted?isDeleted=0&';
var WS_PRODUCT_LIST = '/scaletech/services/ProductsInfoServices/getAllProductsList?response=application/json';

// Customer Destination Data
var CD_CUSTDEST_LIST = [
	{ "data": "cd_id", "visible": false },
	{ "data": "cust_id", "visible": false },
	{ "data": "dest_id", "visible": false },
	{ "data": "dest_zipcode" },
	{ "data": "dest_name" },
	{ "data": "dest_location"}
];
var DS_CUSTDEST_LIST = 'response.custDest-list.customerDestination';
var WS_CUSTDEST_INSERT = '/scaletech/services/CustDestInfoServices/addCustDest';
var WS_CUSTDEST_UPDATE = '';
var WS_CUSTDEST_DELETE = '/scaletech/services/CustDestInfoServices/updateCustDestByIsDeleted?isDeleted=0&';
var WS_CUSTDEST_LIST = '/scaletech/services/CustDestInfoServices/getAllCustDestList?response=application/json';

// Customer Product Data
var CD_CUSTPROD_LIST = [
	{ "data": "cp_id", "visible": false },
	{ "data": "cust_id", "visible": false },
	{ "data": "prod_id", "visible": false },
	{ "data": "prod_code" },
	{ "data": "prod_name" },
	{ "data": "unit_price"}
];
var DS_CUSTPROD_LIST = 'response.custProducts-list.customerProduct';
var WS_CUSTPROD_INSERT = '/scaletech/services/CustProductsInfoServices/addCustProd';
var WS_CUSTPROD_UPDATE = '';
var WS_CUSTPROD_DELETE = '/scaletech/services/CustProductsInfoServices/updateCustProdByIsDeleted?isDeleted=0&';
var WS_CUSTPROD_LIST = '/scaletech/services/CustProductsInfoServices/getAllCustProdList?response=application/json';

// Truck Data
var CD_TRUCK_LIST = [
	{ "data": "truck_id", "visible": false },
	{ "data": "truck_code" }
];
var DS_TRUCK_LIST = 'response.trucks-list.truck';
var WS_TRUCK_INSERT = '/scaletech/services/TrucksInfoServices/addTrucks';
var WS_TRUCK_UPDATE = '/scaletech/services/TrucksInfoServices/updateTrucks';
var WS_TRUCK_DELETE = '/scaletech/services/TrucksInfoServices/updateTrucksByIsDeleted?isDeleted=0&';
var WS_TRUCK_LIST = '/scaletech/services/TrucksInfoServices/getAllTrucksList?response=application/json';

// User Data
var CD_USER_LIST = [
	{ "data": "user_id", "visible": false },
	{ "data": "user_name" }
];
var DS_USER_LIST = 'response.users-list.user';
var WS_USER_INSERT = '/scaletech/services/UserInfoServices/addUser';
var WS_USER_UPDATE = '/scaletech/services/UserInfoServices/updateUser';
var WS_USER_DELETE = '/scaletech/services/UserInfoServices/updateUserByIsDeleted';
var WS_USER_LIST = '/scaletech/services/UserInfoServices/getAllUserList?response=application/json';

// Event Log
var DS_AUDITTRAIL_LIST = 'response.audittrail-list.audittrail';
var WS_AUDITTRAIL_LIST = '/scaletech/services/AuditInfoService/getAuditTrailList?response=application/json';

// Weighing Screen
var CD_CHECK_TRUCK_CODE_LIST = [
	{ "data": "wr_id", "visible": false},
	{ "data": "truck_code" },
	{ "data": "date_in" },
	{ "data": "time_in" },
	{ "data": "weight_in_reading" },
	{ "data": "weight_unit" }
];
var WS_FIRST_WEIGHING_INSERT = '/scaletech/services/WeightReadingInfoServices/addWeightReadings';
var WS_SECOND_WEIGHING_UPDATE = '/scaletech/services/WeightReadingInfoServices/updateWeightReadings';
var WS_FIRST_WEIGHING_DELETE = '/scaletech/services/WeightReadingInfoServices/deleteWeighReadingById?';
var WS_CHECK_TRUCK_CODE_LIST = '/scaletech/services/WeightReadingInfoServices/checkTruckCodeList?response=application/json';

// Summary Reports
var CD_SUMMARY_SUPPLIER = [
	{ "data": "supp_name" },
	{ "data": "prod_name" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" }
];
var CD_SUMMARY_CUSTOMER = [
	{ "data": "cust_code" },
	{ "data": "cust_name" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" }
];
var CD_SUMMARY_DESTINATION = [	
	{ "data": "dest_name" },
	{ "data": "cust_name" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" }
];
var CD_SUMMARY_PRODUCT = [
	{ "data": "prod_name" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" }
];
var CD_SUMMARY_REPRINT_COUNT = [
	{ "data": "reprint_date" },
	{ "data": "docket_no" },
	{ "data": "reprint_count" },
	{ "data": "user_name" }
];
var CD_SUMMARY_TRUCK = [
	{ "data": "truck_code" },
	{ "data": "no_of_count" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" }
];
var CD_SUMMARY_DETAILED_TRUCK = [
	{ "data": "truck_code" },
	{ "data": "date_in" },
	{ "data": "time_in" },
	{ "data": "date_out" },
	{ "data": "time_out" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" },
	{ "data": "user_name" }
];
/*
var WS_SUMMARY_SUPPLIER = DEFAULT_ROOT + 'data/summary-supplier.json';
var WS_SUMMARY_CUSTOMER = DEFAULT_ROOT + 'data/summary-customer.json';
var WS_SUMMARY_DESTINATION = DEFAULT_ROOT + 'data/summary-destination.json';
var WS_SUMMARY_PRODUCT = DEFAULT_ROOT + 'data/summary-product.json';
var WS_SUMMARY_REPRINT_COUNT = DEFAULT_ROOT + 'data/summary-reprint-count.json';
var WS_SUMMARY_TRUCK = DEFAULT_ROOT + 'data/summary-truck.json';
var WS_SUMMARY_DETAILED_TRUCK = DEFAULT_ROOT + 'data/summary-detailed-truck.json';
*/
var WS_SUMMARY_SUPPLIER = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportBySupplierList?response=application/json';
var WS_SUMMARY_CUSTOMER = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByCustomerList?response=application/json';
var WS_SUMMARY_DESTINATION = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDestinationList?response=application/json';
var WS_SUMMARY_PRODUCT = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByProductList?response=application/json';
var WS_SUMMARY_REPRINT_COUNT = DEFAULT_ROOT + 'data/summary-reprint-count.json';
var WS_SUMMARY_TRUCK = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByTruckList?response=application/json';
var WS_SUMMARY_DETAILED_TRUCK = '/scaletech/services/WeighingReadingSummInfoServices/getAllWeightReadingsSummReportByDetailedTruckList?response=application/json';

// Docket Styles
var PG_DOCKET_STYLES_FORM = 'pages/docket-template-style-form.html',
	DS_DOCKET_STYLES = 'response.docketTemplate-list.docketTemplate',
	WS_INSERT_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/addDocketTemplate',
	WS_UPDATE_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/updateDocketTemplate',
	WS_DELETE_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/deleteDocketTemplate',
	WS_LIST_DOCKET_STYLES = '/scaletech/services/DocketTemplateInfoService/getAllDocketTemplateByTypeList?response=application/json';

// Docket Fields
var WS_LIST_DOCKET_FIELDS = '/scaletech/services/DocketFieldsInfoServices/getAllDocketFieldsByAvailableList?response=application/json';

// System Config
var WS_LIST_CONFIG_COMPANY = '/scaletech/services/CompanyInfoServices/getAllCompanyList?response=application/json&id=1';
var WS_LIST_CONFIG_DOCKET = '/scaletech/services/PrinterConfigurationInfoServices/getAllPrintersList?response=application/json&printerId=1';
var WS_UPDATE_CONFIG_COMPANY = '/scaletech/services/CompanyInfoServices/updateCompany';
var WS_UPDATE_CONFIG_DOCKET = '/scaletech/services/PrinterConfigurationInfoServices/updatePrinter';

// Summary Custom
var CD_SUMMARY_CUSTOM_DOCKET = [
	{ "data": "docket_no" },
	{ "data": "prod_name" },
	{ "data": "cust_name" },
	{ "data": "truck_code" },
	{ "data": "user_name" },
	{ "data": "weight_in_reading" },
	{ "data": "weight_out_reading" },
	{ "data": "net_weight" },
	{ "data": "weight_unit" },
	{ "data": "compensation" }
];
var WS_SUMMARY_CUSTOM_DOCKET = DEFAULT_ROOT + 'data/summary-custom.json';

// Report Titles
var REPORT_TITLE_SUPPLIER = 'Supplier Summary'
	REPORT_TITLE_CUSTOMER = 'Customer Summary',
	REPORT_TITLE_DESTINATION = 'Destination Summary',
	REPORT_TITLE_PRODUCT = 'Product Summary',
	REPORT_TITLE_TRUCK = 'Truck Summary',
	REPORT_TITLE_REPRINT_COUNT = 'Reprint Count Summary',
	REPORT_TITLE_DETAILED_TRUCK = 'Detailed Truck Summary';


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
var MSG_FIRST_WEIGHING_CONFIRM = 'Add this truck code for Second Weighing?';
var MSG_SEARCH_PRODUCT_ERROR_1 = 'Please select a Customer Code to continue.';
var MSG_SEARCH_DESTINATION_ERROR_1 = 'Please select a Customer Code to continue.';
var MSG_SEARCH_CUSTOMER_ERROR_1 = 'Please enter or select a Truck Code to continue.';

var MSG_INFO_TITLE = '<i class="fa fa-info-circle"></i> Information';
var MSG_TITLE_CONFIRM_SAVE = '<i class="fa fa-question-circle"></i> Confirm Update';
var MSG_CONFIRM_SAVE_COM_PORT = 'This will update the current Communication Port settings. Press OK to continue.';
var MSG_CONFIRM_SAVE_CONFIG_WEIGHIN = 'This will update the current Weigh In settings. Press OK to continue.';
var MSG_CONFIRM_SAVE_CONFIG_COMPANY = 'This will update the current Company Details settings. Press OK to continue.';
var MSG_CONFIRM_SAVE_CONFIG_DOCKET = 'This will update the current Docket settings. Press OK to continue.';
