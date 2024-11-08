import { createSignal, createResource, Suspense } from "solid-js";

async function postFormData(formData: FormData) {
    const response = await fetch("/api/feedback", {
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
                Name
                <input type="text" id="name" name="name" required />
            </label>
            <label>
                Email
                <input type="email" id="email" name="email" required />
            </label>
            <label>
                Message
                <textarea id="message" name="message" required />
            </label>
            <button>Send</button>
            <Suspense>{response() && <p>{response().message}</p>}</Suspense>
        </form>
    );
}