show databases; 

-- CREATE DATABASE bcoin_bd;  

USE bcoin_bd;   
 
 DROP TABLE USERS; 
create table  users ( 
	id int auto_increment,  
    user_name varchar(10)  not null unique,  
    user_password varchar(256),  
    firt_name  varchar(100) not null, 
    second_name varchar(100) not null,  
    phone_number char(10) unique, 
    email	   varchar(50)  not null unique,  
    f_alta timestamp not null default now(),   
    estatus  char(1)  not null default 'A' , 
    rol_user  varchar(10)  not null, 
    id_cliente int,    
    primary  key  (id)
    );    
/* 
/* Tabla de Roles de usuario */  

-- drop table roles; 
create table roles (  
	id_rol int auto_increment, 
    rol_user varchar (10) not null, 
    nombre_rol varchar(80) not null,   
    primary key  (id_rol)
);    

-- drop table clientes; 
create table clientes ( 
	id int auto_increment,   
    nom_cliente varchar(50), 
    rfc  varchar(15),   
    direccion varchar(70),  
	estatus  char(1) default 'A',  
    email_cliente varchar(50),   -- se acota la longitud a 50 
    phone_number char(20), 		--  agerega este campo nuevo 
    id_agente int(11) DEFAULT NULL, 
    primary key (id) 
); 


 -- drop table movimientos 
create table movimientos  (
	id  int auto_increment,  
    id_cliente  int  not null, 
    num_hit  int not null, 
    monto_entrada  decimal(10,2) default 0,  
    fecha_entrada  date, 
    valor_bcoin decimal(24,16) default 0,   --  cuanto cuesta un bcoint en pesos,  pendiente sonsegir el precio. 
	precio_inicial decimal(24,16)  default 0,  
    precio_final  decimal(24,16)  default 0,   
    monto_salida decimal(10,2) default 0,   
    fecha_salida  date,  
    utilidad_perdida decimal(16,16)  default 0, 
	estatus  char(1)  not null default 'A',   
    num_round int,        --  obligartorio a multiples de 5000 (monto_entrada), ejem 10,000 = 2  
    notas varchar(255),   --  agregar en pantalla 
    id_agente int,        -- el usuario que registra la operacion usuario de log in. 
    primary key (id)
 ); 
 
 
 select * from users;  
	


