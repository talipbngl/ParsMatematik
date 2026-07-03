# CLAUDE.md — Parsmatematik Online Eğitim Platformu

> Bu dosya, **Parsmatematik** projesini başka bir yapay zekaya / Claude Code benzeri coding agent'a verdiğimde projenin amacını, mimarisini, aşamasını ve geliştirme kurallarını anlaması için hazırlanmıştır.
>
> Proje hedefi: 2 matematik özel öğretmeni için, HeryerOnline benzeri ama daha küçük kapsamlı, canlı ders + içerik + ödev + sınav + öğrenci takibi olan bir online eğitim platformu geliştirmek.

---

## 0. Kısa Özet

**Proje adı:** Parsmatematik  
**Alan:** Online matematik özel ders / LMS platformu  
**Hedef kullanıcılar:**
- 2 matematik öğretmeni
- Öğrenciler
- İleride veliler
- Admin / site sahibi

**İlk hedef:** HeryerOnline gibi dev bir sistemin tamamını yapmak değil; 2 öğretmenin gerçek hayatta kullanabileceği sade, güvenli, geliştirilebilir bir MVP çıkarmak.

**MVP cümlesi:**
> Öğrenci giriş yapar, derslerini görür, canlı derse katılır, PDF/video materyal indirir, ödev teslim eder, basit quiz çözer; öğretmen de öğrenci, ders, ödev, quiz ve canlı dersleri panelden yönetir.

---

## 1. İlham Alınan Site ve Özellik Referansı

İncelenen referans: **HeryerOnline**  
Resmi site: https://heryeronline.com/

HeryerOnline tarafında görülen ana özellikler:

### Eğitim ve içerik
- Canlı ders
- Arşiv video / kayıtlı içerik
- Takvim ve planlama
- Kurs / ders oluşturma
- İçerik satışı
- Abonelik / üyelik mantığı
- Mobil erişim

### Değerlendirme
- Online sınav
- Ödev sistemi
- Soru bankası
- Otomatik puanlama
- Detaylı analiz
- Sertifika sistemi
- Optik okuma

### Yönetim
- Öğrenci paneli
- Öğretmen paneli
- Veli paneli
- Devam / yoklama takibi
- Raporlama
- Ödeme sistemi
- Bildirimler
- API / entegrasyonlar
- Yapay zeka destekli analiz

### Parsmatematik için yaklaşım
Bu özelliklerin hepsi ilk sürümde yapılmayacak. Proje **modüler** tasarlanacak. Böylece ileride yeni özellik eklenirken mevcut kodlar bozulmayacak.

---

## 2. Projenin Ana İlkeleri

Bu projede en önemli kural: **özellik eklerken kodları birbirine karıştırmamak.**

### 2.1. Kod yazma ilkeleri

1. Her özellik kendi klasöründe ve kendi sorumluluğunda olmalı.
2. Auth, ders, ödev, quiz, ödeme, canlı ders gibi alanlar birbirine bağımlı hale getirilmemeli.
3. UI bileşenleri `components/` içinde tekrar kullanılabilir şekilde tutulmalı.
4. Veritabanı işlemleri doğrudan sayfa içinde dağınık yapılmamalı; servis / action katmanına alınmalı.
5. Her yeni özellik eklenmeden önce tablo, route, component ve yetki planı yapılmalı.
6. Admin, öğretmen, öğrenci ve veli rolleri baştan düşünülmeli.
7. Canlı ders sistemi sıfırdan kamera/mikrofon yazılarak yapılmayacak; ilk aşamada Jitsi / Google Meet / Zoom entegrasyonu kullanılacak.
8. İlk sürümde ödeme manuel olabilir; sonra iyzico / PayTR eklenebilir.
9. Mobil uygulama ilk hedef değildir. Web responsive tasarım yeterlidir.
10. Her aşama küçük parçalara bölünerek tamamlanacak.

### 2.2. Yeni özellik ekleme kuralı

Yeni bir özellik ekleneceği zaman şu 7 soru cevaplanmadan kod yazılmayacak:

1. Bu özelliği kim kullanacak? Admin mi, öğretmen mi, öğrenci mi, veli mi?
2. Bu özellik hangi ekrana eklenecek?
3. Veritabanında yeni tablo gerekiyor mu?
4. Mevcut tablolara kolon eklenecek mi?
5. Bu özellik için rol/yetki kontrolü gerekiyor mu?
6. Bu özellik diğer modülleri etkiliyor mu?
7. Bu özellik MVP için şart mı, yoksa sonraya bırakılabilir mi?

---

## 3. Önerilen Teknoloji Stack'i

Bu proje için başlangıçta en mantıklı ve hızlı stack:

### Frontend
- **Next.js** — App Router yapısı
- **TypeScript** — hataları erken görmek için
- **Tailwind CSS** — hızlı ve temiz tasarım
- **shadcn/ui** — hazır kaliteli UI componentleri için, opsiyonel
- **Lucide React** — ikonlar için

### Backend / Veritabanı
- **Supabase**
  - Auth: kullanıcı giriş / kayıt
  - PostgreSQL: ana veritabanı
  - Storage: PDF, video, ödev dosyaları
  - Row Level Security: kullanıcı yetkilendirme

### Canlı ders
İlk seçenekler:
1. Google Meet / Zoom linki oluşturup derse bağlamak
2. Jitsi Meet iFrame entegrasyonu
3. İleri aşamada Daily / Twilio / Zoom SDK

Başlangıç için en mantıklısı:
> Öğretmen canlı ders oluştururken `meeting_url` alanına Google Meet / Zoom / Jitsi linki girsin. Öğrenci saati gelince “Derse Katıl” butonuyla girsin.

Daha sonra:
> Jitsi iFrame ile canlı ders sayfanın içine gömülebilir.

### Ödeme
- MVP: manuel ödeme / IBAN bildirimi / admin onayı
- Sonra: iyzico veya PayTR
- En son: fatura, taksit, abonelik

### Hosting
- Frontend: Vercel
- Backend: Supabase
- Domain: parsmatematik.com veya uygun başka domain

---

## 4. Rollerin Tanımı

### 4.1. Admin
Admin sistemin sahibidir.

