import type { UserRole } from "@/shared/types/role.types";

import type {
  UserListItem,
  UserRoleOption,
  UserStats
} from "../types/users.types";

const mockUsers: UserListItem[] = [
  {
    id: "user-admin-1",
    fullName: "Parsmatematik Admin",
    email: "admin@parsmatematik.com",
    role: "admin",
    status: "active",
    phone: "+90 500 000 00 00",
    avatarUrl: null,
    createdAt: "2026-07-01T09:00:00.000Z"
  },
  {
    id: "user-teacher-1",
    fullName: "Ayşe Öğretmen",
    email: "ayse@parsmatematik.com",
    role: "teacher",
    status: "active",
    phone: "+90 500 111 11 11",
    avatarUrl: null,
    createdAt: "2026-07-01T10:00:00.000Z"
  },
  {
    id: "user-teacher-2",
    fullName: "Mehmet Öğretmen",
    email: "mehmet@parsmatematik.com",
    role: "teacher",
    status: "active",
    phone: "+90 500 222 22 22",
    avatarUrl: null,
    createdAt: "2026-07-01T11:00:00.000Z"
  },
  {
    id: "user-student-1",
    fullName: "Zeynep Yılmaz",
    email: "zeynep@example.com",
    role: "student",
    status: "pending",
    phone: "+90 500 333 33 33",
    avatarUrl: null,
    createdAt: "2026-07-02T08:30:00.000Z"
  },
  {
    id: "user-student-2",
    fullName: "Emir Kaya",
    email: "emir@example.com",
    role: "student",
    status: "active",
    phone: "+90 500 444 44 44",
    avatarUrl: null,
    createdAt: "2026-07-02T09:15:00.000Z"
  }
];

export const userRoleOptions: UserRoleOption[] = [
  {
    label: "Admin",
    value: "admin",
    description: "Tüm sistemi yönetebilir."
  },
  {
    label: "Öğretmen",
    value: "teacher",
    description: "Kendi kurslarını, derslerini ve öğrencilerini yönetir."
  },
  {
    label: "Öğrenci",
    value: "student",
    description: "Kayıtlı olduğu dersleri ve ödevleri görüntüler."
  },
  {
    label: "Veli",
    value: "parent",
    description: "Bağlı olduğu öğrencinin ilerlemesini takip eder."
  }
];

export async function getUsers(): Promise<UserListItem[]> {
  return mockUsers;
}

export async function getUsersByRole(role: UserRole): Promise<UserListItem[]> {
  return mockUsers.filter((user) => user.role === role);
}

export async function getUserById(id: string): Promise<UserListItem | null> {
  return mockUsers.find((user) => user.id === id) ?? null;
}

export async function getUserStats(): Promise<UserStats> {
  return {
    totalUsers: mockUsers.length,
    adminCount: mockUsers.filter((user) => user.role === "admin").length,
    teacherCount: mockUsers.filter((user) => user.role === "teacher").length,
    studentCount: mockUsers.filter((user) => user.role === "student").length,
    parentCount: mockUsers.filter((user) => user.role === "parent").length,
    pendingCount: mockUsers.filter((user) => user.status === "pending").length
  };
}

export function getUserRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Admin",
    teacher: "Öğretmen",
    student: "Öğrenci",
    parent: "Veli"
  };

  return labels[role];
}

export function getUserRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    admin: "Sistem yöneticisi",
    teacher: "Ders ve öğrenci yönetimi",
    student: "Ders alan kullanıcı",
    parent: "Öğrenci takip hesabı"
  };

  return descriptions[role];
}