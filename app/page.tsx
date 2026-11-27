import { ThemeToggle } from "./theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans text-foreground">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="text-3xl font-bold">Love youu</div>
      </div>
    </div>
  );
}
