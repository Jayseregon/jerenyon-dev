"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
} from "@nextui-org/react";
import { SortDescriptor } from "@react-types/shared";

import { useSortQuoteList } from "@/src/hooks/useSortQuoteList";
import SpinLoader from "@/components/ui/SpinLoader";

import { QuoteDetail } from "./QuoteDetail"; // Import the new component

export const BoardListQuotes = () => {
  const quotesList = useSortQuoteList("/api/quote");

  useEffect(() => {
    quotesList.reload();
  }, []);

  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  const handleQuoteDeleted = () => {
    setSelectedQuoteId(null);
    quotesList.reload(); // Reload the quotes list to reflect deletion
  };

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    quotesList.sort({
      ...sortDescriptor,
      column: sortDescriptor.column ?? "id",
      direction: sortDescriptor.direction ?? "ascending",
    });
  };

  const handleRowAction = (key: React.Key) => {
    setSelectedQuoteId(key.toString());
  };

  return (
    <div className="mt-10 w-fit">
      <div className="overflow-x-auto">
        <Table
          isHeaderSticky
          removeWrapper
          aria-label="quotes-board"
          bottomContent={
            selectedQuoteId && (
              <QuoteDetail
                quoteId={selectedQuoteId}
                onDelete={handleQuoteDeleted}
              />
            )
          }
          classNames={{
            base: "text-center",
            th: "uppercase bg-purple-800 dark:bg-purple-300 text-background",
          }}
          color="primary"
          selectionMode="single"
          sortDescriptor={quotesList.sortDescriptor}
          onRowAction={handleRowAction}
          onSortChange={handleSortChange}
        >
          <TableHeader>
            <TableColumn key="projectRef" allowsSorting className="text-center">
              Project
            </TableColumn>
            <TableColumn key="status" allowsSorting className="text-center">
              Status
            </TableColumn>
            <TableColumn key="createdAt" className="text-center">
              Created
            </TableColumn>
            <TableColumn key="updatedAt" className="text-center">
              Updated
            </TableColumn>
            <TableColumn key="clientName" allowsSorting className="text-center">
              Name
            </TableColumn>
            <TableColumn
              key="clientEmail"
              allowsSorting
              className="text-center"
            >
              Email
            </TableColumn>
            <TableColumn key="totalPrice" allowsSorting className="text-center">
              Price
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent="No entries found"
            isLoading={quotesList.isLoading}
            items={quotesList.items}
            loadingContent={<SpinLoader />}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className="text-nowrap">{item.projectRef}</TableCell>
                <TableCell className="text-nowrap">{item.status}</TableCell>
                <TableCell className="text-nowrap">
                  {item.createdAt?.toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-nowrap">
                  {item.updatedAt?.toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-nowrap">{item.clientName}</TableCell>
                <TableCell className="text-nowrap">
                  {item.clientEmail}
                </TableCell>
                <TableCell className="text-end text-nowrap">
                  ${" "}
                  {item.totalPrice?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
