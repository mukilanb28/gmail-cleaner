import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { WarningNoteSection } from "./components/WarningNoteSection";
import { ActionSection } from "./components/ActionSection";
import { MessagesTable } from "./components/MessagesTable";
import { GmailLoader } from "./components/GmailLoader";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { useAuth } from "./context/AuthContext";
import { useGmailSenderStats } from "./hooks/useGmailStats";
import type { IDeleteMessage, IGmailMessage } from "./models";
import { useFilter } from "./context/FilterContext";
import { Spinner } from "./components/Spinner";


export default function App() {

  const [data, setData] = useState<IGmailMessage[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<IDeleteMessage[]>([]);
  const [skipDeleteConfirm, setSkipDeleteConfirm] = useState(false);


  const { user, isUserLoading, login, } = useAuth()
  const { processCount, deleteByDomain, } = useFilter()

  const { messages: srcMsgs, refresh, deleteData, isMessagesLoading, percentage, isMessageDeleting } = useGmailSenderStats();

  useEffect(() => {
    setData(srcMsgs);
  }, [srcMsgs]);

  useEffect(() => {
    if (user) {
      refresh();
    }
  }, [user, processCount, deleteByDomain]);


  const handleLogin = () => {
    login();
  };
  const handleRefresh = () => {
    refresh();
  };


  // Calculate select all state (true/false/indeterminate)
  const selectedCount = data.filter((item) => item.selected).length;
  const selectAllState: boolean | "indeterminate" =
    selectedCount === 0
      ? false
      : selectedCount === data.length
        ? true
        : "indeterminate";



  const handleSelectAllChange = () => {

    const shouldSelectAll = selectedCount === 0;
    setData(data.map((item) => ({ ...item, selected: shouldSelectAll })));
  };

  const handleSelectionChange = (id: string, selected: boolean) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, selected } : item))
    );
  };

  const handleDelete = (id: string, count: number) => {
    if (skipDeleteConfirm) {
      deleteData([{ email: id, limitValue: count }]);
    } else {
      setPendingDelete([{ email: id, limitValue: count }]);
      setShowDeleteDialog(true);
    }
  };

  const handleDeleteAll = () => {
    const selectedIds = data.filter((item) => item.selected).map((item) => ({ email: item.id, limitValue: item.count }))
    if (skipDeleteConfirm) {

      deleteData(selectedIds);
    } else {
      setPendingDelete(selectedIds);
      setShowDeleteDialog(true);
    }
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    deleteData(pendingDelete);
    setPendingDelete([]);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setPendingDelete([]);
  };

  const handleDontShowAgain = (checked: boolean) => {
    setSkipDeleteConfirm(checked);
  };


  // Show login page if not logged in
  if (!user && !isUserLoading) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show main application if logged in
  return (
    <div className="min-h-screen bg-white">
      {isUserLoading && <GmailLoader />}

      {(isMessagesLoading || isMessageDeleting) && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <Spinner percentage={percentage} isMessageDeleting={isMessageDeleting} />
      </div>}



      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Warning and Note Section */}
        <WarningNoteSection />

        {/* Action Section */}
        <ActionSection
          onRefresh={handleRefresh}
          selectAll={selectAllState}
          onSelectAllChange={handleSelectAllChange}
          isRefreshing={isMessagesLoading}
          selectedCount={selectedCount}
          onDeleteAll={handleDeleteAll}

        />


        {/* Messages Table */}
        <MessagesTable
          data={data}
          isLoading={isMessagesLoading}
          onSelectionChange={handleSelectionChange}
          onDelete={handleDelete}
        />
      </main>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        onDontShowAgain={handleDontShowAgain}
        messageCount={pendingDelete.length}
      />
    </div>
  );
}