import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDontShowAgain: (checked: boolean) => void;
  messageCount?: number;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  onDontShowAgain,
  messageCount = 1,
}: DeleteConfirmDialogProps) {
  const [dontShow, setDontShow] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onDontShowAgain(dontShow);
    onConfirm();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[500px]">
        {/* Dialog Content */}
        <div className="p-6">
          <h2 className="text-xl mb-4">Delete messages</h2>
          <p className="text-sm text-gray-700 mb-6">
            Do you want to delete {messageCount} {messageCount === 1 ? "message" : "messages"}? This action cannot be undone.
          </p>

          {/* Don't show again checkbox */}
          <div className="flex items-center gap-2 mb-6">
            <Checkbox
              id="dont-show"
              checked={dontShow}
              onCheckedChange={(checked) => setDontShow(checked as boolean)}
            />
            <label htmlFor="dont-show" className="text-sm cursor-pointer select-none">
              Don't show this message again
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
