import { Toaster } from "@/components/ui/sonner";
import { Home, Layout } from "lucide-react";
import { Provider } from "react-redux";
import HomeFeed from "./components/shared/HomeFeed";
import NewPostButton from "./components/shared/NewPostButton";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/theme-toogle";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="social-feed-theme">
        <div className="min-h-screen bg-background flex flex-col">
          <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 w-full">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Layout className="h-5 w-5" />
                <span>SocialFeed</span>
              </div>
              <div className="flex items-center gap-4">
                <ModeToggle />
              </div>
            </div>
          </header>

          {/* Removed centering classes from main */}
          <main className="flex-1 pt-20 py-8">
            <div className="container px-4 md:px-0">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Home className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-primary" />
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                      Home
                    </p>
                  </div>
                  <NewPostButton />
                </div>

                <HomeFeed />
              </div>
            </div>
          </main>

          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col md:h-16 items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with React, Redux, and shadcn/ui
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
