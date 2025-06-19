import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash, Check } from "lucide-react";
import { BASE_URL } from "@/utils/baseurl";


function PropertyForm({ initial, onSave }) {
  const blank = {
    name: "",
    location: "",
    owner: "",
    rooms: 1,
    contact: "",
    status: "Pending",
    images: [],
  };
  const [form, setForm] = useState(() => {
    if (initial) {
      return {
        ...blank,
        ...initial,
        images: initial.images || [],
      };
    }
    return blank;
  });
  const [urlDraft, setUrlDraft] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

//  create OR update
  const submit = async (e) => {
    e.preventDefault();
    const api = initial
      ? axios.patch(`${BASE_URL}/properties/${initial._id}`, form)
      : axios.post(`${BASE_URL}/properties`, form);

    await api;
    onSave();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {["name", "location", "owner", "contact"].map((k) => (
        <Input
          key={k}
          placeholder={k.toUpperCase()}
          value={form[k]}
          onChange={set(k)}
        />
      ))}

      <Input
        type="number"
        placeholder="ROOMS"
        value={form.rooms}
        onChange={set("rooms")}
      />

      {/* ----------------------- image URL section ------------------------ */}
      <div className="space-y-2">
        <p className="text-xs text-slate-400 tracking-wide">IMAGES (URL)</p>

        {/* thumbnail list */}
        <div className="flex flex-wrap gap-2">
          {form.images.map((u, i) => (
            <div key={i} className="relative group">
              <img src={u} alt="" className="h-16 w-16 object-cover rounded" />
              <button
                type="button"
                className="absolute inset-0 bg-black/60 hidden group-hover:flex items-center justify-center rounded"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    images: f.images.filter((_, idx) => idx !== i),
                  }))
                }
              >
                <Trash size={14} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>

        {/* url input */}
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/photo.jpg"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (!urlDraft) return;
              setForm((f) => ({ ...f, images: [...f.images, urlDraft] }));
              setUrlDraft("");
            }}
          >
            <Check size={16} />
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {initial ? "Save changes" : "Create"}
      </Button>
    </form>
  );
}

/* ------------------------------ dashboard stats --------------------------- */
function Summary({ list }) {
  const stats = useMemo(() => {
    const total = list.length;
    const live = list.filter((p) => p.status === "Live").length;
    const pending = list.filter((p) => p.status === "Pending").length;
    return [
      ["TOTAL PROPERTIES", total],
      ["LIVE", live],
      ["PENDING", pending],
      ["INACTIVE", total - live - pending],
    ];
  }, [list]);

  return (
    <div className="grid gap-6 xl:grid-cols-4 mb-6">
      {stats.map(([label, val]) => (
        <Card key={label} className="bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xs text-slate-400">{label}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-cyan-400">
            {val}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* -------------------------------- main page ------------------------------ */
export default function Realty() {
  const [rows, setRows] = useState([]);

  const load = async () =>
    setRows((await axios.get(`${BASE_URL}/dashboard/admin/all`)).data);
  useEffect(() => {
    load();
  }, []);

  /* react-table hookery */
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "NAME", accessor: "name" },
      { Header: "LOCATION", accessor: "location" },
      { Header: "STATUS", accessor: "status" },
      { Header: "ROOMS AVAILABLE", accessor: "rooms" },
      { Header: "VACANT", accessor: "vacant" },
      { Header: "OWNER", accessor: "owner" },
      { Header: "CONTACT", accessor: "contact" },

      {
        id: "edit",
        Header: "",
        Cell: ({ row }) => (
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="sm" variant="ghost">
                <Pencil size={14} color="silver" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-lg ml-auto p-6 bg-slate-900">
              <DrawerHeader>
                <DrawerTitle>Edit</DrawerTitle>
              </DrawerHeader>
              <PropertyForm initial={row.original} onSave={load} />
            </DrawerContent>
          </Drawer>
        ),
      },
    ],
    []
  );

  /* build table */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    { columns, data: rows, initialState: { pageSize: 8 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <main className="flex-1 p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Properties</h2>

        <Drawer>
          <DrawerTrigger asChild>
            <Button size="sm">
              <Plus size={16} className="mr-1" />
              Add New
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-lg ml-auto p-6 bg-slate-900">
            <DrawerHeader>
              <DrawerTitle>Add property</DrawerTitle>
            </DrawerHeader>
            <PropertyForm onSave={load} />
          </DrawerContent>
        </Drawer>
      </div>

      <Summary list={rows} />

      <Input
        placeholder="Search…"
        value={state.globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="bg-slate-800 border-slate-700 text-slate-300"
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
                    className="px-4 py-2 text-left"
                  >
                    {col.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-slate-800">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-slate-800/60">
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

      <div className="flex justify-end gap-3">
        <Button
          size="sm"
          className="text-white"
          variant="ghost"
          disabled={!canPreviousPage}
          onClick={previousPage}
        >
          Prev
        </Button>
        <Button
          className="text-white"
          size="sm"
          variant="ghost"
          disabled={!canNextPage}
          onClick={nextPage}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
