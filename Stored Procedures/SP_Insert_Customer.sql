

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_customer`(IN firstName varchar(45), IN lastName varchar(45), IN email varchar(50),IN storeId tinyint, 
IN address varchar(50), IN district varchar(20),IN city_id smallint, IN postalCode varchar(10), IN phone varchar(20), OUT newAddressId smallint,OUT newCustomerId smallint)
BEGIN
	-- insert new address
     INSERT INTO address( address,district,city_id,postal_code,phone,location,last_update) values
	(address,district,city_id,postalCode,phone,POINT(0,0),NOW());
    
    -- get last inserted address
     select MAX(address_id) as newAddressId INTO newAddressId from address;
     
     INSERT INTO customer (store_id,first_name,last_name,email,address_id,active,create_date,last_update) values 
     (storeId,firstName,lastName,email,newAddressId,true,now(),now());
     
     -- get last inserted address
     select MAX(customer_id) as newCustomerId INTO newCustomerId from customer;
     
     SELECT * from customer where customer.customer_id = newCustomerId;
		
END$$
DELIMITER ;
