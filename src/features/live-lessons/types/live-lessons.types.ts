export type LiveLessonStatus = "scheduled" | "live" | "completed" | "cancelled";

export type LiveLessonProvider = "external" | "google-meet" | "zoom" | "jitsi";

export type LiveLessonListItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description?: string | null | undefined;
  startsAt: string;
  endsAt?: string | null | undefined;
  durationMinutes: number;
  meetingUrl?: string | null | undefined;
  recordingUrl?: string | null | undefined;
  provider: LiveLessonProvider;
  status: LiveLessonStatus;
  attendeeCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateLiveLessonInput = {
  courseId: string;
  title: string;
  description?: string | undefined;
  startsAt: string;
  durationMinutes: number;
  meetingUrl?: string | undefined;
  provider?: LiveLessonProvider | undefined;
  status?: LiveLessonStatus | undefined;
};

export type UpdateLiveLessonInput = {
  id: string;
  courseId?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  startsAt?: string | undefined;
  durationMinutes?: number | undefined;
  meetingUrl?: string | undefined;
  provider?: LiveLessonProvider | undefined;
  status?: LiveLessonStatus | undefined;
};

export type LiveLessonStats = {
  totalLessons: number;
  scheduledLessons: number;
  liveLessons: number;
  completedLessons: number;
  cancelledLessons: number;
};