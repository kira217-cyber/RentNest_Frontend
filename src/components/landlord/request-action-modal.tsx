"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { Field } from "@/components/forms/field";
import { Textarea } from "@/components/forms/textarea";
import { useUpdateRentalStatus } from "@/hooks/use-rentals";

export function RequestActionModal({
  open,
  onClose,
  rentalId,
  action,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  rentalId: string;
  action: "APPROVED" | "REJECTED";
  propertyTitle: string;
}) {
  const [note, setNote] = useState("");
  const updateStatus = useUpdateRentalStatus();

  function handleClose() {
    setNote("");
    onClose();
  }

  async function handleConfirm() {
    try {
      await updateStatus.mutateAsync({
        id: rentalId,
        payload: { status: action, landlordNote: note || undefined },
      });
      handleClose();
    } catch {
      // error toast already shown by the mutation
    }
  }

  const isApprove = action === "APPROVED";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`${isApprove ? "Approve" : "Reject"} request — ${propertyTitle}`}
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {isApprove
            ? "The tenant will be notified and can proceed to payment once approved."
            : "The tenant will be notified that this request was rejected."}
        </p>

        <Field label="Note to tenant" htmlFor="landlordNote" hint="Optional">
          <Textarea
            id="landlordNote"
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={isApprove ? "Welcome! Looking forward to..." : "Unfortunately..."}
          />
        </Field>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={handleClose} disabled={updateStatus.isPending}>
            Cancel
          </Button>
          <Button
            variant={isApprove ? "primary" : "destructive"}
            onClick={handleConfirm}
            loading={updateStatus.isPending}
          >
            {isApprove ? "Approve Request" : "Reject Request"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
