import { createFileRoute } from "@tanstack/react-router";
import { Table } from "../components/table";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2 flex flex-col">
      <div>
        <Table />
      </div>
    </div>
  );
}
