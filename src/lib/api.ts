import { Badge, Student, Issuer, Issuance } from "./models";

//const api = "https://websash.dpdns.org";
const api = "http://127.0.0.1:8080";

export async function getToken(email: string, password: string, issuer: boolean=true): Promise<Record<string, string> | null> {
    let res: Record<string, string> = await (await fetch(`${api}/login/${issuer ? "issuer" : "student"}`, {
        method: "POST",
        headers: {
            "authorization": `Basic ${btoa(`${email}:${password}`)}`
        }
    })).json();

    if ('token' in res && 'id' in res) {
        return {
            "token": res["token"],
            "id": res["id"]
        };
    }

    return null;
}

export async function getSalt(email: string, isIssuer: boolean): Promise<string> {
    return fetch(`${api}/${isIssuer ? "issuer" : "student"}/salt`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "email": email
        })
    }).then((res) => res.json()).then((res) => {
        return res["salt"];
    });
}

export async function getBadges(): Promise<Badge[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/badge`)).json();

    return temp;
}

export async function getBadgesForIssuer(): Promise<Badge[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/badge/issuer`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string
        })
    })).json();
    let badges: Badge[] = [];

    for (let i = 0; i < temp.length; i++) {
        badges.push(Badge.from_json(temp[i]));
    }

    return badges;
}

export async function getStudents(): Promise<Student[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/student`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string
        })
    })).json();
    let students: Student[] = [];

    for (let i = 0; i < temp.length; i++) {
        students.push(Student.from_json(temp[i]));
    }

    return students;
}

export async function getIssuers(): Promise<Issuer[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/issuer`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string
        })
    })).json();
    let issuers: Issuer[] = [];

    for (let i = 0; i < temp.length; i++) {
        issuers.push(Issuer.from_json(temp[i]));
    }

    return issuers;
}

export async function getIssuances(): Promise<Issuance[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/badge/issue`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string
        })
    })).json();
    let issuances: Issuance[] = [];

    for (let i = 0; i < temp.length; i++) {
        issuances.push(Issuance.from_json(temp[i]));
    }

    return issuances;
}

export async function getBadgeFromName(name: string): Promise<Badge | null> {
    let badges: Record<string, string>[] = await (await fetch(`${api}/badge`)).json();

    for (let b = 0; b < badges.length; b++) {
        if (badges[b]["name"] === name) return Badge.from_json(badges[b]);
    }

    return null;
}

export async function getBadgeFromID(id: Number) {
    return Badge.from_json(
        await (
            await fetch(`${api}/badge/${id}`)
        ).json()
    );
}

export async function getStudentBadges(id: Number): Promise<Badge[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/student/${id}/badges`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string
        })
    }, )).json();

    let badges: Badge[] = [];

    for (let i = 0; i < temp.length; i++) {
        badges.push(Badge.from_json(temp[i]));
    }

    return badges;
}

export async function createBadge(badge: Badge): Promise<boolean> {
    return await fetch(`${api}/badge/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "name": badge.name,
            "abbr": badge.abbr,
            "image": badge.image,
            "desc": badge.desc,
            "short": badge.short,
            "req": badge.req,
            "type": badge.type,
            "creator": badge.creator
        })
    }).then((t) => t.ok);
}

export async function createStudent(student: Student): Promise<boolean> {
    return await fetch(`${api}/student/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "name": student.name,
            "email": student.email,
            "password": student.password,
            "salt": student.salt
        })
    }).then((t) => t.ok);
}

export async function createIssuer(issuer: Issuer): Promise<boolean> {
    return await fetch(`${api}/issuer/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "name": issuer.name,
            "department": issuer.department,
            "email": issuer.email,
            "password": issuer.password,
            "salt": issuer.salt
        })
    }).then((t) => t.ok);
}

export async function createIssuance(issuance: Issuance): Promise<boolean> {
    return await fetch(`${api}/badge/issue/add`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "badge": issuance.badge,
            "student": issuance.student,
            "issuer": issuance.issuer,
            "date": issuance.date
        })
    }).then((t) => t.ok);
}

export async function updateBadge(badge: Badge): Promise<boolean> {
    return await fetch(`${api}/badge/update/${badge.id}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "name": badge.name,
            "abbr": badge.abbr,
            "image": badge.image,
            "desc": badge.desc,
            "short": badge.short,
            "req": badge.req,
            "type": badge.type,
            "creator": badge.creator
        })
    }).then((t) => t.ok);
}

export async function updateStudent(student: Student): Promise<boolean> {
    return await fetch(`${api}/student/update/${student.id}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "name": student.name,
            "email": student.email,
            "password": student.password,
            "salt": student.salt
        })
    }).then((t) => t.ok);
}

export async function updateIssuer(issuer: Issuer): Promise<boolean> {
    return await fetch(`${api}/issuer/update/${issuer.id}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
           "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "name": issuer.name,
            "department": issuer.department,
            "email": issuer.email,
            "password": issuer.password,
            "salt": issuer.salt
        })
    }).then((t) => t.ok);
}

export async function updateIssuance(issuance: Issuance): Promise<boolean> {
    return await fetch(`${api}/badge/issue/update`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
           "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "badge": issuance.badge,
            "student": issuance.student,
            "issuer": issuance.issuer,
            "date": issuance.date
        })
    }).then((t) => t.ok);
}

export async function deleteBadge(badge: Badge): Promise<boolean> {
    return await fetch(`${api}/badge/delete`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "id": badge.id
        })
    }).then((t) => t.ok);
}

export async function deleteStudent(student: Student): Promise<boolean> {
    return await fetch(`${api}/student/delete`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "id": student.id
        })
    }).then((t) => t.ok);
}

export async function deleteIssuer(issuer: Issuer): Promise<boolean> {
    return await fetch(`${api}/issuer/delete`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "id": issuer.id
        })
    }).then((t) => t.ok);
}

export async function deleteIssuance(issuance: Issuance): Promise<boolean> {
    return await fetch(`${api}/badge/issue/delete`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "token": JSON.parse(localStorage.getItem("token") as string),
            "token_type": localStorage.getItem("token_type") as string,
            "badge": issuance.badge,
            "student": issuance.student,
            "issuer": issuance.issuer
        })
    }).then((t) => t.ok);
}
