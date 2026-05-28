import { Outlet } from "react-router";

import { ThemedRoot } from "./themed-root";
import { ThemeProvider } from "../provider/theme";
import { ToastProvider } from "../provider/toast";
import { KeyboardLayerProvider } from "../provider/keyboard-layer";
import { DialogProvider } from "../provider/dialog";

export function RootLayout() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <KeyboardLayerProvider>
                    <DialogProvider>
                        <ThemedRoot>
                            <Outlet />
                        </ThemedRoot>
                    </DialogProvider>
                </KeyboardLayerProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};