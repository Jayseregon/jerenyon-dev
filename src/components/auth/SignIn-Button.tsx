"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return <button onClick={() => signIn()}>Sign In</button>;
}

// export function SignIn() {
//   return (
//     <button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
//       Sign In
//     </button>
//   )
// }
