# [MRT] - Makine Metin Okuma ([RU](README.md)/[EN](README-en.md)/[TR](README-tr.md))
Bu uzantı, yazılı metni sentetik bir sesle yeniden üretmenize olanak tanır ve artık sadece Windows için Yandex Tarayıcı'da değil. Bu fırsat için **[Yandex.Translate](https://translate.yandex.ru/)**'e minnettarız.
- **[Dinle](https://alkohole.github.io/machine-reading-text/)** fonksiyonu, istek başına 20k karakter *(≈3000 kelime* **/** *≈11 dakika)* sınırına sahiptir. **(✅ Kararlı)**

|  | Önceki | Sonraki | Tarih |
|---|---|---|---|
| Uzantı | ~~v0.5.5~~ | [**v0.5.6**_(js)_](#v056jsde-güncelleme) | 14.09.24 |
| Pencere Sayfası | ~~v0.4.1~~ | [**v0.4.2**_(web)_](#v042webde-güncelleme) | 14.09.24 |

<details>
<summary>
  
## `Navigasyon`
</summary>

- [**Arayüz ve Kontrol**](#arayüz-ve-kontrol)
- [**Kurulum ve Güncelleme**](#kurulum-ve-güncelleme)
- [**Sesler ve Duygular**](#sesler-ve-duygular)
- [**Güncelleme Penceresi**](#güncelleme-penceresi)

</details>

## Demo <sup>_`(9 Aralık 2023)`_</sup>:

https://github.com/Alkohole/udr/assets/59339504/99fdac2b-0f26-42e5-94eb-2a550acb5a7c

<div class="video-box">
  <video id="player" controls>
    <source src="https://github-production-user-asset-6210df.s3.amazonaws.com/59339504/289288865-99fdac2b-0f26-42e5-94eb-2a550acb5a7c.mp4" size="720">
    Tarayıcınız video etiketini desteklemiyor.
  </video>
</div>

## Arayüz ve Kontrol:
| Web Arayüzü | Eklenti Arayüzü | Eklenti Arayüzü (daraltılmış) |
|---|---|---|
| ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/full.png) | ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/normal.png) | ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/small.png) |

| Düğme | Eylem |
|:---:|---------|
| **▶** | Metin okumayı başlatır. |
| **■** | Metin okumayı sonlandırır. |
| **▶II** | Metin okumayı duraklatır/devam ettirir. |
| **✖▶** | Metni okuyamıyor, limit aşıldı. |
| ![#5EC5FF](https://place-hold.it/15/5EC5FF/000000?text=+) | Pencereyi aç |
| ![#FF5E5E](https://place-hold.it/15/FF5E5E/000000?text=+) | Pencereyi kapat |
| ![#FFCF5E](https://place-hold.it/15/FFCF5E/000000?text=+) | Ayarları aç |
| ![#4E4E4E](https://place-hold.it/15/4E4E4E/000000?text=+) | Pencereyi küçült/büyüt |

- Giriş penceresinde bir bırakma işleyicisi var (Metni seçin ve giriş penceresine sürükleyin, pencerede daha önce bulunan metin otomatik olarak silinir).
- Pencerede bir karakter sayacı var (Limit aşılırsa - bir mesaj göreceksiniz).
- Seslendirme için ses seçeneği var: 10 kadın ve 9 erkek sesi.
- Homograf kelimelerde vurguyu manuel olarak ayarlamak için vurgulu harften önce `+` kullanabilirsiniz ve kelimeler arasında `-` ile duraklatma yapabilirsiniz. Örnek: `K+ale, Kal+e`.

- Ayarlarda şunları yapabilirsiniz:
  - Uzantı penceresinin konumunu `px` cinsinden belirleyebilirsiniz.
  - Pencerenin başlangıç konumunu belirleyebilirsiniz.
  - Varsayılan ayarlara geri dönebilirsiniz.
  - Güncellemeleri kontrol edebilir ve güncelleyebilirsiniz.

## Kurulum ve Güncelleme:

### Betik Kurulumu
1. **[Tampermonkey](https://www.tampermonkey.net/)** uzantısını yükleyin (Safari için alternatif: **[UserScripts](https://apps.apple.com/app/userscripts/id1463298887 )**).
2. **[Betiği Yükleyin](https://github.com/Alkohole/machine-reading-text/raw/main/mrt.user.js)**.

### Manuel Güncelleme (Önerilen):

1. Ayarlara gidin ![Sarı düğme](https://place-hold.it/15/FFCF5E/000000?text=+).
2. Bir güncelleme varsa, güncellenmeniz istenecektir, en son sürüme tıklayın.
3. Açılan pencerede **Güncelle/Üzerine Yaz**'a tıklayın

### Otomatik Güncelleme (Önerilmez):

1. Tarayıcı uzantılarında, **Tampermonkey** uzantısını açın.
2. **Yardımcı Programlar** bölümüne gidin.
3. **Betik güncellemelerini kontrol et** düğmesine tıklayın.

## Sesler ve Duygular:

_Ses örneği olarak Thomas Stearns Eliot'ın "The Hollow Men" şiirinin 3. bölümü kullanılmıştır_

| TTS Adı | 😈 | 😐 | ☺️ | 🥳 | Model | Örnekler |
|--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Alice** (♀)<sup>`varsayılan`</sup> |❌|✅|❌|✅| `tatyana_shitova.gpu` |[Tatyana.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Shitova.ogg) |
| **Oksana** (♀) |*✅***|✅|*✅***|❌| `oksana.gpu` |[`RU`](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Oksana.wav) / [`UA`](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Oksana_nogpu_ua.ogg) |
| **Jane** (♀) |*✅***|✅|*✅***|❌| `jane.gpu` |[Jane.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Jane.wav) |
| **Omazh** (♀) |*✅***|✅|❌|❌| `omazh.gpu` |[Omazh.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Omazh.wav) |
| **Nastya** (♀) |✅|*✅***|❌|❌| `nastya.gpu` |[Nastya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Nastya.wav) |
| **Sasha** (♀) |*✅***|*✅***|✅|❌| `sasha.gpu` |[Sasha.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Sasha.wav) |
| **Tatyana** (♀) |❌|❌|✅|❌| `tatyana_abramova.gpu` |[Tatyana.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Abramova.wav) |
| **Ermil** (♂) |*✅***|✅|*✅***|❌| `ermil.gpu` |[Ermil.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Ermil.wav) |
| **Zahar** (♂) |*✅***|✅|*✅***|❌| `zahar.gpu` |[Zahar.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Zahar.wav) |
| **Kolya** (♂) |*✅***|✅|*✅***|❌| `kolya.gpu` |[Kolya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Kolya.wav) |
| **Kostya** (♂) |*✅***|✅|*✅***|❌| `kostya.gpu` |[Kostya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Kostya.wav) |
| **Anton** (♂) |❌|✅|❌|❌| `anton_samokhvalov.gpu` |[Anton.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Anton_Samokhvalov.wav) |
| **Levitan** (♂) |❌|*✅***|*✅***|❌| `levitan` ||
| **Nick** (♂) |*✅***|*✅***|*✅***|❌| `nick` ||
| **Zhenya** (♂) |*✅***|*✅***|*✅***|❌| `zhenya` ||
| **Rezeda** <sup>`Tt`</sup> (♀) |❌|✅|❌|❌| `rezeda.gpu` ||
| **Selay** <sup>`Tr`</sup> (♀) |❌|✅|❌|❌| `selay.gpu` | [Selay.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Selay.ogg) |
| **Silaerkan** <sup>`En`</sup> (♀) |❌|*✅***|❌|❌| `silaerkan` ||
| **Erkanyavas** <sup>`En`</sup> (♂) |*✅***|*✅***|*✅***|❌| `erkanyavas` | [Erkanyavas.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Erkanyavas.ogg) |


**✅** - Destekleniyor.<br>
*✅*** - Sadece modelin **`CPU`** versiyonunda mevcut.<br>
**❌** - Desteklenmiyor.

## ⚠️ Olası planlar:
- [ ] Blok blok seslendirme ve blok görselleştirme.
- [ ] Yüzen pencere.
- [ ] Seslendirmeyi geri sarma yeteneği.
- [ ] Seslendirmeyi indirme yeteneği.
- [ ] Sağ tık menüsü aracılığıyla seçili metni TTS'e gönderme ve otomatik olarak seslendirme yeteneği.
- [x] Seçici parametrelerinin önbelleğe alınması. _(bellek)_
- [x] Duraklatma.
- [x] Ayarlar, uzantı penceresinin konumlandırılması.
- [x] **`CPU`** ve **`GPU`** arasında geçiş yapabilme yeteneği. _(Şu an kısmen)_
- [x] Dil değiştirme yeteneği. _(`Ru`, `Tr`, `Tt`, `Uk`, `En`)_
- [x] **`WAV`** formatından **`WEBM`**/**`OGG`** formatlarına geçiş.
- [x] Hız değiştirme yeteneği.
- [x] Duyguları değiştirme yeteneği.
- [x] Seslendirme sesi seçimi.
- [x] **`README.md`'deki hataları düzelt**...

<br><br>
  
# Güncelleme Penceresi

<br>

## v0.5.6(js) Güncellemesi
- Yenilikler:
  - Güncelleme izleme ve güncelleme düğmesi.
  - Ayarların önbelleğe alınması.
- Ayarlar penceresi:
  - Ayarlar penceresinin stilize edilmesi.
  - Güncelleme seçeneği eklendi.
  - Eklenti penceresinin konumunu seçme işlevi eklendi.
  - Geri alma düğmesi eklendi.
  - `Hakkında` bloğu eklendi.
- Düzeltilen hatalar:
  - Web sitelerindeki `iframe` öğelerinde eklenti penceresinin çoğaltılması hatası.


_Önceki güncelleme:_
> ### v0.5.5(js) Güncellemesi
> - Düğme stili için küçük güncellemeler.
> - İndeks düzeltildi.

> ### v0.5.4(js) Güncellemesi
> - `Shadow DOM` kapsüllemesi eklendi - artık web sitelerinin css/js'si eklenti arayüzünü etkilemeyecek.
> - `offsetRight` `offset` olarak yeniden adlandırıldı.
> - Diğer küçük değişiklikler

> ### v0.5.3(js) Güncellemesi
> - Pencere konumlandırmasını değiştirme imkanı eklendi.
> - Ayarlar düğmesi eklendi.

## v0.4.2(web) Güncellemesi
- Yenilikler:
  - Seçicilerin önbelleğe alınması.

_Önceki güncelleme:_
> ## v0.4.1(web) Güncellemesi
> - Betik sunucusu değiştirildi - metin seslendirme reddedilme sorunu çözüldü.
> - `webspeech` sürümü v160.1'e güncellendi.
> - Tatar dili eklendi.
> - Duraklatma düğmesi eklendi.

> ### v0.4(web) Güncellemesi
> - Sesler eklendi: **Selay**, **Erkanyavas**, **Silaerkan**.
> - Diller eklendi: `Tr`, `Uk`, `En`.
> - Ek konuşma hızları eklendi.
> - Vurguları ayarlama imkanı eklendi: vurgulu harften önce `+` kullanarak ve durak için `-` kullanarak.
> - Arayüz yeniden tasarlandı.
> - İngilizce dil modeli Rusça dili kullandığında oluşan sorun düzeltildi.
> - **Erkanyavas** ve **Silaerkan** sesleri Türkçe dilinden kaldırıldı.
> - 3 yeni ses eklendi: **Levitan**, **Nick** ve **Zhenya**.

<br>

> [!IMPORTANT]
> Bu proje benim kişisel bir hevesimdir ve ciddi bir şey için tasarlanmamıştır. <br>
> Bu tts yalnızca `Yandex` tarayıcısında ve yalnızca **`Windows`** altında kullanılabilir olduğundan ve **`MacOS`** ve **`Linux`** kullanıcıları için `Yandex` tarayıcısı ile bile bu okuyucu mevcut olmadığından, bu imkanı tüm tarayıcılar ve **`OS`**'ler için gerçekleştirmek istedim. <br>

> [!TIP]
> İngilizce versiyona ihtiyacınız varsa - **[Edge TTS](https://github.com/EdgeTTS/EdgeTTS.github.io)** veya başka bir TTS kullanın. <br>
> `Yandex` tarayıcısından başka işlevlerin uygulamaları ile ilgileniyorsanız: <br>
> - **[[VOT] - voice-over-translation](https://github.com/ilyhalight/voice-over-translation)** - `YouTube`'daki (ve diğer) videoları seslendirme ve/veya altyazı şeklinde çevirmenizi sağlar.

> [!IMPORTANT]
> Sorun yaşarsanız - tarayıcınızı yeniden başlatın. <br>
> Yaklaşık `20k` karakter boyutundaki `1` istek yaklaşık `10MB`'a eşittir, <br>
> `20k`'lık `102` istek `1GB`'a yaklaşacaktır, <br>
> bu RAM'inizi doldurur ve donmalara neden olabilir, <br>
> şu anda bu sorunu çözmeye çalışıyorum, geçici çözüm - `tarayıcıyı yeniden başlatmak`. <br>
> <br>
> İnternet trafiği sınırlı olanlar için, aşırı trafik kullanımını ve internet bağlantınızın sınırlamalarını önlemek amacıyla gönderdiğiniz istek sayısını kontrol etmeniz önerilir.
