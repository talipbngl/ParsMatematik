import type { LiveLessonProvider } from "../types/live-lessons.types";

export type MeetingProviderMeta = {
  label: string;
  description: string;
  supportsEmbed: boolean;
};

export function getMeetingProviderMeta(
  provider: LiveLessonProvider
): MeetingProviderMeta {
  const providers: Record<LiveLessonProvider, MeetingProviderMeta> = {
    external: {
      label: "Harici Link",
      description: "Google Meet, Zoom veya farklı bir dış bağlantı.",
      supportsEmbed: false
    },
    "google-meet": {
      label: "Google Meet",
      description: "Google Meet bağlantısı ile canlı ders.",
      supportsEmbed: false
    },
    zoom: {
      label: "Zoom",
      description: "Zoom bağlantısı ile canlı ders.",
      supportsEmbed: false
    },
    jitsi: {
      label: "Jitsi",
      description: "Jitsi Meet iframe ile gömülebilir canlı ders.",
      supportsEmbed: true
    }
  };

  return providers[provider];
}

export function isEmbeddableProvider(provider: LiveLessonProvider): boolean {
  return getMeetingProviderMeta(provider).supportsEmbed;
}

export function getProviderLabel(provider: LiveLessonProvider): string {
  return getMeetingProviderMeta(provider).label;
}

export function getSafeMeetingUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

export function createJitsiRoomUrl(roomName: string): string {
  const safeRoomName = roomName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `https://meet.jit.si/${safeRoomName || "parsmatematik-ders"}`;
}