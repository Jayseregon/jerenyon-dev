"use client";

import React, { useContext, useEffect, useState } from "react";
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
import SpinLoader from "@/src/components/root/SpinLoader";
import { NonceContext } from "@/src/app/providers";

import { QuoteDetail } from "./QuoteDetail"; // Import the new component

export const BoardListQuotes = () => {
  const nonce = useContext(NonceContext);
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
    <div className="mt-10 w-fit" nonce={nonce}>
      <div className="overflow-x-auto" nonce={nonce}>
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
          nonce={nonce}
          selectionMode="single"
          sortDescriptor={quotesList.sortDescriptor}
          onRowAction={handleRowAction}
          onSortChange={handleSortChange}
        >
          <TableHeader>
            <TableColumn
              key="projectRef"
              allowsSorting
              className="text-center"
              nonce={nonce}
            >
              Project
            </TableColumn>
            <TableColumn
              key="status"
              allowsSorting
              className="text-center"
              nonce={nonce}
            >
              Status
            </TableColumn>
            <TableColumn key="createdAt" className="text-center" nonce={nonce}>
              Created
            </TableColumn>
            <TableColumn key="updatedAt" className="text-center" nonce={nonce}>
              Updated
            </TableColumn>
            <TableColumn
              key="clientName"
              allowsSorting
              className="text-center"
              nonce={nonce}
            >
              Name
            </TableColumn>
            <TableColumn
              key="clientEmail"
              allowsSorting
              className="text-center"
              nonce={nonce}
            >
              Email
            </TableColumn>
            <TableColumn
              key="totalPrice"
              allowsSorting
              className="text-center"
              nonce={nonce}
            >
              Price
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent="No entries found"
            isLoading={quotesList.isLoading}
            items={quotesList.items}
            loadingContent={<SpinLoader />}
            nonce={nonce}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className="text-nowrap" nonce={nonce}>
                  {item.projectRef}
                </TableCell>
                <TableCell className="text-nowrap" nonce={nonce}>
                  {item.status}
                </TableCell>
                <TableCell className="text-nowrap" nonce={nonce}>
                  {item.createdAt?.toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-nowrap" nonce={nonce}>
                  {item.updatedAt?.toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-nowrap" nonce={nonce}>
                  {item.clientName}
                </TableCell>
                <TableCell className="text-nowrap" nonce={nonce}>
                  {item.clientEmail}
                </TableCell>
                <TableCell className="text-end text-nowrap" nonce={nonce}>
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
