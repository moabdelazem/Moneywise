import {
  createRootRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                Moneywise.
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <NavLinks />
            </nav>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">shadcn</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="ml-4 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          {isOpen && (
            <nav className="mt-4 md:hidden">
              <NavLinks mobile setIsOpen={setIsOpen} />
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-y-auto focus:outline-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.state.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-white rounded-lg shadow">
                <Outlet />
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </div>
  );
}

function NavLinks({
  mobile,
  setIsOpen,
}: {
  mobile?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/expenses", label: "Expenses", icon: Receipt },
    { to: "/budgets", label: "Budgets", icon: PiggyBank },
    { to: "/reminders", label: "Reminders", icon: Bell },
  ];

  return links.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 ${
        mobile ? "flex-col" : ""
      }`}
      activeProps={{
        className: "bg-gray-100 text-blue-600",
      }}
      onClick={() => mobile && setIsOpen && setIsOpen(false)}
    >
      <link.icon
        className={`flex-shrink-0 h-6 w-6 ${mobile ? "mb-1" : "mr-3"}`}
      />
      <span>{link.label}</span>
    </Link>
  ));
}
