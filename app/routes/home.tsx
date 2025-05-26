import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Table App Helmes" },
    { name: "description", content: "Welcome to the Helmes's Assignment!" },
  ];
}

export default function Home() {
  return <></>;
}
