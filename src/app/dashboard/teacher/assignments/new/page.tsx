import { AssignmentForm } from "@/features/assignments/components/AssignmentForm";

export default function NewTeacherAssignmentPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Yeni Ödev
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          Ödev oluştur
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Öğretmen burada seçtiği kursa bağlı yeni ödev oluşturacak. İlk MVP’de
          dosya yükleme sonra Supabase Storage ile bağlanacak.
        </p>
      </section>

      <AssignmentForm />
    </div>
  );
}