Yapabilir:
- Öğretmen ekleme / silme
- Öğrenci ekleme / silme
- Kurs oluşturma
- Öğrenciyi kursa kaydetme
- Ödeme durumunu işaretleme
- Tüm dersleri görme
- Tüm ödevleri / quizleri / raporları görme
- Site ayarlarını değiştirme

### 4.2. Öğretmen
Öğretmen dersleri ve öğrencileri yönetir.

Yapabilir:
- Kendi kurslarını görme
- Canlı ders oluşturma
- Ders materyali ekleme
- PDF / video yükleme
- Ödev oluşturma
- Öğrenci teslimlerini inceleme
- Quiz oluşturma
- Yoklama alma
- Öğrenci ilerlemesini görme

Yapamaz:
- Başka öğretmenin kurslarını değiştirme
- Admin ayarlarını değiştirme
- Ödeme kayıtlarını kafasına göre değiştirme

### 4.3. Öğrenci
Öğrenci eğitim alan kişidir.

Yapabilir:
- Kendi derslerini görme
- Canlı derse katılma
- PDF / video materyal görüntüleme
- Ödev teslim etme
- Quiz çözme
- Kendi sonuçlarını görme
- Duyuruları görme

Yapamaz:
- Başka öğrencilerin bilgilerini görme
- Ders oluşturma
- Ödev / quiz oluşturma
- Yetkisiz dosyalara erişme

### 4.4. Veli — ileri aşama
Veli ilk MVP'de zorunlu değildir.

Yapabilir:
- Çocuğunun derslerini görme
- Ödev durumunu görme
- Quiz sonuçlarını görme
- Devamsızlık bilgisini görme
- Ödeme durumunu görme

---

## 5. Özellik Önceliklendirme

### 5.1. Faz 0 — Hazırlık ve kararlar

Amaç: Projenin temelini atmadan önce ne yapılacağını netleştirmek.

Yapılacaklar:
- [ ] Proje adı kesinleştir: Parsmatematik
- [ ] Logo / renk paleti belirle
- [ ] Domain araştır
- [ ] Kullanılacak stack'i kesinleştir
- [ ] GitHub reposu oluştur
- [ ] Proje klasör yapısını oluştur
- [ ] Supabase projesi aç
- [ ] Environment variable dosyasını hazırla

Bitti sayılır mı?
- GitHub reposu varsa
- Next.js projesi çalışıyorsa
- Supabase bağlantısı kurulabiliyorsa
- README ve CLAUDE.md varsa

Tahmini süre: 3-7 gün

---

### 5.2. Faz 1 — Tanıtım sitesi

Amaç: Parsmatematik'in dışarıdan görünen profesyonel ana sayfasını yapmak.

Sayfalar:
- [ ] Ana sayfa
- [ ] Hakkımızda
- [ ] Öğretmenler
- [ ] Ders paketleri
- [ ] Sık sorulan sorular
- [ ] İletişim
- [ ] Giriş yap / kayıt ol butonları

Ana sayfada olmalı:
- Hero alanı
- “Online matematik özel ders” mesajı
- 2 öğretmen tanıtımı
- Hangi sınıflara ders verildiği
- Canlı ders avantajı
- Ödev ve takip avantajı
- İletişim / WhatsApp butonu

Bitti sayılır mı?
- Mobilde düzgün görünüyorsa
- Menü çalışıyorsa
- İletişim butonu çalışıyorsa
- Tasarım profesyonel duruyorsa

Tahmini süre: 1-3 hafta

---

### 5.3. Faz 2 — Auth ve rol sistemi

Amaç: Öğrenci, öğretmen ve admin giriş sistemi kurmak.

Özellikler:
- [ ] Kullanıcı kayıt / giriş
- [ ] Şifre sıfırlama
- [ ] Role göre dashboard yönlendirme
- [ ] Admin dashboard
- [ ] Teacher dashboard
- [ ] Student dashboard
- [ ] Protected route yapısı

Roller:
- `admin`
- `teacher`
- `student`
- `parent` — sonra

Bitti sayılır mı?
- Öğrenci giriş yapınca öğrenci paneline gidiyorsa
- Öğretmen giriş yapınca öğretmen paneline gidiyorsa
- Admin giriş yapınca admin paneline gidiyorsa
- Öğrenci admin sayfasına giremiyorsa

Tahmini süre: 2-4 hafta

---

### 5.4. Faz 3 — Kurs ve ders yönetimi

Amaç: Öğretmenlerin kurs/ders oluşturabilmesi ve öğrencilerin kendi derslerini görebilmesi.

Özellikler:
- [ ] Admin kurs oluşturur
- [ ] Kursa öğretmen atanır
- [ ] Öğrenci kursa kaydedilir
- [ ] Öğretmen kendi kurslarını görür
- [ ] Öğrenci kayıtlı olduğu kursları görür
- [ ] Kurs detay sayfası oluşturulur
- [ ] Ders listesi oluşturulur

Kurs örnekleri:
- 8. Sınıf LGS Matematik
- 9. Sınıf Matematik
- TYT Matematik
- AYT Matematik
- Özel Ders Paketi

Bitti sayılır mı?
- Admin kurs oluşturabiliyorsa
- Öğretmen sadece kendi kursunu görüyorsa
- Öğrenci sadece kayıtlı olduğu kursu görüyorsa

Tahmini süre: 2-4 hafta

---

### 5.5. Faz 4 — Canlı ders sistemi

Amaç: Öğretmen canlı ders oluşturacak, öğrenci sisteme girip derse katılacak.

MVP canlı ders yaklaşımı:
- Canlı ders linki dış servisten alınır.
- Sisteme `meeting_url` olarak kaydedilir.
- Öğrenci “Derse Katıl” butonuna basınca link açılır.

Özellikler:
- [ ] Öğretmen canlı ders oluşturur
- [ ] Başlık, tarih, saat, süre girilir
- [ ] Meeting URL girilir
- [ ] Öğrenci yaklaşan canlı dersleri görür
- [ ] Ders saati gelince “Derse Katıl” aktif olur
- [ ] Geçmiş dersler arşivde görünür
- [ ] Admin tüm canlı dersleri görür

