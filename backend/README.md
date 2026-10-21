# Backend Setup

## Setting Up the Server Files

WebSash's backend requires several files before being able to run properly. Start by setting up a secrets file:

```
touch secret.txt
```

Then add text to this file.



Next, set up a permissions file:

```
touchbackend/permissions.json
```

Now, leave it blank for now, but once setting up the database and adding users, use the following format to add in permissions for users:

```
[
    <role>: {
        "badge": <badge_permissions>,
        "issuer": <issuer_permissions>,
        "student": <student_permissions>,
        "issuance": <issuance_permissions>,
        "users": [
            <user_id>, 
            ...
        ]
    },
    ...
]
```

Substitute <role> for any string descriptor (ex. "admin"), any of the <permissions> (<badge_permissions>, <issuer_permissions>, <student_permissions>, <issuance_permissions>) with a string of characters from the following:
 * "c" -> gives create permissions
 * "r" -> gives read permissions
 * "u" -> gives update permissions
 * "d" -> gives delete permissions

For example, the string "cu" in issuer permissions would give the users in with that role the ability to create or update issuers.

## Running the Database

Use the docker container (TODO: add more instructions)

```
docker build -t flask-backend .
docker run -d -p 5000:5000 flask-backend
```