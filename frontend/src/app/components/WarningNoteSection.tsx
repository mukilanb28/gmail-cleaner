import { TriangleAlert, Info, } from "lucide-react";

export function WarningNoteSection() {
  return (
    <div className="space-y-3">
      {/* Warning */}
      <div className="flex items-start gap-3 p-4 border border-200 rounded-lg" style={{ border: '1px solid #ffee5c', backgroundColor: 'ivory', alignItems: 'center' }}>
        <TriangleAlert className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'ivory' }} />
        <div>
          <p className="text-sm text-yellow-900">
            <strong>Important:</strong> All deletions will be moved to the Trash folder. Messages in Trash will be permanently deleted after 30 days.
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="flex items-start gap-3 p-4 border border-blue-200 rounded-lg" >
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> This project runs on limited infrastructure, so processing may take some time. We respect your privacy and do not store any user data or cookies. Only a limited number of messages such as the last 1000 are processed.
          </p>
        </div>
      </div>
    </div>
  );
}