İleri aşama:
- [ ] Jitsi iFrame entegrasyonu
- [ ] Ders kaydı linki
- [ ] Otomatik yoklama
- [ ] Canlı derse giriş logları

Bitti sayılır mı?
- Öğretmen ders oluşturabiliyorsa
- Öğrenci canlı ders listesini görebiliyorsa
- Öğrenci linke basıp derse katılabiliyorsa

Tahmini süre: 2-4 hafta

---

### 5.6. Faz 5 — Materyal / video / PDF sistemi

Amaç: Öğretmen ders materyali yükleyecek, öğrenci indirecek veya görüntüleyecek.

Özellikler:
- [ ] PDF yükleme
- [ ] Video linki ekleme
- [ ] Dosya başlığı / açıklaması
- [ ] Materyali kursa bağlama
- [ ] Öğrenci materyalleri görür
- [ ] Öğretmen kendi materyallerini düzenler
- [ ] Admin tüm materyalleri görür

MVP'de video stratejisi:
- İlk başta büyük video dosyası yüklemek yerine YouTube gizli link / Vimeo / Google Drive linki kullanılabilir.
- Daha sonra Supabase Storage veya özel video hosting düşünülebilir.

Bitti sayılır mı?
- Öğretmen PDF yükleyebiliyorsa
- Öğrenci kendi kursuna ait PDF'yi görebiliyorsa
- Başka kursun dosyasına erişemiyorsa

Tahmini süre: 2-3 hafta

---

### 5.7. Faz 6 — Ödev sistemi

Amaç: Öğretmen ödev verecek, öğrenci teslim edecek.

Özellikler:
- [ ] Öğretmen ödev oluşturur
- [ ] Ödev başlığı, açıklaması, teslim tarihi olur
- [ ] Ödev kursa bağlanır
- [ ] Öğrenci ödevi görür
- [ ] Öğrenci dosya yükleyerek teslim eder
- [ ] Öğretmen teslimleri görür
- [ ] Öğretmen puan / yorum verir
- [ ] Öğrenci geri bildirimi görür

Bitti sayılır mı?
- Öğretmen ödev oluşturabiliyorsa
- Öğrenci teslim yapabiliyorsa
- Öğretmen teslimi değerlendiriyorsa

Tahmini süre: 3-5 hafta

---

### 5.8. Faz 7 — Quiz / online sınav sistemi

Amaç: Basit çoktan seçmeli matematik quizleri oluşturmak.

MVP quiz kapsamı:
- Çoktan seçmeli soru
- Tek doğru cevap
- Otomatik puanlama
- Sonuç ekranı

Özellikler:
- [ ] Öğretmen quiz oluşturur
- [ ] Sorular eklenir
- [ ] Şıklar eklenir
- [ ] Doğru cevap seçilir
- [ ] Quiz kursa bağlanır
- [ ] Öğrenci quiz çözer
- [ ] Sistem otomatik puanlar
- [ ] Öğrenci sonucunu görür
- [ ] Öğretmen sınıf sonuçlarını görür

İleri aşama:
- [ ] Süre sınırı
- [ ] Rastgele soru sırası
- [ ] Soru bankası
- [ ] Konu bazlı analiz
- [ ] Deneme sınavı modülü
- [ ] Optik okuma

Bitti sayılır mı?
- Öğretmen quiz oluşturabiliyorsa
- Öğrenci çözebiliyorsa
- Sonuç otomatik hesaplanıyorsa

Tahmini süre: 4-7 hafta

---

### 5.9. Faz 8 — Takip / raporlama / yoklama

Amaç: Öğrenci performansını takip etmek.

Özellikler:
- [ ] Canlı ders yoklaması
- [ ] Ödev teslim durumu
- [ ] Quiz başarı oranı
- [ ] Öğrenci detay sayfası
- [ ] Kurs bazlı genel özet
- [ ] Öğretmen için rapor ekranı
- [ ] Admin için genel istatistik ekranı

Bitti sayılır mı?
- Öğretmen bir öğrencinin ödev / quiz / ders katılım durumunu görebiliyorsa
- Admin genel öğrenci sayısı, aktif kurs sayısı gibi verileri görebiliyorsa

Tahmini süre: 3-6 hafta

---

### 5.10. Faz 9 — Ödeme sistemi

Amaç: Öğrencinin ödeme durumunu takip etmek.

MVP ödeme yaklaşımı:
- Online ödeme entegrasyonu yok.
- Öğrenci ödeme bilgisini görür.
- Admin ödeme durumunu manuel işaretler.

MVP özellikleri:
- [ ] Paket fiyatı tanımlama
- [ ] Öğrenci ödeme durumu
- [ ] Ödendi / bekliyor / gecikti durumları
- [ ] Admin manuel ödeme onayı
- [ ] Öğrenci panelinde ödeme bilgisi

İleri aşama:
- [ ] iyzico entegrasyonu
- [ ] PayTR entegrasyonu
- [ ] Webhook sistemi
- [ ] Fatura bilgileri
- [ ] Abonelik sistemi

Bitti sayılır mı?
- Admin ödeme durumunu yönetebiliyorsa
- Öğrenci kendi ödeme durumunu görebiliyorsa

Tahmini süre:
- Manuel ödeme: 1-2 hafta
- Online ödeme entegrasyonu: 3-6 hafta

---

### 5.11. Faz 10 — Veli paneli

Amaç: Velinin öğrenciyi takip edebilmesi.

İlk MVP'de şart değildir. Sonra eklenebilir.

Özellikler:
- [ ] Veli hesabı oluşturma
- [ ] Veliyi öğrenciye bağlama
- [ ] Ders programını görme
- [ ] Ödev durumunu görme
- [ ] Quiz sonucunu görme
- [ ] Devamsızlık durumunu görme
- [ ] Ödeme durumunu görme

Tahmini süre: 3-6 hafta

---

### 5.12. Faz 11 — Bildirim sistemi

Amaç: Öğrencinin ders, ödev ve sınavlardan haberdar olması.

MVP:
- Panel içi bildirimler

Sonra:
- E-posta bildirimi
- SMS bildirimi
- WhatsApp yönlendirme
- Push notification

