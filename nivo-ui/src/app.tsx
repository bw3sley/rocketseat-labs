import { useEffect, useState } from "react";

import { FileDown, Filter, MoreHorizontal, Plus, Search } from "lucide-react";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./components/ui/table";

import { Tabs } from "./components/tabs";
import { Header } from "./components/header";
import { Button } from "./components/ui/button";
import { Control, Input } from "./components/ui/input";
import { Pagination } from "./components/pagination";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";

import useDebounceValue from "./hooks/use-debounce-value";

import * as Dialog from "@radix-ui/react-dialog";
import { CreateTagForm } from "./components/create-tag-form";

export interface TagResponse {
  first: number,
  prev: number | null,
  next: number,
  last: number,
  pages: number,
  items: number,
  data: Tag[]
}

export interface Tag {
  id: string,
  title: string,
  slug: string,
  amountOfVideos: number
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlFilter = searchParams.get("filter") ?? "";
  
  const [filter, setFilter] = useState(urlFilter);

  const debouncedFilter = useDebounceValue(filter, 1000);

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ["get-tags", urlFilter, page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}_per_page=10&title=${debouncedFilter}`);
      const data = await response.json();
      
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60
  })

  function handleFilter() {
    setSearchParams(params => {
      params.set("page", "1");
      params.set("filter", filter);

      return params;
    })
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>

      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="primary" type="button" >
                <Plus className="size-3" />
                Create new
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />

              <Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900">
                <div className="space-y-3">
                  <Dialog.Title className="text-xl font-bold">
                    Create tag
                  </Dialog.Title>

                  <Dialog.Description className="text-sm text-zinc-500">
                    Tags can be used to group videos about similar concepts.
                  </Dialog.Description>
                </div>

                <CreateTagForm />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Input variant="filter">
              <Search className="size-3" />

              <Control 
                placeholder="Search tags..." 
                onChange={(event) => setFilter(event.target.value)}
                value={filter}
              />
            </Input>

            <Button onClick={handleFilter}>
              <Filter className="size-3" />
              Apply filter
            </Button>
          </div>

          <Button type="button">
            <FileDown className="size-3" />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tagsResponse?.data.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell></TableCell>
                
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{tag.title}</span>
                    <span className="text-xs text-zinc-500">{tag.slug}</span>
                  </div>
                </TableCell>
  
                <TableCell className="text-zinc-300">
                  {tag.amountOfVideos} video(s)
                </TableCell>
  
                <TableCell className="text-right">
                  <Button size="icon">
                    <MoreHorizontal className="size-4" /> 
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {tagsResponse && <Pagination pages={tagsResponse.pages} items={tagsResponse.items} page={page} />}
      </main>
    </div>
  )
}