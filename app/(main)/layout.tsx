import { NavLink } from "@/components/nav-link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <hr />
      {children}
    </>
  );
}

function Navbar() {
  return (
    <div className="p-2 flex gap-2">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/expenses">Expenses</NavLink>
      <NavLink href="/create-expense">Create</NavLink>
      <NavLink href="/profile">Profile</NavLink>
    </div>
  );
}
