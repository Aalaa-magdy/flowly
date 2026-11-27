

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
        <main className="flex w-full flex-col md:pl-64">
            {children}
        </main>
    </div>
  );
}