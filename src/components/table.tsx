"use client";

import { useCallback, useRef, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Papa from "papaparse";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

export const Table = () => {
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<IRow[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, []);

  const onBtnImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        Papa.parse(file, {
          header: true,
          complete: (result: { data: IRow[] }) => {
            if (result.data[0]) {
              const colDefs = Object.keys(result.data[0]).map((field) => ({
                field,
              }));
              setColDefs(colDefs as ColDef<IRow>[]);
            }
            setRowData(result.data as IRow[]);
          },
        });
      }
    },
    [],
  );

  return (
    <div className="w-full h-[400px] flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="file"
          accept=".csv"
          onChange={onBtnImport}
          className="hidden"
          id="fileInput"
        />
        <button
          type="button"
          className="border-2 py-1 px-2 rounded"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Upload CSV
        </button>
        <button
          type="button"
          className="border-2 py-1 px-2 rounded"
          onClick={onBtnExport}
        >
          Export CSV
        </button>
      </div>
      <AgGridReact
        className="size-full"
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        suppressDragLeaveHidesColumns={true}
      />
    </div>
  );
};