Özellikler:
- [ ] Yeni ödev bildirimi
- [ ] Yaklaşan canlı ders bildirimi
- [ ] Quiz sonucu bildirimi
- [ ] Ödeme hatırlatması

Tahmini süre: 2-5 hafta

---

### 5.13. Faz 12 — Yapay zeka / gelişmiş analiz

Bu en sona bırakılacak.

Olası özellikler:
- [ ] Öğrencinin zayıf konularını analiz etme
- [ ] Quiz sonuçlarına göre öneri sunma
- [ ] Otomatik çalışma planı oluşturma
- [ ] Soru çözüm açıklaması üretme
- [ ] Öğretmene öğrenci raporu yazma

Bu modül MVP için gerekli değildir.

Tahmini süre: 1-3 ay

---

## 6. Tahmini Toplam Süre

### Öğrenerek ve tek kişi geliştirerek

| Hedef | Tahmini süre |
|---|---:|
| Tanıtım sitesi | 2-4 hafta |
| Giriş + basit paneller | 2-3 ay |
| Canlı ders + materyal + ders yönetimi | 4-6 ay |
| Ödev + quiz + takip sistemi | 6-8 ay |
| Kullanılabilir MVP | 6-10 ay |
| HeryerOnline'a yaklaşan platform | 1.5-2.5 yıl+ |

### Yapay zeka destekli kod yazarak ama öğrenerek
Eğer düzenli çalışılır, kodlar iyi takip edilir ve özellikler küçük parçalara bölünürse:

- İlk demo: 4-8 hafta
- Gerçek kullanılabilir MVP: 4-6 ay
- Daha kaliteli sistem: 8-12 ay

---

## 7. Önerilen Klasör Yapısı

Bu yapı, kodların birbirine karışmaması için tasarlanmıştır.

```txt
parsmatematik/
  CLAUDE.md
  README.md
  package.json
  .env.example
  .gitignore
  next.config.ts
  tailwind.config.ts
  tsconfig.json

  src/
    app/
      layout.tsx
      page.tsx
      globals.css

      (public)/
        hakkimizda/
          page.tsx
        ogretmenler/
          page.tsx
        ders-paketleri/
          page.tsx
        iletisim/
          page.tsx

      (auth)/
        giris/
          page.tsx
        kayit/
          page.tsx
        sifremi-unuttum/
          page.tsx

      dashboard/
        layout.tsx
        page.tsx

        admin/
          page.tsx
          users/
            page.tsx
          courses/
            page.tsx
          payments/
            page.tsx
          reports/
            page.tsx

        teacher/
          page.tsx
          courses/
            page.tsx
          live-sessions/
            page.tsx
          assignments/
            page.tsx
          quizzes/
            page.tsx
          students/
            page.tsx

        student/
          page.tsx
          courses/
            page.tsx
          live-sessions/
            page.tsx
          assignments/
            page.tsx
          quizzes/
            page.tsx
          progress/
            page.tsx

        parent/
          page.tsx

      api/
        webhooks/
          iyzico/
            route.ts

    components/
      ui/
      layout/
        Navbar.tsx
        Footer.tsx
        Sidebar.tsx
        DashboardHeader.tsx
      auth/
        LoginForm.tsx
        RegisterForm.tsx
      courses/
        CourseCard.tsx
        CourseForm.tsx
      live-sessions/
        LiveSessionCard.tsx
        LiveSessionForm.tsx
      assignments/
        AssignmentCard.tsx
        AssignmentForm.tsx
      quizzes/
        QuizCard.tsx
        QuizForm.tsx
      shared/
        EmptyState.tsx
        LoadingState.tsx
        ErrorState.tsx
        ConfirmDialog.tsx

    features/
      auth/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      users/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      courses/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      live-sessions/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      materials/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      assignments/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      quizzes/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      payments/
        actions.ts
        queries.ts
        types.ts
        validators.ts
      reports/
        queries.ts
        types.ts

    lib/
      supabase/
        client.ts
        server.ts
        middleware.ts
      auth/
        get-current-user.ts
        require-role.ts
      utils.ts
      constants.ts

    hooks/
      use-current-user.ts
      use-role.ts

    styles/
      theme.ts

  supabase/
    migrations/
    seed.sql
    policies.sql
```

---

## 8. Dosya ve Katman Kuralları

### 8.1. `app/`
Sayfalar burada olur. Sayfalar mümkün olduğunca temiz kalmalı.

Sayfa dosyası şunu yapmalı:
- veriyi çağırmalı
- component render etmeli
- karmaşık iş mantığı içermemeli

Kötü örnek:
```tsx
// page.tsx içinde 300 satır veri çekme, form yönetme, role kontrolü, tablo güncelleme karışık olmamalı.
```

İyi örnek:
```tsx
// page.tsx
import { getTeacherCourses } from '@/features/courses/queries'
import { CourseList } from '@/components/courses/CourseList'

export default async function TeacherCoursesPage() {
  const courses = await getTeacherCourses()
  return <CourseList courses={courses} />
}
```

### 8.2. `components/`
Görsel parçalar burada olur. Component mümkün olduğunca saf olmalı.

Component şunları yapmamalı:
- direkt Supabase sorgusu
- role kontrolü
- karmaşık iş kuralı

Component şunları yapmalı:
- props almalı
- ekranda göstermeli
- kullanıcı etkileşimini form/action'a bağlamalı

### 8.3. `features/`
Her özellik kendi klasöründe olur.

Örnek:
```txt
features/assignments/
  actions.ts      // createAssignment, submitAssignment
  queries.ts      // getAssignmentsForStudent
  types.ts        // Assignment, AssignmentSubmission
  validators.ts   // zod schema
```

Yeni özellik eklendiğinde önce `features/ozellik-adi/` oluştur.

### 8.4. `lib/`
Genel yardımcılar burada olur.

Örnek:
- Supabase client
- Auth yardımcıları
- Role kontrolü
- Tarih formatlama
- Sabitler

---

## 9. Veritabanı Taslağı

Bu taslak ileride migration dosyalarına dönüştürülecek.

### 9.1. `profiles`
Kullanıcıların ana profil tablosu.

