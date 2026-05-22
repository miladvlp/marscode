export type CommandContext = {
    exit: () => void
}

export type Command = {
    name: string,
    describtion: string,
    value: string,
    action?: (ctx: CommandContext) => void | Promise<void>;
}