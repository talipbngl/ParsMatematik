export type ID = string;

export type ISODateString = string;

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

export type AsyncState = "idle" | "loading" | "success" | "error";

export type EntityStatus = "draft" | "active" | "archived";

export type PaymentStatus = "pending" | "approved" | "rejected" | "refunded";

export type LessonStatus =
  | "scheduled"
  | "live"
  | "completed"
  | "cancelled"
  | "postponed";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type GradeLevel =
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "lgs"
  | "tyt"
  | "ayt"
  | "mezun"
  | "other";

export type SelectOption<TValue extends string = string> = {
  label: string;
  value: TValue;
  description?: string;
  disabled?: boolean;
};

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginatedResult<TItem> = {
  items: TItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type SortDirection = "asc" | "desc";

export type SortParams<TField extends string = string> = {
  field: TField;
  direction: SortDirection;
};

export type SearchParams = {
  query?: string;
  page?: string;
  pageSize?: string;
  sort?: string;
};

export type ActionResult<TData = null> =
  | {
      success: true;
      message: string;
      data: TData;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export type ServerActionState<TData = null> = {
  success: boolean;
  message: string;
  data?: TData;
  fieldErrors?: Record<string, string[]>;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type NavLink = {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
};

export type StatCardItem = {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: string;
    label: string;
    direction: "up" | "down" | "neutral";
  };
};