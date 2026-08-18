export class Badge {
    public id: number;
    public name: string;
    public abbr: string;
    public type: string;
    public image: string;
    public desc: string;
    public req: string;

    static input_types: Record<string, string> = {
        "name": "text",
        "abbr": "text",
        "type": "text",
        "image": "file",
        "desc": "text",
        "req": "text"
    };

    constructor();
    constructor(id: number, name: string, abbr: string, type: string, image: string, desc: string, req: string);
    constructor(id?: number, name?: string, abbr?: string, type?: string, image?: string, desc?: string, req?: string) {
        this.id = id ?? -1;
        this.name = name ?? "";
        this.abbr = abbr ?? "";
        this.type = type ?? "";
        this.image = image ?? "";
        this.desc = desc ?? "";
        this.req = req ?? "";
    }

    clone(): Badge {
        return new Badge(
            this.id,
            this.name,
            this.abbr,
            this.type,
            this.image,
            this.desc,
            this.req
        );
    }

    static from_json(badge_obj: Record<string, string>): Badge {
        let t = new Badge(
            ("badge_id" in badge_obj) ? Number(badge_obj["badge_id"]) : Number(badge_obj["id"]), 
            ("badge_name" in badge_obj) ? badge_obj["badge_name"] : badge_obj["name"], 
            ("badge_abbr" in badge_obj) ? badge_obj["badge_abbr"] : badge_obj["abbr"], 
            ("badge_type" in badge_obj) ? badge_obj["badge_type"] : badge_obj["type"], 
            ("badge_image" in badge_obj) ? badge_obj["badge_image"] : badge_obj["image"], 
            ("badge_desc" in badge_obj) ? badge_obj["badge_desc"] : badge_obj["desc"], 
            ("badge_req" in badge_obj) ? badge_obj["badge_req"] : badge_obj["req"]
        );

        return t;
    }
}

export class Issuer {
    id: number;
    name: string;
    department: string;
    email: string;
    password: string;
    salt: string;

    static input_types: Record<string, string> = {
        "name": "text",
        "department": "text",
        "email": "email",
        "password": "text"
    };

    constructor();
    constructor(id: number, name: string, department: string, email: string, password: string);
    constructor(id: number, name: string, department: string, email: string, password: string, salt: string);
    constructor(id?: number, name?: string, department?: string, email?: string, password?: string, salt?: string) {
        this.id = id ?? -1;
        this.name = name ?? "";
        this.department = department ?? "";
        this.email = email ?? "";
        this.password = password ?? "";
        this.salt = salt ?? "";
    }

    clone(): Issuer {
        return new Issuer(
            this.id,
            this.name,
            this.department,
            this.email,
            this.password,
            this.salt
        );
    }

    static from_json(issuer_obj: Record<string, string>): Issuer {
        let t = new Issuer();
        
        t.id = ("issuer_id" in issuer_obj) ? Number(issuer_obj["issuer_id"]) : Number(issuer_obj["id"]);
        t.name = ("issuer_name" in issuer_obj) ? issuer_obj["issuer_name"] : issuer_obj["name"];
        t.department = ("issuer_department" in issuer_obj) ? issuer_obj["issuer_department"] : issuer_obj["department"];
        t.email = ("issuer_email" in issuer_obj) ? issuer_obj["issuer_email"] : issuer_obj["email"];
        t.password = ("issuer_password" in issuer_obj) ? issuer_obj["issuer_password"] : issuer_obj["password"];
        t.salt = ("issuer_salt" in issuer_obj) ? issuer_obj["issuer_salt"] : issuer_obj["salt"];

        return t;
    }
}

export class Student {
    id: number;
    name: string;
    email: string;
    password: string;
    salt: string;

    static input_types: Record<string, string> = {
        "name": "text",
        "email": "email",
        "password": "text"
    };

    constructor();
    constructor(id: number, name: string, email: string, password: string);
    constructor(id: number, name: string, email: string, password: string, salt: string);
    constructor(id?: number, name?: string, email?: string, password?: string, salt?: string) {
        this.id = id ?? -1;
        this.name = name ?? "";
        this.email = email ?? "";
        this.password = password ?? "";
        this.salt = salt ?? "";
    }

    clone(): Student {
        return new Student(
            this.id,
            this.name,
            this.email,
            this.password,
            this.salt
        );
    }

    static from_json(student_obj: Record<string, string>): Student {
        let t = new Student();
        
        t.id = ("student_id" in student_obj) ? Number(student_obj["student_id"]) : Number(student_obj["id"]);
        t.name = ("student_name" in student_obj) ? student_obj["student_name"] : student_obj["name"];
        t.email = ("student_email" in student_obj) ? student_obj["student_email"] : student_obj["email"];
        t.password = ("student_password" in student_obj) ? student_obj["student_password"] : student_obj["password"];
        t.salt = ("student_salt" in student_obj) ? student_obj["student_salt"] : student_obj["salt"];

        return t;
    }
}

export class Issuance {
    badge: number;
    issuer: number;
    student: number;
    date: Date;

    static input_types: Record<string, string> = {
        "badge": "Badge",
        "issuer": "Issuer",
        "student": "Student",
        "date": "date"
    };

    constructor();
    constructor(badge: number, issuer: number, student: number, date: Date);
    constructor(badge?: number, issuer?: number, student?: number, date?: Date) {
        this.badge = badge ?? -1;
        this.issuer = issuer ?? -1;
        this.student = student ?? -1;
        this.date = date ?? new Date();
    }

    clone(): Issuance {
        return new Issuance(
            this.badge,
            this.issuer,
            this.student,
            this.date
        );
    }

    static from_json(issuance_obj: Record<string, string>): Issuance {
        let t = new Issuance();
        
        t.badge = Number(issuance_obj["badge"]);
        t.issuer = Number(issuance_obj["issuer"]);
        t.student = Number(issuance_obj["student"]);
        t.date = new Date(issuance_obj["date"]);

        return t;
    }
}
