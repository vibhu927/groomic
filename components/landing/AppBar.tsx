"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const session = useSession();
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="bg-slate-900 fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-xl font-bold">
                Groomic
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {!session.data?.user ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-slate-900"
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-white text-slate-900 hover:bg-gray-200"
                    onClick={() => signIn()}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-white text-slate-900 hover:bg-gray-200"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-900 w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="flex flex-col space-y-4 pt-4 border-t border-gray-700">
                      {!session.data?.user ? (
                        <>
                          <Button
                            variant="ghost"
                            className="text-gray-300 hover:text-slate-900"
                          >
                            Login
                          </Button>
                          <Button
                            className="bg-white text-slate-900 hover:bg-gray-200"
                            onClick={() => signIn()}
                          >
                            Sign up
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="bg-white text-slate-900 hover:bg-gray-200"
                            onClick={() => signOut()}
                          >
                            Log Out
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Added padding-top to prevent overlap with navbar */}
      <div className="pt-16">
        {/* Your page content goes here */}
      </div>
    </>
  );
};

export default Navbar;
