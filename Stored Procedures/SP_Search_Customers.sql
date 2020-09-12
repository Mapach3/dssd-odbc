DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_customers`(IN name varchar(45), IN surname varchar(45), IN city int)
BEGIN

    SELECT c.first_name, c.last_name, c.email, a.address, a.phone, ci.city
    FROM customer c, address a, city ci
    WHERE c.address_id=a.address_id
    AND a.city_id=ci.city_id
    AND (name IS NULL OR upper(c.first_name) like concat('%',name,'%'))
    AND (surname IS NULL OR upper(c.last_name) like concat('%',surname,'%'))
    AND (city IS NULL OR city = ci.city_id);
    
END$$
DELIMITER ;
