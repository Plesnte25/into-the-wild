import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Pencil } from "lucide-react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/utils/baseurl";

function Summary({ properties }) {
  if (!properties) return null;
  const total = properties.length;
  const live = properties.filter((p) => p.status === "Live").length;
  const pending = properties.filter((p) => p.status === "Pending").length;
  const inactive = total - live - pending;

  const cards = [
    { label: "TOTAL PROPERTIES", value: total, color: "text-cyan-400" },
    { label: "LIVE", value: live, color: "text-emerald-400" },
    { label: "PENDING", value: pending, color: "text-amber-400" },
    { label: "INACTIVE", value: inactive, color: "text-pink-400" },
  ];

  return (
    <section className="grid gap-6 xl:grid-cols-4 mb-6">
      {cards.map((card) => (
        <Card key={card.label} className="bg-slate-900 shadow-inner">
          <CardHeader className="pb-2">
            <CardTitle className="tracking-wide text-sm text-slate-400">
              {card.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold flex items-baseline gap-2">
            <span className={card.color}>{card.value}</span>
            <span className="text-xs text-emerald-400">+2.4%</span>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function EditProperty({ property }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-cyan-400 hover:bg-slate-800">
          <Pencil size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle>Edit {property.name}</DialogTitle>
        </DialogHeader>
        <div className="text-slate-300 text-sm">Modal body – form goes here…</div>
      </DialogContent>
    </Dialog>
  );
}

export default function Realty() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/dashboard/admin/all`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };
    fetchProperties();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "NAME", accessor: "name" },
      { Header: "LOCATION", accessor: "location" },
      { Header: "OWNER", accessor: "owner" },
      {
        Header: "STATUS",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={value === "Live" ? "text-emerald-400" : "text-amber-400"}>{value}</span>
        ),
      },
      { Header: "ROOMS", accessor: "rooms" },
      { Header: "CONTACT", accessor: "contact" },
      { Header: "OCCUPIED", accessor: "occupied" },
      { Header: "VACANT", accessor: "vacant" },
      {
        id: "actions",
        Header: "",
        Cell: ({ row }) => <EditProperty property={row.original} />,
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  return (
    <main className="flex-1 full overflow-y-auto p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Button size="sm" onClick={() => navigate("/admin/properties/new")}> <Plus size={16} /> Add New </Button>
      </div>

      <Summary properties={data} />

      <Input
        placeholder="Search…"
        className="bg-slate-800 border-slate-700 text-slate-300"
        value={state.globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg shadow-inner">
        <table {...getTableProps()} className="min-w-full text-sm bg-slate-900">
          <thead className="bg-slate-800 text-slate-400">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((col) => (
                  <th
                    key={col.id}
                    {...col.getHeaderProps(col.getSortByToggleProps())}
                    className="px-4 py-2 text-left whitespace-nowrap"
                  >
                    {col.render("Header")}
                    {col.isSorted ? (col.isSortedDesc ? " ↓" : " ↑") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-slate-800">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} className="hover:bg-slate-800/50">
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="px-4 py-2 whitespace-nowrap text-slate-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-4 text-slate-400 text-xs">
        <Button className="text-white" size="sm" variant="ghost" disabled={!canPreviousPage} onClick={previousPage}>
          Prev
        </Button>
        <Button className="text-white" size="sm" variant="ghost" disabled={!canNextPage} onClick={nextPage}>
          Next
        </Button>
      </div>
    </main>
  );
}
