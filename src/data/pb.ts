import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.PB_URL);

export const authorizePB = async () => {
    if (!pb.authStore.isValid) {
        await pb.admins.authWithPassword(
            import.meta.env.PB_USERNAME,
            import.meta.env.PB_PASSWORD
        );
    }
    return pb;
};