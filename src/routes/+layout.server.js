import { user } from "$lib/stores/userStore";

export function load() {
	return {
		users: userState
	};
}

let userState;
user.subscribe(value => {
  userState = value;
});