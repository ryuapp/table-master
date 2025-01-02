"use client";

import { useCallback, useRef, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Create new GridExample component
export const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const onBtnExport = useCallback(() => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="w-full h-[400px] flex flex-col gap-2">
      <AgGridReact
        className="size-full"
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        suppressDragLeaveHidesColumns={true}
      />
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        className="w-full border-2 py-1 px-2 rounded"
        onClick={onBtnExport}
      >
        Download CSV export file
      </button>
    </div>
  );
};
