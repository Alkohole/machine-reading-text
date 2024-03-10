window.config = {};
window.locales = {};
window.desktopLocales = {};
document.cookie = "SameSite=None";
!function(n,i){if(n.Ya=n.Ya||{},Ya.Rum)throw new Error("Rum: interface is already defined");var e=n.performance,t=e&&e.timing&&e.timing.navigationStart||Ya.startPageLoad||+new Date,a=n.requestAnimationFrame,s=Ya.Rum={enabled:!!e,vsStart:document.visibilityState,vsChanged:!1,_defTimes:[],_defRes:[],_deltaMarks:{},_markListeners:{},_settings:{},_vars:{},init:function(n,i){s._settings=n,s._vars=i},getTime:e&&e.now?function(){return e.now()}:Date.now?function(){return Date.now()-t}:function(){return new Date-t},time:function(n){s._deltaMarks[n]=[s.getTime()]},timeEnd:function(n,i){var e=s._deltaMarks[n];e&&0!==e.length&&e.push(s.getTime(),i)},sendTimeMark:function(n,i,e,t){void 0===i&&(i=s.getTime()),s._defTimes.push([n,i,t]),s.mark(n,i)},sendDelta:function(n,i,e){var t=s._deltaMarks;if(!t[n]&&void 0!==i){var a=s.getTime();t[n]=[a-i,a,e]}},sendResTiming:function(n,i){s._defRes.push([n,i])},sendRaf:function(n){var i=s.getSetting("forcePaintTimeSending");if(a&&(i||!s.isVisibilityChanged())){var e="2616."+n;a(function(){!i&&s.isVisibilityChanged()||(s.getSetting("sendFirstRaf")&&s.sendTimeMark(e+".205"),a(function(){!i&&s.isVisibilityChanged()||s.sendTimeMark(e+".1928")}))})}},isVisibilityChanged:function(){return s.vsStart&&("visible"!==s.vsStart||s.vsChanged)},mark:e&&e.mark?function(n,i){e.mark(n+(i?": "+i:""))}:function(){},getSetting:function(n){var i=s._settings[n];return null===i?null:i||""},on:function(n,i){"function"==typeof i&&(s._markListeners[n]=s._markListeners[n]||[]).push(i)},sendTrafficData:function(){},finalizeLayoutShiftScore:function(){},finalizeLargestContentfulPaint:function(){},getLCPAdditionalParams:function(){}};document.addEventListener&&document.addEventListener("visibilitychange",function n(){Ya.Rum.vsChanged=!0,document.removeEventListener("visibilitychange",n)})}(window);
Object.assign(window.config, {
    SID: '6ededb7d.bba78756.8b78f673.47875647d22747',
    VER: 'v125.0',
    IS_SEARCH_BOT: false,
    UID: null,
    CLCK_URL: 'https://yandex.com/clck/click/',
    DOMAIN: 'com',
    DEBUG_SUPPORTED: false,
    ENABLE_LANG_SWITCHERS: true,
    TOAST_DELAY: 4000,
    MAX_COL_LENGTH: 15,
    TABLEAU_URL: 'https://yastatic.net/tableau/tableau.html',
    TABLEAU_DELAY: 600,
    TABLEAU_PRESET: 'com',
    LOAD_TS: '1670871826',
    TRANSLATOR_LANGS: {"af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian","az":"Azerbaijani","ba":"Bashkir","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian","bg":"Bulgarian","my":"Burmese","ca":"Catalan","ceb":"Cebuano","zh":"Chinese","cv":"Chuvash","hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch","sjn":"Elvish (Sindarin)","emj":"Emoji","en":"English","eo":"Esperanto","et":"Estonian","fi":"Finnish","fr":"French","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gu":"Gujarati","ht":"Haitian","he":"Hebrew","mrj":"Hill Mari","hi":"Hindi","hu":"Hungarian","is":"Icelandic","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese","kn":"Kannada","kk":"Kazakh","kazlat":"Kazakh (Latin)","km":"Khmer","ko":"Korean","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","lt":"Lithuanian","lb":"Luxembourgish","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mhr":"Mari","mn":"Mongolian","ne":"Nepali","no":"Norwegian","pap":"Papiamento","fa":"Persian","pl":"Polish","pt":"Portuguese","pt-BR":"Portuguese (Brazilian)","pa":"Punjabi","ro":"Romanian","ru":"Russian","gd":"Scottish Gaelic","sr":"Serbian","si":"Sinhalese","sk":"Slovak","sl":"Slovenian","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tl":"Tagalog","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","tr":"Turkish","udm":"Udmurt","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","uzbcyr":"Uzbek (Cyrillic)","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","sah":"Yakut","yi":"Yiddish","zu":"Zulu"},
    SESSIONS_PATH: '/props/api/v1.0/sessions',
    SESSION_MAX_AGE: 10800,
    ENABLE_SID_REQUESTING: false,
    ENABLE_FORCE_CAPTCHA: false,
    IS_TEST_RUN: false,
});
(function () {
    var LANDING_TYPES = { 
        dict: 'dict',
        text: 'text'
    };
    /** @lends DesktopConfig# */Object.assign(window.config, {
        SRV: 'tr-text',
        FAMILY: true,
        CSRF_TOKEN: 'f7c312b3d9c72061dde079dae508928a9a72bbcb:65787abb',
        IS_FIRST_VISIT: false,
        TTS_URL: 'https://tts.voicetech.yandex.net/tts',
        UNIPROXY_URL: 'wss://uniproxy.alice.yandex.net/uni.ws',
        TTS_RATE: 1,
        TTS_LANGS: {
            ru: 'ru_RU',
        },
        MORE_MESSAGE: '{0} more',
        PAGEVIEW: '',
        DETECTOR_URL: 'https://translate.yandex.net/api/v1/tr.json/detect',
        COLLECTIONS_URL: '/props/api/',
        SPEECHKIT_KEY: 'bf4277fc-06c0-405a-b278-b796bbbd3f27',
        ALTERNATIVES_LANGS: {
            'en-ru': true,
            'ru-en': true
        },
        DICTIONARY_LANGS: {"lt-ru":true,"en-fr":true,"ru-tt":true,"bg-ru":true,"en-cs":true,"tr-de":true,"cs-en":true,"fr-en":true,"hu-ru":true,"en-no":true,"tr-ru":true,"lt-en":true,"it-ru":true,"fr-fr":true,"et-en":true,"ru-el":true,"pt-ru":true,"cs-ru":true,"ru-it":true,"ru-be":true,"fi-ru":true,"ru-en":true,"en-tr":true,"el-ru":true,"en-pt":true,"ru-cs":true,"nl-en":true,"ru-tr":true,"no-ru":true,"ru-mhr":true,"mhr-ru":true,"lv-ru":true,"sk-ru":true,"it-en":true,"lt-lt":true,"ru-ru":true,"es-es":true,"uk-uk":true,"en-lv":true,"uk-en":true,"ru-et":true,"de-en":true,"ru-bg":true,"sv-en":true,"zh-ru":true,"sv-ru":true,"it-it":true,"tt-ru":true,"en-de":true,"no-en":true,"mrj-ru":true,"en-sv":true,"en-da":true,"be-be":true,"lv-en":true,"da-ru":true,"ru-nl":true,"en-sk":true,"en-el":true,"ru-zh":true,"ru-hu":true,"uk-ru":true,"en-fi":true,"cs-cs":true,"ru-no":true,"de-de":true,"ru-da":true,"ru-uk":true,"nl-ru":true,"en-en":true,"ru-mrj":true,"fr-ru":true,"ru-pl":true,"el-en":true,"es-ru":true,"ru-sk":true,"ru-fr":true,"en-et":true,"hu-hu":true,"ru-lt":true,"ru-fi":true,"da-en":true,"en-nl":true,"be-ru":true,"de-ru":true,"tr-en":true,"ru-es":true,"es-en":true,"en-it":true,"fi-en":true,"pl-ru":true,"en-ru":true,"en-pt-BR":true,"ru-de":true,"de-tr":true,"ru-pt-BR":true,"sk-en":true,"ru-sv":true,"pt-en":true,"en-uk":true,"et-ru":true,"en-lt":true,"en-es":true,"ru-pt":true,"ru-lv":true,"fi-fi":true},
        EXAMPLE_LANGS: {"en-fr":true,"ru-tr":true,"tr-ru":true,"en-de":true,"es-ru":true,"de-ru":true,"id-ru":true,"id-en":true,"fr-en":true,"ru-it":true,"es-en":true,"en-it":true,"ru-id":true,"it-ru":true,"de-en":true,"ru-de":true,"de-tr":true,"ru-es":true,"it-en":true,"fr-ru":true,"en-id":true,"en-ru":true,"tr-en":true,"ru-en":true,"en-es":true,"ru-fr":true,"tr-de":true,"en-tr":true},
        DERIV_LANGS: {"en":true,"ru":true,"cs":true},
        ANT_LANGS: {"en":true,"ru":true,"cs":true},
        DECLENSIONS_LANGS: {"it":true,"es":true,"pt":true,"en":true,"de":true,"fr":true},
        EXTERNAL_SERVICES: {
            Google: {
                href: 'https://translate.google.com/',
                textParam: 'text',
                srcLangParam: 'ru',
                dstLangParam: 'en',
                langMismatches: {
                    zh: 'zh-CN',
                    jv: 'jw',
                    he: 'iw',
                    'pt-BR': 'pt',
                }
            },
        },
        USE_FAKEAREA: false,
        MAX_FAV_ITEMS2: 2500,
        MAX_UNIPROXY_TTS_LENGTH: 20000,
        MAX_TTS_LENGTH: 20000,
        INVALID_URL_LANGS: {
            sjn: true
        },
        PRESYNC_TIMEOUT: 15000,
        SPEECHKIT_TIMEOUT: 5000,
        MAX_FAV_TEXT_LENGTH: 20000,
        SESSION_RESUME_TIME: 1000 * 60 * 30,
        COLLAPSE_THRESHOLD: 8,
        DICTIONARY_COUNT: 3,
        COLLAPSED_HEIGHT: 270,
        COLLECTION_BANNER_DELAY: 86400 * 1000, // 1 day
        MAX_NATIVE_TTS_LENGTH: 20000,
        ENABLE_DOM_TRACKING: true,
        FORCE_UNIPROXY: false,
        ENABLE_TTS_SLOWING: false,
        ENABLE_NATIVE_ASR: false,
        ENABLE_DIST_BANNER: false,
        ENABLE_HISTORY_SYNC: false,
        FORCE_SKIT_ASR_URL: null,
        FORCE_SKIT_TTS_URL: null,
        ENABLE_COLLECTION: false,
        LANDING_TYPE: 'ru',
        ENABLE_SUGGESTIONS: false,
        SUGGESTIONS_CONF: null,
        DISABLE_DICTIONARY: true,
        DISABLE_EXAMPLES: true,
        EXAMPLES_RANDOM_RANKING: false,
        REDUCE_DICT_EXAMPLES: false,
        NEW_DESKTOP: false,
        ENABLE_NEW_SPELLER: false,
        ENABLE_NEW_EXAMPLES: true,
        LOCALIZATIONS: /** @lends DesktopMessages# */{},
        DISABLE_DST_PREDICTOR: false,
        ENABLE_SEO_SSR: false,
    });
}());
locales.themeLabels = 0;
locales.settingOptions = 0;
locales.settingOptionDescritions = 0;
desktopLocales.hotKeys = 0;
Object.assign(window.config || {}, {});
window.locales.cardsCarousel = {};
Object.assign(window.config || {}, {});
locales.speller = {
    spellerPopupTitle: 0,
    spellerPopupClose: 0,
    spellerPopupText: 0,
    revertAction: 'revert',
    spellerBarLabel: 'maybe you meant',
    spellerExplanation: 'You wrote {}. Maybe you meant',
};
