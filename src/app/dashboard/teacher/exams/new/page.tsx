import { ExamForm } from "@/features/exams/components/ExamForm";

export default function NewTeacherExamPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Yeni Sınav
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Sınav oluştur
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Öğretmen burada seçtiği kursa bağlı sınav taslağı oluşturacak. Soru
          yönetimi ilk aşamada basit form olarak tutuluyor.
        </p>
      </section>

      <ExamForm />
    </div>
  );
}