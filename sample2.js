var redis = require("redis" ),
    Promise = require("bluebird"),
    client = redis.createClient(6379,'192.168.33.10');
    //client = redis.createClient();

console.log('hello');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

client.auth('passwordpasswordpasswordpassword', function(err, reply){
    if (!err) {
        client.getAsync(100).then(function(res) {
            if ( res != null ) {
                console.log (  JSON.stringify ( JSON.parse(res), '\t', 4 ) );
                return res;
            } else  {
                var user = {
                    "_id": "560ba136dd8ee21e187aaf8c",
                    "index": 0,
                    "guid": "b463d4d2-bc22-482a-ade4-41ce4f0602f2",
                    "isActive": false,
                    "balance": "$1,516.52",
                    "picture": "http://placehold.it/32x32",
                    "age": 24,
                    "eyeColor": "blue",
                    "name": "Shepard Walter",
                    "gender": "male",
                    "company": "KOG",
                    "email": "shepardwalter@kog.com",
                    "phone": "+1 (921) 552-2703",
                    "address": "420 Pulaski Street, Bodega, Oklahoma, 2629",
                    "about": "Nisi nisi consectetur aliquip sunt. Id culpa esse commodo veniam sint non ad dolor enim magna minim elit voluptate fugiat. Proident ut qui amet eiusmod reprehenderit anim ut consequat in ipsum esse amet elit esse. Anim cupidatat enim ex cillum. Nostrud labore nulla ad mollit non ex sit. Non magna fugiat sit sit ea pariatur nulla enim consequat fugiat velit. Cupidatat adipisicing dolore amet aliquip occaecat ipsum minim duis voluptate.\r\n",
                    "registered": "2015-08-06T04:30:22 -10:00",
                    "latitude": 61.599863,
                    "longitude": -80.232748,
                    "tags": [
                        "sunt",
                        "proident",
                        "dolore",
                        "velit",
                        "tempor",
                        "labore",
                        "velit"
                    ],
                    "friends": [
                        {
                            "id": 0,
                            "name": "Franks Bradley"
                        },
                        {
                            "id": 1,
                            "name": "Thelma Cervantes"
                        },
                        {
                            "id": 2,
                            "name": "Mcdonald Ochoa"
                        }
                    ],
                    "greeting": "Hello, Shepard Walter! You have 7 unread messages.",
                    "favoriteFruit": "strawberry"
                };
                client.set(100, JSON.stringify(user ));
            }
        });
    }
});