```sql
profiles (
  id uuid primary key references auth.users(id),
  full_name text not null,
  role text not null check (role in ('admin', 'teacher', 'student', 'parent')),
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.2. `teacher_profiles`
Öğretmenlere özel bilgiler.

```sql
teacher_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  bio text,
  expertise text,
  instagram_url text,
  created_at timestamptz default now()
)
```

### 9.3. `student_profiles`
Öğrencilere özel bilgiler.

```sql
student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  grade_level text,
  school text,
  target_exam text,
  created_at timestamptz default now()
)
```

### 9.4. `parent_student_links`
Veli-öğrenci bağlantısı.

```sql
parent_student_links (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references profiles(id) not null,
  student_id uuid references profiles(id) not null,
  created_at timestamptz default now(),
  unique(parent_id, student_id)
)
```

### 9.5. `courses`
Kurslar / ders paketleri.

```sql
courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  grade_level text,
  price numeric,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.6. `course_teachers`
Kursa öğretmen atama.

```sql
course_teachers (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  teacher_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(course_id, teacher_id)
)
```

### 9.7. `course_enrollments`
Öğrenci kayıtları.

```sql
course_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  status text default 'active' check (status in ('active', 'paused', 'completed', 'cancelled')),
  enrolled_at timestamptz default now(),
  unique(course_id, student_id)
)
```

### 9.8. `live_sessions`
Canlı dersler.

