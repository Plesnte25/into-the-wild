import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil } from "lucide-react";
import {
  Column,
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
import { api } from "@/api";
import useReservation from "../hooks/useReservation";

// Mock Data
const MOCK_PROPERTIES = Array.from({ length: 25 }).map((_, idx) => ({
  id: `PROP-${1000 + idx}`,
  name: `Villa Serenity ${idx + 1}`,
  location: ["Goa", "Assam", "Rishikesh", "Jaipur"][idx % 4],
  owner: "John Doe",
  status: idx % 4 === 0 ? "Pending" : "Live",
  rooms: 8 + (idx % 5),
  contact: "+91 9876543210",
  occupied: 3 + (idx % 5),
  vacant: 5 - (idx % 3),
}));

// Summary Component
function Summary() {
  const total = MOCK_PROPERTIES.length;
  const live = MOCK_PROPERTIES.filter((p) => p.status === "Live").length;
  const pending = MOCK_PROPERTIES.filter((p) => p.status === "Pending").length;
  const inactive = total - live - pending;

  const cards = [
    { label: "TOTAL BOOKINGS", value: total, color: "text-cyan-400" },
    { label: "LIVE", value: live, color: "text-emerald-400" },
    { label: "PENDING", value: pending, color: "text-amber-400" },
    { label: "CANCELLED", value: inactive, color: "text-pink-400" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
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
    </div>
  );
}

// Edit Property Modal Component
function EditBooking({ property }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-cyan-400 hover:bg-slate-800"
        >
          <Pencil size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle>Edit {property.name}</DialogTitle>
        </DialogHeader>
<<<<<<< HEAD
        {/* Modal Body */}
=======
        {/* TODO: replace with real form */}
>>>>>>> 5832bf3 (sidebar responsiveness bug solved)
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const status = e.target.status.value;
            await api.patch(`/bookings/${property._id}`, { status });
            mutate();
          }}
          className="space-y-4"
        >
          <select
            name="status"
            defaultValue={property.status}
            className="w-full bg-slate-800 p-2 rounded\"
          >
            <option value="confirmed">confirmed</option>
            <option value="cancelled">cancelled</option>
          </select>
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
<<<<<<< HEAD
=======

>>>>>>> 5832bf3 (sidebar responsiveness bug solved)
        <div className="text-slate-300 text-sm">
          Modal body – form goes here…
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Reservation Component

export default function Reservation() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useReservation("month");

  if (isLoading) return <div>Loading bookings...</div>;
  if (isError) {
    if (isError.response?.status === 401) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Session Expired</h3>
          <Button onClick={() => navigate("/login")} className="mt-4">
            Re-login
          </Button>
        </div>
      );
    }
    return <div>Error loading bookings</div>;
  }
  /* -------- table columns --------*/
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
          <span
            className={value === "Live" ? "text-emerald-400" : "text-amber-400"}
          >
            {value}
          </span>
        ),
      },
      { Header: "ROOMS", accessor: "rooms" },
      { Header: "CONTACT", accessor: "contact" },
      { Header: "CHECK-IN", accessor: "occupied" },
      { Header: "CHECK-OUT", accessor: "vacant" },
      {
        id: "actions",
        Header: "",
        Cell: ({ row }) => <EditBooking property={row.original} />,
      },
    ],
    []
  );

  /* -------- react‑table hooks --------*/
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <Button size="sm" onClick={() => navigate("/admin/properties/new")}>
          {" "}
          <Plus size={16} /> Add New
        </Button>
      </div>

      <Summary />

      {/* search */}
      <Input
        placeholder="Search…"
        className="mb-4 bg-slate-800 border-slate-700"
        value={state.globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {/* table */}
      <div className="overflow-x-auto rounded-lg shadow-inner">
        <table {...getTableProps()} className="min-w-full text-sm bg-slate-900">
          <thead className="bg-slate-800 text-slate-400">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((col) => (
                  <th
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
                <tr {...row.getRowProps()} className="hover:bg-slate-800/50">
                  {row.cells.map((cell) => (
                    <td
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

      {/* pagination – simple */}
      <div className="flex items-center justify-end gap-4 mt-4 text-slate-400 text-xs">
        <Button
          size="sm"
          variant="ghost"
          disabled={!canPreviousPage}
          onClick={previousPage}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={!canNextPage}
          onClick={nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
