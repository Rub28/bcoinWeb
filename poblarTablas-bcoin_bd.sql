use  bcoin_bd; 

insert into roles (rol_user, nombre_rol) values ('ADMIN',' Administrador del sismtema');  
insert into roles (rol_user, nombre_rol) values ('AGENTE','Agente con nivel medio de operacion');   
insert into roles (rol_user, nombre_rol) values ('CLIENTE',' Cliente usuario final, que solo puede ver la inversion relizada'); 
  
insert  into users(user_name, user_password, firt_name, second_name, phone_number,email, estatus, rol_user )   values 
				 ('rub','3ffadfdrub','hernandez','marquez', '5535225611','ruhernandezm.dev@mail.com', 'A', 'ADMIN');  

insert  into users(user_name, user_password, firt_name, second_name, phone_number,email, estatus, rol_user )   values 
				 ('clien','342AF3WRW','hernandez','marquez', '5535225621','ruhernandezm@mail.com', 'A', 'CLIENTE');  



 insert into clientes  (user_name, nom_cliente,rfc,direccion ) values ('rub', ' ruben pruebas', 'HEMR461105QVA', 'CONOCIDAD');  
 
 
 
 insert into movimientos (id_cliente, monto_entrada, fecha_entrada,valor_bcoin, precio_inicial, precio_final ) 
				   values (1, 5000,now(),0.048763974, 102534.71000000, 102534.71000000 );  
 
 insert into movimientos (id_cliente, monto_entrada, fecha_entrada,valor_bcoin, precio_inicial, precio_final ) 
				   values (1, 5000,now(),5000/102534.71000000, 102173.63, 102173.63 );  
                   
                   
-- select * from movimientos;   


-- select * from roles;  
 