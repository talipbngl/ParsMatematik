import { Send } from "lucide-react";

import { submitAssignmentAction } from "../actions/submit-assignment.action";

type AssignmentSubmissionFormProps = {
  assignmentId: string;
};

export function AssignmentSubmissionForm({
  assignmentId
}: AssignmentSubmissionFormProps) {
  return (
    <form
      action={submitAssignmentAction}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="assignmentId" value={assignmentId} />

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Ödev Teslimi
        </p>

        <h3 className="mt-2 text-lg font-black text-slate-950">
          Cevabını gönder
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          İlk MVP’de dosya yükleme yerine metin ve örnek dosya yolu alanı
          kullanıyoruz. Supabase Storage bağlanınca gerçek dosya yükleme
          eklenecek.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor={`answerText-${assignmentId}`}
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Cevap metni
          </label>

          <textarea
            id={`answerText-${assignmentId}`}
            name="answerText"
            rows={4}
            placeholder="Çözüm açıklamanı veya teslim notunu yaz."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor={`filePath-${assignmentId}`}
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Dosya yolu / link
          </label>

          <input
            id={`filePath-${assignmentId}`}
            name="filePath"
            type="text"
            placeholder="/uploads/odev.pdf veya Google Drive linki"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Send className="size-4" />
          Teslim Et
        </button>
      </div>
    </form>
  );
}