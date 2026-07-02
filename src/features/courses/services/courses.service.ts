import type {
  CourseGradeLevel,
  CourseListItem,
  CourseStats,
  CourseStatus
} from "../types/courses.types";

const mockCourses: CourseListItem[] = [
  {
    id: "course-lgs-8",
    title: "8. Sınıf LGS Matematik",
    slug: "8-sinif-lgs-matematik",
    description:
      "LGS hazırlık sürecinde konu anlatımı, yeni nesil soru çözümü ve düzenli takip.",
    gradeLevel: "lgs",
    status: "published",
    price: 3500,
    coverImageUrl: null,
    teacherNames: ["Ayşe Öğretmen"],
    teacherIds: ["user-teacher-1"],
    enrollmentCount: 18,
    liveLessonCount: 12,
    materialCount: 34,
    assignmentCount: 9,
    createdAt: "2026-07-01T09:00:00.000Z",
    updatedAt: "2026-07-02T09:00:00.000Z"
  },
  {
    id: "course-tyt",
    title: "TYT Matematik Kampı",
    slug: "tyt-matematik-kampi",
    description:
      "TYT matematikte temel kavramlardan problem çözümüne kadar planlı kamp programı.",
    gradeLevel: "tyt",
    status: "published",
    price: 4200,
    coverImageUrl: null,
    teacherNames: ["Mehmet Öğretmen"],
    teacherIds: ["user-teacher-2"],
    enrollmentCount: 14,
    liveLessonCount: 10,
    materialCount: 28,
    assignmentCount: 7,
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-02T10:00:00.000Z"
  },
  {
    id: "course-ayt",
    title: "AYT Matematik",
    slug: "ayt-matematik",
    description:
      "AYT matematik için ileri seviye konu anlatımı, deneme analizi ve ödev takibi.",
    gradeLevel: "ayt",
    status: "draft",
    price: 4800,
    coverImageUrl: null,
    teacherNames: ["Ayşe Öğretmen", "Mehmet Öğretmen"],
    teacherIds: ["user-teacher-1", "user-teacher-2"],
    enrollmentCount: 0,
    liveLessonCount: 0,
    materialCount: 6,
    assignmentCount: 0,
    createdAt: "2026-07-02T11:00:00.000Z",
    updatedAt: "2026-07-02T11:00:00.000Z"
  },
  {
    id: "course-9",
    title: "9. Sınıf Matematik",
    slug: "9-sinif-matematik",
    description:
      "Lise başlangıcında temel matematik becerisini güçlendiren düzenli ders programı.",
    gradeLevel: "9",
    status: "published",
    price: 3000,
    coverImageUrl: null,
    teacherNames: ["Ayşe Öğretmen"],
    teacherIds: ["user-teacher-1"],
    enrollmentCount: 10,
    liveLessonCount: 8,
    materialCount: 21,
    assignmentCount: 5,
    createdAt: "2026-07-02T12:00:00.000Z",
    updatedAt: "2026-07-02T12:00:00.000Z"
  }
];

export async function getCourses(): Promise<CourseListItem[]> {
  return mockCourses;
}

export async function getPublishedCourses(): Promise<CourseListItem[]> {
  return mockCourses.filter((course) => course.status === "published");
}

export async function getCourseById(
  courseId: string
): Promise<CourseListItem | null> {
  return mockCourses.find((course) => course.id === courseId) ?? null;
}

export async function getCourseBySlug(
  slug: string
): Promise<CourseListItem | null> {
  return mockCourses.find((course) => course.slug === slug) ?? null;
}

export async function getCoursesByStatus(
  status: CourseStatus
): Promise<CourseListItem[]> {
  return mockCourses.filter((course) => course.status === status);
}

export async function getCoursesByGradeLevel(
  gradeLevel: CourseGradeLevel
): Promise<CourseListItem[]> {
  return mockCourses.filter((course) => course.gradeLevel === gradeLevel);
}

export async function getCoursesForTeacher(
  teacherId = "user-teacher-1"
): Promise<CourseListItem[]> {
  return mockCourses.filter((course) => course.teacherIds.includes(teacherId));
}

export async function getCoursesForStudent(): Promise<CourseListItem[]> {
  return mockCourses.filter((course) => course.status === "published").slice(0, 2);
}

export async function getCourseStats(): Promise<CourseStats> {
  return {
    totalCourses: mockCourses.length,
    publishedCourses: mockCourses.filter(
      (course) => course.status === "published"
    ).length,
    draftCourses: mockCourses.filter((course) => course.status === "draft")
      .length,
    archivedCourses: mockCourses.filter(
      (course) => course.status === "archived"
    ).length,
    totalEnrollments: mockCourses.reduce(
      (total, course) => total + course.enrollmentCount,
      0
    )
  };
}

export function getCourseStatusLabel(status: CourseStatus): string {
  const labels: Record<CourseStatus, string> = {
    draft: "Taslak",
    published: "Yayında",
    archived: "Arşiv"
  };

  return labels[status];
}

export function getCourseGradeLevelLabel(gradeLevel: CourseGradeLevel): string {
  const labels: Record<CourseGradeLevel, string> = {
    "5": "5. Sınıf",
    "6": "6. Sınıf",
    "7": "7. Sınıf",
    "8": "8. Sınıf",
    "9": "9. Sınıf",
    "10": "10. Sınıf",
    "11": "11. Sınıf",
    "12": "12. Sınıf",
    tyt: "TYT",
    ayt: "AYT",
    lgs: "LGS",
    other: "Diğer"
  };

  return labels[gradeLevel];
}

export function formatCoursePrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "Fiyat belirtilmedi";
  }

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(price);
}