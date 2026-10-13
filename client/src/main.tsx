import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