```sql
live_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  teacher_id uuid references profiles(id),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  meeting_url text,
  recording_url text,
  status text default 'scheduled' check (status in ('scheduled', 'live', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.9. `attendance`
Yoklama / katılım.

```sql
attendance (
  id uuid primary key default gen_random_uuid(),
  live_session_id uuid references live_sessions(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  status text default 'absent' check (status in ('present', 'absent', 'late', 'excused')),
  joined_at timestamptz,
  left_at timestamptz,
  created_at timestamptz default now(),
  unique(live_session_id, student_id)
)
```

### 9.10. `materials`
Ders materyalleri.

```sql
materials (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  teacher_id uuid references profiles(id),
  title text not null,
  description text,
  type text not null check (type in ('pdf', 'video', 'link', 'image', 'other')),
  file_path text,
  external_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.11. `assignments`
Ödevler.

```sql
assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  teacher_id uuid references profiles(id),
  title text not null,
  description text,
  due_at timestamptz,
  max_score numeric,
  status text default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.12. `assignment_submissions`
Ödev teslimleri.

```sql
assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references assignments(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  file_path text,
  answer_text text,
  submitted_at timestamptz default now(),
  score numeric,
  feedback text,
  graded_at timestamptz,
  unique(assignment_id, student_id)
)
```

### 9.13. `quizzes`
Quizler.

```sql
quizzes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  teacher_id uuid references profiles(id),
  title text not null,
  description text,
  time_limit_minutes int,
  status text default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.14. `quiz_questions`
Quiz soruları.

```sql
quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  question_text text not null,
  image_url text,
  points numeric default 1,
  sort_order int default 0,
  created_at timestamptz default now()
)
```

### 9.15. `quiz_options`
Soru şıkları.

```sql
quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references quiz_questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean default false,
  sort_order int default 0
)
```

### 9.16. `quiz_attempts`
Quiz çözme girişimleri.

```sql
quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  started_at timestamptz default now(),
  submitted_at timestamptz,
  score numeric,
  status text default 'in_progress' check (status in ('in_progress', 'submitted', 'graded'))
)
```

### 9.17. `quiz_answers`
Öğrenci cevapları.

```sql
quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references quiz_attempts(id) on delete cascade,
  question_id uuid references quiz_questions(id) on delete cascade,
  selected_option_id uuid references quiz_options(id),
  is_correct boolean,
  points_earned numeric default 0,
  created_at timestamptz default now()
)
```

### 9.18. `payments`
Ödeme takip tablosu.

```sql
payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  course_id uuid references courses(id),
  amount numeric not null,
  currency text default 'TRY',
  status text default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded', 'overdue')),
  payment_method text default 'manual',
  paid_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
)
```

### 9.19. `announcements`
Duyurular.

```sql
announcements (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  created_by uuid references profiles(id),
  title text not null,
  content text not null,
  is_published boolean default true,
  created_at timestamptz default now()
)
```

---

## 10. Yetkilendirme Kuralları

### 10.1. Genel kural
Kullanıcı sadece kendi rolünün izin verdiği verilere erişebilir.

### 10.2. Admin
- Tüm verileri okuyabilir.
- Tüm verileri yönetebilir.

### 10.3. Öğretmen
- Kendi atandığı kursları okuyabilir.
- Kendi kurslarına canlı ders, materyal, ödev ve quiz ekleyebilir.
- Kendi kursundaki öğrencileri görebilir.

### 10.4. Öğrenci
- Sadece kayıtlı olduğu kursları görebilir.
- Sadece kendi ödev teslimlerini ve quiz sonuçlarını görebilir.
- Başka öğrencinin verisine erişemez.

### 10.5. Veli
- Sadece bağlı olduğu öğrencinin verilerini görebilir.

### 10.6. Storage güvenliği
Dosya yüklemeleri bucket bazlı ayrılmalı:

```txt
materials/      // öğretmenlerin ders materyalleri
submissions/    // öğrencilerin ödev teslimleri
avatars/        // profil fotoğrafları
public/         // herkese açık görseller
```

Kural:
- `public/` hariç dosyalar herkese açık olmamalı.
- Öğrenci başka öğrencinin teslim dosyasını indirememeli.
- Öğretmen sadece kendi kursuna ait teslimleri görebilmeli.

---

## 11. Sayfa Haritası

### Public sayfalar

```txt
/                  Ana sayfa
/hakkimizda        Parsmatematik hakkında
/ogretmenler       Öğretmen tanıtımı
/ders-paketleri    Paketler ve sınıflar
/iletisim          İletişim / WhatsApp
/giris             Giriş yap
/kayit             Kayıt ol
```

### Admin panel

```txt
/dashboard/admin
/dashboard/admin/users
/dashboard/admin/courses
/dashboard/admin/live-sessions
/dashboard/admin/assignments
/dashboard/admin/quizzes
/dashboard/admin/payments
/dashboard/admin/reports
/dashboard/admin/settings
```

### Öğretmen panel

```txt
/dashboard/teacher
/dashboard/teacher/courses
/dashboard/teacher/live-sessions
/dashboard/teacher/materials
/dashboard/teacher/assignments
/dashboard/teacher/quizzes
/dashboard/teacher/students
/dashboard/teacher/reports
```

### Öğrenci panel

```txt
/dashboard/student
/dashboard/student/courses
/dashboard/student/live-sessions
/dashboard/student/materials
/dashboard/student/assignments
/dashboard/student/quizzes
/dashboard/student/progress
/dashboard/student/payments
```

### Veli paneli — sonra

```txt
/dashboard/parent
/dashboard/parent/student-progress
/dashboard/parent/assignments
/dashboard/parent/quizzes
/dashboard/parent/payments
```

---

## 12. UI / Tasarım Yönü

### Marka hissi
Parsmatematik şu hissi vermeli:
- Güvenilir
- Modern
- Öğrenci dostu
- Temiz
- Matematik odaklı
- Profesyonel ama boğucu olmayan

### Renk önerisi
Başlangıç renkleri:
- Ana renk: koyu lacivert / indigo
- İkincil renk: turuncu / amber
- Arka plan: açık gri / beyaz
- Başarı: yeşil
- Uyarı: sarı
- Hata: kırmızı

### Tasarım kuralları
- Her sayfada çok fazla renk kullanılmayacak.
- Dashboard kartları sade olacak.
- Öğrenci paneli karmaşık olmayacak.
- Buton isimleri net olacak: “Derse Katıl”, “Ödevi Teslim Et”, “Quiz Çöz”.
- Mobil görünüm her aşamada kontrol edilecek.

---

## 13. Component Listesi

### Layout componentleri
- `Navbar`
- `Footer`
- `DashboardSidebar`
- `DashboardHeader`
- `MobileMenu`
- `PageHeader`

### Ortak componentler
- `Button`
- `Card`
- `Input`
- `Textarea`
- `Select`
- `Badge`
- `Table`
- `Modal`
- `ConfirmDialog`
- `EmptyState`
- `LoadingState`
- `ErrorState`

### Feature componentleri
- `CourseCard`
- `CourseForm`
- `LiveSessionCard`
- `LiveSessionForm`
- `MaterialUploader`
- `AssignmentCard`
- `AssignmentForm`
- `SubmissionList`
- `QuizBuilder`
- `QuizPlayer`
- `QuizResultCard`
- `PaymentStatusBadge`
- `StudentProgressCard`

---

## 14. Development Workflow

### 14.1. Branch sistemi

```txt
main              // çalışan stabil kod
feature/auth      // auth geliştirme
feature/courses   // kurs sistemi
feature/live      // canlı ders sistemi
feature/homepage  // tanıtım sitesi
fix/...           // hata düzeltmeleri
```

### 14.2. Commit mesajları

Örnek:
```txt
feat: add student dashboard layout
feat: create live session form
fix: prevent students from accessing admin routes
refactor: move course queries into feature folder
style: improve homepage responsive design
```

### 14.3. Her özellikte izlenecek adımlar

1. Issue / görev yaz.
2. Gerekli tabloyu planla.
3. Route ve sayfa yapısını belirle.
4. Componentleri yaz.
5. Query / action dosyalarını yaz.
6. Role kontrolü ekle.
7. Loading / empty / error state ekle.
8. Mobil görünümü kontrol et.
9. Test et.
10. Commit at.

---

## 15. Kod Kalitesi Kuralları

### 15.1. TypeScript
- `any` mümkün olduğunca kullanılmayacak.
- Her veri modeli için type/interface oluşturulacak.
- Form verileri validation'dan geçecek.

### 15.2. Form validation
Öneri: Zod kullan.

Örnek:
```ts
import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  gradeLevel: z.string().min(1),
  price: z.number().nonnegative().optional(),
})
```

### 15.3. Error handling
Her kullanıcı aksiyonunda:
- başarı mesajı
- hata mesajı
- loading durumu
olmalı.

### 15.4. Boş ekranlar
Her listede boş state olmalı.

Örnek:
> Henüz canlı ders oluşturulmamış.

### 15.5. Güvenlik
- Client tarafındaki role kontrolü tek başına yeterli değildir.
- Server tarafında da kontrol yapılmalı.
- Supabase RLS kuralları yazılmalı.
- Dosya URL'leri herkese açık bırakılmamalı.

---

## 16. Environment Variables

`.env.example` içine şunlar konulmalı:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# İleri aşama
IYZICO_API_KEY=
IYZICO_SECRET_KEY=
PAYTR_MERCHANT_ID=
PAYTR_MERCHANT_KEY=
PAYTR_MERCHANT_SALT=
```

Dikkat:
- `SUPABASE_SERVICE_ROLE_KEY` client tarafında asla kullanılmaz.
- Gerçek `.env.local` GitHub'a atılmaz.

---

## 17. MVP Kullanıcı Akışları

### 17.1. Öğrenci akışı

1. Öğrenci giriş yapar.
2. Dashboard açılır.
3. Yaklaşan canlı derslerini görür.
4. Kayıtlı olduğu kursları görür.
5. Materyalleri indirir/görüntüler.
6. Ödevini teslim eder.
7. Quiz çözer.
8. Sonuçlarını görür.

### 17.2. Öğretmen akışı

1. Öğretmen giriş yapar.
2. Kendi kurslarını görür.
3. Canlı ders oluşturur.
4. Materyal yükler.
5. Ödev oluşturur.
6. Teslimleri değerlendirir.
7. Quiz oluşturur.
8. Öğrenci ilerlemesini inceler.

### 17.3. Admin akışı

1. Admin giriş yapar.
2. Öğretmen / öğrenci hesaplarını yönetir.
3. Kurs oluşturur.
4. Kursa öğretmen atar.
5. Kursa öğrenci kaydeder.
6. Ödeme durumunu yönetir.
7. Genel raporları görür.

---

## 18. Aşama Takip Tablosu

Bu bölüm her yeni chate atıldığında güncellenmeli.

### Şu anki durum

```txt
current_stage: 0
current_focus: Proje planlama ve CLAUDE.md hazırlığı
last_completed_task: HeryerOnline benzeri özelliklerin çıkarılması ve Parsmatematik yol haritasının hazırlanması
next_task: Next.js + TypeScript + Tailwind + Supabase başlangıç projesini kurmak
```

### Genel checklist

```txt
[ ] Faz 0: Hazırlık
[ ] Faz 1: Tanıtım sitesi
[ ] Faz 2: Auth ve rol sistemi
[ ] Faz 3: Kurs yönetimi
[ ] Faz 4: Canlı ders sistemi
[ ] Faz 5: Materyal sistemi
[ ] Faz 6: Ödev sistemi
[ ] Faz 7: Quiz sistemi
[ ] Faz 8: Raporlama
[ ] Faz 9: Ödeme takibi
[ ] Faz 10: Veli paneli
[ ] Faz 11: Bildirim sistemi
[ ] Faz 12: Yapay zeka / gelişmiş analiz
```

### Ayrıntılı durum

#### Faz 0 — Hazırlık
```txt
[ ] GitHub repo oluşturuldu
[ ] Next.js projesi oluşturuldu
[ ] Tailwind kuruldu
[ ] Supabase projesi oluşturuldu
[ ] Environment dosyaları hazırlandı
[ ] İlk deploy yapıldı
```

#### Faz 1 — Tanıtım sitesi
```txt
[ ] Ana sayfa
[ ] Hakkımızda
[ ] Öğretmenler
[ ] Ders paketleri
[ ] İletişim
[ ] Responsive tasarım
```

#### Faz 2 — Auth
```txt
[ ] Giriş sayfası
[ ] Kayıt sayfası
[ ] Şifre sıfırlama
[ ] Role sistemi
[ ] Protected routes
[ ] Role göre dashboard
```

#### Faz 3 — Kurslar
```txt
[ ] Course tablosu
[ ] Course teacher bağlantısı
[ ] Enrollment tablosu
[ ] Admin kurs oluşturma
[ ] Öğretmen kurs görme
[ ] Öğrenci kurs görme
```

#### Faz 4 — Canlı ders
```txt
[ ] Live sessions tablosu
[ ] Öğretmen canlı ders oluşturma
[ ] Öğrenci canlı ders görme
[ ] Meeting URL ile derse katılma
[ ] Geçmiş ders listesi
[ ] Jitsi iframe — sonra
```

#### Faz 5 — Materyaller
```txt
[ ] Materials tablosu
[ ] PDF yükleme
[ ] Link/video ekleme
[ ] Öğrenci materyal görüntüleme
[ ] Storage policy
```

#### Faz 6 — Ödevler
```txt
[ ] Assignments tablosu
[ ] Submissions tablosu
[ ] Öğretmen ödev oluşturma
[ ] Öğrenci teslim yapma
[ ] Öğretmen puan/yorum verme
```

#### Faz 7 — Quiz
```txt
[ ] Quizzes tablosu
[ ] Questions tablosu
[ ] Options tablosu
[ ] Attempts tablosu
[ ] Öğretmen quiz oluşturma
[ ] Öğrenci quiz çözme
[ ] Otomatik puanlama
```

---

## 19. Coding Agent İçin Talimatlar

Bu dosyayı okuyorsan, Parsmatematik projesinde yardım eden coding agent'sın.

### 19.1. Önce bunu yap

1. Kullanıcının hangi aşamada olduğunu `current_stage` bölümünden oku.
2. Son tamamlanan görevi oku.
3. Sıradaki görevi belirle.
4. Mevcut kod yapısını incele.
5. Kullanıcı senden spesifik bir şey istemediyse sıradaki küçük görevi öner.

### 19.2. Asla yapma

- Tüm projeyi tek seferde yeniden yazma.
- Mevcut klasör yapısını sebepsiz değiştirme.
- Sayfa içine çok büyük ve karışık kod yazma.
- Auth / role kontrolünü sadece frontend'de bırakma.
- Database tablolarını plansız değiştirme.
- Canlı ders için sıfırdan WebRTC sistemi yazmaya kalkma.
- Ödeme entegrasyonunu MVP'nin ilk işlerinden biri yapma.
- Her şeyi aynı anda eklemeye çalışma.

### 19.3. Her yanıtta yap

- Kullanıcıya kısa ve net anlat.
- Sıradaki küçük adımı ver.
- Kod yazarken dosya yolunu belirt.
- Büyük değişikliklerde önce plan ver.
- Eksik veya riskli bir şey varsa söyle.
- Gerekirse önce mevcut dosya yapısını iste.

### 19.4. Kod üretirken format

Her kod önerisinde şu formatı kullan:

```txt
Dosya: src/...
Amaç: ...
Kod:
...
```

### 19.5. Görev bittiğinde

Görev tamamlanınca bu bölümü güncelle:

```txt
current_stage:
current_focus:
last_completed_task:
next_task:
```

---

## 20. İlk Kurulum Komutları

Başlangıç için önerilen komutlar:

```bash
npx create-next-app@latest parsmatematik
cd parsmatematik
npm install @supabase/supabase-js
npm install @supabase/ssr
npm install lucide-react
npm install zod
npm install clsx tailwind-merge
```

Eğer shadcn/ui kullanılacaksa:

```bash
npx shadcn@latest init
```

Geliştirme sunucusu:

```bash
npm run dev
```

Git:

```bash
git init
git add .
git commit -m "chore: initial project setup"
```

---

## 21. İlk 30 Günlük Çalışma Planı

### Hafta 1
- [ ] HTML / CSS / JS temellerini hızlı tekrar et
- [ ] Next.js projesi oluştur
- [ ] Tailwind ile ilk sayfayı tasarla
- [ ] GitHub repo aç
- [ ] Vercel'e ilk deploy yap

### Hafta 2
- [ ] Ana sayfa tasarımı
- [ ] Navbar / Footer
- [ ] Öğretmen kartları
- [ ] Ders paketleri bölümü
- [ ] İletişim bölümü

### Hafta 3
- [ ] Supabase projesi aç
- [ ] Auth bağlantısı kur
- [ ] Giriş sayfası yap
- [ ] Kayıt sayfası yap
- [ ] Dashboard layout yap

### Hafta 4
- [ ] Role sistemi kur
- [ ] Admin dashboard başlangıcı
- [ ] Teacher dashboard başlangıcı
- [ ] Student dashboard başlangıcı
- [ ] Protected route kontrolü

---

## 22. İlk MVP İçin Kabul Kriterleri

Aşağıdakiler tamamlanırsa Parsmatematik MVP 1 hazır sayılır:

```txt
[ ] Public ana sayfa yayında
[ ] Öğrenci giriş yapabiliyor
[ ] Öğretmen giriş yapabiliyor
[ ] Admin giriş yapabiliyor
[ ] Admin kurs oluşturabiliyor
[ ] Admin öğrenci/öğretmen ekleyebiliyor
[ ] Öğretmen canlı ders oluşturabiliyor
[ ] Öğrenci canlı dersleri görebiliyor
[ ] Öğrenci “Derse Katıl” butonuyla meeting linkine gidebiliyor
[ ] Öğretmen PDF/video/link materyal ekleyebiliyor
[ ] Öğrenci materyalleri görebiliyor
[ ] Öğretmen ödev oluşturabiliyor
[ ] Öğrenci ödev teslim edebiliyor
[ ] Öğretmen teslimi puanlayabiliyor
[ ] Basit quiz oluşturulabiliyor
[ ] Öğrenci quiz çözebiliyor
[ ] Sonuç otomatik hesaplanıyor
[ ] Mobil görünüm kabul edilebilir
[ ] Yetki kontrolleri çalışıyor
```

---

## 23. İleri Seviye Özellikler — Şimdilik Beklesin

Bu özellikler ilk MVP'ye alınmayacak:

- Mobil uygulama
- Optik okuma
- Gelişmiş yapay zeka analizi
- Soru bankası marketplace
- Otomatik sertifika
- Tam abonelik sistemi
- Gelişmiş faturalandırma
- SMS entegrasyonu
- Çoklu dil
- Video DRM / gelişmiş video koruma
- Kendi WebRTC altyapısı
- Kendi canlı ders kayıt sistemi

Bunlar sonradan modül olarak eklenebilir.

---

## 24. Riskler ve Dikkat Edilecekler

### 24.1. En büyük risk: kapsamın büyümesi
HeryerOnline çok büyük bir sistem. Parsmatematik ilk başta küçük tutulmalı.

Çözüm:
- İlk hedef sadece 2 öğretmeni çalıştıracak MVP.
- Her özellik “şimdi şart mı?” diye sorgulanmalı.

### 24.2. Canlı ders riski
Sıfırdan canlı ders yazmak çok zordur.

Çözüm:
- İlk başta link tabanlı çözüm.
- Sonra Jitsi iFrame.
- En son ücretli SDK.

### 24.3. Yetki ve veri güvenliği riski
Öğrenciler birbirinin verisini görmemeli.

Çözüm:
- Role kontrolü
- Supabase RLS
- Server-side kontrol
- Storage policy

### 24.4. Dosya ve video maliyeti
Video dosyaları storage maliyeti çıkarabilir.

Çözüm:
- İlk başta video linki kullan.
- PDF için Supabase Storage.
- Video hosting sonradan planlanır.

### 24.5. Kodun karışması
Özellikler plansız eklenirse proje dağılır.

Çözüm:
- Feature-based klasör yapısı
- Her modülde `actions`, `queries`, `types`, `validators`
- Küçük commitler
- Her faz sonunda refactor

---

## 25. Proje İçin Örnek Görevler

### İlk görev
```txt
Parsmatematik için Next.js + TypeScript + Tailwind projesini kur. Klasör yapısını CLAUDE.md dosyasındaki mimariye göre hazırla. İlk olarak sadece ana sayfa, navbar ve footer oluştur. Henüz auth ekleme.
```

### Auth görevi
```txt
Supabase Auth ile giriş/kayıt sistemini kur. profiles tablosunu oluştur. Kullanıcı role alanına göre admin/teacher/student dashboard sayfasına yönlendirilsin. Yetkisiz kullanıcı protected route'lara giremesin.
```

### Kurs görevi
```txt
courses, course_teachers ve course_enrollments tablolarını oluştur. Admin kurs oluşturabilsin. Öğretmen kendi atandığı kursları, öğrenci ise kayıtlı olduğu kursları görebilsin.
```

### Canlı ders görevi
```txt
live_sessions tablosunu oluştur. Öğretmen kursa bağlı canlı ders ekleyebilsin. Öğrenci yaklaşan canlı dersleri görsün ve meeting_url üzerinden derse katılsın.
```

### Ödev görevi
```txt
assignments ve assignment_submissions tablolarını oluştur. Öğretmen ödev versin, öğrenci dosya veya metin ile teslim etsin, öğretmen puan ve yorum yazsın.
```

---

## 26. Chat'e Yapıştırılacak Kısa Başlangıç Promptu

Yeni bir chate bu dosyayı attıktan sonra şunu yaz:

```txt
Bu CLAUDE.md dosyasına göre Parsmatematik projesini geliştireceğiz. Önce dosyayı oku, current_stage ve next_task bölümünü anla. Bana sıradaki en küçük adımı söyle ve kodu parçalar halinde ilerlet. Kodlar birbirine karışmasın; feature-based mimariye sadık kal.
```

---

## 27. Kaynaklar

- HeryerOnline ana sayfa: https://heryeronline.com/
- HeryerOnline özellikler: https://heryeronline.com/ozellikler/
- HeryerOnline özel kurslar: https://heryeronline.com/ozel-kurslar/
- HeryerOnline uzaktan eğitim platformu: https://heryeronline.com/uzaktan-egitim-platformu/
- Jitsi iFrame API: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe/
- Supabase Docs: https://supabase.com/docs

---

## 28. Son Not

Bu proje CV için çok güçlü bir proje olabilir. Ama hedef şu olmalı:

> “HeryerOnline'ın tamamını kopyalayacağım” değil, “2 matematik öğretmeninin gerçekten kullanacağı sade, güvenli ve geliştirilebilir online ders platformu yapacağım.”

Önce çalışan küçük sistem. Sonra özellik ekleme.

