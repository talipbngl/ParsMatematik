"use client";

type JitsiMeetingProps = {
  roomUrl: string;
  title?: string | undefined;
};

export function JitsiMeeting({
  roomUrl,
  title = "Parsmatematik Canlı Ders"
}: JitsiMeetingProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-sm">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs text-white/60">
          Jitsi iframe entegrasyon alanı.
        </p>
      </div>

      <iframe
        src={roomUrl}
        title={title}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        className="h-[640px] w-full bg-slate-950"
      />
    </div>
  );
}