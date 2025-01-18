import { createFileRoute } from "@tanstack/react-router";
import { GithubIcon } from "../components/github-icon";
import { Table } from "../components/table";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-4">
          {" "}
          <h1 className="font-bold text-5xl">Table Master</h1>{" "}
          <a
            href="https://github.com/ryuapp/table-master"
            className="flex h-fit w-fit items-center gap-1"
          >
            <GithubIcon size="20" />
            GitHub
          </a>
        </div>
        <p>
          This website is an example of csv file operation using{" "}
          <a
            className="text-blue-500 underline"
            href="https://www.ag-grid.com/"
          >
            AG Grid.
          </a>
        </p>
      </div>

      <div>
        <Table />
      </div>
    </div>
  );
}
