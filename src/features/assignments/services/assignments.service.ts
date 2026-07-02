import type {
  AssignmentListItem,
  AssignmentStats,
  AssignmentStatus,
  AssignmentSubmission
} from "../types/assignments.types";

const mockAssignments: AssignmentListItem[] = [
  {
    id: "assignment-lgs-1",
    courseId: "course-lgs-8",
    courseTitle: "8. Sınıf LGS Matematik",
    teacherId: "user-teacher-1",
    teacherName: "Ayşe Öğretmen",
    title: "Çarpanlar ve Katlar Ödevi",
    description:
      "Konu tekrarından sonra verilen 20 soruluk yeni nesil soru çalışması.",
    dueAt: "2026-07-08T20:00:00.000Z",
    maxScore: 100,
    status: "published",
    submissionCount: 12,
    gradedCount: 8,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-07-02T09:00:00.000Z"
  },
  {
    id: "assignment-tyt-1",
    courseId: "course-tyt",
    courseTitle: "TYT Matematik Kampı",
    teacherId: "user-teacher-2",
    teacherName: "Mehmet Öğretmen",
    title: "Problemler Giriş Ödevi",
    description:
      "Yaş, işçi, yüzde ve kar-zarar problemlerinden oluşan karma çalışma.",
    dueAt: "2026-07-09T21:00:00.000Z",
    maxScore: 100,
    status: "published",
    submissionCount: 9,
    gradedCount: 4,
    createdAt: "2026-07-02T10:00:00.000Z",
    updatedAt: "2026-07-02T10:00:00.000Z"
  },
  {
    id: "assignment-9-1",
    courseId: "course-9",
    courseTitle: "9. Sınıf Matematik",
    teacherId: "user-teacher-1",
    teacherName: "Ayşe Öğretmen",
    title: "Kümeler Tekrar Ödevi",
    description: "Kümelerde işlemler ve Venn şeması soruları.",
    dueAt: "2026-07-06T19:00:00.000Z",
    maxScore: 50,
    status: "closed",
    submissionCount: 10,
    gradedCount: 10,
    createdAt: "2026-07-01T12:00:00.000Z",
    updatedAt: "2026-07-01T12:00:00.000Z"
  }
];

const mockSubmissions: AssignmentSubmission[] = [
  {
    id: "submission-1",
    assignmentId: "assignment-lgs-1",
    studentId: "user-student-1",
    studentName: "Zeynep Yılmaz",
    answerText: "Çözümleri defterime yaptım, fotoğraf olarak ekledim.",
    filePath: "/mock/submission-1.pdf",
    submittedAt: "2026-07-03T18:00:00.000Z",
    score: 85,
    feedback: "Genel olarak iyi, 14. soruyu tekrar kontrol et.",
    status: "graded"
  },
  {
    id: "submission-2",
    assignmentId: "assignment-lgs-1",
    studentId: "user-student-2",
    studentName: "Emir Kaya",
    answerText: "Çözümler tamamlandı.",
    filePath: null,
    submittedAt: "2026-07-03T19:00:00.000Z",
    score: null,
    feedback: null,
    status: "submitted"
  },
  {
    id: "submission-3",
    assignmentId: "assignment-9-1",
    studentId: "user-student-3",
    studentName: "Elif Demir",
    answerText: "Kümeler ödevini tamamladım.",
    filePath: null,
    submittedAt: "2026-07-02T15:20:00.000Z",
    score: 48,
    feedback: "Çok iyi.",
    status: "graded"
  }
];

export async function getAssignments(): Promise<AssignmentListItem[]> {
  return mockAssignments;
}

export async function getTeacherAssignments(
  teacherId = "user-teacher-1"
): Promise<AssignmentListItem[]> {
  return mockAssignments.filter(
    (assignment) => assignment.teacherId === teacherId
  );
}

export async function getStudentAssignments(): Promise<AssignmentListItem[]> {
  return mockAssignments.filter((assignment) => assignment.status !== "draft");
}

export async function getAssignmentById(
  id: string
): Promise<AssignmentListItem | null> {
  return mockAssignments.find((assignment) => assignment.id === id) ?? null;
}

export async function getAssignmentSubmissions(
  assignmentId: string
): Promise<AssignmentSubmission[]> {
  return mockSubmissions.filter(
    (submission) => submission.assignmentId === assignmentId
  );
}

export async function getRecentAssignmentSubmissions(): Promise<
  AssignmentSubmission[]
> {
  return mockSubmissions;
}

export async function getAssignmentStats(): Promise<AssignmentStats> {
  return {
    totalAssignments: mockAssignments.length,
    draftAssignments: mockAssignments.filter(
      (assignment) => assignment.status === "draft"
    ).length,
    publishedAssignments: mockAssignments.filter(
      (assignment) => assignment.status === "published"
    ).length,
    closedAssignments: mockAssignments.filter(
      (assignment) => assignment.status === "closed"
    ).length,
    totalSubmissions: mockAssignments.reduce(
      (total, assignment) => total + assignment.submissionCount,
      0
    ),
    gradedSubmissions: mockAssignments.reduce(
      (total, assignment) => total + assignment.gradedCount,
      0
    )
  };
}

export function getAssignmentStatusLabel(status: AssignmentStatus): string {
  const labels: Record<AssignmentStatus, string> = {
    draft: "Taslak",
    published: "Yayında",
    closed: "Kapandı"
  };

  return labels[status];
}

export function formatAssignmentDate(value: string | null | undefined): string {
  if (!value) {
    return "Teslim tarihi yok";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}