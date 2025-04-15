import "./globals.css";
import Navbar from "../components/Navbar";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar session={session} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
