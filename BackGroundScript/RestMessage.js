// to keep the data in sd and d
var restMessage = new sn_ws.RESTMessageV2();
restMessage.setEndpoint('https://api.restful-api.dev/objects');
restMessage.setHttpMethod('get');
var response = restMessage.execute();
var responseBody = response.getBody();
//gs.info(responseBody);
var jsonObj = JSON.parse(responseBody);
var obj = jsonObj[0];
var gr = new GlideRecord('incident');
gr.initialize();
gr.short_description = obj.data.color;
gr.description = obj.data.capacity;
gr.insert();
gs.info("created succufully");

// to insert the data into sd and d

var body = [{
    "id": "0001",
    "type": "donut",
    "name": "Cake",
    "ppu": 0.55,
    "batters": {
        "batter": [{
                "id": "1001",
                "type": "Regular"
            },
            {
                "id": "1002",
                "type": "Chocolate"
            },
            {
                "id": "1003",
                "type": "Blueberry"
            },
            {
                "id": "1004",
                "type": "Devil's Food"
            }
        ]
    },
    "topping": [{
            "id": "5001",
            "type": "None"
        },
        {
            "id": "5002",
            "type": "Glazed"
        },
        {
            "id": "5005",
            "type": "Sugar"
        },
        {
            "id": "5007",
            "type": "Powdered Sugar"
        },
        {
            "id": "5006",
            "type": "Chocolate with Sprinkles"
        },
        {
            "id": "5003",
            "type": "Chocolate"
        },
        {
            "id": "5004",
            "type": "Maple"
        }
    ]
}];

var obj = body[0];
var gr = new GlideRecord('incident');
gr.initialize();
gr.short_description = obj.batters.batter[0].id;
gr.description = obj.batters.batter[0].type;
gr.insert();
gs.info("inserted succufully");