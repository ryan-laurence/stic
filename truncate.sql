-- Audit Trail
TRUNCATE TABLE `audit_trail`;


-- Category
TRUNCATE TABLE `categories`;


-- Company
TRUNCATE TABLE `company`;

/*!40101 SET NAMES utf8 */;

INSERT INTO `company` (`id`, `company_name`, `company_address`, `contact_person`, `port_baudrate`, `bridge_code`, `current_docket_number`, `minimum_truck_weight`, `delay_time_second`, `weight_unit`, `zero_range`, `database_path`, `database_datetime`, `current_date`, `lincense_key`, `is_license`, `exp_date`) VALUES('1','Scaletech International Corporation','3050 F. Bautista St. Bo. Ugong, Valenzuela City','Juan Dela Cruz','COM1=2400','PL1','1','10','5000','kg','5','D:\\\\pom\\\\myProjects\\\\ScaleTech\\\\bkData\\\\','2016-04-04 11:04:05',NULL,NULL,'0','2016-04-05');


-- Customer Destinations
TRUNCATE TABLE `customer_destinations`;


-- Customer Products
TRUNCATE TABLE `customer_products`;


-- Customers
TRUNCATE TABLE `customers`;


-- Destinations
-- See separate destinations.sql 


-- Docket Config
TRUNCATE TABLE `docket_config`;

/*!40101 SET NAMES utf8 */;

INSERT INTO `docket_config` (`dc_id`, `dc_param`, `dc_value`) VALUES('1','docket-width','1500');
INSERT INTO `docket_config` (`dc_id`, `dc_param`, `dc_value`) VALUES('2','docket-length','3500');
INSERT INTO `docket_config` (`dc_id`, `dc_param`, `dc_value`) VALUES('3','font-size','10');
INSERT INTO `docket_config` (`dc_id`, `dc_param`, `dc_value`) VALUES('4','font-case','uppercase');
INSERT INTO `docket_config` (`dc_id`, `dc_param`, `dc_value`) VALUES('5','font-underline','false');


-- Docket Fields
-- TRUNCATE TABLE `docket_fields`;

-- Docket Print Log
TRUNCATE TABLE `docket_print_log`;


-- Docket Template
-- TRUNCATE TABLE `docket_template`;


-- Docket Template Print
TRUNCATE TABLE `docket_template_print`;


-- Modules
TRUNCATE TABLE `modules`;

/*!40101 SET NAMES utf8 */;

insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('1','weight-scale','Weighing',NULL,'1','link','fa fa-balance-scale','1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('2','truck-in','Truck In',NULL,'2','link','fa fa-truck','1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('3',NULL,'Edit Data',NULL,'3','group','fa fa-pencil-square-o','1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('4','data-supplier','Supplier Data','3','4','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('5','data-category','Category Data','3','5','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('6','data-product','Product Data','3','6','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('7','data-customer','Customer Data','3','7','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('8','data-truck','Truck Data','3','8','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('9',NULL,'Summary',NULL,'9','group','fa fa-table','1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('10','summary-supplier','Supplier Summary','9','10','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('11','summary-customer','Customer Summary','9','11','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('12','summary-destination','Destination Summary','9','12','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('13','summary-product','Product Summary','9','13','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('14','summary-reprint-count','Reprint Count','9','14','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('15','summary-truck','Truck Summary','9','15','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('16','summary-detailed-truck','Detailed Truck Summary','9','16','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('17','summary-custom','Custom Summary','9','17','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('18','summary-event-log','Event Log ','9','18','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('19','docket-template-main','Docket',NULL,'19','link','fa fa-file-text-o','1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('20',NULL,'Others',NULL,'20','group','fa fa-cog','1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('21','others-select-com','Select Com','20','21','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('22','others-system-config','System Config','20','22','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('23','others-system-access','System Access','20','23','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('24','others-calibration','Calibration','20','24','link',NULL,'1');
insert into `modules` (`mod_id`, `mod_name`, `mod_label`, `mod_parent`, `mod_index`, `mod_type`, `mod_icon`, `status`) values('25','others-database','Database','20','25','link',NULL,'1');


-- Printer Configuration
TRUNCATE TABLE `printer_configuration`;

/*!40101 SET NAMES utf8 */;

insert into `printer_configuration` (`printer_id`, `printer_name`, `id`, `first_docket_type`, `second_docket_type`, `is_print_first_docket`, `is_print_second_docket`) values('1','CANON PX-234','1','A1','A2','1','1');


-- Product Categories
TRUNCATE TABLE `product_categories`;


-- Products
TRUNCATE TABLE `products`;


-- Role Modules
TRUNCATE TABLE `role_modules`;

/*!40101 SET NAMES utf8 */;

insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('1','1','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('2','2','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('3','3','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('4','4','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('5','5','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('6','6','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('7','7','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('8','8','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('9','9','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('10','10','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('11','11','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('12','12','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('13','13','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('14','14','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('15','15','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('16','16','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('17','17','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('18','18','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('19','19','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('20','20','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('21','21','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('22','22','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('23','23','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('24','24','1','1');
insert into `role_modules` (`ra_id`, `mod_id`, `role_id`, `status`) values('25','25','1','1');


-- Roles
TRUNCATE TABLE `roles`;

/*!40101 SET NAMES utf8 */;

insert into `roles` (`role_id`, `role_name`, `status`) values('1','Super User','1');
insert into `roles` (`role_id`, `role_name`, `status`) values('2','Manager','1');
insert into `roles` (`role_id`, `role_name`, `status`) values('3','User','1');
insert into `roles` (`role_id`, `role_name`, `status`) values('4','Vendor','1');


-- Suppliers
TRUNCATE TABLE `suppliers`;


-- Trucks
TRUNCATE TABLE `trucks`;


-- User Roles
TRUNCATE TABLE `user_roles`;

/*!40101 SET NAMES utf8 */;

insert into `user_roles` (`ur_id`, `user_id`, `role_id`, `status`) values('1','1','1','1');
insert into `user_roles` (`ur_id`, `user_id`, `role_id`, `status`) values('2','2','2','1');
insert into `user_roles` (`ur_id`, `user_id`, `role_id`, `status`) values('3','3','3','1');
insert into `user_roles` (`ur_id`, `user_id`, `role_id`, `status`) values('4','4','4','1');


-- Users
TRUNCATE TABLE `users`;

/*!40101 SET NAMES utf8 */;

insert into `users` (`user_id`, `user_name`, `user_password`, `status`) values('1','admin','DZre74KxZ0M=','1');
insert into `users` (`user_id`, `user_name`, `user_password`, `status`) values('2','company','eU6ZcrT+nYw=','1');
insert into `users` (`user_id`, `user_name`, `user_password`, `status`) values('3','weigher','xyAcwQYoBOY=','1');
insert into `users` (`user_id`, `user_name`, `user_password`, `status`) values('4','stic','KDZCbjuO5Nk=','1');


-- Weight Readings
TRUNCATE TABLE `weight_readings`;
