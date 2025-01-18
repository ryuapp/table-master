"use client";

import {
  AllCommunityModule,
  type ColDef,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { FileDown, FileUp } from "lucide-react";
import Papa from "papaparse";
import { useCallback, useRef, useState } from "react";

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
    { field: "make", editable: true, rowDrag: true },
    { field: "model", editable: true },
    { field: "price", editable: true },
    { field: "electric", editable: true },
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
              const colDefs = Object.keys(result.data[0]).map(
                (field, index) => ({
                  field,
                  editable: true,
                  // First column enables row drag
                  ...(index === 0 && { rowDrag: true }),
                }),
              );
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
    <div className="flex h-[400px] w-full flex-col gap-2">
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
          className="flex items-center gap-1 rounded border-2 px-2 py-1"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <FileUp size="20" />
          <div>Import CSV</div>
        </button>
        <button
          type="button"
          className="flex items-center gap-1 rounded border-2 px-2 py-1"
          onClick={onBtnExport}
        >
          <FileDown size="20" />
          <div>Export CSV</div>
        </button>
      </div>
      <AgGridReact
        className="size-full"
        ref={gridRef}
        rowData={rowData}
        rowDragManaged={true}
        columnDefs={colDefs}
        suppressDragLeaveHidesColumns={true}
      />
    </div>
  );
};
