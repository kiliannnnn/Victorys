import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import Credentials from "@auth/sveltekit/providers/credentials"
import type { Provider } from "@auth/sveltekit/providers"
 
const providers: Provider[] = [
  GitHub,
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
]
 
export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
 
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
})