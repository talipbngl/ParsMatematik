import { ExamList } from "@/features/exams/components/ExamList";
import { ExamResultCard } from "@/features/exams/components/ExamResultCard";
import { ExamSolveScreen } from "@/features/exams/components/ExamSolveScreen";
import {
  getExamQuestions,
  getExamStats,
  getStudentExamResult,
  getStudentExams
} from "@/features/exams/services/exams.service";

export default async function StudentExamsPage() {
  const exams = await getStudentExams();
  const stats = await getExamStats();

  const activeExam = exams.find((exam) => exam.status === "published") ?? null;
  const activeQuestions = activeExam
    ? await getExamQuestions(activeExam.id)
    : [];
  const activeResult = activeExam
    ? await getStudentExamResult(activeExam.id)
    : null;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Sınavlarım
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Sınav çözme ve sonuç takibi
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Öğrenci burada yayınlanan sınavları görür, örnek sınavı çözer ve
          sonucunu takip eder. Şimdilik mock veriyle çalışıyor.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Toplam Sınav</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalExams}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Yayında</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.publishedExams}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Kapalı</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.closedExams}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Teslimler</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {stats.totalSubmissions}
          </p>
        </div>
      </section>

      <ExamList
        exams={exams}
        audience="student"
        emptyTitle="Henüz sınav yok"
        emptyDescription="Kayıtlı olduğun kurslara sınav eklendiğinde burada görünecek."
      />

      {activeExam ? (
        <section id="sinav-coz" className="space-y-6">
          <ExamSolveScreen exam={activeExam} questions={activeQuestions} />
          <ExamResultCard exam={activeExam} submission={activeResult} />
        </section>
      ) : null}
    </div>
  );
}