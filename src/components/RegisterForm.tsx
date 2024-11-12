import { createSignal, createResource, Suspense } from "solid-js";

async function postFormData(formData: FormData) {
    const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    return data;
}

export default function Form() {
    const [formData, setFormData] = createSignal<FormData>();
    const [response] = createResource(formData, postFormData);

    function submit(e: SubmitEvent) {
        e.preventDefault();
        setFormData(new FormData(e.target as HTMLFormElement));
    }

    return (
        <form onSubmit={submit}>
            <label>
                Username
                <input type="text" id="username" name="username" required />
            </label>
            <label>
                Email
                <input type="email" id="email" name="email" required />
            </label>
            <label>
                Password
                <input type="password" id="password" name="password" required />
            </label>
            <button>Send</button>
            <Suspense>{response() && <p>{response().message}</p>}</Suspense>
        </form>
    );
}