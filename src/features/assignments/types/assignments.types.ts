export type AssignmentStatus = "draft" | "published" | "closed";

export type AssignmentSubmissionStatus =
  | "not_submitted"
  | "submitted"
  | "graded"
  | "late";

export type AssignmentListItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  dueAt?: string | null | undefined;
  maxScore?: number | null | undefined;
  status: AssignmentStatus;
  submissionCount: number;
  gradedCount: number;
  createdAt: string;
  updatedAt: string;
};

export type AssignmentSubmission = {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  answerText?: string | null | undefined;
  filePath?: string | null | undefined;
  submittedAt?: string | null | undefined;
  score?: number | null | undefined;
  feedback?: string | null | undefined;
  status: AssignmentSubmissionStatus;
};

export type CreateAssignmentInput = {
  courseId: string;
  title: string;
  description: string;
  dueAt?: string | undefined;
  maxScore?: number | undefined;
  status?: AssignmentStatus | undefined;
};

export type SubmitAssignmentInput = {
  assignmentId: string;
  answerText?: string | undefined;
  filePath?: string | undefined;
};

export type GradeAssignmentInput = {
  submissionId: string;
  score: number;
  feedback?: string | undefined;
};

export type AssignmentStats = {
  totalAssignments: number;
  draftAssignments: number;
  publishedAssignments: number;
  closedAssignments: number;
  totalSubmissions: number;
  gradedSubmissions: number;
};