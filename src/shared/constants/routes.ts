export const ROUTES = {
  home: "/",

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password"
  },

  public: {
    courses: "/courses",
    teachers: "/teachers",
    pricing: "/pricing",
    about: "/about",
    contact: "/contact"
  },

  dashboard: {
    index: "/dashboard",

    student: {
      index: "/dashboard/student",
      courses: "/dashboard/student/courses",
      assignments: "/dashboard/student/assignments",
      exams: "/dashboard/student/exams",
      liveLessons: "/dashboard/student/live-lessons",
      profile: "/dashboard/student/profile"
    },

    teacher: {
      index: "/dashboard/teacher",
      courses: "/dashboard/teacher/courses",
      newCourse: "/dashboard/teacher/courses/new",
      assignments: "/dashboard/teacher/assignments",
      newAssignment: "/dashboard/teacher/assignments/new",
      exams: "/dashboard/teacher/exams",
      newExam: "/dashboard/teacher/exams/new",
      liveLessons: "/dashboard/teacher/live-lessons",
      newLiveLesson: "/dashboard/teacher/live-lessons/new",
      students: "/dashboard/teacher/students"
    },

    admin: {
      index: "/dashboard/admin",
      users: "/dashboard/admin/users",
      courses: "/dashboard/admin/courses",
      payments: "/dashboard/admin/payments",
      settings: "/dashboard/admin/settings"
    }
  }
} as const;

export type AppRoutes = typeof ROUTES;

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const AUTH_ROUTE_PREFIXES = ["/auth"] as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function getCourseDetailRoute(courseId: string): string {
  return `/courses/${courseId}`;
}

export function getTeacherDetailRoute(teacherId: string): string {
  return `/teachers/${teacherId}`;
}