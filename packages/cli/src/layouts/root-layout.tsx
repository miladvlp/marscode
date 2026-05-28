import { Outlet } from "react-router";

import { ThemedRoot } from "./themed-root";
import { ThemeProvider } from "../provider/theme";
import { ToastProvider } from "../provider/toast";
import { KeyboardLayerProvider } from "../provider/keyboard-layer";
import { DialogProvider } from "../provider/dialog";
import { PromptConfigProvider } from "../provider/prompt-config";

export function RootLayout() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <KeyboardLayerProvider>
                    <DialogProvider>
                        <PromptConfigProvider>
                            <ThemedRoot>
                                <Outlet />
                            </ThemedRoot>
                        </PromptConfigProvider>
                    </DialogProvider>
                </KeyboardLayerProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};