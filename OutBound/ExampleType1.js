// Create RESTMessageV2 object for your message and method
var r = new sn_ws.RESTMessageV2('Chuck Norris Jokes', 'Get Joke');

// Send the request and get the response
var response = r.execute();
var responseBody = response.getBody();
gs.info("Full response: " + responseBody);

// Parse the returned JSON
var responseObj = JSON.parse(responseBody);
gs.info("Random Chuck Norris joke: " + responseObj.value);


// second Methodd get method
var restMessage  = new sn_ws.RESTMessageV2();     // Create a new REST API request
restMessage.setHttpMethod('get');                 // Set method to GET (to fetch data)
restMessage.setEndpoint('https://api.chucknorris.io/jokes/random'); // Set the API URL
var response = restMessage.execute();             // Send the request and get the response
var responsebody = response.getBody();            // Get the data returned by the API
var statuscode = response.getStatusCode();        // Get the status code (like 200)
gs.info("Status code " + statuscode + " responseBody " + responsebody); // Print output in logs



// Post method

var restmessage  = new sn_ws.RESTMessageV2();
restmessage.setHttpMethod('post');
restmessage.setEndpoint('https://jsonplaceholder.typicode.com/posts');
restmessage.setRequestHeader('content-type','application/json');
var body = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };
restmessage.setRequestBody(JSON.stringify(body));

var response = restmessage.execute();
var responsebody = response.getBody();
gs.info(responsebody);


//delete method 

var r = new sn_ws.RESTMessageV2();
r.setHttpMethod('delete');
r.setEndpoint('https://jsonplaceholder.typicode.com/posts/2');
var response = r.execute();
var status= response.getStatusCode();
gs.info("succesfully deleted"+status);