"use client"
import s from "./loginactions.module.css"
import { signIn, signOut } from "next-auth/react"

export function SignOut() {
  return (
    <button className={s.login} onClick={() => signOut()}>
      Sign out
    </button>
  )
}

export function SignIn() {
  return (
    <button className={s.login} onClick={() => signIn("github")}>
      Sign in
    </button>
  )
}