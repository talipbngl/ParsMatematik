export type CourseStatus = "draft" | "published" | "archived";

export type CourseGradeLevel =
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "tyt"
  | "ayt"
  | "lgs"
  | "other";

export type CourseListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  gradeLevel: CourseGradeLevel;
  status: CourseStatus;
  price?: number | null | undefined;
  coverImageUrl?: string | null | undefined;
  teacherNames: string[];
  teacherIds: string[];
  enrollmentCount: number;
  liveLessonCount: number;
  materialCount: number;
  assignmentCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseDetail = CourseListItem & {
  longDescription?: string | null | undefined;
  outcomes: string[];
  targetAudience: string[];
  weeklyLessonCount?: number | null | undefined;
  durationWeeks?: number | null | undefined;
};

export type CreateCourseInput = {
  title: string;
  description?: string | undefined;
  gradeLevel: CourseGradeLevel;
  price?: number | undefined;
  status?: CourseStatus | undefined;
};

export type UpdateCourseInput = {
  id: string;
  title?: string | undefined;
  description?: string | undefined;
  gradeLevel?: CourseGradeLevel | undefined;
  price?: number | undefined;
  status?: CourseStatus | undefined;
};

export type CourseStats = {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  archivedCourses: number;
  totalEnrollments: number;
};

export type CourseAudience = "public" | "admin" | "teacher" | "student";