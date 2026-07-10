import { Badge } from "./models";

const api = "https://websash.dpdns.org";

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

export async function getBadges(): Promise<Badge[] | null> {
    let temp: Record<string, string>[] = await (await fetch(`${api}/badge`)).json();
    let badges: Badge[] = [];

    for (let i = 0; i < temp.length; i++) {
        badges.push(Badge.from_json(temp[i]));
    }

    return badges;
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
            "token": JSON.parse(localStorage.getItem("studentToken") as string)
        })
    }, )).json();
    let badges: Badge[] = [];

    for (let i = 0; i < temp.length; i++) {
        badges.push(Badge.from_json(temp[i]));
    }

    return badges;
}