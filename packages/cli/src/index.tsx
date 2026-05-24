import { createCliRenderer, h } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { InputBar } from "./components/input-bar";
import { ToastProvider } from "./provider/toast";
import { KeyboardLayerProvider } from "./provider/keyboard-layer";
import { DialogProvider } from "./provider/dialog";
import { ThemeProvider, useTheme } from "./provider/theme";


function ThemeRoot() {
  const { colors } = useTheme();


  return (
    <box alignItems="center" justifyContent="center" backgroundColor={colors.background}
      width="100%" height="100%"
      gap={2}
    >
      <Header />
      <box width="100%" maxWidth={78} paddingX={2}>
        <InputBar onSubmit={() => { }} />
      </box>
    </box>
  )
}
function App() {
  return (
    <ThemeProvider>
      <KeyboardLayerProvider>
        <DialogProvider>
          <ToastProvider>
            <ThemeRoot />
          </ToastProvider>
        </DialogProvider>
      </KeyboardLayerProvider>
    </ThemeProvider>
  );
}

const renderer = await createCliRenderer(
  {
    targetFps: 60,
    exitOnCtrlC: false,

  }

);
createRoot(renderer).render(<App />);
