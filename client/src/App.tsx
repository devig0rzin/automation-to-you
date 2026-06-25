import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import Home from "./pages/Home";
import CursorGlow from "./components/CursorGlow";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <ScrollProvider>
          <TooltipProvider>
            <Toaster />
            <CursorGlow />
            {loadingComplete ? (
              <Router />
            ) : (
              <LoadingScreen onComplete={() => setLoadingComplete(true)} />
            )}
          </TooltipProvider>
        </ScrollProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
