import type { Mode } from "@marscode/database/enums";
import type { DialogContextValue } from "../../provider/dialog";
import type { ToastContextValue } from "../../provider/toast";
import type { ChatModelId } from "@marscode/shared";

export type CommandContext = {
    exit: () => void;
    toast: ToastContextValue;
    dialog: DialogContextValue;
    navigate: (path: string) => void;
    mode: Mode;
    setMode: (mode: Mode) => void;
    model: ChatModelId;
    setModel: (model: ChatModelId) => void;
};

export type Command = {
    name: string;
    description: string;
    value: string;
    action?: (ctx: CommandContext) => void | Promise<void>;
};
