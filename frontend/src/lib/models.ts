export class Badge {
    public id: number;
    public name: string;
    public abbr: string;
    public type: string;
    public image: string;
    public desc: string;
    public short: string;
    public req: string;
    public creator: number;

    static input_types: Record<string, string> = {
        "name": "text",
        "abbr": "text",
        "type": "text",
        "image": "file",
        "desc": "text",
        "short": "text",
        "req": "text"
    };

    constructor(options: {id?: number, name?: string, abbr?: string, type?: string, image?: string, desc?: string, short?: string, req?: string, creator?: number}) {
        this.id = options.id ?? -1;
        this.name = options.name ?? "";
        this.abbr = options.abbr ?? "";
        this.type = options.type ?? "";
        this.image = options.image ?? "";
        this.desc = options.desc ?? "";
        this.short = options.short ?? "";
        this.req = options.req ?? "";
        this.creator = options.creator ?? -1;
    }

    clone(): Badge {
        return new Badge({
            id: this.id,
            name: this.name,
            abbr: this.abbr,
            type: this.type,
            image: this.image,
            desc: this.desc,
            short: this.short,
            req: this.req,
            creator: this.creator
        });
    }

    static from_json(badge_obj: Record<string, string>): Badge {
        return new Badge({
            id: ("badge_id" in badge_obj) ? Number(badge_obj["badge_id"]) : Number(badge_obj["id"]), 
            name: ("badge_name" in badge_obj) ? badge_obj["badge_name"] : badge_obj["name"], 
            abbr: ("badge_abbr" in badge_obj) ? badge_obj["badge_abbr"] : badge_obj["abbr"], 
            type: ("badge_type" in badge_obj) ? badge_obj["badge_type"] : badge_obj["type"], 
            image: ("badge_image" in badge_obj) ? badge_obj["badge_image"] : badge_obj["image"], 
            desc: ("badge_desc" in badge_obj) ? badge_obj["badge_desc"] : badge_obj["desc"], 
            short: ("badge_short" in badge_obj) ? badge_obj["badge_short"] : badge_obj["short"], 
            req: ("badge_req" in badge_obj) ? badge_obj["badge_req"] : badge_obj["req"],
            creator: ("badge_creator" in badge_obj) ? Number(badge_obj["badge_creator"]) : Number(badge_obj["creator"])
        });
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

    constructor(options: {id?: number, name?: string, department?: string, email?: string, password?: string, salt?: string}) {
        this.id = options.id ?? -1;
        this.name = options.name ?? "";
        this.department = options.department ?? "";
        this.email = options.email ?? "";
        this.password = options.password ?? "";
        this.salt = options.salt ?? "";
    }

    clone(): Issuer {
        return new Issuer({
            id: this.id,
            name: this.name,
            department: this.department,
            email: this.email,
            password: this.password,
            salt: this.salt
        });
    }

    static from_json(issuer_obj: Record<string, string>): Issuer {
        return new Issuer({
            id: ("issuer_id" in issuer_obj) ? Number(issuer_obj["issuer_id"]) : Number(issuer_obj["id"]),
            name: ("issuer_name" in issuer_obj) ? issuer_obj["issuer_name"] : issuer_obj["name"],
            department: ("issuer_department" in issuer_obj) ? issuer_obj["issuer_department"] : issuer_obj["department"],
            email: ("issuer_email" in issuer_obj) ? issuer_obj["issuer_email"] : issuer_obj["email"],
            password: ("issuer_password" in issuer_obj) ? issuer_obj["issuer_password"] : issuer_obj["password"],
            salt: ("issuer_salt" in issuer_obj) ? issuer_obj["issuer_salt"] : issuer_obj["salt"]
        });
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

    constructor(options: {id?: number, name?: string, email?: string, password?: string, salt?: string}) {
        this.id = options.id ?? -1;
        this.name = options.name ?? "";
        this.email = options.email ?? "";
        this.password = options.password ?? "";
        this.salt = options.salt ?? "";
    }

    clone(): Student {
        return new Student({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            salt: this.salt
        });
    }

    static from_json(student_obj: Record<string, string>): Student {
        return new Student({
            id: ("student_id" in student_obj) ? Number(student_obj["student_id"]) : Number(student_obj["id"]),
            name: ("student_name" in student_obj) ? student_obj["student_name"] : student_obj["name"],
            email: ("student_email" in student_obj) ? student_obj["student_email"] : student_obj["email"],
            password: ("student_password" in student_obj) ? student_obj["student_password"] : student_obj["password"],
            salt: ("student_salt" in student_obj) ? student_obj["student_salt"] : student_obj["salt"]
        });
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

    constructor(options: {badge?: number, issuer?: number, student?: number, date?: Date}) {
        this.badge = options.badge ?? -1;
        this.issuer = options.issuer ?? -1;
        this.student = options.student ?? -1;
        this.date = options.date ?? new Date();
    }

    clone(): Issuance {
        return new Issuance({
            badge: this.badge,
            issuer: this.issuer,
            student: this.student,
            date: this.date
        });
    }

    static from_json(issuance_obj: Record<string, string>): Issuance {
        return new Issuance({
            badge: Number(issuance_obj["badge"]),
            issuer: Number(issuance_obj["issuer"]),
            student: Number(issuance_obj["student"]),
            date: new Date(issuance_obj["date"])
        });
    }
}
