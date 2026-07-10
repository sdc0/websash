export class Badge {
    public id: number;
    public name: string;
    public type: string;
    public image: string;
    public desc: string;
    public req: string;

    constructor(id: number, name: string, type: string, image: string, desc: string, req: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
        this.desc = desc;
        this.req = req;
    }

    static from_json(badge_obj: Record<string, string>): Badge {
        let t = new Badge(Number(badge_obj["id"]), badge_obj["name"], badge_obj["type"], badge_obj["image"], badge_obj["desc"], badge_obj["req"]);
        
        /*t.id = Number(badge_obj["id"]);
        t.name = badge_obj["name"];
        t.type = badge_obj["type"];
        t.image = badge_obj["image"];
        t.desc = badge_obj["desc"];
        t.req = badge_obj["req"];*/

        return t;
    }
}

export class Issuer {
    id: number;
    name: string;
    department: string;
    email: string;
    password: string;

    static from_json(issuer_obj: Record<string, string>): Issuer {
        let t = new Issuer();
        
        t.id = Number(issuer_obj["id"]);
        t.name = issuer_obj["name"];
        t.department = issuer_obj["department"];
        t.email = issuer_obj["email"];
        t.password = issuer_obj["password"];

        return t;
    }
}

export class Student {
    id: number;
    name: string;
    email: string;
    password: string;

    static from_json(student_obj: Record<string, string>): Student {
        let t = new Student();
        
        t.id = Number(student_obj["id"]);
        t.name = student_obj["name"];
        t.email = student_obj["email"];
        t.password = student_obj["password"];

        return t;
    }
}

export class Issuance {
    badge: number;
    issuer: number;
    student: number;
    date: Date;

    static from_json(issuance_obj: Record<string, string>): Issuance {
        let t = new Issuance();
        
        t.badge = Number(issuance_obj["badge"]);
        t.issuer = Number(issuance_obj["issuer"]);
        t.student = Number(issuance_obj["student"]);
        t.date = new Date(issuance_obj["date"]);

        return t;
    }
}