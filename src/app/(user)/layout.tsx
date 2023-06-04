import UserNav from "@/components/UserNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <UserNav />
      {children}
    </section>
  );
}
