export type ExamStatus = "draft" | "published" | "closed";

export type ExamQuestionType = "multiple_choice" | "true_false" | "short_answer";

export type ExamListItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  startsAt?: string | null | undefined;
  endsAt?: string | null | undefined;
  durationMinutes?: number | null | undefined;
  status: ExamStatus;
  questionCount: number;
  submissionCount: number;
  averageScore?: number | null | undefined;
  createdAt: string;
  updatedAt: string;
};

export type ExamQuestion = {
  id: string;
  examId: string;
  questionText: string;
  questionType: ExamQuestionType;
  options: string[];
  correctOptionIndex?: number | null | undefined;
  score: number;
  order: number;
};

export type ExamAnswerInput = {
  questionId: string;
  answer: string;
};

export type ExamAnswer = {
  questionId: string;
  answer: string;
  isCorrect?: boolean | null | undefined;
  score?: number | null | undefined;
};

export type ExamSubmission = {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  answers: ExamAnswer[];
  startedAt?: string | null | undefined;
  submittedAt?: string | null | undefined;
  score?: number | null | undefined;
  maxScore: number;
  feedback?: string | null | undefined;
  status: "in_progress" | "submitted" | "graded";
};

export type CreateExamInput = {
  courseId: string;
  title: string;
  description: string;
  startsAt?: string | undefined;
  endsAt?: string | undefined;
  durationMinutes?: number | undefined;
  status?: ExamStatus | undefined;
};

export type SubmitExamInput = {
  examId: string;
  answers: ExamAnswerInput[];
};

export type GradeExamInput = {
  submissionId: string;
  score: number;
  feedback?: string | undefined;
};

export type ExamStats = {
  totalExams: number;
  draftExams: number;
  publishedExams: number;
  closedExams: number;
  totalSubmissions: number;
};