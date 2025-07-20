import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies(); // ✅ await aqui
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div>
      <header>Navbar privada</header>
      <main>{children}</main>
    </div>
  );
}
