window.config = {};
window.locales = {};
window.desktopLocales = {};

!(function (n, i) {
  if (((n.Ya = n.Ya || {}), Ya.Rum))
    throw new Error("Rum: interface is already defined");
  var e = n.performance,
    t =
      (e && e.timing && e.timing.navigationStart) ||
      Ya.startPageLoad ||
      +new Date(),
    a = n.requestAnimationFrame,
    s = (Ya.Rum = {
      enabled: !!e,
      vsStart: document.visibilityState,
      vsChanged: !1,
      _defTimes: [],
      _defRes: [],
      _deltaMarks: {},
      _markListeners: {},
      _settings: {},
      _vars: {},
      init: function (n, i) {
        (s._settings = n), (s._vars = i);
      },
      getTime:
        e && e.now
          ? function () {
              return e.now();
            }
          : Date.now
          ? function () {
              return Date.now() - t;
            }
          : function () {
              return new Date() - t;
            },
      time: function (n) {
        s._deltaMarks[n] = [s.getTime()];
      },
      timeEnd: function (n, i) {
        var e = s._deltaMarks[n];
        e && 0 !== e.length && e.push(s.getTime(), i);
      },
      sendTimeMark: function (n, i, e, t) {
        void 0 === i && (i = s.getTime()),
          s._defTimes.push([n, i, t]),
          s.mark(n, i);
      },
      sendDelta: function (n, i, e) {
        var t = s._deltaMarks;
        if (!t[n] && void 0 !== i) {
          var a = s.getTime();
          t[n] = [a - i, a, e];
        }
      },
      sendResTiming: function (n, i) {
        s._defRes.push([n, i]);
      },
      sendRaf: function (n) {
        var i = s.getSetting("forcePaintTimeSending");
        if (a && (i || !s.isVisibilityChanged())) {
          var e = "2616." + n;
          a(function () {
            (!i && s.isVisibilityChanged()) ||
              (s.getSetting("sendFirstRaf") && s.sendTimeMark(e + ".205"),
              a(function () {
                (!i && s.isVisibilityChanged()) || s.sendTimeMark(e + ".1928");
              }));
          });
        }
      },
      isVisibilityChanged: function () {
        return s.vsStart && ("visible" !== s.vsStart || s.vsChanged);
      },
      mark:
        e && e.mark
          ? function (n, i) {
              e.mark(n + (i ? ": " + i : ""));
            }
          : function () {},
      getSetting: function (n) {
        var i = s._settings[n];
        return null === i ? null : i || "";
      },
      on: function (n, i) {
        "function" == typeof i &&
          (s._markListeners[n] = s._markListeners[n] || []).push(i);
      },
      sendTrafficData: function () {},
      finalizeLayoutShiftScore: function () {},
      finalizeLargestContentfulPaint: function () {},
      getLCPAdditionalParams: function () {},
    });
  document.addEventListener &&
    document.addEventListener("visibilitychange", function n() {
      (Ya.Rum.vsChanged = !0),
        document.removeEventListener("visibilitychange", n);
    });
})(window);

