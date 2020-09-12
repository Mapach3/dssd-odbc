DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `drop_customer`(IN customerEmail varchar(50))
BEGIN

	update customer set customer.active = 0
    where customer.email = customerEmail;
    
    select * from customer where customer.email = customerEmail;

END$$
DELIMITER ;



