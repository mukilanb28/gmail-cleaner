import { RefreshCw, Loader, Trash2, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFilter } from "../context/FilterContext";

interface ActionSectionProps {
  onRefresh: () => void;
  selectAll: boolean | "indeterminate";
  onSelectAllChange: () => void;
  isRefreshing?: boolean;
  selectedCount: number;
  onDeleteAll: () => void;

}

export function ActionSection({
  onRefresh,
  selectAll,
  onSelectAllChange,
  isRefreshing = false,
  selectedCount,
  onDeleteAll,

}: ActionSectionProps) {

  const { processCount, deleteByDomain, onChangeProcessCount, onChangeDeleteByDomain } = useFilter()


  return (
    <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 mb-4">
      <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        {/* Left Side - Actions */}
        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <Button
            onClick={onRefresh}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-gray-50"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Refresh
          </Button>

          {/* Select All */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={onSelectAllChange}
            />
            <label htmlFor="select-all" className="text-sm cursor-pointer select-none">
              Select All
            </label>
          </div>



          {/* Process Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Messages to process count:</span>
            <Select value={'500'} onValueChange={(value) => onChangeProcessCount(Number(value))}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'500'}>500</SelectItem>
                <SelectItem value={'1000'}>1000</SelectItem>
                <SelectItem value={'2000'}>2000</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Delete By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Delete by:</span>
            <Select value={deleteByDomain ? 'domain' : 'group'} onValueChange={() => onChangeDeleteByDomain(!deleteByDomain)}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain">Domain Address</SelectItem>
                <SelectItem value="group">Group by Sender</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Side - Selected Count and Delete All */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              {selectedCount} selected
            </span>
            <Button
              onClick={onDeleteAll}
              className="flex items-center gap-2 bg-[#ea4335] hover:bg-[#d33426] text-white"
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </Button>
          </div>
        )}
      </div>
      {/* Processed Messages Indicator */}
      {
        processCount > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Processed recent <span className="text-[#1a73e8]">{processCount}</span> messages
            </span>
          </div>
        )
      }
    </div >

  );
}