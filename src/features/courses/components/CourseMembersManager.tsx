import {
  assignTeacherToCourseAction,
  enrollStudentToCourseAction,
  removeStudentEnrollmentAction,
  removeTeacherFromCourseAction
} from "../actions/manage-course-members.action"
import type { CourseManagementData } from "../services/course-management.service"

type CourseMembersManagerProps = {
  data: CourseManagementData
}

function formatEnrollmentStatus(status: string): string {
  const labels: Record<string, string> = {
    active: "Aktif",
    paused: "Durduruldu",
    completed: "Tamamlandı",
    cancelled: "İptal"
  }

  return labels[status] ?? status
}

export function CourseMembersManager({ data }: CourseMembersManagerProps) {
  const availableTeachers = data.teachers.filter(
    (teacher) => !data.assignedTeacherIds.includes(teacher.id)
  )

  const enrolledStudentIds = data.enrollments.map(
    (enrollment) => enrollment.studentId
  )

  const availableStudents = data.students.filter(
    (student) => !enrolledStudentIds.includes(student.id)
  )

  const assignedTeachers = data.teachers.filter((teacher) =>
    data.assignedTeacherIds.includes(teacher.id)
  )

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Öğretmen Atama
          </p>
          <h2 className="mt-2 text-xl font-black text-slate-950">
            Kurs öğretmenleri
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Bu kursu yönetebilecek öğretmenleri buradan atayabilirsin.
          </p>
        </div>

        <form
          action={assignTeacherToCourseAction}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <input type="hidden" name="courseId" value={data.course.id} />

          <select
            name="teacherId"
            required
            disabled={availableTeachers.length === 0}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="">
              {availableTeachers.length === 0
                ? "Atanabilecek öğretmen yok"
                : "Öğretmen seç"}
            </option>

            {availableTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName} {teacher.email ? `- ${teacher.email}` : ""}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={availableTeachers.length === 0}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ata
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {assignedTeachers.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
              Bu kursa henüz öğretmen atanmadı.
            </div>
          ) : (
            assignedTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4"
              >
                <div>
                  <p className="font-black text-slate-950">
                    {teacher.fullName}
                  </p>
                  <p className="text-sm text-slate-500">{teacher.email}</p>
                </div>

                <form action={removeTeacherFromCourseAction}>
                  <input type="hidden" name="courseId" value={data.course.id} />
                  <input type="hidden" name="teacherId" value={teacher.id} />
                  <button
                    type="submit"
                    className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-50"
                  >
                    Kaldır
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Öğrenci Kaydı
          </p>
          <h2 className="mt-2 text-xl font-black text-slate-950">
            Kurs öğrencileri
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Öğrenciyi kursa kaydedince öğrenci kendi panelinde bu kursu görür.
          </p>
        </div>

        <form
          action={enrollStudentToCourseAction}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <input type="hidden" name="courseId" value={data.course.id} />

          <select
            name="studentId"
            required
            disabled={availableStudents.length === 0}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="">
              {availableStudents.length === 0
                ? "Kaydedilebilecek öğrenci yok"
                : "Öğrenci seç"}
            </option>

            {availableStudents.map((student) => (
              <option key={student.id} value={student.id}>
                {student.fullName} {student.email ? `- ${student.email}` : ""}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={availableStudents.length === 0}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Kaydet
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {data.enrollments.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
              Bu kursa henüz öğrenci kaydedilmedi.
            </div>
          ) : (
            data.enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4"
              >
                <div>
                  <p className="font-black text-slate-950">
                    {enrollment.studentName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {enrollment.studentEmail}
                  </p>
                  <p className="mt-1 text-xs font-bold text-indigo-600">
                    {formatEnrollmentStatus(enrollment.status)}
                  </p>
                </div>

                <form action={removeStudentEnrollmentAction}>
                  <input type="hidden" name="courseId" value={data.course.id} />
                  <input
                    type="hidden"
                    name="enrollmentId"
                    value={enrollment.id}
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-50"
                  >
                    Kaydı Sil
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}