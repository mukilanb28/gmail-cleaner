import { useState } from "react";
import { Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";



export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSignOut = () => {
    logout();
  };

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and App Name */}
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8" style={{ color: "#d93025" }} />
          <h1 className="text-[22px] text-gray-700">Mail Cleanup</h1>
        </div>

        {/* Right side - Profile */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-full p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <div className="h-8 w-8 rounded-full bg-[#1a73e8] flex items-center justify-center text-white cursor-pointer hover:shadow-md transition-shadow">
                <span className="text-sm">{initials}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 bg-white">
            {/* Profile Header */}
            <div className="p-4 text-center border-b">
              <div className="flex justify-center mb-3">
                <div className="h-20 w-20 rounded-full bg-[#1a73e8] flex items-center justify-center text-white">
                  <span className="text-2xl">{initials}</span>
                </div>
              </div>
              <div className="mb-1 text-base">{user?.name}</div>
              <div className="text-sm text-gray-600 mb-3">{user?.email}</div>
              <Button
                variant="outline"
                className="w-full rounded-full border-gray-300 hover:bg-gray-50"
              >
                Manage your Google Account
              </Button>
            </div>

            {/* Sign Out */}
            <div className="p-2">
              <DropdownMenuItem
                className="cursor-pointer py-3 px-4 rounded focus:bg-gray-100"
                onClick={handleSignOut}
              >
                <div className="w-full text-center">
                  <span>Sign out</span>
                </div>
              </DropdownMenuItem>
            </div>

            {/* Footer */}
            <div className="p-3 text-center border-t">
              <div className="text-xs text-gray-600">
                <a href="#" className="hover:underline">Privacy Policy</a>
                {" • "}
                <a href="#" className="hover:underline">Terms of Service</a>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}