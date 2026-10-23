import sqlite3 as sql
import bcrypt
import json
import os

path = os.path.dirname(__file__)

db = sql.connect(path + "/badges.db")
cur = db.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS student (
    id INTEGER PRIMARY KEY,
    name VARCHAR(128),
    email VARCHAR(128) UNIQUE,
    password VARCHAR(128)
)""")

cur.execute("""
CREATE TABLE IF NOT EXISTS issuer (
    id INTEGER PRIMARY KEY,
    name VARCHAR(128),
    department VARCHAR(256),
    email VARCHAR(128) UNIQUE,
    password VARCHAR(128)
)""")

cur.execute("""
CREATE TABLE IF NOT EXISTS badge (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(256),
    abbr VARCHAR(8) UNIQUE,
    desc VARCHAR(1024),
    short VARCHAR(512),
    req VARCHAR(1024),
    image VARCHAR(256),
    type VARCHAR(256),
    creator INTEGER,
    FOREIGN KEY (creator) REFERENCES issuer(id)
)""")

cur.execute("""
CREATE TABLE IF NOT EXISTS issuance (
    badge INTEGER,
    student INTEGER,
    issuer INTEGER,
    date DATETIME,
    PRIMARY KEY (badge, student),
    FOREIGN KEY (badge) REFERENCES badge(id),
    FOREIGN KEY (student) REFERENCES student(id),
    FOREIGN KEY (issuer) REFERENCES issuer(id)
)""")

# setup permissions if not exists
if not os.path.exists(path + "/permissions.json"):
    with open(path + "/permissions.json", "w") as f:
        json.dump({}, f, indent=4)

# setup if default user exists
if os.path.exists(path + "/default_user.json"):
    with open(path + "/default_user.json", 'r') as f:
        data = json.load(f)

    if {"name", "email", "password", "department"}.issubset(data.keys()):
        print("Default issuer detected, adding to database")

        try: 
            password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt(rounds=10)).decode("utf-8")
            cur.execute("INSERT INTO issuer (name, email, password, department) VALUES (?, ?, ?, ?)", [data["name"], data["email"], password, data["department"]])
            id = cur.lastrowid

            with open(path + "/permissions.json", "r") as f:
                permissions = json.load(f)

            permissions.update({"default-user": {
                "badge": "crud",
                "issuer": "crud",
                "student": "crud",
                "issuance": "crud",
                "users": [
                    f'{id}'
                ]
            }})

            with open(path + "/permissions.json", "w") as f:
                json.dump(permissions, f, indent=4)
        except sql.IntegrityError:
            print("User with default email already exists")

db.commit()
db.close()

# setup filesystem for image storage
os.makedirs(path + "/images", exist_ok=True)

print("Setup database")
