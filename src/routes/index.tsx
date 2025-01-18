import { createFileRoute } from "@tanstack/react-router";
import { Table } from "../components/table";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-col p-2">
      <div>
        <Table />
      </div>
    </div>
  );
}
