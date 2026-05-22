import type { Command } from "./types"

export const COMMANDS: Command[] = [
    {
        name: "new",
        describtion: "Start a new conversation",
        value: "/new",

    },

    {
        name: "agents",
        describtion: "Switch between agents",
        value: "/agents",
    },
    {
        name: "models",
        describtion: "Select Ai model for generation",
        value: "/models",
    },
    {
        name: "sessions",
        describtion: "Browse past sessions",
        value: "/sessions",
    },
    {
        name: "theme",
        describtion: "Change color theme",
        value: "/theme",
    },
    {
        name: "login",
        describtion: "Sign in with your browser",
        value: "/login",
    },
    {
        name: "logout",
        describtion: "Sign out of your account",
        value: "/logout",
    },
    {
        name: "upgrade",
        describtion: "Buy more credits",
        value: "/upgrade",

    },
    {
        name: "usage",
        describtion: "Open billing portal in your browser",
        value: "/usage",
    },
    {
        name: "exit",
        describtion: "quit the application",
        value: "/exit",
        action: (ctx) => {
            ctx.exit()
        }
    }
]