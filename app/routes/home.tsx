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
    <main className="h-screen w-screen flex-1 place-content-center bg-white">
      <Orders />
    </main>
  );
}
