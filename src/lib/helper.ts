import bcrypt from "bcryptjs";

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = (err) => reject(err);
        
        reader.readAsDataURL(file);
    });
}

export function arrayToString(arr: Uint8Array): string {
    let temp = "";
    for (let i: number = 0; i < arr.length; i++) {
        temp += String.fromCharCode(arr[i]);
    }
    return temp;
}

export function stringToArray(str: string): Uint8Array {
    let temp: Uint8Array = new Uint8Array(str.length);
    for (let i: number = 0; i < temp.length; i++) {
        temp[i] = str.charCodeAt(i);
    }
    return temp;
}

export function generateSalt(): string {
    return bcrypt.genSaltSync(10);
    /*const array = new Uint8Array(len);
    crypto.getRandomValues(array);
    return arrayToString(array);*/
}

export async function generateHash(password: string, salt: string) {
    return bcrypt.hashSync(password, salt);
}
