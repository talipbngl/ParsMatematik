# Parsmatematik Foundation Audit

Bu dosya, mock MVP iskeletinden gerçek ürüne geçerken düzeltilmesi gereken temel konuları takip etmek için oluşturuldu.

## Build Durumu

Son bilinen durum:

- `npm run type-check`: başarılı
- `npm run build`: başarılı
- Next.js production build route üretimi başarılı

## Güçlü Taraflar

- Feature-based klasör yapısı var.
- Dashboard rolleri ayrılmış.
- Auth servisi Supabase'e hazırlanmış.
- TypeScript strict ayarlar açık.
- Public ve dashboard route'ları build'den geçiyor.

## Kritik Riskler

### 1. Mock dashboard fallback

Auth/profile alınamazsa mock kullanıcı dönüyor.

Düzeltme:
- Fallback admin olmamalı.
- Mock kullanıcı sadece development aşamasında kalmalı.
- Gerçek role guard sonraki pakette sayfalara bağlanmalı.

### 2. Supabase migration dosyaları

Migration dosyaları gerçek tablo SQL'leriyle doldurulmalı.

Öncelik:
1. profiles
2. courses
3. live_lessons
4. assignments
5. exams
6. payments

### 3. RLS policies

Policy dosyaları gerçek güvenlik kurallarıyla doldurulmalı.

Öncelik:
1. profiles
2. courses
3. assignments
4. exams
5. payments

### 4. Paket sürümleri

`package.json` içinde çok fazla `latest` var.

Düzeltme:
- Mevcut çalışan package-lock baz alınarak sürümler sabitlenmeli.
- Sonra temiz kurulum testi yapılmalı.

### 5. Mock servisler

Mock servisler MVP ekranları için iyi ama gerçek ürüne geçmeden önce Supabase servisleriyle ayrıştırılmalı.

## Sonraki Mantıklı Paket

Paket 32 önerisi:

- Admin route guard
- Teacher route guard
- Student route guard
- Dashboard redirect kontrolü
- Mock fallback'in kontrollü hale getirilmesi