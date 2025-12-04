//to get particular element
var response = '{"id":100,"name":"Ravi"}';
var body = JSON.parse(response).id;
gs.info(body);

//to print the nested element
 var response = '{"products":[{"name":"Laptop","price":45000},{"name":"Mouse","price":500}]}';
 var jsonObj = JSON.parse(response);
 for(var i = 0;i<jsonObj.products.length;i++){
	gs.info(jsonObj.products[i].price);
 }

 //for getting highest total
 var body = '{"students":[{"name":"Likhitha","marks":88},{"name":"Deepika","marks":92},{"name":"Nithya","marks":85}]}';
var objData = JSON.parse(body);
var max = 0;
var name= "";
for(i = 0;i<objData.students.length;i++){
	if(max<objData.students[i].marks){
		max = objData.students[i].marks;
		name = objData.students[i].name;
	}
	
}
gs.info(name);