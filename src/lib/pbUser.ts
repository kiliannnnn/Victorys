import { pb } from './pb';

export interface User {
    username: string;
    email: string;
    emailVisibility: boolean;
    password: string;
    passwordConfirm: string;
    name: string;
}

export async function getUser(id: string) {
    return await pb.collection('users').getOne<User>(id);
}

export async function createUser(username: string, email: string, emailVisibility: boolean, password: string, passwordConfirm: string, name: string): Promise<User> {
    return await pb.collection('users').create<User>({
        username,
        email,
        emailVisibility,
        password,
        passwordConfirm,
        name
    });
}

export async function updateUser(id: string, data: any) {
    return await pb.collection('users').update<User>(id, data);
}

export async function deleteUser(id: string) {
    return await pb.collection('users').delete(id);
}

