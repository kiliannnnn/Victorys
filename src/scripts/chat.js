import app from '../config/firebase-config';
import { getDatabase, ref, onValue, set } from "firebase/database";

const db = getDatabase(app);

const messageInput = document.getElementById('messageInput');
const messageSend = document.getElementById('messageSend');
const messageContainer = document.getElementById('messageContainer');

// write data
function writeUserData(userId, name, email, imageUrl) {
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

// read data continuously
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
});

// read data once
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

// send message
messageSend.addEventListener('click', () => {
    let msg = messageInput.value.trim() !== ''
    if (msg) {
        let hours = Date.getHours();
        let minutes = Date.getMinutes();
        let format = hours >= 12 ? 'PM' : 'AM';
        let formattedTime = `${hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${format}`;
        console.log(formattedTime);
        let message = `
            <div class="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-b-lg min-w-32 sender">
                <p class="text-sm text-zinc-700 dark:text-white">${msg}</p>
                <small class="text-xs text-zinc-500 dark:text-zinc-400">Bob - ${formattedTime}</small>
            </div>
        `;
        console.log(message);
        messageInput.value = '';
        messageInput.focus();
    }
});


{/* <div class="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-b-lg min-w-32 sender">
    <p class="text-sm text-zinc-700 dark:text-white">message</p>
    <small class="text-xs text-zinc-500 dark:text-zinc-400">Bob - 4:01 PM</small>
</div> */}