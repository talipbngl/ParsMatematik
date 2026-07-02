import { Send } from "lucide-react";

import { submitExamAction } from "../actions/submit-exam.action";
import {
  formatExamDuration,
  getExamMaxScore
} from "../services/exams.service";
import type { ExamListItem, ExamQuestion } from "../types/exams.types";

type ExamSolveScreenProps = {
  exam: ExamListItem;
  questions: ExamQuestion[];
};

export function ExamSolveScreen({ exam, questions }: ExamSolveScreenProps) {
  const maxScore = getExamMaxScore(questions);

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-lg font-black text-slate-950">Soru yok</h3>
        <p className="mt-2 text-sm text-slate-500">
          Bu sınava henüz soru eklenmemiş.
        </p>
      </div>
    );
  }

  return (
    <form
      action={submitExamAction}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="examId" value={exam.id} />

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Sınav Çöz
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          {exam.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {exam.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
            {questions.length} soru
          </span>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            {maxScore} puan
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
            {formatExamDuration(exam.durationMinutes)}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-black text-indigo-600">
                  Soru {index + 1}
                </p>

                <h3 className="mt-2 text-lg font-black leading-7 text-slate-950">
                  {question.questionText}
                </h3>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                {question.score} puan
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {question.questionType === "short_answer" ? (
                <input
                  name={`answer:${question.id}`}
                  type="text"
                  required
                  placeholder="Cevabını yaz"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              ) : (
                question.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <input
                      name={`answer:${question.id}`}
                      type="radio"
                      value={option}
                      required
                      className="size-4"
                    />
                    {option}
                  </label>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Send className="size-4" />
          Sınavı Gönder
        </button>
      </div>
    </form>
  );
}