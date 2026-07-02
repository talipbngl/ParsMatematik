import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
  Users,
  Video,
  Zap
} from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site.config";

const platformStats = [
  {
    value: "2",
    label: "Uzman matematik öğretmeni"
  },
  {
    value: "7/24",
    label: "Ders materyali erişimi"
  },
  {
    value: "Canlı",
    label: "Online ders deneyimi"
  },
  {
    value: "Takip",
    label: "Ödev ve sınav kontrolü"
  }
];

const features = [
  {
    title: "Canlı Ders Odaları",
    description:
      "Öğretmenler canlı ders planlayabilir, öğrenciler panelden tek tıkla derse katılabilir.",
    icon: Video
  },
  {
    title: "Ödev Takibi",
    description:
      "Öğrenciler ödevlerini görür, teslim eder; öğretmenler kontrol edip geri bildirim verebilir.",
    icon: ClipboardCheck
  },
  {
    title: "Online Sınavlar",
    description:
      "Konu bazlı quizler, deneme sınavları ve sonuç analiziyle öğrencinin eksikleri görünür.",
    icon: FileText
  },
  {
    title: "Ders Materyalleri",
    description:
      "PDF, video linki, konu anlatımı ve çalışma kağıtları kurslara düzenli şekilde eklenir.",
    icon: BookOpen
  },
  {
    title: "Öğrenci Paneli",
    description:
      "Öğrenci; derslerini, ödevlerini, sınavlarını ve canlı ders takvimini tek ekranda takip eder.",
    icon: GraduationCap
  },
  {
    title: "Performans Raporları",
    description:
      "Öğrencinin gelişimi; ödev, sınav ve katılım verileriyle daha net takip edilir.",
    icon: BarChart3
  }
];

const courseTracks = [
  {
    title: "LGS Matematik",
    description:
      "Yeni nesil sorular, problem çözme stratejileri ve düzenli takip sistemi.",
    badge: "Ortaokul",
    topics: ["Sayılar", "Problemler", "Geometri", "Deneme analizi"]
  },
  {
    title: "TYT Matematik",
    description:
      "Temel kavramlardan problemler ve geometriye kadar sınav odaklı program.",
    badge: "Lise",
    topics: ["Temel kavramlar", "Problemler", "Fonksiyonlar", "Geometri"]
  },
  {
    title: "AYT Matematik",
    description:
      "İleri seviye konular için planlı ders, ödev ve sınav kontrolü.",
    badge: "Üniversite hazırlık",
    topics: ["Trigonometri", "Limit", "Türev", "İntegral"]
  }
];

const timeline = [
  {
    step: "01",
    title: "Seviye belirleme",
    description:
      "Öğrencinin mevcut durumu ve hedefi belirlenir. Eksikler netleştirilir."
  },
  {
    step: "02",
    title: "Kişisel ders planı",
    description:
      "Haftalık canlı dersler, ödevler ve konu tekrarları planlanır."
  },
  {
    step: "03",
    title: "Canlı ders + ödev",
    description:
      "Ders sonrası öğrenciye hedefli ödevler ve çalışma materyalleri atanır."
  },
  {
    step: "04",
    title: "Sınav ve rapor",
    description:
      "Quizler ve denemelerle gelişim ölçülür, sonraki plan buna göre güncellenir."
  }
];

