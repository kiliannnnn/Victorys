// import sequelize from '$lib/server/sequelize.js';

// export async function handle({ event, resolve }) {
//     await sequelize.sync();
//     return resolve(event);
// }

// export async function handle({ event, resolve }) {
//     await sequelize.authenticate();
//     return resolve(event);
// }

// import { auth } from '$lib/firebaseConfig';

// export async function handle({ event, resolve }) {
//     const user = auth.currentUser;
//     if (event.url.pathname.startsWith('/protected') && !user) {
//         return Response.redirect('/login', 303);
//     }
//     return resolve(event);
// }
