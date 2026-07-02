import type {
  EntityStatus,
  GradeLevel,
  ISODateString,
  LessonStatus,
  PaymentStatus
} from "@/shared/types/common.types";
import type { UserRole } from "@/shared/types/role.types";

export type Json =
  | string
  | number
  | boolean
  | null
  | {
      [key: string]: Json | undefined;
    }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: UserRole;
          avatar_url: string | null;
          phone: string | null;
          bio: string | null;
          is_active: boolean;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: UserRole;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          is_active?: boolean;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: UserRole;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          is_active?: boolean;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [];
      };

      courses: {
        Row: {
          id: string;
          teacher_id: string;
          title: string;
          slug: string;
          description: string;
          grade_level: GradeLevel;
          status: EntityStatus;
          price: number;
          cover_image_url: string | null;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          title: string;
          slug: string;
          description: string;
          grade_level: GradeLevel;
          status?: EntityStatus;
          price?: number;
          cover_image_url?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          title?: string;
          slug?: string;
          description?: string;
          grade_level?: GradeLevel;
          status?: EntityStatus;
          price?: number;
          cover_image_url?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "courses_teacher_id_fkey";
            columns: ["teacher_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      course_enrollments: {
        Row: {
          id: string;
          course_id: string;
          student_id: string;
          status: EntityStatus;
          enrolled_at: ISODateString;
        };
        Insert: {
          id?: string;
          course_id: string;
          student_id: string;
          status?: EntityStatus;
          enrolled_at?: ISODateString;
        };
        Update: {
          id?: string;
          course_id?: string;
          student_id?: string;
          status?: EntityStatus;
          enrolled_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey";
            columns: ["student_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      live_lessons: {
        Row: {
          id: string;
          course_id: string;
          teacher_id: string;
          title: string;
          description: string | null;
          starts_at: ISODateString;
          ends_at: ISODateString;
          meeting_url: string;
          meeting_provider: "external" | "meet" | "jitsi";
          status: LessonStatus;
          recording_url: string | null;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          course_id: string;
          teacher_id: string;
          title: string;
          description?: string | null;
          starts_at: ISODateString;
          ends_at: ISODateString;
          meeting_url: string;
          meeting_provider?: "external" | "meet" | "jitsi";
          status?: LessonStatus;
          recording_url?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          course_id?: string;
          teacher_id?: string;
          title?: string;
          description?: string | null;
          starts_at?: ISODateString;
          ends_at?: ISODateString;
          meeting_url?: string;
          meeting_provider?: "external" | "meet" | "jitsi";
          status?: LessonStatus;
          recording_url?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "live_lessons_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "live_lessons_teacher_id_fkey";
            columns: ["teacher_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      materials: {
        Row: {
          id: string;
          course_id: string;
          uploader_id: string;
          title: string;
          description: string | null;
          file_url: string;
          file_path: string;
          file_type: "pdf" | "image" | "video_link" | "external_link";
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          course_id: string;
          uploader_id: string;
          title: string;
          description?: string | null;
          file_url: string;
          file_path: string;
          file_type: "pdf" | "image" | "video_link" | "external_link";
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          course_id?: string;
          uploader_id?: string;
          title?: string;
          description?: string | null;
          file_url?: string;
          file_path?: string;
          file_type?: "pdf" | "image" | "video_link" | "external_link";
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "materials_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "materials_uploader_id_fkey";
            columns: ["uploader_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      assignments: {
        Row: {
          id: string;
          course_id: string;
          teacher_id: string;
          title: string;
          description: string;
          due_at: ISODateString | null;
          status: EntityStatus;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          course_id: string;
          teacher_id: string;
          title: string;
          description: string;
          due_at?: ISODateString | null;
          status?: EntityStatus;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          course_id?: string;
          teacher_id?: string;
          title?: string;
          description?: string;
          due_at?: ISODateString | null;
          status?: EntityStatus;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "assignments_teacher_id_fkey";
            columns: ["teacher_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      assignment_submissions: {
        Row: {
          id: string;
          assignment_id: string;
          student_id: string;
          file_url: string | null;
          answer_text: string | null;
          feedback: string | null;
          grade: number | null;
          submitted_at: ISODateString;
          graded_at: ISODateString | null;
        };
        Insert: {
          id?: string;
          assignment_id: string;
          student_id: string;
          file_url?: string | null;
          answer_text?: string | null;
          feedback?: string | null;
          grade?: number | null;
          submitted_at?: ISODateString;
          graded_at?: ISODateString | null;
        };
        Update: {
          id?: string;
          assignment_id?: string;
          student_id?: string;
          file_url?: string | null;
          answer_text?: string | null;
          feedback?: string | null;
          grade?: number | null;
          submitted_at?: ISODateString;
          graded_at?: ISODateString | null;
        };
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey";
            columns: ["assignment_id"];
            referencedRelation: "assignments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "assignment_submissions_student_id_fkey";
            columns: ["student_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      exams: {
        Row: {
          id: string;
          course_id: string;
          teacher_id: string;
          title: string;
          description: string | null;
          duration_minutes: number;
          status: EntityStatus;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          course_id: string;
          teacher_id: string;
          title: string;
          description?: string | null;
          duration_minutes?: number;
          status?: EntityStatus;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          course_id?: string;
          teacher_id?: string;
          title?: string;
          description?: string | null;
          duration_minutes?: number;
          status?: EntityStatus;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "exams_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exams_teacher_id_fkey";
            columns: ["teacher_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      payments: {
        Row: {
          id: string;
          student_id: string;
          course_id: string;
          amount: number;
          status: PaymentStatus;
          note: string | null;
          approved_by: string | null;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          student_id: string;
          course_id: string;
          amount: number;
          status?: PaymentStatus;
          note?: string | null;
          approved_by?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          student_id?: string;
          course_id?: string;
          amount?: number;
          status?: PaymentStatus;
          note?: string | null;
          approved_by?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey";
            columns: ["student_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};