"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { Field } from "@/components/forms/field";
import { Textarea } from "@/components/forms/textarea";
import { useCreateReview } from "@/hooks/use-reviews";
import { cn } from "@/lib/utils";
import { reviewSchema, type ReviewFormValues } from "@/schemas/review.schema";

export function ReviewFormModal({
  open,
  onClose,
  propertyId,
  propertyTitle,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  onSubmitted?: () => void;
}) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const createReview = useCreateReview();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  function handleClose() {
    reset();
    setHoveredStar(null);
    onClose();
  }

  async function onSubmit(values: ReviewFormValues) {
    try {
      await createReview.mutateAsync({ propertyId, ...values });
      onSubmitted?.();
      handleClose();
    } catch {
      // error toast already shown by the mutation
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Review — ${propertyTitle}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Rating" htmlFor="rating" error={errors.rating?.message} required>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <div className="flex gap-1" id="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => field.onChange(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className="text-amber-500"
                  >
                    <Star
                      className={cn("size-7")}
                      fill={(hoveredStar ?? field.value) >= star ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            )}
          />
        </Field>

        <Field label="Comment" htmlFor="comment" error={errors.comment?.message} required>
          <Textarea
            id="comment"
            rows={4}
            placeholder="Share your experience living here..."
            hasError={Boolean(errors.comment)}
            {...register("comment")}
          />
        </Field>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={createReview.isPending}>
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
}
