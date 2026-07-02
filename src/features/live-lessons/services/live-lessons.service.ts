import type {
  LiveLessonListItem,
  LiveLessonStats,
  LiveLessonStatus
} from "../types/live-lessons.types";

const mockLiveLessons: LiveLessonListItem[] = [
  {
    id: "live-lgs-1",
    courseId: "course-lgs-8",
    courseTitle: "8. Sınıf LGS Matematik",
    teacherId: "user-teacher-1",
    teacherName: "Ayşe Öğretmen",
    title: "Çarpanlar ve Katlar Canlı Ders",
    description: "LGS için temel konu anlatımı ve yeni nesil soru çözümü.",
    startsAt: "2026-07-04T18:00:00.000Z",
    endsAt: "2026-07-04T19:30:00.000Z",
    durationMinutes: 90,
    meetingUrl: "https://meet.google.com/example-lgs",
    recordingUrl: null,
    provider: "google-meet",
    status: "scheduled",
    attendeeCount: 18,
    createdAt: "2026-07-02T09:00:00.000Z",
    updatedAt: "2026-07-02T09:00:00.000Z"
  },
  {
    id: "live-tyt-1",
    courseId: "course-tyt",
    courseTitle: "TYT Matematik Kampı",
    teacherId: "user-teacher-2",
    teacherName: "Mehmet Öğretmen",
    title: "TYT Problemler Giriş",
    description: "Problem türleri ve çözüm stratejileri.",
    startsAt: "2026-07-05T17:00:00.000Z",
    endsAt: "2026-07-05T18:30:00.000Z",
    durationMinutes: 90,
    meetingUrl: "https://zoom.us/j/example-tyt",
    recordingUrl: null,
    provider: "zoom",
    status: "scheduled",
    attendeeCount: 14,
    createdAt: "2026-07-02T10:00:00.000Z",
    updatedAt: "2026-07-02T10:00:00.000Z"
  },
  {
    id: "live-9-1",
    courseId: "course-9",
    courseTitle: "9. Sınıf Matematik",
    teacherId: "user-teacher-1",
    teacherName: "Ayşe Öğretmen",
    title: "Kümeler Tekrar Dersi",
    description: "Kümeler konusu tekrar ve soru çözümü.",
    startsAt: "2026-07-01T16:00:00.000Z",
    endsAt: "2026-07-01T17:00:00.000Z",
    durationMinutes: 60,
    meetingUrl: "https://meet.google.com/example-9",
    recordingUrl: "https://drive.google.com/example-recording",
    provider: "google-meet",
    status: "completed",
    attendeeCount: 10,
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-01T18:00:00.000Z"
  }
];

export async function getLiveLessons(): Promise<LiveLessonListItem[]> {
  return mockLiveLessons;
}

export async function getTeacherLiveLessons(
  teacherId = "user-teacher-1"
): Promise<LiveLessonListItem[]> {
  return mockLiveLessons.filter((lesson) => lesson.teacherId === teacherId);
}

export async function getStudentLiveLessons(): Promise<LiveLessonListItem[]> {
  return mockLiveLessons.filter((lesson) => lesson.status !== "cancelled");
}

export async function getLiveLessonById(
  id: string
): Promise<LiveLessonListItem | null> {
  return mockLiveLessons.find((lesson) => lesson.id === id) ?? null;
}

export async function getLiveLessonStats(): Promise<LiveLessonStats> {
  return {
    totalLessons: mockLiveLessons.length,
    scheduledLessons: mockLiveLessons.filter(
      (lesson) => lesson.status === "scheduled"
    ).length,
    liveLessons: mockLiveLessons.filter((lesson) => lesson.status === "live")
      .length,
    completedLessons: mockLiveLessons.filter(
      (lesson) => lesson.status === "completed"
    ).length,
    cancelledLessons: mockLiveLessons.filter(
      (lesson) => lesson.status === "cancelled"
    ).length
  };
}

export function getLiveLessonStatusLabel(status: LiveLessonStatus): string {
  const labels: Record<LiveLessonStatus, string> = {
    scheduled: "Planlandı",
    live: "Canlı",
    completed: "Tamamlandı",
    cancelled: "İptal"
  };

  return labels[status];
}

export function formatLiveLessonDate(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}