Object.assign(window.config, {
    SID: '6ededb7d.bba78756.8b78f673.47875647d22747',
    VER: 'v77.2',
    IS_SEARCH_BOT: false,
    UID: null,
    CLCK_URL: 'https://yandex.com/clck/click/',
    DOMAIN: 'com',
    DEBUG_SUPPORTED: false,
    ENABLE_LANG_SWITCHERS: true,
    TOAST_DELAY: 4000,
    TABLEAU_URL: 'https://yastatic.net/tableau/tableau.html',
    TABLEAU_DELAY: 600,
    TABLEAU_PRESET: 'com',
    LOAD_TS: '1670871826',
    TRANSLATOR_LANGS: {"af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian","az":"Azerbaijani","ba":"Bashkir","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian","bg":"Bulgarian","my":"Burmese","ca":"Catalan","ceb":"Cebuano","zh":"Chinese","cv":"Chuvash","hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch","sjn":"Elvish (Sindarin)","emj":"Emoji","en":"English","eo":"Esperanto","et":"Estonian","fi":"Finnish","fr":"French","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gu":"Gujarati","ht":"Haitian","he":"Hebrew","mrj":"Hill Mari","hi":"Hindi","hu":"Hungarian","is":"Icelandic","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese","kn":"Kannada","kk":"Kazakh","kazlat":"Kazakh (Latin)","km":"Khmer","ko":"Korean","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","lt":"Lithuanian","lb":"Luxembourgish","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mhr":"Mari","mn":"Mongolian","ne":"Nepali","no":"Norwegian","pap":"Papiamento","fa":"Persian","pl":"Polish","pt":"Portuguese","pt-BR":"Portuguese (Brazilian)","pa":"Punjabi","ro":"Romanian","ru":"Russian","gd":"Scottish Gaelic","sr":"Serbian","si":"Sinhalese","sk":"Slovak","sl":"Slovenian","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tl":"Tagalog","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","tr":"Turkish","udm":"Udmurt","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","uzbcyr":"Uzbek (Cyrillic)","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","sah":"Yakut","yi":"Yiddish","zu":"Zulu"},
    SESSIONS_PATH: '/props/api/v1.0/sessions',
    SESSION_MAX_AGE: 10800,
    ENABLE_SID_REQUESTING: false,
});
(function () {
    var LANDING_TYPES = { 
        dict: 'dict',
        text: 'text'
    };
    Object.assign(window.config, {
        SRV: 'tr-text',
        FAMILY: true,
        CSRF_TOKEN: 'f7c312b3d9c72061dde079dae508928a9a72bbcb:65787abb',
        IS_FIRST_VISIT: false,
        TTS_URL: 'https://tts.api.cloud.yandex.net/speech/v1/tts',
        UNIPROXY_URL: 'wss://beta.uniproxy.alice.yandex.net/uni.ws',
        TTS_RATE: 1,
        TTS_LANGS: {
            ru: 'ru_RU',
        },
        MORE_MESSAGE: '{0} more',
        PAGEVIEW: '',
        DETECTOR_URL: 'https://translate.yandex.net/api/v1/tr.json/detect',
        COLLECTIONS_URL: false,
        SPEECHKIT_KEY: 'bf4277fc-06c0-405a-b278-b796bbbd3f27',
        ALTERNATIVES_LANGS: false,
        DICTIONARY_LANGS: false,
        EXAMPLE_LANGS: false,
        DERIV_LANGS: false,
        ANT_LANGS: false,
        DECLENSIONS_LANGS: false,
        EXTERNAL_SERVICES: false,
        USE_FAKEAREA: false,
        MAX_FAV_ITEMS2: false,
        MAX_UNIPROXY_TTS_LENGTH: 20000,
        MAX_TTS_LENGTH: 5,
        INVALID_URL_LANGS: {
            sjn: true
        },
        PRESYNC_TIMEOUT: 15000,
        SPEECHKIT_TIMEOUT: 5000,
        MAX_FAV_TEXT_LENGTH: false,
        SESSION_RESUME_TIME: 1000 * 60 * 30,
        COLLAPSE_THRESHOLD: 8,
        DICTIONARY_COUNT: 3,
        COLLAPSED_HEIGHT: 270,
        COLLECTION_BANNER_DELAY: 86400 * 1000, // 1 day
        MAX_NATIVE_TTS_LENGTH: 20000,
        ENABLE_DOM_TRACKING: true,
        FORCE_UNIPROXY: true,
        ENABLE_TTS_SLOWING: false,
        ENABLE_NATIVE_ASR: false,
        ENABLE_DIST_BANNER: false,
        ENABLE_HISTORY_SYNC: false,
        FORCE_SKIT_ASR_URL: null,
        FORCE_SKIT_TTS_URL: null,
        ENABLE_COLLECTION: false,
        LANDING_TYPE: false,
        ENABLE_SUGGESTIONS: false,
        SUGGESTIONS_CONF: null,
        DISABLE_DICTIONARY: true,
        DISABLE_EXAMPLES: true,
        EXAMPLES_RANDOM_RANKING: false,
        REDUCE_DICT_EXAMPLES: false,
        NEW_DESKTOP: false,
        ENABLE_NEW_SPELLER: true,
        ENABLE_NEW_EXAMPLES: true,
        LOCALIZATIONS: {},
        DISABLE_DST_PREDICTOR: false,
        ENABLE_SEO_SSR: false,
    });
}());
locales.themeLabels = 0;
locales.settingOptions = 0;
locales.settingOptionDescritions = 0;
desktopLocales.hotKeys = 0;
// Object.assign(window.config || {}, {});
window.locales.cardsCarousel = {};
// Object.assign(window.config || {}, {});
locales.speller = {
    spellerPopupTitle: 0,
    spellerPopupClose: 0,
    spellerPopupText: 0,
    revertAction: 'revert',
    spellerBarLabel: 'maybe you meant',
    spellerExplanation: 'You wrote {}. Maybe you meant',
};
