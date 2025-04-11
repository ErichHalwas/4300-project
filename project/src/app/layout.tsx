import "./globals.css";
import Navbar from "../components/Navbar";
import { auth } from "../auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
