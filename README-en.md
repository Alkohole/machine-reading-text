# [MRT] - Machine Reading Text ([RU](README.md)/[EN](README-en.md)/[TR](README-tr.md))
The extension allows you to reproduce written text with a synthesized voice, now available not only in Yandex Browser for Windows. Grateful to **[Yandex.Translate](https://translate.yandex.ru/)** for this opportunity.
- The **[Listen](https://alkohole.github.io/machine-reading-text/)** function has a limit of 20k characters *(≈3000 words* **/** *≈11 minutes)* per request. **(✅ Stable)**

|  | From | To | Date |
|---|---|---|---|
| Extension | ~~v0.5.5~~ | [**v0.5.6**_(js)_](#update-in-v056js) | 14.09.24 |
| Window Page | ~~v0.4.2~~ | [**v0.4.3**_(web)_](#update-in-v043web) | 26.01.25 |

<details>
<summary>
  
## `Navigation`
</summary>

- [**Interface and Control**](#interface-and-control)
- [**Installation and Update**](#installation-and-update)
- [**Voices and Emotions**](#voices-and-emotions)
- [**Update Window**](#update-window)

</details>

## Demo <sup>_`(Dec 9, 2023)`_</sup>:

https://github.com/Alkohole/udr/assets/59339504/99fdac2b-0f26-42e5-94eb-2a550acb5a7c

<div class="video-box">
  <video id="player" controls>
    <source src="https://github-production-user-asset-6210df.s3.amazonaws.com/59339504/289288865-99fdac2b-0f26-42e5-94eb-2a550acb5a7c.mp4" size="720">
    Your browser does not support the video tag.
  </video>
</div>

## Interface and Control:
| Web Interface | Plugin Interface | Plugin Interface (collapsed) |
|---|---|---|
| ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/full.png) | ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/normal.png) | ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/small.png) |

| Button | Action |
|:---:|---------|
| **▶** | Starts text-to-speech playback. |
| **■** | Ends text-to-speech playback. |
| **▶II** | Pauses/Resumes text-to-speech playback. |
| **✖▶** | Unable to read text, limit exceeded. |
| ![#5EC5FF](https://place-hold.it/15/5EC5FF/000000?text=+) | Open window |
| ![#FF5E5E](https://place-hold.it/15/FF5E5E/000000?text=+) | Close window |
| ![#FFCF5E](https://place-hold.it/15/FFCF5E/000000?text=+) | Open settings |
| ![#4E4E4E](https://place-hold.it/15/4E4E4E/000000?text=+) | Minimize/maximize window |

- There's a drop handler in the input window (Select text and drag it into the input window, the text previously in the window is automatically erased).
- There's a character count in the window (If the limit is exceeded - you'll see a message).
- There's a choice of voice-over voices: 10 female and 9 male voices.
- You can manually set stress in homograph words using `+` before the stressed letter, and there's a pause between words `-`. Example: `З+амок, Зам+ок`.

- In the settings, you can:
  - Specify the offset of the extension window in `px`.
  - Specify the initial position of the window.
  - Revert to default settings.
  - Check for updates and update.

## Installation and Update:

### Script Installation
1. Install the **[Tampermonkey](https://www.tampermonkey.net/)** extension (Alternative for Safari: **[UserScripts](https://apps.apple.com/app/userscripts/id1463298887 )**).
2. **[Install the Script](https://github.com/Alkohole/machine-reading-text/raw/main/mrt.user.js)**.

### Manual Update (Recommended):

1. Go to settings ![Yellow button](https://place-hold.it/15/FFCF5E/000000?text=+).
2. If an update is available, you'll be prompted to update, click on the latest version.
3. In the opened window, click **Update/Overwrite**

### Auto Update (Not Recommended):

1. In the browser extensions, open the **Tampermonkey** extension.
2. Go to the **Utilities** section.
3. Click on the **Check for script updates** button.

## Voices and Emotions:

_As an example for the voice, chapter 3 of Thomas Stearns Eliot's poem "The Hollow Men" is used_

| TTS Name | 😈 | 😐 | ☺️ | 🥳 | Model | Examples |
|--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Alice** (♀)<sup>`default`</sup> |❌|✅|❌|✅| `tatyana_shitova.gpu` |[Tatyana.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Shitova.ogg) |
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
| **Chuvash** <sup>`Cv`</sup> (♀) |❌|✅|❌|❌| `chuvash.gpu` ||
| **Silaerkan** <sup>`En`</sup> (♀) |❌|*✅***|❌|❌| `silaerkan` ||
| **Erkanyavas** <sup>`En`</sup> (♂) |*✅***|*✅***|*✅***|❌| `erkanyavas` | [Erkanyavas.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Erkanyavas.ogg) |


**✅** - Supported.<br>
*✅*** - Available only in the **`CPU`** version of the model.<br>
**❌** - Not supported.

## ⚠️ Possible plans:
- [ ] Block-by-block voice-over and block visualization.
- [ ] Floating window.
- [ ] Ability to rewind the voice-over.
- [ ] Ability to download the voice-over.
- [ ] Ability to send selected text to TTS and automatically voice it through the RMB menu.
- [x] Caching of selector parameters. _(memory)_
- [x] Pause.
- [x] Settings, positioning of the extension window.
- [x] Ability to switch between **`CPU`** and **`GPU`**. _(Partially at the moment)_
- [x] Ability to change language. _(`Ru`, `Tr`, `Cv`, `Tt`, `Uk`, `En`)_
- [x] Transition from **`WAV`** format to **`WEBM`**/**`OGG`** formats.
- [x] Ability to change speed.
- [x] Ability to change emotions.
- [x] Choice of voice-over voice.
- [x] **Fix errors in `README.md`**...

<br><br>
  
# Update Window

<br>

## Update in v0.5.6(js)
- New features:
  - Update monitoring and update button.
  - Settings caching.
- Settings window:
  - Styling of the settings window.
  - Added update item.
  - Added function to choose the position of the extension window.
  - Added rollback button.
  - Added `About` block.
- Fixed bugs:
  - Bug with duplication of the plugin window in `iframe` elements on websites.


_Previous update:_
> ### Update in v0.5.5(js)
> - Minor update to button style.
> - Fixed index.

> ### Update in v0.5.4(js)
> - Added `Shadow DOM` encapsulation - now css/js of sites will not affect the plugin interface.
> - `offsetRight` was renamed to `offset`.
> - Other minor changes

> ### Update in v0.5.3(js)
> - Added ability to change window positioning.
> - Added settings button.

## Update in v0.4.3(web)
- Languages added:
  - Chuvash language - `Cv`.

_Previous update:_
> ## Update in v0.4.2(web)
> - New features:
>   - Selector caching.

> ## Update in v0.4.1(web)
> - Script server changed, - solving the problem with text-to-speech refusal.
> - Updated `webspeech` version to v160.1.
> - Added Tatar language.
> - Added Pause button.

> ### Update in v0.4(web)
> - Added voices: **Selay**, **Erkanyavas**, **Silaerkan**.
> - Added languages: `Tr`, `Uk`, `En`.
> - Added additional speech speeds.
> - Added ability to set stress using `+` before the stressed letter, and pause `-`.
> - Interface redesigned.
> - Fixed the problem when the model for English language used Russian language.
> - Removed **Erkanyavas** and **Silaerkan** voices from Turkish language.
> - Added 3 voices: **Levitan**, **Nick** and **Zhenya**.

<br>

> [!IMPORTANT]
> This project is my personal whim, and it's not designed for anything serious. <br>
> Because this tts is only available in the `Yandex` browser and only under **`Windows`**, and **`MacOS`** and **`Linux`** users, even with the `Yandex` browser, don't have access to this reader, I wanted to implement this capability for any browsers and OSes. <br>

> [!TIP]
> If you need an English version - use **[Edge TTS](https://github.com/EdgeTTS/EdgeTTS.github.io)** or any other TTS. <br>
> If you're interested in implementations of other functionality from the `Yandex` browser: <br>
> - **[[VOT] - voice-over-translation](https://github.com/ilyhalight/voice-over-translation)** - allows you to translate videos on `YouTube` _(and not only)_ in the form of voice-over and/or subtitles.

> [!IMPORTANT]
> In case of problems - reload the browser. <br>
> `1` request of about `20k` characters is approximately equal to `10MB`, <br>
> `102` requests of `20k` will approach `1GB`, <br>
> this clogs up your RAM and can cause hangs, <br>
> at the moment, I'm trying to solve this problem, and a temporary solution is `browser reload`. <br>
> <br>
> For those with limited internet traffic, it's recommended to control the number of requests you send to avoid excessive traffic consumption and limitations of your internet connection.
