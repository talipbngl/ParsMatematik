# CLAUDE.md — Parsmatematik Proje Hafızası

Bu dosya, Parsmatematik projesini yeni bir yapay zekaya / coding agent'a verdiğimizde projenin amacını, mevcut aşamasını ve çalışma kurallarını anlaması için hazırlanmıştır.

## Proje Özeti

Parsmatematik, iki matematik öğretmeni için geliştirilen online eğitim / LMS platformudur.

İlk hedef, büyük ve karmaşık bir sistem yapmak değil; gerçek hayatta kullanılabilecek sade, güvenli ve geliştirilebilir bir MVP çıkarmaktır.

MVP hedefi:

- Öğrenci giriş yapar.
- Kayıtlı olduğu kursları görür.
- Canlı dersleri takip eder.
- Materyalleri görüntüler.
- Ödev teslim eder.
- Sınav çözer.
- Öğretmen ödev, sınav, canlı ders ve öğrenci takibi yapar.
- Admin kullanıcı, kurs ve ödeme takibi yapar.

## Kullanılan Teknolojiler

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Zod
- Lucide React

## Mevcut Durum

Proje şu an mock data ile çalışan MVP iskeleti seviyesindedir.

Çalışan ana alanlar:

- Public landing sayfaları
- Auth sayfaları
- Dashboard layout
- Admin dashboard
- Teacher dashboard
- Student dashboard
- Courses modülü
- Live lessons modülü
- Assignments modülü
- Exams modülü
- Materials modülü
- Payments modülü

Son doğrulama:

```bash
npm run type-check
npm run build