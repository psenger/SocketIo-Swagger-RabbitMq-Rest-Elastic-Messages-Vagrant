defining a handler for actions that map to REST over http. POST and GET generally refer to update and query over an entity. There's absolutely no reason you can't just define a handler for generic versions of these CRUD operations that can be used in both contexts. The way I generally do this is by introducing the concept of a 'route' to the real-time transport, and mapping those back to the same CRUD handlers.

You have a session, you can impose the same ACL, etc.

````
 +---------------------------------+
 |                                 |
 |      BROWSER                    |
 |                                 |
 +--+--^-------------------+---^---+
    |  |                   |   |
    |  |                   |   |
 +--v--+---+            +--v---+---+
 |         |            |          |
 | HTTP    |            | SOCKET.IO|
 +--+---^--+            +--+---^---+
    |   |                  |   |
 +--v---+------------------v---+---+
 |                                 |
 |        ROUTING/PUBSUB           |
 +-+--^-------+--^-------+--^------+
   |  |       |  |       |  |
 +-v--+--+  +-v--+--+  +-v--+-+
 |       |  |       |  |      |
 | USERS |  | ITEMS |  |ETC   |
 +-------+  +-------+  +------+
     ENTITY CRUD HANDLERS
````     