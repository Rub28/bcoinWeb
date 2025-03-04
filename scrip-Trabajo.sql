use bcoin_bd; 

select * from  clientes;  

SELECT * FROM USERS;  

select * from movimientos;  fecha_salida

 update movimientos set valor_bcoin =  2005369 
  -- set num_round =  monto_entrada / 5000 
 -- precio_inicial =160295.75, precio_final = 1971741.83, valor_bcoin = 0.000006238468581 
 -- utilidad_perdida = ( (monto_entrada / precio_inicial) - ( monto_entrada / precio_final ) ) * 20 
  where id = 1; 
0.00000624
--
 update users  set rol_user = 'CLIENTE'  
 where user_name  = 'Richar';   


SELECT * FROM  USERS; 

select * from clientes; 

select * from movimientos; 


  SELECT M.id, c.id as Id_cliente, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente
    FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id 
        WHERE M.estatus = 'A' AND C.id = 1 