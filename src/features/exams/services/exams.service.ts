import type {
  ExamListItem,
  ExamQuestion,
  ExamStats,
  ExamStatus,
  ExamSubmission
} from "../types/exams.types";

const mockExams: ExamListItem[] = [
  {
    id: "exam-lgs-1",
    courseId: "course-lgs-8",
    courseTitle: "8. Sınıf LGS Matematik",
    teacherId: "user-teacher-1",
    teacherName: "Ayşe Öğretmen",
    title: "LGS Çarpanlar ve Katlar Denemesi",
    description: "Çarpanlar, katlar, EBOB ve EKOK konularını ölçen mini sınav.",
    startsAt: "2026-07-06T17:00:00.000Z",
    endsAt: "2026-07-06T18:00:00.000Z",
    durationMinutes: 45,
    status: "published",
    questionCount: 2,
    submissionCount: 16,
    averageScore: 78,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-07-02T09:00:00.000Z"
  },
  {
    id: "exam-tyt-1",
    courseId: "course-tyt",
    courseTitle: "TYT Matematik Kampı",
    teacherId: "user-teacher-2",
    teacherName: "Mehmet Öğretmen",
    title: "TYT Problemler Quiz",
    description: "Problemler konusuna giriş düzeyi kısa quiz.",
    startsAt: "2026-07-07T18:00:00.000Z",
    endsAt: "2026-07-07T18:40:00.000Z",
    durationMinutes: 30,
    status: "published",
    questionCount: 1,
    submissionCount: 11,
    averageScore: 71,
    createdAt: "2026-07-02T10:00:00.000Z",
    updatedAt: "2026-07-02T10:00:00.000Z"
  },
  {
    id: "exam-9-1",
    courseId: "course-9",
    courseTitle: "9. Sınıf Matematik",
    teacherId: "user-teacher-1",
    teacherName: "Ayşe Öğretmen",
    title: "Kümeler Tarama Testi",
    description: "Kümelerde temel kavramlar ve işlemler.",
    startsAt: null,
    endsAt: null,
    durationMinutes: 40,
    status: "draft",
    questionCount: 1,
    submissionCount: 0,
    averageScore: null,
    createdAt: "2026-07-01T12:00:00.000Z",
    updatedAt: "2026-07-01T12:00:00.000Z"
  }
];

const mockQuestions: ExamQuestion[] = [
  {
    id: "question-lgs-1",
    examId: "exam-lgs-1",
    questionText: "36 ve 48 sayılarının EBOB'u kaçtır?",
    questionType: "multiple_choice",
    options: ["6", "8", "12", "16"],
    correctOptionIndex: 2,
    score: 10,
    order: 1
  },
  {
    id: "question-lgs-2",
    examId: "exam-lgs-1",
    questionText: "12 sayısı 48'in bir çarpanıdır.",
    questionType: "true_false",
    options: ["Doğru", "Yanlış"],
    correctOptionIndex: 0,
    score: 10,
    order: 2
  },
  {
    id: "question-tyt-1",
    examId: "exam-tyt-1",
    questionText: "Bir işçi bir işi 6 günde, diğeri 3 günde bitirirse birlikte kaç günde bitirirler?",
    questionType: "multiple_choice",
    options: ["1", "2", "3", "4"],
    correctOptionIndex: 1,
    score: 10,
    order: 1
  },
  {
    id: "question-9-1",
    examId: "exam-9-1",
    questionText: "A kümesinin eleman sayısı nasıl gösterilir?",
    questionType: "short_answer",
    options: [],
    correctOptionIndex: null,
    score: 10,
    order: 1
  }
];

const mockSubmissions: ExamSubmission[] = [
  {
    id: "exam-submission-1",
    examId: "exam-lgs-1",
    studentId: "user-student-1",
    studentName: "Zeynep Yılmaz",
    answers: [
      {
        questionId: "question-lgs-1",
        answer: "12",
        isCorrect: true,
        score: 10
      },
      {
        questionId: "question-lgs-2",
        answer: "Doğru",
        isCorrect: true,
        score: 10
      }
    ],
    startedAt: "2026-07-06T17:05:00.000Z",
    submittedAt: "2026-07-06T17:35:00.000Z",
    score: 20,
    maxScore: 20,
    feedback: "Çok iyi.",
    status: "graded"
  },
  {
    id: "exam-submission-2",
    examId: "exam-tyt-1",
    studentId: "user-student-2",
    studentName: "Emir Kaya",
    answers: [
      {
        questionId: "question-tyt-1",
        answer: "2",
        isCorrect: true,
        score: 10
      }
    ],
    startedAt: "2026-07-07T18:01:00.000Z",
    submittedAt: "2026-07-07T18:22:00.000Z",
    score: 10,
    maxScore: 10,
    feedback: null,
    status: "submitted"
  }
];

export async function getExams(): Promise<ExamListItem[]> {
  return mockExams;
}

export async function getTeacherExams(
  teacherId = "user-teacher-1"
): Promise<ExamListItem[]> {
  return mockExams.filter((exam) => exam.teacherId === teacherId);
}

export async function getStudentExams(): Promise<ExamListItem[]> {
  return mockExams.filter((exam) => exam.status !== "draft");
}

export async function getExamById(id: string): Promise<ExamListItem | null> {
  return mockExams.find((exam) => exam.id === id) ?? null;
}

export async function getExamQuestions(
  examId: string
): Promise<ExamQuestion[]> {
  return mockQuestions
    .filter((question) => question.examId === examId)
    .sort((a, b) => a.order - b.order);
}

export async function getExamSubmissions(
  examId: string
): Promise<ExamSubmission[]> {
  return mockSubmissions.filter((submission) => submission.examId === examId);
}

export async function getRecentExamSubmissions(): Promise<ExamSubmission[]> {
  return mockSubmissions;
}

export async function getStudentExamResult(
  examId: string,
  studentId = "user-student-1"
): Promise<ExamSubmission | null> {
  return (
    mockSubmissions.find(
      (submission) =>
        submission.examId === examId && submission.studentId === studentId
    ) ?? null
  );
}

export async function getExamStats(): Promise<ExamStats> {
  return {
    totalExams: mockExams.length,
    draftExams: mockExams.filter((exam) => exam.status === "draft").length,
    publishedExams: mockExams.filter((exam) => exam.status === "published")
      .length,
    closedExams: mockExams.filter((exam) => exam.status === "closed").length,
    totalSubmissions: mockExams.reduce(
      (total, exam) => total + exam.submissionCount,
      0
    )
  };
}

export function getExamStatusLabel(status: ExamStatus): string {
  const labels: Record<ExamStatus, string> = {
    draft: "Taslak",
    published: "Yayında",
    closed: "Kapandı"
  };

  return labels[status];
}

export function formatExamDate(value: string | null | undefined): string {
  if (!value) {
    return "Tarih yok";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatExamDuration(
  durationMinutes: number | null | undefined
): string {
  if (!durationMinutes) {
    return "Süre yok";
  }

  return `${durationMinutes} dakika`;
}

export function getExamMaxScore(questions: ExamQuestion[]): number {
  return questions.reduce((total, question) => total + question.score, 0);
}