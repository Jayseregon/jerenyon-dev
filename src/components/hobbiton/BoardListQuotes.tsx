"use client";

import React, { useEffect } from "react";
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

export const BoardListQuotes = () => {
  const quotesList = useSortQuoteList("/api/quote");

  useEffect(() => {
    quotesList.reload();
  }, []);

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    quotesList.sort({
      ...sortDescriptor,
      column: sortDescriptor.column ?? "id",
      direction: sortDescriptor.direction ?? "ascending",
    });
  };

  return (
    <div className="mt-10 w-fit">
      <div className="overflow-x-auto">
        <Table
          isHeaderSticky
          removeWrapper
          aria-label="quotes-board"
          classNames={{
            base: "text-center",
            th: "uppercase",
          }}
          color="primary"
          sortDescriptor={quotesList.sortDescriptor}
          onSortChange={handleSortChange}
        >
          <TableHeader>
            <TableColumn key="id" allowsSorting className="text-center">
              ID
            </TableColumn>
            <TableColumn key="projectRef" allowsSorting className="text-center">
              Project
            </TableColumn>
            <TableColumn key="status" allowsSorting className="text-center">
              Status
            </TableColumn>
            <TableColumn key="createdAt" allowsSorting className="text-center">
              Created
            </TableColumn>
            <TableColumn key="updatedAt" allowsSorting className="text-center">
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
            <TableColumn key="comment">Comment</TableColumn>
            <TableColumn key="totalPrice" allowsSorting className="text-center">
              Price
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent="No entries found" items={quotesList.items}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.projectRef}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.createdAt?.toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {item.updatedAt?.toLocaleDateString("en-CA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </TableCell>
                <TableCell>{item.clientName}</TableCell>
                <TableCell>{item.clientEmail}</TableCell>
                <TableCell>
                  <div className="max-w-xs text-wrap break-words">
                    {item.comment}
                  </div>
                </TableCell>
                <TableCell className="text-end">
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
