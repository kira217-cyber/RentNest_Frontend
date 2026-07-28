"use client";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useUpdateUserStatus } from "@/hooks/use-admin";
import type { User } from "@/types/user";

export function BanUserDialog({
  user,
  open,
  onClose,
}: {
  user: User;
  open: boolean;
  onClose: () => void;
}) {
  const updateStatus = useUpdateUserStatus();
  const isBanning = user.status === "ACTIVE";

  async function handleConfirm() {
    try {
      await updateStatus.mutateAsync({ id: user.id, status: isBanning ? "BANNED" : "ACTIVE" });
      onClose();
    } catch {
      // error toast already shown by the mutation
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={isBanning ? "Ban user" : "Unban user"}
      description={
        isBanning
          ? `Are you sure you want to ban "${user.name}"? They will no longer be able to log in.`
          : `Are you sure you want to restore access for "${user.name}"?`
      }
      confirmLabel={isBanning ? "Ban User" : "Unban User"}
      variant={isBanning ? "destructive" : "primary"}
      loading={updateStatus.isPending}
    />
  );
}
