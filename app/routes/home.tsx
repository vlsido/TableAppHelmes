import Orders from "~/components/views/Orders";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Orders" },
    { name: "description", content: "Your orders" },
  ];
}

export default function Home() {
  return (
    <main
      data-testid="HOME.MAIN_CONTAINER:VIEW"
      aria-label="Home page"
      className="h-screen w-screen flex-1 bg-white overflow-auto">
      <Orders />
    </main>
  );
}
