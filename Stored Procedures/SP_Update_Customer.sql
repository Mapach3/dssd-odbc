DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_customer`(IN firstName varchar(45), IN lastName varchar(45), IN email varchar(50),IN storeId tinyint, IN address varchar(50), IN district varchar(20), 
								 IN city_id smallint, IN postalCode varchar(10), IN phone varchar(20), IN addressId int, IN customerId int)
BEGIN
	update address set
    address=address,
    district=district,
    city_id=city_id,
    postal_code=postalCode,
    phone=phone,
    last_update=now()
    where address.address_id = addressId;
    
    update customer set
    customer.store_id=storeId,
    first_name=firstName,
    last_name=LastName,
    email=email,
    last_update=now()
    where customer.customer_id=customerId;
    
    select customer_id, first_name,last_name,email from customer 
    where customer_id = customerId;
END$$
DELIMITER ;
