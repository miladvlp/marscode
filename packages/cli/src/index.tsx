import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { Home } from "./screens/home";
import { NewSession } from "./screens/new-session";
import { Session } from "./screens/session";

const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "sessions/new", element: <NewSession /> },
      { path: "sessions/:id", element: <Session /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

process.env.OPENTUI_FORCE_WCWIDTH ??= "1";

const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false,
  useKittyKeyboard: {
    reportText: true,
  },
});
createRoot(renderer).render(<App />);