const teacherCards = [
  {
    name: "Matematik Öğretmeni 1",
    role: "LGS & Okul Destek",
    description:
      "Yeni nesil soru çözümü, temel eksik kapatma ve düzenli ödev takibi.",
    initials: "M1"
  },
  {
    name: "Matematik Öğretmeni 2",
    role: "TYT & AYT Matematik",
    description:
      "Sınav stratejisi, konu kampları ve detaylı performans analizi.",
    initials: "M2"
  }
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-screen pars-noise">
        <div className="absolute inset-0 -z-10 pars-grid-bg opacity-60" />

        <header className="pars-container flex items-center justify-between py-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
              <span className="text-lg font-black">P</span>
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">
                {siteConfig.name}
              </p>
              <p className="-mt-1 text-xs font-medium text-muted-foreground">
                Online matematik platformu
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground lg:flex">
            <Link href="/courses" className="transition hover:text-foreground">
              Kurslar
            </Link>
            <Link href="/teachers" className="transition hover:text-foreground">
              Öğretmenler
            </Link>
            <Link href="/pricing" className="transition hover:text-foreground">
              Fiyatlar
            </Link>
            <Link href="/contact" className="transition hover:text-foreground">
              İletişim
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden rounded-full px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-muted sm:inline-flex"
            >
              Giriş Yap
            </Link>

            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
            >
              Başla
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </header>

        <div className="pars-container grid min-h-[calc(100vh-92px)] items-center gap-12 py-14 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-bold text-primary shadow-soft backdrop-blur">
              <Sparkles className="size-4" />
              Canlı ders, ödev, sınav ve takip tek platformda
            </div>

            <h1 className="pars-heading text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Matematikte düzenli takip,
              <span className="pars-gradient-text block">
                güçlü sonuç getirir.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {siteConfig.slogan} Parsmatematik; öğrencinin canlı derslerini,
              ödevlerini, sınavlarını ve gelişimini tek panelde birleştiren
              modern matematik özel ders platformudur.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-black text-primary-foreground shadow-glow transition hover:scale-[1.02]"
              >
                Ücretsiz hesap oluştur
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border bg-white/70 px-7 py-4 text-sm font-black text-foreground shadow-soft backdrop-blur transition hover:bg-white"
              >
                Kursları incele
                <PlayCircle className="size-4 text-primary" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-4">
              {platformStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border bg-white/70 p-4 shadow-soft backdrop-blur"
                >
                  <p className="text-2xl font-black text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden rounded-3xl border bg-white/80 p-4 shadow-card backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-success text-success-foreground">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-black">Ödev teslim edildi</p>
                  <p className="text-xs text-muted-foreground">
                    12 soru kontrol bekliyor
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-12 hidden rounded-3xl border bg-white/80 p-4 shadow-card backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Trophy className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-black">Quiz sonucu</p>
                  <p className="text-xs text-muted-foreground">
                    Problemler: %84 başarı
                  </p>
                </div>
              </div>
            </div>

            <div className="pars-glass rounded-[2rem] p-5">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white/60">
                      Bugünkü canlı ders
                    </p>
                    <h2 className="mt-1 text-2xl font-black">
                      TYT Problemler Kampı
                    </h2>
                  </div>

                  <div className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-black text-red-300">
                    CANLI
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-sky-500 to-amber-400 p-6">
                  <div className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    19:30
                  </div>

                  <div className="flex min-h-64 flex-col justify-between">
                    <div>
                      <div className="flex size-14 items-center justify-center rounded-3xl bg-white/20 backdrop-blur">
                        <Video className="size-7" />
                      </div>

                      <h3 className="mt-8 max-w-sm text-4xl font-black leading-tight">
                        Canlı ders odasına tek tıkla katıl.
                      </h3>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/18 p-3 backdrop-blur">
                        <p className="text-xs font-bold text-white/70">Konu</p>
                        <p className="mt-1 text-sm font-black">Problemler</p>
                      </div>

                      <div className="rounded-2xl bg-white/18 p-3 backdrop-blur">
                        <p className="text-xs font-bold text-white/70">
                          Katılım
                        </p>
                        <p className="mt-1 text-sm font-black">8 öğrenci</p>
                      </div>

                      <div className="rounded-2xl bg-white/18 p-3 backdrop-blur">
                        <p className="text-xs font-bold text-white/70">Ödev</p>
                        <p className="mt-1 text-sm font-black">24 soru</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white/8 p-4">
                    <CalendarDays className="size-5 text-sky-300" />
                    <p className="mt-3 text-sm font-black">Haftalık Plan</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Ders, ödev ve sınav takvimi.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white/8 p-4">
                    <Target className="size-5 text-amber-300" />
                    <p className="mt-3 text-sm font-black">Eksik Analizi</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Konu bazlı ilerleme takibi.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white/8 p-4">
                    <Zap className="size-5 text-indigo-300" />
                    <p className="mt-3 text-sm font-black">Hızlı Geri Bildirim</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Ödev ve sınav sonrası yorum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pars-section bg-white/55">
        <div className="pars-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
              Platform özellikleri
            </p>
            <h2 className="pars-heading mt-4 text-4xl font-black sm:text-5xl">
              Dersin sadece anlatıldığı değil,
              <span className="pars-gradient-text"> takip edildiği </span>
              sistem.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Parsmatematik; öğretmen, öğrenci ve ileride veli tarafını ayrı
              panellerle düşünerek tasarlanır. Her özellik kendi modülünde
              büyür, kodlar birbirine karışmaz.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="pars-card-hover rounded-3xl border bg-white p-6 shadow-soft"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <feature.icon className="size-6" />
                </div>

                <h3 className="mt-6 text-xl font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pars-section">
        <div className="pars-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
              Kurs yolları
            </p>
            <h2 className="pars-heading mt-4 text-4xl font-black sm:text-5xl">
              LGS, TYT, AYT ve okul desteği için ayrı takip planı.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Her öğrenci aynı hızda ilerlemez. Bu yüzden Parsmatematik’te kurs
              sistemi; seviye, hedef, ödev disiplini ve sınav sonucuna göre
              yönetilecek şekilde tasarlanır.
            </p>
          </div>

          <div className="grid gap-5">
            {courseTracks.map((course) => (
              <article
                key={course.title}
                className="rounded-3xl border bg-white p-6 shadow-soft"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-black text-primary">
                      {course.badge}
                    </span>
                    <h3 className="mt-4 text-2xl font-black">
                      {course.title}
                    </h3>
                    <p className="mt-2 leading-7 text-muted-foreground">
                      {course.description}
                    </p>
                  </div>

                  <Link
                    href="/courses"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition hover:bg-muted"
                  >
                    İncele
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pars-section bg-slate-950 text-white">
        <div className="pars-container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
                Ders akışı
              </p>
              <h2 className="pars-heading mt-4 text-4xl font-black sm:text-5xl">
                Öğrenci ne yapacağını her hafta net görür.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/60">
                Platformun amacı sadece canlı ders açmak değil; öğrencinin
                haftalık matematik düzenini görünür hale getirmektir.
              </p>
            </div>

            <div className="grid gap-4">
              {timeline.map((item) => (
                <article
                  key={item.step}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
                >
                  <div className="flex gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950 text-sm font-black">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{item.title}</h3>
                      <p className="mt-2 leading-7 text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pars-section">
        <div className="pars-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
              Öğretmen kadrosu
            </p>
            <h2 className="pars-heading mt-4 text-4xl font-black sm:text-5xl">
              İki öğretmen, tek düzenli sistem.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Parsmatematik ilk aşamada iki matematik öğretmeni için
              tasarlanıyor. Bu yüzden sistem sade, hızlı ve yönetilebilir
              başlayacak.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {teacherCards.map((teacher) => (
              <article
                key={teacher.name}
                className="pars-card-hover rounded-[2rem] border bg-white p-7 shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-3xl bg-primary text-xl font-black text-primary-foreground shadow-glow">
                    {teacher.initials}
                  </div>

                  <div>
                    <h3 className="text-xl font-black">{teacher.name}</h3>
                    <p className="text-sm font-bold text-primary">
                      {teacher.role}
                    </p>
                  </div>
                </div>

                <p className="mt-5 leading-7 text-muted-foreground">
                  {teacher.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-black text-success">
                  <CheckCircle2 className="size-4" />
                  Canlı ders ve ödev takip sistemiyle çalışır
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pars-section pt-0">
        <div className="pars-container">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                  Başlangıç MVP
                </p>
                <h2 className="pars-heading mt-4 max-w-3xl text-4xl font-black sm:text-5xl">
                  İlk hedef: öğrenci giriş yapsın, dersini görsün, canlı derse
                  katılsın.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                  Sonra ödev, sınav, ödeme ve raporlama modülleri sırayla
                  eklenecek. Her modül ayrı klasörde büyüyecek.
                </p>
              </div>

              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
              >
                Platforma giriş yap
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/70 py-8">
        <div className="pars-container flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>

          <div className="flex gap-4 font-bold">
            <Link href="/about" className="hover:text-foreground">
              Hakkımızda
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              İletişim
            </Link>
            <Link href="/auth/login" className="hover:text-foreground">
              Giriş
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}