# Parsmatematik — Sonraki Teknik Adımlar

## Şu anki seviye

Proje mock MVP iskeleti olarak build alıyor.

Bu aşamadan sonra amaç sadece yeni ekran yazmak değil, sistemi gerçek ürüne hazırlamak.

## Öncelik Sırası

### 1. Dashboard güvenliği

- Admin sayfaları sadece admin rolüne açık olmalı.
- Teacher sayfaları sadece teacher ve admin tarafından erişilebilir olmalı.
- Student sayfaları sadece student ve admin tarafından erişilebilir olmalı.
- Login olmayan kullanıcı `/auth/login` sayfasına yönlenmeli.

### 2. Supabase migration

Önce temel tablolar:

- profiles
- courses
- course_teachers
- course_enrollments
- live_lessons
- assignments
- assignment_submissions
- exams
- payments

### 3. RLS policy

Her tablo için role bazlı güvenlik yazılmalı.

### 4. Mock servis ayrımı

Servisler ikiye ayrılmalı:

- mock servisler
- Supabase servisleri

Geliştirme aşamasında mock kullanılabilir ama production için Supabase veri kaynağı kullanılmalı.

### 5. UI polish

Foundation sağlamlaşmadan büyük UI polish yapılmayacak.

Önce:
- auth guard
- migration
- RLS
- Supabase servis bağlantısı

Sonra:
- landing polish
- dashboard polish
- mobile polish