import { createPaymentAction } from "../actions/create-payment.action"
import {
  getMockPaymentCourseOptions,
  getMockPaymentStudentOptions,
} from "../services/payments.service"

export function ManualPaymentForm() {
  const students = getMockPaymentStudentOptions()
  const courses = getMockPaymentCourseOptions()

  return (
    <form
      action={createPaymentAction}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950">
          Manuel Ödeme Kaydı
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          MVP aşamasında online ödeme entegrasyonu yok. Admin, öğrencinin ödeme
          durumunu buradan manuel takip eder.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="student" className="text-sm font-medium text-slate-700">
            Öğrenci
          </label>
          <select
            id="student"
            name="student"
            required
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="" disabled>
              Öğrenci seç
            </option>
            {students.map((student) => (
              <option
                key={student.id}
                value={`${student.id}|${student.label}`}
              >
                {student.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="course" className="text-sm font-medium text-slate-700">
            Kurs
          </label>
          <select
            id="course"
            name="course"
            required
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="" disabled>
              Kurs seç
            </option>
            {courses.map((course) => (
              <option key={course.id} value={`${course.id}|${course.label}`}>
                {course.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="text-sm font-medium text-slate-700">
            Tutar
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="1"
            required
            placeholder="2500"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="currency"
            className="text-sm font-medium text-slate-700"
          >
            Para Birimi
          </label>
          <select
            id="currency"
            name="currency"
            defaultValue="TRY"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="text-sm font-medium text-slate-700"
          >
            Ödeme Yöntemi
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            defaultValue="manual"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="manual">Manuel</option>
            <option value="bank_transfer">Havale / EFT</option>
            <option value="cash">Nakit</option>
            <option value="card">Kart</option>
            <option value="iyzico">iyzico</option>
            <option value="paytr">PayTR</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueAt" className="text-sm font-medium text-slate-700">
            Son Ödeme Tarihi
          </label>
          <input
            id="dueAt"
            name="dueAt"
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="notes" className="text-sm font-medium text-slate-700">
          Admin Notu
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Örn: Veli IBAN ile ödeme yapacak."
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Ödeme Kaydı Oluştur
        </button>
      </div>
    </form>
  )
}