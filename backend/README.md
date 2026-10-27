# Backend Setup

## Setting Up the Server Files

WebSash's backend requires several files before being able to run properly. Start by setting up a secrets file:

```
touch secret.txt
```

Then add text to this file.



Next, set up a permissions file:

```
touch permissions.json
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

Alternatively (or in addition), create a default admin user with a built in role for "crud" on all types (this is currently necessary for the starting usage of the database, as no user can be added from thee frontend without an existing user). Create the file:

```
touch default_user.json
```

Then add in the following data, filling in where the <tags> are:

```
{
    "name": <name>,
    "email": <email>,
    "password": <password>,
    "department": <department>
}
```

This will automatically create the user, insert it into the database, create the permissions file (if it doesn't exist), and add a new role called 'default-user' with "crud" on all fields with only the newly created user.

**NOTE: a permissions.json file must be created, even if a default_user.json is created, it can just be left completely empty if a default_user.json is provided, otherwise it requires at least the '{ }' enclosure**

## Running the Database

Use the docker container (TODO: add more instructions)

```
docker build -t flask-backend .
docker run -d -p 5000:5000 flask-backend
```
