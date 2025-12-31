import { useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { IGmailMessage } from "../models";
import { TableSkeletonLoader } from "./TableSkeletonLoader";

interface MessagesTableProps {
  data: IGmailMessage[];
  onSelectionChange: (id: string, selected: boolean) => void;
  onDelete: (id: string, limit: number) => void;
  isLoading: boolean
}

export function MessagesTable({ data, onSelectionChange, onDelete, isLoading }: MessagesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = data.slice(startIndex, endIndex);



  if (isLoading) {
    return <TableSkeletonLoader />;
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[80px]">S.No</TableHead>
              <TableHead>Domain/Sender Address</TableHead>
              <TableHead className="w-[150px]">Message Count</TableHead>
              <TableHead className="w-[80px]">Select</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{item.sender}</TableCell>
                  <TableCell>{item.count.toLocaleString()}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={item.selected}
                      onCheckedChange={(checked) =>
                        onSelectionChange(item.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item.id, item.count)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4">





      </div>
    </div>
  );
}
