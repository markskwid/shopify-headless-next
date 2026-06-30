"use client";

import { applyDiscountAction } from "@/app/(cart)/applyDiscountCode/action";
import { updateCartNoteAction } from "@/app/(cart)/updateCartNote/action";
import { useState } from "react";

export default function ToggleNote({ note }: { note: string }) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const note = formData.get("note") as string;

    const result = await updateCartNoteAction(note);

    if (!result.success) {
      console.error(result.errors);
      setError("Failed to apply coupon. Try again");
    }

    setLoading(false);
  };
  return (
    <div className="grid grid-cols-2 py-3 border-b border-neutral-300">
      <strong className="text-lg">Note: </strong>
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-end underline cursor-pointer"
      >
        {note ? "Edit Note" : "Add Note"}
      </button>

      {showForm && (
        <>
          {error && (
            <p className="col-span-5 mt-2 text-red-500! font-semibold">
              {error}
            </p>
          )}
          <form
            method="POST"
            className="mt-3 col-span-2 flex flex-col items-start space-x-5"
            onSubmit={handleSubmit}
          >
            <textarea
              defaultValue={note ?? ""}
              placeholder="Leave your note here"
              id="note"
              name="note"
              disabled={loading}
              className={`border border-neutral-400 rounded-md w-full px-3 py-2 disabled:pointer-events-none disabled:cursor-progress disabled:bg-neutral-300`}
            />
            <button
              className="text-white! font-semibold uppercase mt-3 py-2 px-5 text-center bg-neutral-500 rounded-full tracking-widest cursor-pointer disabled:cursor-not-allowed disabled:opacity-80 disabled:pointer-events-none"
              type="submit"
              disabled={loading}
            >
              Apply
            </button>
          </form>
        </>
      )}
    </div>
  );
}
