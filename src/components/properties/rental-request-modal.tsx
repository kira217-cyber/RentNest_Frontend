"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { Textarea } from "@/components/forms/textarea";
import { useCreateRentalRequest } from "@/hooks/use-rentals";
import { rentalRequestSchema, type RentalRequestFormValues } from "@/schemas/rental-request.schema";

const MIN_MOVE_IN_DATE = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export function RentalRequestModal({
  open,
  onClose,
  propertyId,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentalRequestFormValues>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: { moveInDate: "", moveOutDate: "", message: "" },
  });

  const createRentalRequest = useCreateRentalRequest(propertyId);

  function handleClose() {
    reset();
    onClose();
  }

  async function onSubmit(values: RentalRequestFormValues) {
    try {
      await createRentalRequest.mutateAsync({
        propertyId,
        moveInDate: new Date(values.moveInDate).toISOString(),
        moveOutDate: values.moveOutDate ? new Date(values.moveOutDate).toISOString() : undefined,
        message: values.message || undefined,
      });
      handleClose();
    } catch {
      // error toast already shown by the mutation
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Request to Rent — ${propertyTitle}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Move-in date" htmlFor="moveInDate" error={errors.moveInDate?.message} required>
          <Input
            id="moveInDate"
            type="date"
            min={MIN_MOVE_IN_DATE}
            hasError={Boolean(errors.moveInDate)}
            {...register("moveInDate")}
          />
        </Field>

        <Field
          label="Move-out date"
          htmlFor="moveOutDate"
          error={errors.moveOutDate?.message}
          hint="Optional — leave blank if undecided."
        >
          <Input
            id="moveOutDate"
            type="date"
            min={MIN_MOVE_IN_DATE}
            hasError={Boolean(errors.moveOutDate)}
            {...register("moveOutDate")}
          />
        </Field>

        <Field
          label="Message to landlord"
          htmlFor="message"
          error={errors.message?.message}
          hint="Optional — introduce yourself or share your requirements."
        >
          <Textarea
            id="message"
            rows={4}
            placeholder="I am interested in renting this property because..."
            hasError={Boolean(errors.message)}
            {...register("message")}
          />
        </Field>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={createRentalRequest.isPending}>
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}
