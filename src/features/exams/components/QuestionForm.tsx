type QuestionFormProps = {
  index: number;
};

export function QuestionForm({ index }: QuestionFormProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-black text-slate-950">
          Soru {index + 1}
        </h3>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">
          MVP örnek soru
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label
            htmlFor={`questionText-${index}`}
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Soru metni
          </label>

          <textarea
            id={`questionText-${index}`}
            name={`questions.${index}.questionText`}
            rows={3}
            placeholder="Soru metnini yaz."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor={`questionType-${index}`}
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Soru tipi
          </label>

          <select
            id={`questionType-${index}`}
            name={`questions.${index}.questionType`}
            defaultValue="multiple_choice"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="multiple_choice">Çoktan seçmeli</option>
            <option value="true_false">Doğru / Yanlış</option>
            <option value="short_answer">Kısa cevap</option>
          </select>
        </div>

        <div>
          <label
            htmlFor={`score-${index}`}
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Puan
          </label>

          <input
            id={`score-${index}`}
            name={`questions.${index}.score`}
            type="number"
            min={1}
            defaultValue={10}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {["A", "B", "C", "D"].map((optionLabel, optionIndex) => (
          <div key={optionLabel}>
            <label
              htmlFor={`option-${index}-${optionIndex}`}
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              {optionLabel} şıkkı
            </label>

            <input
              id={`option-${index}-${optionIndex}`}
              name={`questions.${index}.options.${optionIndex}`}
              type="text"
              placeholder={`${optionLabel} cevabı`}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor={`correctOptionIndex-${index}`}
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Doğru cevap
          </label>

          <select
            id={`correctOptionIndex-${index}`}
            name={`questions.${index}.correctOptionIndex`}
            defaultValue="0"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">C</option>
            <option value="3">D</option>
          </select>
        </div>
      </div>
    </div>
  );
}