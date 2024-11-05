import { pb, authorizePB } from './pb';

export interface User {
    username: string;
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export async function getUser(id: string) {
    return await pb.collection('users').getOne<User>(id);
}

export async function createUser(username: string, email: string, password: string, passwordConfirm: string): Promise<User> {
    return await pb.collection('users').create<User>({
        username,
        email,
        password,
        passwordConfirm,
    });
}

export async function updateUser(id: string, data: any) {
    return await pb.collection('users').update<User>(id, data);
}

export async function deleteUser(id: string) {
    return await pb.collection('users').delete(id);
}

export async function loginUser(usernameOrEmail: string, password: string) {
    return await pb.collection('users').authWithPassword(usernameOrEmail, password);
}

export function logoutUser() {
    return pb.authStore.clear();;
}

export async function refreshUser() {
    return await pb.collection('users').authRefresh();
}

export async function isRegistered(field: string, text: string) {
    return await pb.collection('users').getList(1, 1, {
        filter: field + ' = ' + text,
    });
}
