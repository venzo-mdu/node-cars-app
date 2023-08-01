**#Api Documentation**
**************************

1.public Login url = https://cars2-node-app.onrender.com/api/users/login,
	    	   request type : [POST],
	           request body : {"email":"","password":""}

2.public Register url = https://cars2-node-app.onrender.com/api/users/register,
	       	      request type : [POST],
	       	      request body : {"username":"","email":"","password":""}

3.private current user =  https://cars2-node-app.onrender.com/users/current
			request type : [GET]

4.public Users List =  https://cars2-node-app.onrender.com/api/users/usersList,
	      	     request type : [GET]

5.public Cars list = https://cars2-node-app.onrender.com/api/cars/getAll,
	    	   request type : [GET]
	       
6.private Add my Car = https://cars2-node-app.onrender.com/api/cars/,
	   	   request type : [POST],
	   	   request body : {"carname":"","model":"","year":"",price:"","base64Image":"", "carnumber":"",
			"enginecapacity":"","tyre": "","fuel": "","kilometer": "","powersteering": "","noofowners": ""}

7.private Get my Car = https://cars2-node-app.onrender.com/api/cars/,
	              request type : [GET],
		  	   
8.private update my  Car = https://cars2-node-app.onrender.com/api/cars/:id,
	             request type : [PUT],
 		     request params: id(car)

9.private delete my Car = https://cars2-node-app.onrender.com/api/cars/:id,
	     	     request type : [DELETE],
		     request params: id(car)

10.private Get one Car = https://cars2-node-app.onrender.com/api/cars/:id,
	              request type : [GET],
		      request params: id(car)
	   
11.private book car = https://cars2-node-app.onrender.com/api/book/:id,
		   request type:[POST],
	           request params:id(car)

12.private get book car = https://cars2-node-app.onrender.com/api/book/:id,
		   request type:[GET],
	           request params:id(user)

13.private delete booked car = https://cars2-node-app.onrender.com/api/book/:id,
		   	    request type:[DELETE],
	           	    request params:id(book_id)
14.private check the bookings of car you posted - https://cars2-node-app.onrender.com/api/book/check/:id,
                    request type:[GET],
                    request params:id(car_id)