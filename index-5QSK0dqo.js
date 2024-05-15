import { i as ge, h as ye } from "./index-Bw-RAgZx.js";
const se = Math.random();
async function Me() {
  const e = new OfflineAudioContext(1, 100, 44100), t = e.createOscillator();
  return t.frequency.value = 0, t.start(0), e.startRendering(), new Promise((a) => {
    e.oncomplete = (l) => {
      var r, s;
      const o = (s = (r = l.renderedBuffer).getChannelData) == null ? void 0 : s.call(r, 0);
      o || a(!1), a(`${[...new Set(o)]}` != "0");
    };
  }).finally(() => t.disconnect());
}
async function lt() {
  var e, t, a;
  try {
    if (window.OfflineAudioContext = OfflineAudioContext || webkitOfflineAudioContext, !window.OfflineAudioContext)
      return;
    const l = 5e3, o = new OfflineAudioContext(1, l, 44100), r = o.createAnalyser(), s = o.createOscillator(), i = o.createDynamicsCompressor(), c = o.createBiquadFilter(), h = new Float32Array(r.frequencyBinCount);
    (e = r.getFloatFrequencyData) == null || e.call(r, h);
    const m = {
      "AnalyserNode.channelCount": () => r.channelCount,
      "AnalyserNode.channelCountMode": () => r.channelCountMode,
      "AnalyserNode.channelInterpretation": () => r.channelInterpretation,
      "AnalyserNode.context.sampleRate": () => r.context.sampleRate,
      "AnalyserNode.fftSize": () => r.fftSize,
      "AnalyserNode.frequencyBinCount": () => r.frequencyBinCount,
      "AnalyserNode.maxDecibels": () => r.maxDecibels,
      "AnalyserNode.minDecibels": () => r.minDecibels,
      "AnalyserNode.numberOfInputs": () => r.numberOfInputs,
      "AnalyserNode.numberOfOutputs": () => r.numberOfOutputs,
      "AnalyserNode.smoothingTimeConstant": () => r.smoothingTimeConstant,
      "AnalyserNode.context.listener.forwardX.maxValue": () => r.context.listener.forwardX.maxValue,
      "BiquadFilterNode.gain.maxValue": () => c.gain.maxValue,
      "BiquadFilterNode.frequency.defaultValue": () => c.frequency.defaultValue,
      "BiquadFilterNode.frequency.maxValue": () => c.frequency.maxValue,
      "DynamicsCompressorNode.attack.defaultValue": () => i.attack.defaultValue,
      "DynamicsCompressorNode.knee.defaultValue": () => i.knee.defaultValue,
      "DynamicsCompressorNode.knee.maxValue": () => i.knee.maxValue,
      "DynamicsCompressorNode.ratio.defaultValue": () => i.ratio.defaultValue,
      "DynamicsCompressorNode.ratio.maxValue": () => i.ratio.maxValue,
      "DynamicsCompressorNode.release.defaultValue": () => i.release.defaultValue,
      "DynamicsCompressorNode.release.maxValue": () => i.release.maxValue,
      "DynamicsCompressorNode.threshold.defaultValue": () => i.threshold.defaultValue,
      "DynamicsCompressorNode.threshold.minValue": () => i.threshold.minValue,
      "OscillatorNode.detune.maxValue": () => s.detune.maxValue,
      "OscillatorNode.detune.minValue": () => s.detune.minValue,
      "OscillatorNode.frequency.defaultValue": () => s.frequency.defaultValue,
      "OscillatorNode.frequency.maxValue": () => s.frequency.maxValue,
      "OscillatorNode.frequency.minValue": () => s.frequency.minValue
    }, p = (C) => new Promise((w) => {
      const O = C.createAnalyser(), B = C.createOscillator(), D = C.createDynamicsCompressor();
      try {
        B.type = "triangle", B.frequency.value = 1e4, D.threshold.value = -50, D.knee.value = 40, D.attack.value = 0;
      } catch {
      }
      return B.connect(D), D.connect(O), D.connect(C.destination), B.start(0), C.startRendering(), C.addEventListener("complete", (x) => {
        var K;
        try {
          D.disconnect(), B.disconnect();
          const $ = new Float32Array(O.frequencyBinCount);
          (K = O.getFloatFrequencyData) == null || K.call(O, $);
          const q = new Float32Array(O.fftSize);
          return "getFloatTimeDomainData" in O && O.getFloatTimeDomainData(q), w({
            floatFrequencyData: $,
            floatTimeDomainData: q,
            buffer: x.renderedBuffer,
            compressorGainReduction: (
              // @ts-expect-error if unsupported
              D.reduction.value || D.reduction
            )
          });
        } catch {
          return w(null);
        }
      });
    }), [
      g
    ] = await Promise.all([
      p(new OfflineAudioContext(1, l, 44100)),
      Me().catch(() => !1)
    ]), {
      floatFrequencyData: n,
      floatTimeDomainData: b,
      buffer: N,
      compressorGainReduction: u
    } = g || {}, E = (C, w, O) => {
      const B = [];
      for (let D = w; D < O; D++)
        B.push(C[D]);
      return B;
    }, d = (C) => C ? [...C].reduce((w, O) => w += Math.abs(O), 0) : 0, M = d(n), v = d(b), R = new Float32Array(l);
    let f = new Float32Array();
    N && ((t = N.copyFromChannel) == null || t.call(N, R, 0), f = ((a = N.getChannelData) == null ? void 0 : a.call(N, 0)) || []);
    const y = E([...R], 4500, 4600), T = E([...f], 4500, 4600), A = d(E([...f], 4500, l)), S = "copyFromChannel" in AudioBuffer.prototype, _ = (/* @__PURE__ */ new Set([...f])).size, I = (C, w) => Math.floor(Math.random() * (w - C + 1)) + C, k = (C, w, O) => {
      const { length: B } = w, D = 20, x = I(275, B - (D + 1)), K = x + D / 2, $ = x + D;
      w.getChannelData(0)[x] = C, w.getChannelData(0)[K] = C, w.getChannelData(0)[$] = C, w.copyFromChannel(O, 0);
      const q = [
        w.getChannelData(0)[x] === 0 ? Math.random() : 0,
        w.getChannelData(0)[K] === 0 ? Math.random() : 0,
        w.getChannelData(0)[$] === 0 ? Math.random() : 0
      ];
      return [.../* @__PURE__ */ new Set([...w.getChannelData(0), ...O, ...q])].filter((fe) => fe !== 0);
    }, X = (C, w, O) => {
      w.copyToChannel(O.map(() => C), 0);
      const B = w.getChannelData(0)[0];
      return [...w.getChannelData(0)].map((x) => x !== B || !x ? Math.random() : x).filter((x) => x !== B);
    }, be = (() => {
      try {
        const w = [.../* @__PURE__ */ new Set([
          ...k(
            se,
            new AudioBuffer({ length: 2e3, sampleRate: 44100 }),
            new Float32Array(2e3)
          ),
          ...X(
            se,
            new AudioBuffer({ length: 2e3, sampleRate: 44100 }),
            new Float32Array(2e3)
          )
        ])];
        return +(w.length !== 1 && w.reduce((O, B) => O += +B, 0));
      } catch (w) {
        return console.error(w), 0;
      }
    })() || [...new Set(f.slice(0, 100))].reduce((C, w) => C += w, 0);
    return {
      totalUniqueSamples: _,
      compressorGainReduction: u,
      floatFrequencyDataSum: M,
      floatTimeDomainDataSum: v,
      sampleSum: A,
      binsSample: T,
      copySample: S ? y : [void 0],
      values: m,
      noise: be
    };
  } catch {
  }
}
const G = {
  WINDOWS: "Windows",
  LINUX: "Linux",
  APPLE: "Apple",
  OTHER: "Other"
}, Se = !self.document && self.WorkerGlobalScope;
function ve() {
  const e = [].constructor;
  try {
    (-1).toFixed(-1);
  } catch (t) {
    return t.message.length + `${e}`.split(e.name).join("").length;
  }
}
const ne = ve() ?? -1, L = ne === 80, z = ne === 58, ee = ne === 77, Te = L && "flat" in Array.prototype && !("ReportingObserver" in self);
function Re() {
  return "brave" in navigator && Object.getPrototypeOf(navigator.brave).constructor.name === "Brave" && navigator.brave.isBrave.toString() === "function isBrave() { [native code] }";
}
function _e() {
  const e = {
    unknown: !1,
    allow: !1,
    standard: !1,
    strict: !1
  };
  try {
    if ((() => {
      try {
        window.OfflineAudioContext = OfflineAudioContext || webkitOfflineAudioContext;
      } catch {
      }
      if (!window.OfflineAudioContext)
        return !1;
      const s = new OfflineAudioContext(1, 1, 44100).createAnalyser(), i = new Float32Array(s.frequencyBinCount);
      return s.getFloatFrequencyData(i), new Set(i).size > 1;
    })())
      return e.strict = !0, e;
    const a = /(?:Chrom(?:e|ium)|Microsoft Edge) PDF (?:Plugin|Viewer)/, l = [...navigator.plugins], o = l.filter((r) => a.test(r.name)).length === 2;
    return l.length && !o ? (e.standard = !0, e) : (e.allow = !0, e);
  } catch {
    return e.unknown = !0, e;
  }
}
function we(e, t) {
  const a = (
    // order is important
    /win(?:dows|16|32|64|95|98|nt)|wow64/i.test(e) ? G.WINDOWS : /android|linux|cros/i.test(e) ? G.LINUX : /i(?:os|p(?:ad|hone|od))|mac/i.test(e) ? G.APPLE : G.OTHER
  );
  if (!t)
    return [a];
  const l = (
    // order is important
    /win/i.test(t) ? G.WINDOWS : /android|arm|linux/i.test(t) ? G.LINUX : /i(?:os|p(?:ad|hone|od))|mac/i.test(t) ? G.APPLE : G.OTHER
  );
  return [a, l];
}
const { userAgent: Ce, platform: Ie } = self.navigator || {}, [Oe, ut] = we(Ce, Ie), W = [
  [128512],
  [9786],
  [129333, 8205, 9794, 65039],
  [9832],
  [9784],
  [9895],
  [8265],
  [8505],
  [127987, 65039, 8205, 9895, 65039],
  [129394],
  [9785],
  [9760],
  [129489, 8205, 129456],
  [129487, 8205, 9794, 65039],
  [9975],
  [129489, 8205, 129309, 8205, 129489],
  [9752],
  [9968],
  [9961],
  [9972],
  [9992],
  [9201],
  [9928],
  [9730],
  [9969],
  [9731],
  [9732],
  [9976],
  [9823],
  [9937],
  [9e3],
  [9993],
  [9999],
  [128105, 8205, 10084, 65039, 8205, 128139, 8205, 128104],
  [128104, 8205, 128105, 8205, 128103, 8205, 128102],
  [128104, 8205, 128105, 8205, 128102],
  // android 11
  [128512],
  [169],
  [174],
  [8482],
  [128065, 65039, 8205, 128488, 65039],
  // other
  [10002],
  [9986],
  [9935],
  [9874],
  [9876],
  [9881],
  [9939],
  [9879],
  [9904],
  [9905],
  [9888],
  [9762],
  [9763],
  [11014],
  [8599],
  [10145],
  [11013],
  [9883],
  [10017],
  [10013],
  [9766],
  [9654],
  [9197],
  [9199],
  [9167],
  [9792],
  [9794],
  [10006],
  [12336],
  [9877],
  [9884],
  [10004],
  [10035],
  [10055],
  [9724],
  [9642],
  [10083],
  [10084],
  [9996],
  [9757],
  [9997],
  [10052],
  [9878],
  [8618],
  [9775],
  [9770],
  [9774],
  [9745],
  [10036],
  [127344],
  [127359]
].map((e) => String.fromCodePoint(...e)), U = `
  'Segoe Fluent Icons',
  'Ink Free',
  'Bahnschrift',
  'Segoe MDL2 Assets',
  'HoloLens MDL2 Assets',
  'Leelawadee UI',
  'Javanese Text',
  'Segoe UI Emoji',
  'Aldhabi',
  'Gadugi',
  'Myanmar Text',
  'Nirmala UI',
  'Lucida Console',
  'Cambria Math',
  'Bai Jamjuree',
  'Chakra Petch',
  'Charmonman',
  'Fahkwang',
  'K2D',
  'Kodchasan',
  'KoHo',
  'Sarabun',
  'Srisakdi',
  'Galvji',
  'MuktaMahee Regular',
  'InaiMathi Bold',
  'American Typewriter Semibold',
  'Futura Bold',
  'SignPainter-HouseScript Semibold',
  'PingFang HK Light',
  'Kohinoor Devanagari Medium',
  'Luminari',
  'Geneva',
  'Helvetica Neue',
  'Droid Sans Mono',
  'Dancing Script',
  'Roboto',
  'Ubuntu',
  'Liberation Mono',
  'Source Code Pro',
  'DejaVu Sans',
  'OpenSymbol',
  'Chilanka',
  'Cousine',
  'Arimo',
  'Jomolhari',
  'MONO',
  'Noto Color Emoji',
  sans-serif !important
`, Ae = {}, H = {
  AUDIO: !1,
  CANVAS: !1,
  FONTS: !1,
  SCREEN: !1,
  TIME_ZONE: !1,
  WEBGL: !1
};
try {
  speechSynthesis.getVoices();
} catch {
}
const Ee = `
  height: 100vh;
  width: 100vw;
  position: absolute;
  left:-10000px;
  visibility: hidden;
`;
function re() {
  return String.fromCharCode(Math.random() * 26 + 97) + Math.random().toString(36).slice(-7);
}
function De(e) {
  try {
    if (!L)
      return e;
    const t = e.document.createElement("div");
    t.setAttribute("id", re()), t.setAttribute("style", Ee), t.innerHTML = "<div><iframe></iframe></div>", e.document.body.appendChild(t);
    const a = [...[...t.childNodes][0].childNodes][0];
    if (!a)
      return null;
    const { contentWindow: l } = a || {};
    if (!l)
      return null;
    const o = l.document.createElement("div");
    return o.innerHTML = "<div><iframe></iframe></div>", l.document.body.appendChild(o), [...[...o.childNodes][0].childNodes][0].contentWindow;
  } catch {
    return e;
  }
}
function Pe() {
  if (Se)
    return { iframeWindow: self };
  try {
    const e = self.length, t = new DocumentFragment(), a = document.createElement("div"), l = re();
    a.setAttribute("id", l), t.appendChild(a), a.innerHTML = `<div style="${Ee}"><iframe></iframe></div>`, document.body.appendChild(t);
    const o = self[e];
    return { iframeWindow: De(o) || self, div: a };
  } catch {
    return { iframeWindow: self };
  }
}
const { iframeWindow: F, div: Q } = Pe();
function Fe() {
  const e = [], t = [];
  try {
    const r = {
      willReadFrequently: !0,
      desynchronized: !0
    }, s = document.createElement("canvas"), i = document.createElement("canvas"), c = document.createElement("canvas"), h = document.createElement("canvas"), m = s.getContext("2d", r), p = i.getContext("2d", r), g = c.getContext("2d", r), n = h.getContext("2d", r);
    if (!m || !p || !g || !n)
      throw new Error("canvas context blocked");
    s.width = 8 * 5, s.height = 8 * 5, i.width = 8 * 5, i.height = 8 * 5, c.width = 8, c.height = 8, h.width = 8, h.height = 8, [...Array(8)].forEach((M, v) => [...Array(8)].forEach((R, f) => {
      const y = ~~(Math.random() * 256), T = ~~(Math.random() * 256), A = ~~(Math.random() * 256), S = `${y}, ${T}, ${A}, 255`;
      return g.fillStyle = `rgba(${S})`, g.fillRect(v, f, 1, 1), m.fillStyle = `rgba(${S})`, m.fillRect(
        v * 5,
        f * 5,
        1 * 5,
        1 * 5
      ), e.push(S);
    })), [...Array(8)].forEach((M, v) => [...Array(8)].forEach((R, f) => {
      const {
        data: [y, T, A, S]
      } = g.getImageData(v, f, 1, 1) || {}, _ = `${y}, ${T}, ${A}, ${S}`;
      n.fillStyle = `rgba(${_})`, n.fillRect(v, f, 1, 1);
      const {
        data: [I, k, X, j]
      } = n.getImageData(v, f, 1, 1) || {}, V = `
        ${y !== I ? I : 255},
        ${T !== k ? k : 255},
        ${A !== X ? X : 255},
        ${S !== j ? j : 1}
      `;
      return p.fillStyle = `rgba(${V})`, p.fillRect(
        v * 5,
        f * 5,
        1 * 5,
        1 * 5
      ), t.push(_);
    }));
    const b = [], N = /* @__PURE__ */ new Set();
    [...Array(e.length)].forEach((M, v) => {
      const R = e[v], f = t[v];
      if (R !== f) {
        const y = R.split(","), T = f.split(","), A = [
          y[0] !== T[0] ? "r" : "",
          y[1] !== T[1] ? "g" : "",
          y[2] !== T[2] ? "b" : "",
          y[3] !== T[3] ? "a" : ""
        ].join("");
        N.add(A), b.push([v, A]);
      }
    });
    const u = i.toDataURL(), E = N.size ? [...N].sort().join(", ") : void 0, d = b.length || void 0;
    return { rgba: E, pixels: d, pixelImage: u };
  } catch (r) {
    return console.error(r);
  }
}
function Y({
  canvas: e,
  context: t,
  strokeText: a = !1,
  cssFontFamily: l = "",
  area: o = { width: 50, height: 50 },
  rounds: r = 10,
  maxShadowBlur: s = 50,
  seed: i = 500,
  offset: c = 2001000001,
  multiplier: h = 15e3
}) {
  if (!t)
    return;
  t.clearRect(0, 0, e.width, e.height), e.width = o.width, e.height = o.height, e.style && (e.style.display = "none");
  const p = (({ seed: f, offset: y, multiplier: T }) => {
    let A = Number(f) % Number(y);
    return {
      getNextSeed: () => (A = Number(T) * A % Number(y), A)
    };
  })({ seed: i, offset: c, multiplier: h }), { getNextSeed: g } = p, n = (f, y, T, A) => {
    const S = (f - 1) / y * (T || 1) || 0;
    return A ? S : Math.floor(S);
  }, b = (f, y, T, A) => {
    const { width: S, height: _ } = y, I = t.createRadialGradient(
      n(A(), f, S),
      n(A(), f, _),
      n(A(), f, S),
      n(A(), f, S),
      n(A(), f, _),
      n(A(), f, S)
    );
    I.addColorStop(0, T[n(A(), f, T.length)]), I.addColorStop(1, T[n(A(), f, T.length)]), t.fillStyle = I;
  }, N = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF"
  ], u = (f, y, T, A) => {
    const { width: S, height: _ } = T, I = 2.99;
    f.font = `${_ / I}px ${l.replace(/!important/g, "")}`, f.strokeText(
      "👾A",
      n(A(), y, S),
      n(A(), y, _),
      n(A(), y, S)
    );
  }, E = (f, y, T, A) => {
    const { width: S, height: _ } = T;
    f.beginPath(), f.arc(
      n(A(), y, S),
      n(A(), y, _),
      n(A(), y, Math.min(S, _)),
      n(A(), y, 2 * Math.PI, 1),
      n(A(), y, 2 * Math.PI, 1)
    ), f.stroke();
  }, d = (f, y, T, A) => {
    const { width: S, height: _ } = T;
    f.beginPath(), f.moveTo(
      n(A(), y, S),
      n(A(), y, _)
    ), f.bezierCurveTo(
      n(A(), y, S),
      n(A(), y, _),
      n(A(), y, S),
      n(A(), y, _),
      n(A(), y, S),
      n(A(), y, _)
    ), f.stroke();
  }, M = (f, y, T, A) => {
    const { width: S, height: _ } = T;
    f.beginPath(), f.moveTo(
      n(A(), y, S),
      n(A(), y, _)
    ), f.quadraticCurveTo(
      n(A(), y, S),
      n(A(), y, _),
      n(A(), y, S),
      n(A(), y, _)
    ), f.stroke();
  }, v = (f, y, T, A) => {
    if (!("ellipse" in f))
      return;
    const { width: S, height: _ } = T;
    f.beginPath(), f.ellipse(
      n(A(), y, S),
      n(A(), y, _),
      n(A(), y, Math.floor(S / 2)),
      n(A(), y, Math.floor(_ / 2)),
      n(A(), y, 2 * Math.PI, 1),
      n(A(), y, 2 * Math.PI, 1),
      n(A(), y, 2 * Math.PI, 1)
    ), f.stroke();
  }, R = [
    E,
    d,
    M
  ];
  ee || R.push(v), a && R.push(u), [...Array(r)].forEach(() => {
    b(c, o, N, g), t.shadowBlur = n(g(), c, s, 1), t.shadowColor = N[n(g(), c, N.length)];
    const f = R[n(g(), c, R.length)];
    f(t, c, o, g), t.fill();
  });
}
async function mt() {
  try {
    let e = window;
    !Te && F && (e = F);
    const t = e.document, a = t.createElement("canvas"), l = a.getContext("2d"), o = t.createElement("canvas"), r = o.getContext("2d", {
      desynchronized: !0,
      willReadFrequently: !0
    });
    if (!l)
      throw new Error("canvas context blocked");
    const s = ee ? 50 : 75;
    Y({
      canvas: a,
      context: l,
      strokeText: !0,
      cssFontFamily: U,
      area: { width: s, height: s },
      rounds: 10
    });
    const i = a.toDataURL(), c = Fe();
    l.font = `10px ${U.replace(/!important/g, "")}`;
    const h = /* @__PURE__ */ new Set(), m = W.reduce((M, v) => {
      const {
        actualBoundingBoxAscent: R,
        actualBoundingBoxDescent: f,
        actualBoundingBoxLeft: y,
        actualBoundingBoxRight: T,
        fontBoundingBoxAscent: A,
        fontBoundingBoxDescent: S,
        width: _
      } = l.measureText(v) || {}, I = [
        R,
        f,
        y,
        T,
        A,
        S,
        _
      ].join(",");
      return h.has(I) || (h.add(I), M.add(v)), M;
    }, /* @__PURE__ */ new Set()), p = 1e-5 * [...h].map((M) => M.split(",").reduce((v, R) => v += +R || 0, 0)).reduce((M, v) => M += v, 0), g = 75;
    Y({
      canvas: a,
      context: l,
      area: { width: g, height: g }
    });
    const n = a.toDataURL();
    Y({
      canvas: o,
      context: r,
      area: { width: g, height: g }
    });
    const b = o.toDataURL();
    l.restore(), l.clearRect(0, 0, a.width, a.height), a.width = 50, a.height = 50, l.font = `50px ${U.replace(/!important/g, "")}`, l.fillText("A", 7, 37);
    const N = a.toDataURL();
    l.restore(), l.clearRect(0, 0, a.width, a.height), a.width = 50, a.height = 50, l.font = `35px ${U.replace(/!important/g, "")}`, l.fillText("👾", 0, 37);
    const u = a.toDataURL();
    l.clearRect(0, 0, a.width, a.height), a.width = 2, a.height = 2, l.fillStyle = "#000", l.fillRect(0, 0, a.width, a.height), l.fillStyle = "#fff", l.fillRect(2, 2, 1, 1), l.beginPath(), l.arc(0, 0, 2, 0, 1, !0), l.closePath(), l.fill();
    const E = l.getImageData(0, 0, 2, 2).data.join(""), d = {
      BLINK: [
        "255255255255178178178255246246246255555555255",
        "255255255255192192192255240240240255484848255",
        "255255255255177177177255246246246255535353255",
        "255255255255128128128255191191191255646464255",
        "255255255255178178178255247247247255565656255",
        // ?
        "255255255255174174174255242242242255474747255",
        "255255255255229229229255127127127255686868255",
        "255255255255192192192255244244244255535353255"
      ],
      GECKO: [
        "255255255255191191191255207207207255646464255",
        "255255255255192192192255240240240255484848255",
        "255255255255191191191255239239239255646464255",
        "255255255255191191191255223223223255606060255",
        // ?
        "255255255255171171171255223223223255606060255"
        // ?
      ],
      WEBKIT: [
        "255255255255185185185255233233233255474747255",
        "255255255255185185185255229229229255474747255",
        "255255255255185185185255218218218255474747255",
        "255255255255192192192255240240240255484848255",
        "255255255255178178178255247247247255565656255",
        "255255255255178178178255247247247255565656255",
        "255255255255192192192255240240240255484848255",
        "255255255255186186186255218218218255464646255"
      ]
    };
    return Ae.imageDataLowEntropy = E, (L && !d.BLINK.includes(E) || z && !d.GECKO.includes(E) || ee && !d.WEBKIT.includes(E)) && (H.CANVAS = !0), {
      dataURI: i,
      paintURI: n,
      paintCpuURI: b,
      textURI: N,
      emojiURI: u,
      mods: c,
      textMetricsSystemSum: p,
      emojiSet: [...m]
    };
  } catch {
  }
}
function dt() {
  const e = Le(), t = Be(Q);
  return { computedStyle: e, system: t };
}
function Le() {
  var g;
  const e = getComputedStyle(document.body), t = Object.getPrototypeOf(e), a = Object.getOwnPropertyNames(t), l = [], o = /^--.*$/;
  Object.keys(e).forEach((n) => {
    const b = !Number.isNaN(+n), N = e[n], u = o.test(n), E = o.test(N);
    if (b && !E)
      return l.push(N);
    if (!b && !u)
      return l.push(n);
  });
  const r = {}, s = (n) => n.charAt(0).toUpperCase() + n.slice(1), i = (n) => n.charAt(0).toLowerCase() + n.slice(1), c = (n) => n.slice(1), h = /[A-Z]/g;
  l.forEach((n) => {
    if (r[n])
      return;
    const b = n.includes("-"), N = h.test(n), u = n.charAt(0), E = b && u === "-", d = N && u === u.toUpperCase();
    if (n = E ? c(n) : d ? i(n) : n, b) {
      const M = n.split("-").map((v, R) => R === 0 ? v : s(v)).join("");
      M in e ? r[M] = !0 : s(M) in e && (r[s(M)] = !0);
    } else if (N) {
      const M = n.replace(h, (v) => `-${v.toLowerCase()}`);
      M in e ? r[M] = !0 : `-${M}` in e && (r[`-${M}`] = !0);
    }
  });
  const m = [
    .../* @__PURE__ */ new Set([
      ...a,
      ...l,
      ...Object.keys(r)
    ])
  ], p = (g = `${t}`.match(/\[object (.+)\]/)) == null ? void 0 : g[1];
  return { keys: m, interfaceName: p };
}
function Be(e) {
  var t;
  try {
    const a = [
      "ActiveBorder",
      "ActiveCaption",
      "ActiveText",
      "AppWorkspace",
      "Background",
      "ButtonBorder",
      "ButtonFace",
      "ButtonHighlight",
      "ButtonShadow",
      "ButtonText",
      "Canvas",
      "CanvasText",
      "CaptionText",
      "Field",
      "FieldText",
      "GrayText",
      "Highlight",
      "HighlightText",
      "InactiveBorder",
      "InactiveCaption",
      "InactiveCaptionText",
      "InfoBackground",
      "InfoText",
      "LinkText",
      "Mark",
      "MarkText",
      "Menu",
      "MenuText",
      "Scrollbar",
      "ThreeDDarkShadow",
      "ThreeDFace",
      "ThreeDHighlight",
      "ThreeDLightShadow",
      "ThreeDShadow",
      "VisitedText",
      "Window",
      "WindowFrame",
      "WindowText"
    ], l = [
      "caption",
      "icon",
      "menu",
      "message-box",
      "small-caption",
      "status-bar"
    ], o = (r) => ({
      colors: a.map((s) => (r.setAttribute("style", `background-color: ${s} !important`), {
        [s]: getComputedStyle(r).backgroundColor
      })),
      fonts: l.map((s) => {
        r.setAttribute("style", `font: ${s} !important`);
        const i = getComputedStyle(r);
        return {
          [s]: `${i.fontSize} ${i.fontFamily}`
        };
      })
    });
    if (!e) {
      e = document.createElement("div"), document.body.append(e);
      const r = o(e);
      return (t = e.parentNode) == null || t.removeChild(e), r;
    }
    return o(e);
  } catch {
  }
}
function ht() {
  const e = (o, r) => r === 0 ? o : e(r, o % r), t = (o, r) => {
    const s = e(o, r);
    return `${o / s}/${r / s}`;
  }, a = ({ body: o, type: r, rangeStart: s, rangeLen: i }) => {
    const c = [...Array(i)].map((m, p) => (p += s, `@media(device-${r}:${p}px){body{--device-${r}:${p};}}`)).join("");
    return o.innerHTML = `<style>${c}</style>`, getComputedStyle(o).getPropertyValue(`--device-${r}`).trim();
  }, l = ({ body: o, width: r, height: s }) => {
    let i = a({ body: o, type: "width", rangeStart: r, rangeLen: 1 }), c = a({ body: o, type: "height", rangeStart: s, rangeLen: 1 });
    if (i && c)
      return { width: r, height: s };
    const h = 1e3;
    return [...Array(10)].find((m, p) => (i || (i = a({ body: o, type: "width", rangeStart: p * h, rangeLen: h })), c || (c = a({ body: o, type: "height", rangeStart: p * h, rangeLen: h })), i && c)), { width: +i, height: +c };
  };
  try {
    const o = F.window, r = o.document.body, { width: s, availWidth: i, height: c, availHeight: h } = o.screen, m = !(s - i || c - h);
    (screen.width !== s || s > 800 && m) && (H.IFRAME_SCREEN = !0);
    const p = t(s, c), g = {
      "prefers-reduced-motion": o.matchMedia("(prefers-reduced-motion: no-preference)").matches ? "no-preference" : o.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduce" : void 0,
      "prefers-color-scheme": o.matchMedia("(prefers-color-scheme: light)").matches ? "light" : o.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : void 0,
      monochrome: o.matchMedia("(monochrome)").matches ? "monochrome" : o.matchMedia("(monochrome: 0)").matches ? "non-monochrome" : void 0,
      "inverted-colors": o.matchMedia("(inverted-colors: inverted)").matches ? "inverted" : o.matchMedia("(inverted-colors: none)").matches ? "none" : void 0,
      "forced-colors": o.matchMedia("(forced-colors: none)").matches ? "none" : o.matchMedia("(forced-colors: active)").matches ? "active" : void 0,
      "any-hover": o.matchMedia("(any-hover: hover)").matches ? "hover" : o.matchMedia("(any-hover: none)").matches ? "none" : void 0,
      hover: o.matchMedia("(hover: hover)").matches ? "hover" : o.matchMedia("(hover: none)").matches ? "none" : void 0,
      "any-pointer": o.matchMedia("(any-pointer: fine)").matches ? "fine" : o.matchMedia("(any-pointer: coarse)").matches ? "coarse" : o.matchMedia("(any-pointer: none)").matches ? "none" : void 0,
      pointer: o.matchMedia("(pointer: fine)").matches ? "fine" : o.matchMedia("(pointer: coarse)").matches ? "coarse" : o.matchMedia("(pointer: none)").matches ? "none" : void 0,
      "device-aspect-ratio": o.matchMedia(`(device-aspect-ratio: ${p})`).matches ? p : void 0,
      "device-screen": o.matchMedia(`(device-width: ${s}px) and (device-height: ${c}px)`).matches ? `${s} x ${c}` : void 0,
      "display-mode": o.matchMedia("(display-mode: fullscreen)").matches ? "fullscreen" : o.matchMedia("(display-mode: standalone)").matches ? "standalone" : o.matchMedia("(display-mode: minimal-ui)").matches ? "minimal-ui" : o.matchMedia("(display-mode: browser)").matches ? "browser" : void 0,
      "color-gamut": o.matchMedia("(color-gamut: srgb)").matches ? "srgb" : o.matchMedia("(color-gamut: p3)").matches ? "p3" : o.matchMedia("(color-gamut: rec2020)").matches ? "rec2020" : void 0,
      orientation: o.matchMedia("(orientation: landscape)").matches ? "landscape" : o.matchMedia("(orientation: portrait)").matches ? "portrait" : void 0
    };
    r.innerHTML = `
    <style>
    @media (prefers-reduced-motion: no-preference) {body {--prefers-reduced-motion: no-preference}}
    @media (prefers-reduced-motion: reduce) {body {--prefers-reduced-motion: reduce}}
    @media (prefers-color-scheme: light) {body {--prefers-color-scheme: light}}
    @media (prefers-color-scheme: dark) {body {--prefers-color-scheme: dark}}
    @media (monochrome) {body {--monochrome: monochrome}}
    @media (monochrome: 0) {body {--monochrome: non-monochrome}}
    @media (inverted-colors: inverted) {body {--inverted-colors: inverted}}
    @media (inverted-colors: none) {body {--inverted-colors: none}}
    @media (forced-colors: none) {body {--forced-colors: none}}
    @media (forced-colors: active) {body {--forced-colors: active}}
    @media (any-hover: hover) {body {--any-hover: hover}}
    @media (any-hover: none) {body {--any-hover: none}}
    @media (hover: hover) {body {--hover: hover}}
    @media (hover: none) {body {--hover: none}}
    @media (any-pointer: fine) {body {--any-pointer: fine}}
    @media (any-pointer: coarse) {body {--any-pointer: coarse}}
    @media (any-pointer: none) {body {--any-pointer: none}}
    @media (pointer: fine) {body {--pointer: fine}}
    @media (pointer: coarse) {body {--pointer: coarse}}
    @media (pointer: none) {body {--pointer: none}}
    @media (device-aspect-ratio: ${p}) {body {--device-aspect-ratio: ${p}}}
    @media (device-width: ${s}px) and (device-height: ${c}px) {body {--device-screen: ${s} x ${c}}}
    @media (display-mode: fullscreen) {body {--display-mode: fullscreen}}
    @media (display-mode: standalone) {body {--display-mode: standalone}}
    @media (display-mode: minimal-ui) {body {--display-mode: minimal-ui}}
    @media (display-mode: browser) {body {--display-mode: browser}}
    @media (color-gamut: srgb) {body {--color-gamut: srgb}}
    @media (color-gamut: p3) {body {--color-gamut: p3}}
    @media (color-gamut: rec2020) {body {--color-gamut: rec2020}}
    @media (orientation: landscape) {body {--orientation: landscape}}
    @media (orientation: portrait) {body {--orientation: portrait}}
    </style>
    `;
    const n = getComputedStyle(r), b = {
      "prefers-reduced-motion": n.getPropertyValue("--prefers-reduced-motion").trim() || void 0,
      "prefers-color-scheme": n.getPropertyValue("--prefers-color-scheme").trim() || void 0,
      monochrome: n.getPropertyValue("--monochrome").trim() || void 0,
      "inverted-colors": n.getPropertyValue("--inverted-colors").trim() || void 0,
      "forced-colors": n.getPropertyValue("--forced-colors").trim() || void 0,
      "any-hover": n.getPropertyValue("--any-hover").trim() || void 0,
      hover: n.getPropertyValue("--hover").trim() || void 0,
      "any-pointer": n.getPropertyValue("--any-pointer").trim() || void 0,
      pointer: n.getPropertyValue("--pointer").trim() || void 0,
      "device-aspect-ratio": n.getPropertyValue("--device-aspect-ratio").trim() || void 0,
      "device-screen": n.getPropertyValue("--device-screen").trim() || void 0,
      "display-mode": n.getPropertyValue("--display-mode").trim() || void 0,
      "color-gamut": n.getPropertyValue("--color-gamut").trim() || void 0,
      orientation: n.getPropertyValue("--orientation").trim() || void 0
    }, N = l({ body: r, width: s, height: c });
    return { mediaCSS: b, matchMediaCSS: g, screenQuery: N };
  } catch {
  }
}
function Nt() {
  const e = [];
  for (const t in document.documentElement)
    e.push(t);
  return { elements: e };
}
function oe(e, t, a) {
  var l;
  return e ? ((l = e.parentNode) == null || l.replaceChild(t, e), !0) : null;
}
function ie(e, ...t) {
  const a = document.createElement("template");
  return a.innerHTML = e.map((l, o) => `${l}${t[o] || ""}`).join(""), document.importNode(a.content, !0);
}
async function pt() {
  try {
    const e = (u) => ({
      bottom: u.bottom,
      height: u.height,
      left: u.left,
      right: u.right,
      width: u.width,
      top: u.top,
      x: u.x,
      y: u.y
    }), t = F && F.document && F.document.body ? F.document : document, a = (u) => {
      let E, d = u.getClientRects()[0];
      if (d || (d = u.getBoundingClientRect(), d) || (E = t.createRange(), E.selectNode(u), d = E.getClientRects()[0], d) || (E = t.createRange(), E.selectNode(u), d = E.getBoundingClientRect(), d))
        return d;
    }, l = `${ge}-client-rects-div`, o = document.createElement("div");
    o.setAttribute("id", l), t.body.appendChild(o), oe(o, ie`
    <div id="${l}">
      <style>
      .rect-ghost,
      .rect-known {
        top: 0;
        left: 0;
        position: absolute;
        visibility: hidden;
      }
      .rect-known {
        width: 100px;
        height: 100px;
        transform: rotate(45deg);
      }
      .rect-ghost {
        width: 0;
        height: 0;
      }
      </style>
      <div class="rect-known"></div>
      <div class="rect-ghost"></div>
      <div style="perspective:100px;width:1000.099%;" id="rect-container">
        <style>
        .rects {
          width: 1000%;
          height: 1000%;
          max-width: 1000%;
        }
        .absolute {
          position: absolute;
        }
        #cRect1 {
          border: solid 2.715px;
          border-color: #F72585;
          padding: 3.98px;
          margin-left: 12.12px;
        }
        #cRect2 {
          border: solid 2px;
          border-color: #7209B7;
          font-size: 30px;
          margin-top: 20px;
          padding: 3.98px;
          transform: skewY(23.1753218deg) rotate3d(10.00099, 90, 0.100000000000009, 60000000000008.00000009deg);
        }
        #cRect3 {
          border: solid 2.89px;
          border-color: #3A0CA3;
          font-size: 45px;
          transform: skewY(-23.1753218deg) scale(1099.0000000099, 1.89) matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
          margin-top: 50px;
        }
        #cRect4 {
          border: solid 2px;
          border-color: #4361EE;
          transform: matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
          margin-top: 11.1331px;
          margin-left: 12.1212px;
          padding: 4.4545px;
          left: 239.4141px;
          top: 8.5050px;
        }
        #cRect5 {
          border: solid 2px;
          border-color: #4CC9F0;
          margin-left: 42.395pt;
        }
        #cRect6 {
          border: solid 2px;
          border-color: #F72585;
          transform: perspective(12890px) translateZ(101.5px);
          padding: 12px;
        }
        #cRect7 {
          margin-top: -350.552px;
          margin-left: 0.9099rem;
          border: solid 2px;
          border-color: #4361EE;
        }
        #cRect8 {
          margin-top: -150.552px;
          margin-left: 15.9099rem;
          border: solid 2px;
          border-color: #3A0CA3;
        }
        #cRect9 {
          margin-top: -110.552px;
          margin-left: 15.9099rem;
          border: solid 2px;
          border-color: #7209B7;
        }
        #cRect10 {
          margin-top: -315.552px;
          margin-left: 15.9099rem;
          border: solid 2px;
          border-color: #F72585;
        }
        #cRect11 {
          width: 10px;
          height: 10px;
          margin-left: 15.0000009099rem;
          border: solid 2px;
          border-color: #F72585;
        }
        #cRect12 {
          width: 10px;
          height: 10px;
          margin-left: 15.0000009099rem;
          border: solid 2px;
          border-color: #F72585;
        }
        #rect-container .shift-dom-rect {
          top: 1px !important;
          left: 1px !important;
        }
        </style>
        <div id="cRect1" class="rects"></div>
        <div id="cRect2" class="rects"></div>
        <div id="cRect3" class="rects"></div>
        <div id="cRect4" class="rects absolute"></div>
        <div id="cRect5" class="rects"></div>
        <div id="cRect6" class="rects"></div>
        <div id="cRect7" class="rects absolute"></div>
        <div id="cRect8" class="rects absolute"></div>
        <div id="cRect9" class="rects absolute"></div>
        <div id="cRect10" class="rects absolute"></div>
        <div id="cRect11" class="rects"></div>
        <div id="cRect12" class="rects"></div>
        <div id="emoji" class="emojis"></div>
      </div>
      <div id="emoji-container">
        <style>
        .domrect-emoji {
          font-family: ${U};
          font-size: 200px !important;
          height: auto;
          position: absolute !important;
          transform: scale(1.000999);
        }
        </style>
        ${W.map((u) => `<div class="domrect-emoji">${u}</div>`).join("")}
      </div>
    </div>
    `);
    const r = /* @__PURE__ */ new Set(), i = [...t.getElementsByClassName("domrect-emoji")].reduce((u, E, d) => {
      const M = W[d], { height: v, width: R } = a(E), f = `${R},${v}`;
      return r.has(f) || (r.add(f), u.add(M)), u;
    }, /* @__PURE__ */ new Set()), c = 1e-5 * [...r].map((u) => u.split(",").reduce((E, d) => E += +d || 0, 0)).reduce((u, E) => u += E, 0), h = document.createRange(), m = t.getElementsByClassName("rects"), p = [...m].map((u) => e(u.getClientRects()[0])), g = [...m].map((u) => e(u.getBoundingClientRect())), n = [...m].map((u) => (h.selectNode(u), e(h.getClientRects()[0]))), b = [...m].map((u) => (h.selectNode(u), e(u.getBoundingClientRect()))), N = [...m][3];
    return N.classList.add("shift-dom-rect"), N.classList.remove("shift-dom-rect"), t.body.removeChild(t.getElementById(l)), {
      elementClientRects: p,
      elementBoundingClientRect: g,
      rangeClientRects: n,
      rangeBoundingClientRect: b,
      emojiSet: [...i],
      domrectSystemSum: c
    };
  } catch {
  }
}
function xe(e) {
  const t = [];
  let a;
  const l = e.length;
  for (a = 0; a < l; a++)
    try {
      e[a]();
    } catch (o) {
      o instanceof Error ? t.push(o.message) : t.push("");
    }
  return t;
}
function gt() {
  try {
    return { errors: xe([
      () => new Function('alert(")')(),
      () => new Function("const foo;foo.bar")(),
      () => new Function("null.bar")(),
      () => new Function("abc.xyz = 123")(),
      () => new Function("const foo;foo.bar")(),
      () => new Function("(1).toString(1000)")(),
      () => new Function("[...undefined].length")(),
      () => new Function("var x = new Array(-1)")(),
      () => new Function("const a=1; const a=2;")()
    ]) };
  } catch {
  }
}
const ke = L ? "Chrome" : z ? "Firefox" : "";
function Ge(e) {
  const t = {
    76: ["Document.onsecuritypolicyviolation", "Promise.allSettled"],
    77: ["Document.onformdata", "Document.onpointerrawupdate"],
    78: ["Element.elementTiming"],
    79: ["Document.onanimationend", "Document.onanimationiteration", "Document.onanimationstart", "Document.ontransitionend"],
    80: ["!Document.registerElement", "!Element.createShadowRoot", "!Element.getDestinationInsertionPoints"],
    81: ["Document.onwebkitanimationend", "Document.onwebkitanimationiteration", "Document.onwebkitanimationstart", "Document.onwebkittransitionend", "Element.ariaAtomic", "Element.ariaAutoComplete", "Element.ariaBusy", "Element.ariaChecked", "Element.ariaColCount", "Element.ariaColIndex", "Element.ariaColSpan", "Element.ariaCurrent", "Element.ariaDisabled", "Element.ariaExpanded", "Element.ariaHasPopup", "Element.ariaHidden", "Element.ariaKeyShortcuts", "Element.ariaLabel", "Element.ariaLevel", "Element.ariaLive", "Element.ariaModal", "Element.ariaMultiLine", "Element.ariaMultiSelectable", "Element.ariaOrientation", "Element.ariaPlaceholder", "Element.ariaPosInSet", "Element.ariaPressed", "Element.ariaReadOnly", "Element.ariaRelevant", "Element.ariaRequired", "Element.ariaRoleDescription", "Element.ariaRowCount", "Element.ariaRowIndex", "Element.ariaRowSpan", "Element.ariaSelected", "Element.ariaSort", "Element.ariaValueMax", "Element.ariaValueMin", "Element.ariaValueNow", "Element.ariaValueText", "Intl.DisplayNames"],
    83: ["Element.ariaDescription", "Element.onbeforexrselect"],
    84: ["Document.getAnimations", "Document.timeline", "Element.ariaSetSize", "Element.getAnimations"],
    85: ["Promise.any", "String.replaceAll"],
    86: ["Document.fragmentDirective", "Document.replaceChildren", "Element.replaceChildren", "!Atomics.wake"],
    "87-89": ["Atomics.waitAsync", "Document.ontransitioncancel", "Document.ontransitionrun", "Document.ontransitionstart", "Intl.Segmenter"],
    90: ["Document.onbeforexrselect", "RegExp.hasIndices", "!Element.onbeforexrselect"],
    91: ["Element.getInnerHTML"],
    92: ["Array.at", "String.at"],
    93: ["Error.cause", "Object.hasOwn"],
    94: ["!Error.cause", "Object.hasOwn"],
    "95-96": ["WebAssembly.Exception", "WebAssembly.Tag"],
    "97-98": ["Array.findLast", "Array.findLastIndex", "Document.onslotchange"],
    "99-101": ["Intl.supportedValuesOf", "Document.oncontextlost", "Document.oncontextrestored"],
    102: ["Element.ariaInvalid", "Document.onbeforematch"],
    "103-106": ["Element.role"],
    "107-109": ["Element.ariaBrailleLabel", "Element.ariaBrailleRoleDescription"],
    110: ["Array.toReversed", "Array.toSorted", "Array.toSpliced", "Array.with"],
    111: ["String.isWellFormed", "String.toWellFormed", "Document.startViewTransition"],
    "112-113": ["RegExp.unicodeSets"],
    "114-115": ["JSON.rawJSON", "JSON.isRawJSON"]
  }, a = {
    76: ["backdrop-filter"],
    "77-80": ["overscroll-behavior-block", "overscroll-behavior-inline"],
    81: ["color-scheme", "image-orientation"],
    83: ["contain-intrinsic-size"],
    84: ["appearance", "ruby-position"],
    "85-86": ["content-visibility", "counter-set", "inherits", "initial-value", "page-orientation", "syntax"],
    87: ["ascent-override", "border-block", "border-block-color", "border-block-style", "border-block-width", "border-inline", "border-inline-color", "border-inline-style", "border-inline-width", "descent-override", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "line-gap-override", "margin-block", "margin-inline", "padding-block", "padding-inline", "text-decoration-thickness", "text-underline-offset"],
    88: ["aspect-ratio"],
    89: ["border-end-end-radius", "border-end-start-radius", "border-start-end-radius", "border-start-start-radius", "forced-color-adjust"],
    90: ["overflow-clip-margin"],
    91: ["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"],
    92: ["size-adjust"],
    93: ["accent-color"],
    94: ["scrollbar-gutter"],
    "95-96": ["app-region", "contain-intrinsic-block-size", "contain-intrinsic-height", "contain-intrinsic-inline-size", "contain-intrinsic-width"],
    "97-98": ["font-synthesis-small-caps", "font-synthesis-style", "font-synthesis-weight", "font-synthesis"],
    "99-100": ["text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-emphasis"],
    "101-103": ["font-palette", "base-palette", "override-colors"],
    104: ["object-view-box"],
    105: ["container-name", "container-type", "container"],
    "106-107": ["hyphenate-character"],
    108: ["hyphenate-character", "!orientation", "!max-zoom", "!min-zoom", "!user-zoom"],
    109: ["hyphenate-limit-chars", "math-depth", "math-shift", "math-style"],
    110: ["initial-letter"],
    "111-113": ["baseline-source", "font-variant-alternates", "view-transition-name"],
    "114-115": ["text-wrap", "white-space-collapse"]
  }, l = {
    80: ["CompressionStream", "DecompressionStream", "FeaturePolicy", "FragmentDirective", "PeriodicSyncManager", "VideoPlaybackQuality"],
    81: ["SubmitEvent", "XRHitTestResult", "XRHitTestSource", "XRRay", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource"],
    83: ["BarcodeDetector", "XRDOMOverlayState", "XRSystem"],
    84: ["AnimationPlaybackEvent", "AnimationTimeline", "CSSAnimation", "CSSTransition", "DocumentTimeline", "FinalizationRegistry", "LayoutShiftAttribution", "ResizeObserverSize", "WakeLock", "WakeLockSentinel", "WeakRef", "XRLayer"],
    85: ["AggregateError", "CSSPropertyRule", "EventCounts", "XRAnchor", "XRAnchorSet"],
    86: ["RTCEncodedAudioFrame", "RTCEncodedVideoFrame"],
    87: ["CookieChangeEvent", "CookieStore", "CookieStoreManager", "Scheduling"],
    88: ["Scheduling", "!BarcodeDetector"],
    89: ["ReadableByteStreamController", "ReadableStreamBYOBReader", "ReadableStreamBYOBRequest", "ReadableStreamDefaultController", "XRWebGLBinding"],
    90: ["AbstractRange", "CustomStateSet", "NavigatorUAData", "XRCPUDepthInformation", "XRDepthInformation", "XRLightEstimate", "XRLightProbe", "XRWebGLDepthInformation"],
    91: ["CSSCounterStyleRule", "GravitySensor", "NavigatorManagedData"],
    92: ["CSSCounterStyleRule", "!SharedArrayBuffer"],
    93: ["WritableStreamDefaultController"],
    94: ["AudioData", "AudioDecoder", "AudioEncoder", "EncodedAudioChunk", "EncodedVideoChunk", "IdleDetector", "ImageDecoder", "ImageTrack", "ImageTrackList", "VideoColorSpace", "VideoDecoder", "VideoEncoder", "VideoFrame", "MediaStreamTrackGenerator", "MediaStreamTrackProcessor", "Profiler", "VirtualKeyboard", "DelegatedInkTrailPresenter", "Ink", "Scheduler", "TaskController", "TaskPriorityChangeEvent", "TaskSignal", "VirtualKeyboardGeometryChangeEvent"],
    "95-96": ["URLPattern"],
    "97-98": ["WebTransport", "WebTransportBidirectionalStream", "WebTransportDatagramDuplexStream", "WebTransportError"],
    99: ["CanvasFilter", "CSSLayerBlockRule", "CSSLayerStatementRule"],
    100: ["CSSMathClamp"],
    "101-104": ["CSSFontPaletteValuesRule"],
    "105-106": ["CSSContainerRule"],
    "107-108": ["XRCamera"],
    109: ["MathMLElement"],
    110: ["AudioSinkInfo"],
    "111-112": ["ViewTransition"],
    "113-115": ["ViewTransition", "!CanvasFilter"]
  }, o = {
    71: ["Promise.allSettled"],
    "72-73": ["Document.onformdata", "Element.part"],
    74: ["!Array.toSource", "!Boolean.toSource", "!Date.toSource", "!Error.toSource", "!Function.toSource", "!Intl.toSource", "!JSON.toSource", "!Math.toSource", "!Number.toSource", "!Object.toSource", "!RegExp.toSource", "!String.toSource", "!WebAssembly.toSource"],
    "75-76": ["Document.getAnimations", "Document.timeline", "Element.getAnimations", "Intl.Locale"],
    77: ["String.replaceAll"],
    78: ["Atomics.add", "Atomics.and", "Atomics.compareExchange", "Atomics.exchange", "Atomics.isLockFree", "Atomics.load", "Atomics.notify", "Atomics.or", "Atomics.store", "Atomics.sub", "Atomics.wait", "Atomics.wake", "Atomics.xor", "Document.replaceChildren", "Element.replaceChildren", "Intl.ListFormat", "RegExp.dotAll"],
    "79-84": ["Promise.any"],
    85: ["!Document.onshow", "Promise.any"],
    86: ["Intl.DisplayNames"],
    87: ["Document.onbeforeinput"],
    "88-89": ["RegExp.hasIndices"],
    "90-91": ["Array.at", "String.at"],
    92: ["Object.hasOwn"],
    "93-99": ["Intl.supportedValuesOf", "Document.onsecuritypolicyviolation", "Document.onslotchange"],
    100: ["WebAssembly.Tag", "WebAssembly.Exception"],
    "101-103": ["Document.adoptedStyleSheets"],
    "104-108": ["Array.findLast", "Array.findLastIndex"],
    "109-112": ["Document.onscrollend"]
  }, r = {
    71: ["-moz-column-span"],
    72: ["offset", "offset-anchor", "offset-distance", "offset-path", "offset-rotate", "rotate", "scale", "translate"],
    73: ["overscroll-behavior-block", "overscroll-behavior-inline"],
    "74-79": ["!-moz-stack-sizing", "text-underline-position"],
    "80-88": ["appearance"],
    "89-90": ["!-moz-outline-radius", "!-moz-outline-radius-bottomleft", "!-moz-outline-radius-bottomright", "!-moz-outline-radius-topleft", "!-moz-outline-radius-topright", "aspect-ratio"],
    91: ["tab-size"],
    "92-95": ["accent-color"],
    96: ["color-scheme"],
    97: ["print-color-adjust", "scrollbar-gutter", "d"],
    "98-101": ["hyphenate-character"],
    102: ["overflow-clip-margin"],
    "103-106": ["scroll-snap-stop"],
    "107-108": ["backdrop-filter", "font-palette", "contain-intrinsic-block-size", "contain-intrinsic-height", "contain-intrinsic-inline-size", "contain-intrinsic-width", "contain-intrinsic-size"],
    109: ["-webkit-clip-path"],
    110: ["container-type", "container-name", "page", "container"],
    111: ["font-synthesis-small-caps", "font-synthesis-style", "font-synthesis-weight"],
    112: ["font-synthesis-small-caps", "!-moz-image-region"]
  }, s = {
    71: ["MathMLElement", "!SVGZoomAndPan"],
    "72-73": ["!BatteryManager", "FormDataEvent", "Geolocation", "GeolocationCoordinates", "GeolocationPosition", "GeolocationPositionError", "!mozPaintCount"],
    74: ["FormDataEvent", "!uneval"],
    75: ["AnimationTimeline", "CSSAnimation", "CSSTransition", "DocumentTimeline", "SubmitEvent"],
    "76-77": ["AudioParamMap", "AudioWorklet", "AudioWorkletNode", "Worklet"],
    78: ["Atomics"],
    "79-81": ["AggregateError", "FinalizationRegistry"],
    82: ["MediaMetadata", "MediaSession", "Sanitizer"],
    83: ["MediaMetadata", "MediaSession", "!Sanitizer"],
    84: ["PerformancePaintTiming"],
    "85-86": ["PerformancePaintTiming", "!HTMLMenuItemElement", "!onshow"],
    87: ["onbeforeinput"],
    88: ["onbeforeinput", "!VisualViewport"],
    "89-92": ["!ondevicelight", "!ondeviceproximity", "!onuserproximity"],
    "93-95": ["ElementInternals"],
    96: ["Lock", "LockManager"],
    97: ["CSSLayerBlockRule", "CSSLayerStatementRule"],
    98: ["HTMLDialogElement"],
    99: ["NavigationPreloadManager"],
    "100-104": ["WritableStream"],
    "105-106": ["TextDecoderStream", "OffscreenCanvasRenderingContext2D", "OffscreenCanvas", "TextEncoderStream"],
    "107-109": ["CSSFontPaletteValuesRule"],
    110: ["CSSContainerRule"],
    111: ["FileSystemFileHandle", "FileSystemDirectoryHandle"],
    112: ["FileSystemFileHandle", "!U2F"]
  }, i = e === "Chrome", c = e === "Firefox";
  return {
    css: i ? a : c ? r : {},
    win: i ? l : c ? s : {},
    js: i ? t : c ? o : {}
  };
}
function Ve(e) {
  const t = [
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    "Error",
    "Number",
    "BigInt",
    "Math",
    "Date",
    "String",
    "RegExp",
    "Array",
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "Atomics",
    "JSON",
    "Promise",
    "Reflect",
    "Proxy",
    "Intl",
    "WebAssembly",
    "Document",
    "Element"
  ];
  try {
    return t.reduce((l, o) => {
      const r = ["name", "length", "constructor", "prototype", "arguments", "caller"], s = Object.keys(Object.getOwnPropertyDescriptors(e[o] || {})), i = Object.keys(Object.getOwnPropertyDescriptors((e[o] || {}).prototype || {})), h = [...new Set([...s, ...i].filter((m) => !r.includes(m)))].map((m) => `${o}.${m}`);
      return [...l, ...h];
    }, []);
  } catch (a) {
    return console.error(a), [];
  }
}
function ce(e) {
  return e.sort((t, a) => {
    var r, s;
    const l = ((r = /\d+/.exec(t)) == null ? void 0 : r[0]) ?? "0", o = ((s = /\d+/.exec(a)) == null ? void 0 : s[0]) ?? "0";
    return +l - +o;
  }).reverse();
}
async function At() {
  try {
    const e = F || window, t = Ve(e), a = (E, d) => /\[native code\]/.test(`${E[d]}`) && "prototype" in E[d] && E[d].prototype.constructor.name === d, l = ({ context: E, engineMap: d, checkNative: M = !1 }) => {
      const v = /* @__PURE__ */ new Set(), R = Object.keys(d || {}).reduce((y, T) => {
        const A = d[T], S = A.length, _ = A.filter((I) => (I.charAt(0) === "!" || (M ? a(E, I) : !0)) && v.add(I)).length;
        return S === _ ? [...y, T] : y;
      }, []);
      return {
        version: ce(R)[0],
        features: v
      };
    }, {
      css: o,
      win: r,
      js: s
    } = Ge(ke), {
      version: i,
      features: c
    } = l({
      context: e,
      engineMap: o
    }), {
      version: h,
      features: m
    } = l({
      context: e,
      engineMap: r,
      checkNative: !0
    }), {
      version: p,
      features: g
    } = l({
      context: e,
      engineMap: s
    }), n = (E, d) => {
      const M = d.find((y) => y && !/-/.test(y));
      if (M)
        return M;
      const v = E.length, R = E[0], f = E[v - 1];
      return v ? v === 1 ? R : `${f}-${R}` : "";
    }, b = /* @__PURE__ */ new Set([
      i,
      h,
      p
    ]);
    b.delete(void 0);
    const N = ce(
      [...b].reduce((E, d) => [...E, ...d.split("-")], [])
    ), u = n(N, [i, h, p]);
    return {
      versionRange: N,
      version: u,
      cssVersion: i,
      windowVersion: h,
      jsVersion: p,
      cssFeatures: [...c],
      windowFeatures: [...m],
      jsFeatures: [...g],
      jsFeaturesKeys: t
    };
  } catch {
  }
}
function Xe(e, t) {
  if (!e || !t || !t.length)
    return !1;
  const a = t.reduce((s, i) => (s[i] = !0, s), {}), l = "Cambria Math" in a || "Nirmala UI" in a || "Leelawadee UI" in a || "HoloLens MDL2 Assets" in a || "Segoe Fluent Icons" in a, o = "Helvetica Neue" in a || "Luminari" in a || "PingFang HK Light" in a || "InaiMathi Bold" in a || "Galvji" in a || "Chakra Petch" in a, r = "Arimo" in a || "MONO" in a || "Ubuntu" in a || "Noto Color Emoji" in a || "Dancing Script" in a || "Droid Sans Mono" in a;
  return l && e !== G.WINDOWS || o && e !== G.APPLE ? !0 : !!(r && e !== G.LINUX);
}
const te = {
  // https://docs.microsoft.com/en-us/typography/fonts/windows_11_font_list
  7: [
    "Cambria Math",
    "Lucida Console"
  ],
  8: [
    "Aldhabi",
    "Gadugi",
    "Myanmar Text",
    "Nirmala UI"
  ],
  8.1: [
    "Leelawadee UI",
    "Javanese Text",
    "Segoe UI Emoji"
  ],
  10: [
    "HoloLens MDL2 Assets",
    // 10 (v1507) +
    "Segoe MDL2 Assets",
    // 10 (v1507) +
    "Bahnschrift",
    // 10 (v1709) +-
    "Ink Free"
    // 10 (v1803) +-
  ],
  11: ["Segoe Fluent Icons"]
}, ae = {
  // Mavericks and below
  "10.9": [
    "Helvetica Neue",
    "Geneva"
    // mac (not iOS)
  ],
  // Yosemite
  "10.10": [
    "Kohinoor Devanagari Medium",
    "Luminari"
  ],
  // El Capitan
  "10.11": [
    "PingFang HK Light"
  ],
  // Sierra: https://support.apple.com/en-ie/HT206872
  "10.12": [
    "American Typewriter Semibold",
    "Futura Bold",
    "SignPainter-HouseScript Semibold"
  ],
  // High Sierra: https://support.apple.com/en-me/HT207962
  // Mojave: https://support.apple.com/en-us/HT208968
  "10.13-10.14": [
    "InaiMathi Bold"
  ],
  // Catalina: https://support.apple.com/en-us/HT210192
  // Big Sur: https://support.apple.com/en-sg/HT211240
  "10.15-11": [
    "Galvji",
    "MuktaMahee Regular"
  ],
  // Monterey: https://support.apple.com/en-us/HT212587
  12: [
    "Noto Sans Gunjala Gondi Regular",
    "Noto Sans Masaram Gondi Regular",
    "Noto Serif Yezidi Regular"
  ],
  // Ventura: https://support.apple.com/en-us/HT213266
  13: [
    "Apple SD Gothic Neo ExtraBold",
    "STIX Two Math Regular",
    "STIX Two Text Regular",
    "Noto Sans Canadian Aboriginal Regular"
  ]
}, J = {
  // docs.microsoft.com/en-us/typography/font-list/ms-outlook
  "Microsoft Outlook": ["MS Outlook"],
  // https://community.adobe.com/t5/postscript-discussions/zwadobef-font/m-p/3730427#M785
  "Adobe Acrobat": ["ZWAdobeF"],
  // https://wiki.documentfoundation.org/Fonts
  LibreOffice: [
    "Amiri",
    "KACSTOffice",
    "Liberation Mono",
    "Source Code Pro"
  ],
  // https://superuser.com/a/611804
  OpenOffice: [
    "DejaVu Sans",
    "Gentium Book Basic",
    "OpenSymbol"
  ]
}, Ue = Object.keys(ae).map((e) => ae[e]).flat(), We = Object.keys(te).map((e) => te[e]).flat(), je = Object.keys(J).map((e) => J[e]).flat(), $e = [
  "Arimo",
  // ubuntu, chrome os
  "Chilanka",
  // ubuntu (not TB)
  "Cousine",
  // ubuntu, chrome os
  "Jomolhari",
  // chrome os
  "MONO",
  // ubuntu, chrome os (not TB)
  "Noto Color Emoji",
  // Linux
  "Ubuntu"
  // ubuntu (not TB)
], He = [
  "Dancing Script",
  // android
  "Droid Sans Mono",
  // Android
  "Roboto"
  // Android, Chrome OS
], Ke = [
  ...Ue,
  ...We,
  ...$e,
  ...He,
  ...je
].sort();
async function Et() {
  const e = ({ doc: o, id: r, emojis: s }) => {
    try {
      oe(o.getElementById(r), ie`
        <div id="pixel-emoji-container">
        <style>
          .pixel-emoji {
            font-family: ${U};
            font-size: 200px !important;
            height: auto;
            position: absolute !important;
            transform: scale(1.000999);
          }
          </style>
          ${s.map((b) => `<div class="pixel-emoji">${b}</div>`).join("")}
        </div>
      `);
      const i = (b) => ({
        width: b == null ? void 0 : b.inlineSize,
        height: b == null ? void 0 : b.blockSize
      }), c = /* @__PURE__ */ new Set(), m = [...o.getElementsByClassName("pixel-emoji")].reduce((b, N, u) => {
        const E = getComputedStyle(N), d = s[u], { height: M, width: v } = i(E), R = `${v},${M}`;
        return c.has(R) || (c.add(R), b.add(d)), b;
      }, /* @__PURE__ */ new Set()), p = (b) => +b.replace("px", ""), g = 1e-5 * [...c].map((b) => b.split(",").map((N) => p(N)).reduce((N, u) => N += +u || 0, 0)).reduce((b, N) => b += N, 0), n = o.getElementById("pixel-emoji-container");
      return n && o.body.removeChild(n), {
        emojiSet: [...m],
        pixelSizeSystemSum: g
      };
    } catch (i) {
      return console.error(i), {
        emojiSet: [],
        pixelSizeSystemSum: 0
      };
    }
  }, t = async (o) => {
    try {
      let r = [];
      document.fonts.check(`0px "${re()}"`) || (r = o.reduce((h, m) => (document.fonts.check(`0px "${m}"`) && h.push(m), h), []));
      const s = o.map((h) => new FontFace(h, `local("${h}")`)), c = (await Promise.allSettled(s.map((h) => h.load()))).reduce((h, m) => (m.status === "fulfilled" && h.push(m.value.family), h), []);
      return [.../* @__PURE__ */ new Set([...r, ...c])].sort();
    } catch (r) {
      return console.error(r), [];
    }
  }, a = (o) => {
    const r = ({ fonts: i, fontMap: c }) => {
      const h = {
        11: c[11].find((n) => i.includes(n)),
        10: c[10].find((n) => i.includes(n)),
        8.1: c["8.1"].find((n) => i.includes(n)),
        8: c[8].find((n) => i.includes(n)),
        7: c[7].filter((n) => i.includes(n)).length === c[7].length
      }, m = `${Object.keys(h).sort().filter((n) => !!h[n])}`, g = {
        "10,11,7,8,8.1": "11",
        "10,7,8,8.1": "10",
        "7,8,8.1": "8.1",
        "11,7,8,8.1": "8.1",
        // missing 10
        "7,8": "8",
        "10,7,8": "8",
        // missing 8.1
        "10,11,7,8": "8",
        // missing 8.1
        7: "7",
        "7,8.1": "7",
        "10,7,8.1": "7",
        // missing 8
        "10,11,7,8.1": "7"
        // missing 8
      }[m];
      return g ? `Windows ${g}` : void 0;
    }, s = ({ fonts: i, fontMap: c }) => {
      const h = {
        13: c[13].find((n) => i.includes(n)),
        12: c[12].find((n) => i.includes(n)),
        "10.15-11": c["10.15-11"].find((n) => i.includes(n)),
        "10.13-10.14": c["10.13-10.14"].find((n) => i.includes(n)),
        "10.12": c["10.12"].find((n) => i.includes(n)),
        "10.11": c["10.11"].find((n) => i.includes(n)),
        "10.10": c["10.10"].find((n) => i.includes(n)),
        // require complete set of 10.9 fonts
        "10.9": c["10.9"].filter((n) => i.includes(n)).length === c["10.9"].length
      }, m = `${Object.keys(h).sort().filter((n) => !!h[n])}`, g = {
        "10.10,10.11,10.12,10.13-10.14,10.15-11,10.9,12,13": "Ventura",
        "10.10,10.11,10.12,10.13-10.14,10.15-11,10.9,12": "Monterey",
        "10.10,10.11,10.12,10.13-10.14,10.15-11,10.9": "10.15-11",
        "10.10,10.11,10.12,10.13-10.14,10.9": "10.13-10.14",
        "10.10,10.11,10.12,10.9": "Sierra",
        // 10.12
        "10.10,10.11,10.9": "El Capitan",
        // 10.11
        "10.10,10.9": "Yosemite",
        // 10.10
        "10.9": "Mavericks"
        // 10.9
      }[m];
      return g ? `macOS ${g}` : void 0;
    };
    return r({ fonts: o, fontMap: te }) || s({ fonts: o, fontMap: ae });
  }, l = (o) => Object.keys(J).reduce((s, i) => {
    const c = J[i];
    return c.filter((m) => o.includes(m)).length === c.length ? [...s, i] : s;
  }, []);
  try {
    const o = F && F.document && F.document.body ? F.document : document, r = "font-fingerprint", s = o.createElement("div");
    s.setAttribute("id", r), o.body.appendChild(s);
    const {
      emojiSet: i,
      pixelSizeSystemSum: c
    } = e({
      doc: o,
      id: r,
      emojis: W
    }) || {}, m = await t(Ke), p = a(m), g = l(m);
    return {
      fontFaceLoadFonts: m,
      platformVersion: p,
      apps: g,
      emojiSet: i,
      pixelSizeSystemSum: c,
      isFontOsBad: Xe(Oe, m)
    };
  } catch {
  }
}
const ze = [
  "caption",
  "icon",
  "menu",
  "message-box",
  "small-caption",
  "status-bar"
], P = {
  WINDOWS: "Windows",
  MAC: "Mac",
  LINUX: "Linux",
  ANDROID: "Android",
  CHROME_OS: "Chrome OS"
}, le = {
  "-apple-system": P.MAC,
  "Segoe UI": P.WINDOWS,
  Tahoma: P.WINDOWS,
  "Yu Gothic UI": P.WINDOWS,
  "Microsoft JhengHei UI": P.WINDOWS,
  "Microsoft YaHei UI": P.WINDOWS,
  "Meiryo UI": P.WINDOWS,
  Cantarell: P.LINUX,
  Ubuntu: P.LINUX,
  Sans: P.LINUX,
  "sans-serif": P.LINUX,
  "Fira Sans": P.LINUX,
  Roboto: P.ANDROID
};
async function bt() {
  var e;
  try {
    const t = Object.keys({ ...navigator.mimeTypes }), a = qe(), { scores: l, highestScore: o, headlessEstimate: r } = Qe(), s = {
      chromium: L,
      likeHeadless: {
        noChrome: L && !("chrome" in window),
        hasPermissionsBug: L && "permissions" in navigator && await (async () => (await navigator.permissions.query({ name: "notifications" })).state === "prompt" && "Notification" in window && Notification.permission === "denied")(),
        noPlugins: L && navigator.plugins.length === 0,
        noMimeTypes: L && t.length === 0,
        notificationIsDenied: L && "Notification" in window && Notification.permission === "denied",
        hasKnownBgColor: L && (() => {
          let u = Q;
          if (Q || (u = document.createElement("div"), document.body.appendChild(u)), !u)
            return !1;
          u.setAttribute("style", "background-color: ActiveText");
          const { backgroundColor: E } = getComputedStyle(u) || [];
          return Q || document.body.removeChild(u), E === "rgb(255, 0, 0)";
        })(),
        prefersLightColor: matchMedia("(prefers-color-scheme: light)").matches,
        uaDataIsBlank: "userAgentData" in navigator && // @ts-expect-error if userAgentData is null
        (((e = navigator.userAgentData) == null ? void 0 : e.platform) === "" || await navigator.userAgentData.getHighEntropyValues(["platform"]).platform === ""),
        pdfIsDisabled: "pdfViewerEnabled" in navigator && navigator.pdfViewerEnabled === !1,
        noTaskbar: screen.height === screen.availHeight && screen.width === screen.availWidth,
        hasVvpScreenRes: innerWidth === screen.width && outerHeight === screen.height || "visualViewport" in window && visualViewport.width === screen.width && visualViewport.height === screen.height,
        noWebShare: L && CSS.supports("accent-color: initial") && (!("share" in navigator) || !("canShare" in navigator)),
        noContentIndex: !!(r != null && r.noContentIndex),
        noContactsManager: !!(r != null && r.noContactsManager),
        noDownlinkMax: !!(r != null && r.noDownlinkMax)
      },
      headless: {
        webDriverIsOn: CSS.supports("border-end-end-radius: initial") && navigator.webdriver === void 0 || !!navigator.webdriver,
        hasHeadlessUA: /HeadlessChrome/.test(navigator.userAgent) || /HeadlessChrome/.test(navigator.appVersion)
      },
      stealth: {
        hasIframeProxy: (() => {
          try {
            const u = document.createElement("iframe");
            return u.srcdoc = ge, !!u.contentWindow;
          } catch {
            return !0;
          }
        })(),
        hasHighChromeIndex: (() => {
          const u = "chrome";
          return Object.keys(window).slice(-50).includes(u) && Object.getOwnPropertyNames(window).slice(-50).includes(u);
        })(),
        hasBadChromeRuntime: (() => {
          if (!("chrome" in window && "runtime" in chrome))
            return !1;
          try {
            return "prototype" in chrome.runtime.sendMessage || "prototype" in chrome.runtime.connect || (new chrome.runtime.sendMessage(), new chrome.runtime.connect()), !0;
          } catch (u) {
            return u.constructor.name !== "TypeError";
          }
        })()
      }
    }, { likeHeadless: i, headless: c, stealth: h } = s, m = Object.keys(i), p = Object.keys(c), g = Object.keys(h), n = +(m.filter((u) => i[u]).length / m.length * 100).toFixed(0), b = +(p.filter((u) => c[u]).length / p.length * 100).toFixed(0), N = +(g.filter((u) => h[u]).length / g.length * 100).toFixed(0);
    return {
      ...s,
      likeHeadlessRating: n,
      headlessRating: b,
      stealthRating: N,
      systemFonts: a,
      platformEstimate: [l, o]
    };
  } catch {
  }
}
function qe() {
  const { body: e } = document, t = document.createElement("div");
  e.appendChild(t);
  try {
    const a = String(
      [
        ...ze.reduce((o, r) => (t.setAttribute("style", `font: ${r} !important`), o.add(getComputedStyle(t).fontFamily)), /* @__PURE__ */ new Set())
      ]
    ), l = le[a];
    return le[a] ? `${a}:${l}` : a;
  } catch {
    return "";
  } finally {
    e.removeChild(t);
  }
}
function Qe() {
  var T;
  if (!L)
    return { store: {}, highestScore: 0, headlessEstimate: {} };
  const e = "getVideoPlaybackQuality" in HTMLVideoElement.prototype, t = CSS.supports("color-scheme: initial"), a = CSS.supports("appearance: initial"), l = "DisplayNames" in Intl, o = CSS.supports("aspect-ratio: initial"), r = CSS.supports("border-end-end-radius: initial"), s = "randomUUID" in Crypto.prototype, i = "BarcodeDetector" in window, c = "downlinkMax" in (((T = window.NetworkInformation) == null ? void 0 : T.prototype) || {}), h = "ContentIndex" in window, m = "ContactsManager" in window, p = "EyeDropper" in window, g = "FileSystemWritableFileStream" in window, n = "HID" in window && "HIDDevice" in window, b = "SerialPort" in window && "Serial" in window, N = "SharedWorker" in window, u = "ontouchstart" in Window && "TouchEvent" in window, E = "setAppBadge" in Navigator.prototype, d = (A, S) => A ? [S] : [], M = {
    [P.ANDROID]: [
      ...d(o, i),
      ...d(a, h),
      ...d(e, m),
      c,
      ...d(s, !p),
      ...d(l, !g),
      ...d(r, !n),
      ...d(r, !b),
      !N,
      u,
      ...d(t, !E)
    ],
    [P.CHROME_OS]: [
      ...d(o, i),
      ...d(a, !h),
      ...d(e, !m),
      c,
      ...d(s, p),
      ...d(l, g),
      ...d(r, n),
      ...d(r, b),
      N,
      u || !u,
      ...d(t, !E)
    ],
    [P.WINDOWS]: [
      ...d(o, !i),
      ...d(a, !h),
      ...d(e, !m),
      !c,
      ...d(s, p),
      ...d(l, g),
      ...d(r, n),
      ...d(r, b),
      N,
      u || !u,
      ...d(t, E)
    ],
    [P.MAC]: [
      ...d(o, i),
      ...d(a, !h),
      ...d(e, !m),
      !c,
      ...d(s, p),
      ...d(l, g),
      ...d(r, n),
      ...d(r, b),
      N,
      !u,
      ...d(t, E)
    ],
    [P.LINUX]: [
      ...d(o, !i),
      ...d(a, !h),
      ...d(e, !m),
      !c,
      ...d(s, p),
      ...d(l, g),
      ...d(r, n),
      ...d(r, b),
      N,
      !u || !u,
      ...d(t, !E)
    ]
  }, v = {
    noContentIndex: a && !h,
    noContactsManager: e && !m,
    noDownlinkMax: !c
  }, R = Object.keys(M).reduce((A, S) => {
    const _ = M[S], I = +(_.filter((k) => k).length / _.length).toFixed(2);
    return A[S] = I, A;
  }, {}), f = Object.keys(R).reduce((A, S) => R[A] > R[S] ? A : S), y = R[f];
  return { scores: R, highestScore: y, headlessEstimate: v };
}
async function ft() {
  const e = () => {
    const a = [
      "Collator",
      "DateTimeFormat",
      "DisplayNames",
      "ListFormat",
      "NumberFormat",
      "PluralRules",
      "RelativeTimeFormat"
    ].reduce((l, o) => {
      try {
        const r = new Intl[o]();
        if (!r)
          return l;
        const { locale: s } = r.resolvedOptions() || {};
        return [...l, s];
      } catch {
        return l;
      }
    }, []);
    return [...new Set(a)];
  };
  try {
    const t = new Intl.DateTimeFormat(void 0, {
      month: "long",
      timeZoneName: "long"
    }).format(9636444e5), a = new Intl.DisplayNames(void 0, {
      type: "language"
    }).of("en-US"), l = new Intl.ListFormat(void 0, {
      style: "long",
      type: "disjunction"
    }).format(["0", "1"]), o = new Intl.NumberFormat(void 0, {
      notation: "compact",
      compactDisplay: "long"
    }).format(21e6), r = new Intl.PluralRules().select(1), s = new Intl.RelativeTimeFormat(void 0, {
      localeMatcher: "best fit",
      numeric: "auto",
      style: "long"
    }).format(1, "year"), i = e();
    return {
      dateTimeFormat: t,
      displayNames: a,
      listFormat: l,
      numberFormat: o,
      pluralRules: r,
      relativeTimeFormat: s,
      locale: `${i}`
    };
  } catch {
  }
}
function yt() {
  const t = 5860847362277284e23;
  return [
    ["acos", [0.123], `acos(${0.123})`, 1.4474840516030247, Number.NaN, Number.NaN, 1.4474840516030245],
    ["acos", [Math.SQRT1_2], "acos(Math.SQRT1_2)", 0.7853981633974483, Number.NaN, Number.NaN, Number.NaN],
    ["acosh", [1e308], "acosh(1e308)", 709.889355822726, Number.NaN, Number.NaN, Number.NaN],
    ["acosh", [Math.PI], "acosh(Math.PI)", 1.811526272460853, Number.NaN, Number.NaN, Number.NaN],
    ["acosh", [Math.SQRT2], "acosh(Math.SQRT2)", 0.881373587019543, Number.NaN, Number.NaN, 0.8813735870195432],
    ["asin", [0.123], `asin(${0.123})`, 0.12331227519187199, Number.NaN, Number.NaN, Number.NaN],
    ["asinh", [1e300], "asinh(1e308)", 691.4686750787736, Number.NaN, Number.NaN, Number.NaN],
    ["asinh", [Math.PI], "asinh(Math.PI)", 1.8622957433108482, Number.NaN, Number.NaN, Number.NaN],
    ["atan", [2], "atan(2)", 1.1071487177940904, Number.NaN, Number.NaN, 1.1071487177940906],
    ["atan", [Math.PI], "atan(Math.PI)", 1.2626272556789115, Number.NaN, Number.NaN, Number.NaN],
    ["atanh", [0.5], "atanh(0.5)", 0.5493061443340548, Number.NaN, Number.NaN, 0.5493061443340549],
    ["atan2", [1e-310, 2], "atan2(1e-310, 2)", 5e-311, Number.NaN, Number.NaN, Number.NaN],
    ["atan2", [Math.PI, 2], "atan2(Math.PI)", 1.0038848218538872, Number.NaN, Number.NaN, Number.NaN],
    ["cbrt", [100], "cbrt(100)", 4.641588833612779, Number.NaN, Number.NaN, Number.NaN],
    ["cbrt", [Math.PI], "cbrt(Math.PI)", 1.4645918875615231, Number.NaN, Number.NaN, 1.4645918875615234],
    ["cos", [0.123], `cos(${0.123})`, 0.9924450321351935, Number.NaN, Number.NaN, Number.NaN],
    ["cos", [Math.PI], "cos(Math.PI)", -1, Number.NaN, Number.NaN, Number.NaN],
    ["cos", [t], `cos(${t})`, -0.10868049424995659, Number.NaN, -0.9779661551196617, Number.NaN],
    ["cos", [-1e308], "cos(-1e308)", -0.8913089376870335, Number.NaN, 0.99970162388838, Number.NaN],
    ["cos", [13 * Math.E], "cos(13*Math.E)", -0.7108118501064331, -0.7108118501064332, Number.NaN, Number.NaN],
    ["cos", [57 * Math.E], "cos(57*Math.E)", -0.536911695749024, -0.5369116957490239, Number.NaN, Number.NaN],
    ["cos", [21 * Math.LN2], "cos(21*Math.LN2)", -0.4067775970251724, -0.40677759702517235, -0.6534063185820197, Number.NaN],
    ["cos", [51 * Math.LN2], "cos(51*Math.LN2)", -0.7017203400855446, -0.7017203400855445, Number.NaN, Number.NaN],
    ["cos", [21 * Math.LOG2E], "cos(21*Math.LOG2E)", 0.4362848063618998, 0.43628480636189976, Number.NaN, Number.NaN],
    ["cos", [25 * Math.SQRT2], "cos(25*Math.SQRT2)", -0.6982689820462377, -0.6982689820462376, Number.NaN, Number.NaN],
    ["cos", [50 * Math.SQRT1_2], "cos(50*Math.SQRT1_2)", -0.6982689820462377, -0.6982689820462376, Number.NaN, Number.NaN],
    ["cos", [21 * Math.SQRT1_2], "cos(21*Math.SQRT1_2)", -0.6534063185820198, Number.NaN, Number.NaN, Number.NaN],
    ["cos", [17 * Math.LOG10E], "cos(17*Math.LOG10E)", 0.4537557425982784, 0.45375574259827833, Number.NaN, Number.NaN],
    ["cos", [2 * Math.LOG10E], "cos(2*Math.LOG10E)", 0.6459044007438142, Number.NaN, 0.6459044007438141, Number.NaN],
    ["cosh", [1], "cosh(1)", 1.5430806348152437, Number.NaN, Number.NaN, Number.NaN],
    ["cosh", [Math.PI], "cosh(Math.PI)", 11.591953275521519, Number.NaN, Number.NaN, Number.NaN],
    ["cosh", [492 * Math.LOG2E], "cosh(492*Math.LOG2E)", 9199870313877772e292, 9199870313877774e292, Number.NaN, Number.NaN],
    ["cosh", [502 * Math.SQRT2], "cosh(502*Math.SQRT2)", 10469199669023138e292, 1046919966902314e293, Number.NaN, Number.NaN],
    ["expm1", [1], "expm1(1)", 1.718281828459045, Number.NaN, Number.NaN, 1.7182818284590453],
    ["expm1", [Math.PI], "expm1(Math.PI)", 22.140692632779267, Number.NaN, Number.NaN, Number.NaN],
    ["exp", [0.123], `exp(${0.123})`, 1.1308844209474893, Number.NaN, Number.NaN, Number.NaN],
    ["exp", [Math.PI], "exp(Math.PI)", 23.140692632779267, Number.NaN, Number.NaN, Number.NaN],
    ["hypot", [1, 2, 3, 4, 5, 6], "hypot(1, 2, 3, 4, 5, 6)", 9.539392014169456, Number.NaN, Number.NaN, Number.NaN],
    ["hypot", [t, t], `hypot(${t}, ${t})`, 8288489826731116e23, 8288489826731114e23, Number.NaN, Number.NaN],
    ["hypot", [2 * Math.E, -100], "hypot(2*Math.E, -100)", 100.14767208675259, 100.14767208675258, Number.NaN, Number.NaN],
    ["hypot", [6 * Math.PI, -100], "hypot(6*Math.PI, -100)", 101.76102278593319, 101.7610227859332, Number.NaN, Number.NaN],
    ["hypot", [2 * Math.LN2, -100], "hypot(2*Math.LN2, -100)", 100.0096085986525, 100.00960859865252, Number.NaN, Number.NaN],
    ["hypot", [Math.LOG2E, -100], "hypot(Math.LOG2E, -100)", 100.01040630344929, 100.01040630344927, Number.NaN, Number.NaN],
    ["hypot", [Math.SQRT2, -100], "hypot(Math.SQRT2, -100)", 100.00999950004999, 100.00999950005, Number.NaN, Number.NaN],
    ["hypot", [Math.SQRT1_2, -100], "hypot(Math.SQRT1_2, -100)", 100.0024999687508, 100.00249996875078, Number.NaN, Number.NaN],
    ["hypot", [2 * Math.LOG10E, -100], "hypot(2*Math.LOG10E, -100)", 100.00377216279416, 100.00377216279418, Number.NaN, Number.NaN],
    ["log", [0.123], `log(${0.123})`, -2.0955709236097197, Number.NaN, Number.NaN, Number.NaN],
    ["log", [Math.PI], "log(Math.PI)", 1.1447298858494002, Number.NaN, Number.NaN, Number.NaN],
    ["log1p", [0.123], `log1p(${0.123})`, 0.11600367575630613, Number.NaN, Number.NaN, Number.NaN],
    ["log1p", [Math.PI], "log1p(Math.PI)", 1.4210804127942926, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [0.123], `log10(${0.123})`, -0.9100948885606021, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [Math.PI], "log10(Math.PI)", 0.4971498726941338, 0.49714987269413385, Number.NaN, Number.NaN],
    ["log10", [Math.E], "log10(Math.E)", 0.4342944819032518, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [34 * Math.E], "log10(34*Math.E)", 1.9657733989455068, 1.965773398945507, Number.NaN, Number.NaN],
    ["log10", [Math.LN2], "log10(Math.LN2)", -0.1591745389548616, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [11 * Math.LN2], "log10(11*Math.LN2)", 0.8822181462033634, 0.8822181462033635, Number.NaN, Number.NaN],
    ["log10", [Math.LOG2E], "log10(Math.LOG2E)", 0.15917453895486158, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [43 * Math.LOG2E], "log10(43*Math.LOG2E)", 1.792642994534448, 1.7926429945344482, Number.NaN, Number.NaN],
    ["log10", [Math.LOG10E], "log10(Math.LOG10E)", -0.36221568869946325, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [7 * Math.LOG10E], "log10(7*Math.LOG10E)", 0.4828823513147936, 0.48288235131479357, Number.NaN, Number.NaN],
    ["log10", [Math.SQRT1_2], "log10(Math.SQRT1_2)", -0.15051499783199057, Number.NaN, Number.NaN, Number.NaN],
    ["log10", [2 * Math.SQRT1_2], "log10(2*Math.SQRT1_2)", 0.1505149978319906, 0.15051499783199063, Number.NaN, Number.NaN],
    ["log10", [Math.SQRT2], "log10(Math.SQRT2)", 0.1505149978319906, 0.15051499783199063, Number.NaN, Number.NaN],
    ["sin", [t], `sin(${t})`, 0.994076732536068, Number.NaN, -0.20876350121720488, Number.NaN],
    ["sin", [Math.PI], "sin(Math.PI)", 12246467991473532e-32, Number.NaN, 12246063538223773e-32, Number.NaN],
    ["sin", [39 * Math.E], "sin(39*Math.E)", -0.7181630308570677, -0.7181630308570678, Number.NaN, Number.NaN],
    ["sin", [35 * Math.LN2], "sin(35*Math.LN2)", -0.7659964138980511, -0.765996413898051, Number.NaN, Number.NaN],
    ["sin", [110 * Math.LOG2E], "sin(110*Math.LOG2E)", 0.9989410140273756, 0.9989410140273757, Number.NaN, Number.NaN],
    ["sin", [7 * Math.LOG10E], "sin(7*Math.LOG10E)", 0.10135692924965616, 0.10135692924965614, Number.NaN, Number.NaN],
    ["sin", [35 * Math.SQRT1_2], "sin(35*Math.SQRT1_2)", -0.3746357547858202, -0.37463575478582023, Number.NaN, Number.NaN],
    ["sin", [21 * Math.SQRT2], "sin(21*Math.SQRT2)", -0.9892668187780498, -0.9892668187780497, Number.NaN, Number.NaN],
    ["sinh", [1], "sinh(1)", 1.1752011936438014, Number.NaN, Number.NaN, Number.NaN],
    ["sinh", [Math.PI], "sinh(Math.PI)", 11.548739357257748, Number.NaN, Number.NaN, 11.548739357257746],
    ["sinh", [Math.E], "sinh(Math.E)", 7.544137102816975, Number.NaN, Number.NaN, Number.NaN],
    ["sinh", [Math.LN2], "sinh(Math.LN2)", 0.75, Number.NaN, Number.NaN, Number.NaN],
    ["sinh", [Math.LOG2E], "sinh(Math.LOG2E)", 1.9978980091062795, Number.NaN, Number.NaN, Number.NaN],
    ["sinh", [492 * Math.LOG2E], "sinh(492*Math.LOG2E)", 9199870313877772e292, 9199870313877774e292, Number.NaN, Number.NaN],
    ["sinh", [Math.LOG10E], "sinh(Math.LOG10E)", 0.44807597941469024, Number.NaN, Number.NaN, Number.NaN],
    ["sinh", [Math.SQRT1_2], "sinh(Math.SQRT1_2)", 0.7675231451261164, Number.NaN, Number.NaN, Number.NaN],
    ["sinh", [Math.SQRT2], "sinh(Math.SQRT2)", 1.935066822174357, Number.NaN, Number.NaN, 1.9350668221743568],
    ["sinh", [502 * Math.SQRT2], "sinh(502*Math.SQRT2)", 10469199669023138e292, 1046919966902314e293, Number.NaN, Number.NaN],
    ["sqrt", [0.123], `sqrt(${0.123})`, 0.3507135583350036, Number.NaN, Number.NaN, Number.NaN],
    ["sqrt", [Math.PI], "sqrt(Math.PI)", 1.7724538509055159, Number.NaN, Number.NaN, Number.NaN],
    ["tan", [-1e308], "tan(-1e308)", 0.5086861259107568, Number.NaN, Number.NaN, 0.5086861259107567],
    ["tan", [Math.PI], "tan(Math.PI)", -12246467991473532e-32, Number.NaN, Number.NaN, Number.NaN],
    ["tan", [6 * Math.E], "tan(6*Math.E)", 0.6866761546452431, 0.686676154645243, Number.NaN, Number.NaN],
    ["tan", [6 * Math.LN2], "tan(6*Math.LN2)", 1.6182817135715877, 1.618281713571588, Number.NaN, 1.6182817135715875],
    ["tan", [10 * Math.LOG2E], "tan(10*Math.LOG2E)", -3.3537128705376014, -3.353712870537601, Number.NaN, -3.353712870537602],
    ["tan", [17 * Math.SQRT2], "tan(17*Math.SQRT2)", -1.9222955461799982, -1.922295546179998, Number.NaN, Number.NaN],
    ["tan", [34 * Math.SQRT1_2], "tan(34*Math.SQRT1_2)", -1.9222955461799982, -1.922295546179998, Number.NaN, Number.NaN],
    ["tan", [10 * Math.LOG10E], "tan(10*Math.LOG10E)", 2.5824856130712432, 2.5824856130712437, Number.NaN, Number.NaN],
    ["tanh", [0.123], `tanh(${0.123})`, 0.12238344189440875, Number.NaN, Number.NaN, 0.12238344189440876],
    ["tanh", [Math.PI], "tanh(Math.PI)", 0.99627207622075, Number.NaN, Number.NaN, Number.NaN],
    ["pow", [0.123, -100], `pow(${0.123}, -100)`, 1022089333584519e76, 10220893335845176e75, Number.NaN, Number.NaN],
    ["pow", [Math.PI, -100], "pow(Math.PI, -100)", 19275814160560204e-66, 19275814160560185e-66, Number.NaN, 19275814160560206e-66],
    ["pow", [Math.E, -100], "pow(Math.E, -100)", 37200759760208555e-60, 3720075976020851e-59, Number.NaN, Number.NaN],
    ["pow", [Math.LN2, -100], "pow(Math.LN2, -100)", 8269017203802394, 8269017203802410, Number.NaN, Number.NaN],
    ["pow", [Math.LN10, -100], "pow(Math.LN10, -100)", 6003867926738829e-52, 6003867926738811e-52, Number.NaN, Number.NaN],
    ["pow", [Math.LOG2E, -100], "pow(Math.LOG2E, -100)", 120933355845501e-30, 12093335584550061e-32, Number.NaN, Number.NaN],
    ["pow", [Math.LOG10E, -100], "pow(Math.LOG10E, -100)", 16655929347585958e20, 1665592934758592e21, Number.NaN, 16655929347585955e20],
    // eslint-disable-next-line ts/no-loss-of-precision
    ["pow", [Math.SQRT1_2, -100], "pow(Math.SQRT1_2, -100)", 11258999068426162e-1, 11258999068426115e-1, Number.NaN, Number.NaN],
    ["pow", [Math.SQRT2, -100], "pow(Math.SQRT2, -100)", 8881784197001191e-31, 8881784197001154e-31, Number.NaN, Number.NaN],
    ["polyfill", [2e-3 ** -100], "polyfill pow(2e-3, -100)", 7888609052210102e254, 7888609052210126e254, Number.NaN, Number.NaN]
  ].reduce((o, r) => {
    const s = Math[r[0]] ? Math[r[0]](...r[1]) : !1;
    return o[r[2]] = {
      name: r[2],
      result: s,
      chrome: s === r[3],
      firefox: r[4] ? s === r[4] : !1,
      torBrowser: r[5] ? s === r[5] : !1,
      safari: r[6] ? s === r[6] : !1
    }, o;
  }, {});
}
function Mt() {
  try {
    const e = [
      'audio/ogg; codecs="vorbis"',
      "audio/mpeg",
      "audio/mpegurl",
      'audio/wav; codecs="1"',
      "audio/x-m4a",
      "audio/aac",
      'video/ogg; codecs="theora"',
      "video/quicktime",
      'video/mp4; codecs="avc1.42E01E"',
      'video/webm; codecs="vp8"',
      'video/webm; codecs="vp9"',
      "video/x-matroska"
    ].sort(), t = document.createElement("video"), a = new Audio(), l = "MediaRecorder" in window;
    return { mimeTypes: e.reduce((r, s) => {
      const i = {
        mimeType: s,
        audioPlayType: a.canPlayType(s),
        videoPlayType: t.canPlayType(s),
        mediaSource: MediaSource.isTypeSupported(s),
        mediaRecorder: l ? MediaRecorder.isTypeSupported(s) : !1
      };
      return !i.audioPlayType && !i.videoPlayType && !i.mediaSource && !i.mediaRecorder || r.push(i), r;
    }, []) };
  } catch {
  }
}
function St() {
  return navigator;
}
async function vt() {
  try {
    const e = {
      privacy: "",
      security: {},
      mode: "",
      engine: L ? "Blink" : z ? "Gecko" : ""
    }, t = (i) => new RegExp(`${i}+$`), a = (i, c, h) => new Promise((m) => setTimeout(() => {
      const p = h || +/* @__PURE__ */ new Date(), g = t(c).test(p) ? t(c).exec(p)[0] : p;
      return m(g);
    }, i)), l = async () => {
      const i = +/* @__PURE__ */ new Date(), c = +`${i}`.slice(-1), h = await a(0, c, i), m = await a(1, c), p = await a(2, c), g = await a(3, c), n = await a(4, c), b = await a(5, c), N = await a(6, c), u = await a(7, c), E = await a(8, c), d = await a(9, c), M = `${h}`.slice(-1), v = `${m}`.slice(-1), R = `${p}`.slice(-1), f = `${g}`.slice(-1), y = `${n}`.slice(-1), T = `${b}`.slice(-1), A = `${N}`.slice(-1), S = `${u}`.slice(-1), _ = `${E}`.slice(-1), I = `${d}`.slice(-1), k = M === v && M === R && M === f && M === y && M === T && M === A && M === S && M === _ && M === I, X = `${h}`.length, j = [h, m, p, g, n, b, N, u, E, d];
      return {
        protection: k,
        delays: j.map((V) => `${V}`.length > X ? `${V}`.slice(-X) : V),
        precision: k ? Math.min(...j.map((V) => `${V}`.length)) : void 0,
        precisionValue: k ? M : void 0
      };
    }, [
      o,
      r
    ] = await Promise.all([
      Re(),
      L ? void 0 : l()
    ]);
    if (o) {
      const i = _e();
      e.privacy = "Brave", e.security = {
        FileSystemWritableFileStream: "FileSystemWritableFileStream" in window,
        Serial: "Serial" in window,
        ReportingObserver: "ReportingObserver" in window
      }, e.mode = i.allow ? "allow" : i.standard ? "standard" : i.strict ? "strict" : "";
    }
    const { protection: s } = r || {};
    if (z && s) {
      const i = {
        OfflineAudioContext: "OfflineAudioContext" in window,
        // dom.webaudio.enabled
        WebGL2RenderingContext: "WebGL2RenderingContext" in window,
        // webgl.enable-webgl2
        WebAssembly: "WebAssembly" in window,
        // javascript.options.wasm
        maxTouchPoints: "maxTouchPoints" in navigator,
        RTCRtpTransceiver: "RTCRtpTransceiver" in window,
        MediaDevices: "MediaDevices" in window,
        Credential: "Credential" in window
      }, c = Object.keys(i), h = /* @__PURE__ */ new Set([
        "RTCRtpTransceiver",
        "MediaDevices",
        "Credential"
      ]), m = c.filter((g) => h.has(g) && !i[g]).length === h.size, p = !i.WebAssembly;
      e.privacy = m ? "Tor Browser" : "Firefox", e.security = {
        reduceTimerPrecision: !0,
        ...i
      }, e.mode = m ? p ? "safer" : "standard" : "resistFingerprinting";
    }
    return e;
  } catch {
  }
}
function Je() {
  try {
    return "ontouchstart" in window && !!document.createEvent("TouchEvent");
  } catch {
    return !1;
  }
}
async function Tt() {
  try {
    const e = window.screen || {}, {
      width: t,
      height: a,
      availWidth: l,
      availHeight: o,
      colorDepth: r,
      pixelDepth: s
    } = e, i = !(t - l || a - o);
    return t > 800 && i && (H.SCREEN = !0), {
      width: t,
      height: a,
      availWidth: l,
      availHeight: o,
      colorDepth: r,
      pixelDepth: s,
      touch: Je()
    };
  } catch {
  }
}
async function Rt() {
  return await new Promise((e) => setTimeout(() => e(void 0), 50)), new Promise((e) => {
    try {
      const t = "speechSynthesis" in window;
      if (t && speechSynthesis.getVoices(), !t)
        return e(null);
      const a = setTimeout(() => e(null), 300), l = () => {
        const o = speechSynthesis.getVoices() ?? [], r = o.find((N) => N.localService);
        if (!o.length || L && !r)
          return;
        clearTimeout(a);
        const i = ((N, u) => N.filter((E) => {
          const { voiceURI: d } = E;
          return u.has(d) ? !1 : (u.add(d), !0);
        }))(o, /* @__PURE__ */ new Set()), c = i.filter((N) => N.localService).map((N) => N.name), h = i.filter((N) => !N.localService).map((N) => N.name), m = [...new Set(i.map((N) => N.lang))], p = i.filter((N) => N.default && N.localService);
        let g = "", n = "";
        if (p.length === 1) {
          const { name: N, lang: u } = p[0];
          g = N, n = (u || "").replace(/_/, "-");
        }
        const { locale: b } = Intl.DateTimeFormat().resolvedOptions();
        return n && n.split("-")[0] !== b.split("-")[0] && (Ae.voiceLangMismatch = !0, H.TIME_ZONE = !0), e({
          local: c,
          remote: h,
          languages: m,
          defaultVoiceName: g,
          defaultVoiceLang: n
        });
      };
      if (l(), speechSynthesis.addEventListener)
        return speechSynthesis.addEventListener("voiceschanged", l);
      speechSynthesis.onvoiceschanged = l;
    } catch {
      return e(null);
    }
  });
}
const ue = 1073741824;
function Ye() {
  try {
    const e = document.createElement("iframe");
    document.body.appendChild(e);
    const t = e.contentWindow, a = Object.getOwnPropertyNames(window), l = Object.getOwnPropertyNames(t);
    return document.body.removeChild(e), a.filter((r) => !l.includes(r));
  } catch {
    return [];
  }
}
function Ze() {
  const t = Object.getOwnPropertyNames(window).slice(-50), [a, l] = 1 .constructor.toString().split(1 .constructor.name), o = (s) => typeof s == "function" && (`${s}` === a + s.name + l || `${s}` === a + (s.name || "").replace("get ", "") + l), r = (s) => {
    if (s.endsWith("_"))
      return !0;
    const i = Object.getOwnPropertyDescriptor(window, s);
    return i ? s === "chrome" ? t.includes(s) : !o(i.get || i.value) : !0;
  };
  return Object.keys(window).slice(-50).filter((s) => r(s));
}
async function et() {
  return "getBattery" in navigator ? navigator.getBattery() : null;
}
async function me() {
  var e;
  return (e = navigator == null ? void 0 : navigator.storage) != null && e.estimate ? Promise.all([
    navigator.storage.estimate().then(({ quota: t }) => t),
    new Promise((t) => {
      navigator.webkitTemporaryStorage.queryUsageAndQuota((a, l) => {
        t(l);
      });
    }).catch(() => null)
  ]).then(([t, a]) => a || t) : null;
}
async function tt() {
  var t;
  let e = null;
  try {
    e = ((t = document == null ? void 0 : document.currentScript) == null ? void 0 : t.src) || import.meta.url;
  } catch {
  }
  return e ? fetch(e).then((a) => a.blob()).then((a) => a.size).catch(() => null) : null;
}
async function _t() {
  var M;
  const [
    e,
    t,
    a,
    l,
    o
  ] = await Promise.all([
    et(),
    me(),
    me(),
    tt(),
    [.../* @__PURE__ */ new Set([...Ye(), ...Ze()])].sort().slice(0, 50)
  ]), {
    charging: r,
    chargingTime: s,
    dischargingTime: i,
    level: c
  } = e || {}, h = ((M = performance == null ? void 0 : performance.memory) == null ? void 0 : M.jsHeapSizeLimit) || null, m = h ? +(h / ue).toFixed(2) : null, p = t ? +(+t / ue).toFixed(2) : null, {
    downlink: g,
    effectiveType: n,
    rtt: b,
    saveData: N,
    downlinkMax: u,
    type: E
    // @ts-expect-error if not supported
  } = (navigator == null ? void 0 : navigator.connection) || {}, d = [
    ...document.querySelectorAll("script")
  ].map((v) => v.src.replace(/^https?:\/\//, "")).slice(0, 10);
  return {
    charging: r,
    chargingTime: s,
    dischargingTime: i,
    level: c,
    memory: h,
    memoryInGigabytes: m,
    quota: t,
    quotaIsInsecure: t !== a,
    quotaInGigabytes: p,
    downlink: g,
    effectiveType: n,
    rtt: b,
    saveData: N,
    downlinkMax: u,
    type: E,
    clientLitter: o,
    scripts: d,
    scriptSize: l
  };
}
async function wt() {
  try {
    const e = F && F.document && F.document.body ? F.document : document, t = document.createElement("div");
    e.body.appendChild(t), oe(t, ie`
      <div id="svg-container">
        <style>
        #svg-container {
          position: absolute;
          left: -9999px;
          height: auto;
        }
        #svg-container .shift-svg {
          transform: scale(1.000999) !important;
        }
        .svgrect-emoji {
          font-family: ${U};
          font-size: 200px !important;
          height: auto;
          position: absolute !important;
          transform: scale(1.000999);
        }
        </style>
        <svg>
          <g id="svgBox">
            ${W.map((n) => `<text x="32" y="32" class="svgrect-emoji">${n}</text>`).join("")}
          </g>
        </svg>
      </div>
    `);
    const a = (n) => Object.keys(n.__proto__).reduce((N, u) => {
      const E = n[u];
      return typeof E == "function" ? N : { ...N, [u]: E };
    }, {}), l = (n) => Object.keys(n.__proto__).reduce((N, u) => {
      const E = n[u];
      return Number.isNaN(E) ? N : N += E;
    }, 0), o = (n) => n ? Object.keys(n).reduce((b, N) => b += Math.abs(n[N]), 0) : 0, r = e.getElementById("svgBox"), s = a(r.getBBox()), i = /* @__PURE__ */ new Set(), c = [...r.getElementsByClassName("svgrect-emoji")], h = c.reduce((n, b, N) => {
      const u = W[N], E = `${b.getComputedTextLength()}`;
      return i.has(E) || (i.add(E), n.add(u)), n;
    }, /* @__PURE__ */ new Set()), m = 1e-5 * [...i].map((n) => n.split(",").reduce((b, N) => (b += +N || 0, b), 0)).reduce((n, b) => n += b, 0), p = {
      bBox: o(s),
      extentOfChar: l(c[0].getExtentOfChar(+W[0])),
      subStringLength: c[0].getSubStringLength(0, 10),
      computedTextLength: c[0].getComputedTextLength(),
      emojiSet: [...h],
      svgrectSystemSum: m
    }, g = e.getElementById("svg-container");
    return g && e.body.removeChild(g), p;
  } catch {
  }
}
function Ct() {
  const e = [
    "UTC",
    "GMT",
    "Etc/GMT+0",
    "Etc/GMT+1",
    "Etc/GMT+10",
    "Etc/GMT+11",
    "Etc/GMT+12",
    "Etc/GMT+2",
    "Etc/GMT+3",
    "Etc/GMT+4",
    "Etc/GMT+5",
    "Etc/GMT+6",
    "Etc/GMT+7",
    "Etc/GMT+8",
    "Etc/GMT+9",
    "Etc/GMT-1",
    "Etc/GMT-10",
    "Etc/GMT-11",
    "Etc/GMT-12",
    "Etc/GMT-13",
    "Etc/GMT-14",
    "Etc/GMT-2",
    "Etc/GMT-3",
    "Etc/GMT-4",
    "Etc/GMT-5",
    "Etc/GMT-6",
    "Etc/GMT-7",
    "Etc/GMT-8",
    "Etc/GMT-9",
    "Etc/GMT",
    "Africa/Abidjan",
    "Africa/Accra",
    "Africa/Addis_Ababa",
    "Africa/Algiers",
    "Africa/Asmara",
    "Africa/Bamako",
    "Africa/Bangui",
    "Africa/Banjul",
    "Africa/Bissau",
    "Africa/Blantyre",
    "Africa/Brazzaville",
    "Africa/Bujumbura",
    "Africa/Cairo",
    "Africa/Casablanca",
    "Africa/Ceuta",
    "Africa/Conakry",
    "Africa/Dakar",
    "Africa/Dar_es_Salaam",
    "Africa/Djibouti",
    "Africa/Douala",
    "Africa/El_Aaiun",
    "Africa/Freetown",
    "Africa/Gaborone",
    "Africa/Harare",
    "Africa/Johannesburg",
    "Africa/Juba",
    "Africa/Kampala",
    "Africa/Khartoum",
    "Africa/Kigali",
    "Africa/Kinshasa",
    "Africa/Lagos",
    "Africa/Libreville",
    "Africa/Lome",
    "Africa/Luanda",
    "Africa/Lubumbashi",
    "Africa/Lusaka",
    "Africa/Malabo",
    "Africa/Maputo",
    "Africa/Maseru",
    "Africa/Mbabane",
    "Africa/Mogadishu",
    "Africa/Monrovia",
    "Africa/Nairobi",
    "Africa/Ndjamena",
    "Africa/Niamey",
    "Africa/Nouakchott",
    "Africa/Ouagadougou",
    "Africa/Porto-Novo",
    "Africa/Sao_Tome",
    "Africa/Tripoli",
    "Africa/Tunis",
    "Africa/Windhoek",
    "America/Adak",
    "America/Anchorage",
    "America/Anguilla",
    "America/Antigua",
    "America/Araguaina",
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Catamarca",
    "America/Argentina/Cordoba",
    "America/Argentina/Jujuy",
    "America/Argentina/La_Rioja",
    "America/Argentina/Mendoza",
    "America/Argentina/Rio_Gallegos",
    "America/Argentina/Salta",
    "America/Argentina/San_Juan",
    "America/Argentina/San_Luis",
    "America/Argentina/Tucuman",
    "America/Argentina/Ushuaia",
    "America/Aruba",
    "America/Asuncion",
    "America/Atikokan",
    "America/Bahia",
    "America/Bahia_Banderas",
    "America/Barbados",
    "America/Belem",
    "America/Belize",
    "America/Blanc-Sablon",
    "America/Boa_Vista",
    "America/Bogota",
    "America/Boise",
    "America/Cambridge_Bay",
    "America/Campo_Grande",
    "America/Cancun",
    "America/Caracas",
    "America/Cayenne",
    "America/Cayman",
    "America/Chicago",
    "America/Chihuahua",
    "America/Costa_Rica",
    "America/Creston",
    "America/Cuiaba",
    "America/Curacao",
    "America/Danmarkshavn",
    "America/Dawson",
    "America/Dawson_Creek",
    "America/Denver",
    "America/Detroit",
    "America/Dominica",
    "America/Edmonton",
    "America/Eirunepe",
    "America/El_Salvador",
    "America/Fort_Nelson",
    "America/Fortaleza",
    "America/Glace_Bay",
    "America/Godthab",
    "America/Goose_Bay",
    "America/Grand_Turk",
    "America/Grenada",
    "America/Guadeloupe",
    "America/Guatemala",
    "America/Guayaquil",
    "America/Guyana",
    "America/Halifax",
    "America/Havana",
    "America/Hermosillo",
    "America/Indiana/Indianapolis",
    "America/Indiana/Knox",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Tell_City",
    "America/Indiana/Vevay",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Inuvik",
    "America/Iqaluit",
    "America/Jamaica",
    "America/Juneau",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    "America/Kralendijk",
    "America/La_Paz",
    "America/Lima",
    "America/Los_Angeles",
    "America/Lower_Princes",
    "America/Maceio",
    "America/Managua",
    "America/Manaus",
    "America/Marigot",
    "America/Martinique",
    "America/Matamoros",
    "America/Mazatlan",
    "America/Menominee",
    "America/Merida",
    "America/Metlakatla",
    "America/Mexico_City",
    "America/Miquelon",
    "America/Moncton",
    "America/Monterrey",
    "America/Montevideo",
    "America/Montserrat",
    "America/Nassau",
    "America/New_York",
    "America/Nipigon",
    "America/Nome",
    "America/Noronha",
    "America/North_Dakota/Beulah",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/Ojinaga",
    "America/Panama",
    "America/Pangnirtung",
    "America/Paramaribo",
    "America/Phoenix",
    "America/Port-au-Prince",
    "America/Port_of_Spain",
    "America/Porto_Velho",
    "America/Puerto_Rico",
    "America/Punta_Arenas",
    "America/Rainy_River",
    "America/Rankin_Inlet",
    "America/Recife",
    "America/Regina",
    "America/Resolute",
    "America/Rio_Branco",
    "America/Santarem",
    "America/Santiago",
    "America/Santo_Domingo",
    "America/Sao_Paulo",
    "America/Scoresbysund",
    "America/Sitka",
    "America/St_Barthelemy",
    "America/St_Johns",
    "America/St_Kitts",
    "America/St_Lucia",
    "America/St_Thomas",
    "America/St_Vincent",
    "America/Swift_Current",
    "America/Tegucigalpa",
    "America/Thule",
    "America/Thunder_Bay",
    "America/Tijuana",
    "America/Toronto",
    "America/Tortola",
    "America/Vancouver",
    "America/Whitehorse",
    "America/Winnipeg",
    "America/Yakutat",
    "America/Yellowknife",
    "Antarctica/Casey",
    "Antarctica/Davis",
    "Antarctica/DumontDUrville",
    "Antarctica/Macquarie",
    "Antarctica/Mawson",
    "Antarctica/McMurdo",
    "Antarctica/Palmer",
    "Antarctica/Rothera",
    "Antarctica/Syowa",
    "Antarctica/Troll",
    "Antarctica/Vostok",
    "Arctic/Longyearbyen",
    "Asia/Aden",
    "Asia/Almaty",
    "Asia/Amman",
    "Asia/Anadyr",
    "Asia/Aqtau",
    "Asia/Aqtobe",
    "Asia/Ashgabat",
    "Asia/Atyrau",
    "Asia/Baghdad",
    "Asia/Bahrain",
    "Asia/Baku",
    "Asia/Bangkok",
    "Asia/Barnaul",
    "Asia/Beirut",
    "Asia/Bishkek",
    "Asia/Brunei",
    "Asia/Calcutta",
    "Asia/Chita",
    "Asia/Choibalsan",
    "Asia/Colombo",
    "Asia/Damascus",
    "Asia/Dhaka",
    "Asia/Dili",
    "Asia/Dubai",
    "Asia/Dushanbe",
    "Asia/Famagusta",
    "Asia/Gaza",
    "Asia/Hebron",
    "Asia/Ho_Chi_Minh",
    "Asia/Hong_Kong",
    "Asia/Hovd",
    "Asia/Irkutsk",
    "Asia/Jakarta",
    "Asia/Jayapura",
    "Asia/Jerusalem",
    "Asia/Kabul",
    "Asia/Kamchatka",
    "Asia/Karachi",
    "Asia/Kathmandu",
    "Asia/Khandyga",
    "Asia/Kolkata",
    "Asia/Krasnoyarsk",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Asia/Kuwait",
    "Asia/Macau",
    "Asia/Magadan",
    "Asia/Makassar",
    "Asia/Manila",
    "Asia/Muscat",
    "Asia/Nicosia",
    "Asia/Novokuznetsk",
    "Asia/Novosibirsk",
    "Asia/Omsk",
    "Asia/Oral",
    "Asia/Phnom_Penh",
    "Asia/Pontianak",
    "Asia/Pyongyang",
    "Asia/Qatar",
    "Asia/Qostanay",
    "Asia/Qyzylorda",
    "Asia/Riyadh",
    "Asia/Sakhalin",
    "Asia/Samarkand",
    "Asia/Seoul",
    "Asia/Shanghai",
    "Asia/Singapore",
    "Asia/Srednekolymsk",
    "Asia/Taipei",
    "Asia/Tashkent",
    "Asia/Tbilisi",
    "Asia/Tehran",
    "Asia/Thimphu",
    "Asia/Tokyo",
    "Asia/Tomsk",
    "Asia/Ulaanbaatar",
    "Asia/Urumqi",
    "Asia/Ust-Nera",
    "Asia/Vientiane",
    "Asia/Vladivostok",
    "Asia/Yakutsk",
    "Asia/Yangon",
    "Asia/Yekaterinburg",
    "Asia/Yerevan",
    "Atlantic/Azores",
    "Atlantic/Bermuda",
    "Atlantic/Canary",
    "Atlantic/Cape_Verde",
    "Atlantic/Faroe",
    "Atlantic/Madeira",
    "Atlantic/Reykjavik",
    "Atlantic/South_Georgia",
    "Atlantic/St_Helena",
    "Atlantic/Stanley",
    "Australia/Adelaide",
    "Australia/Brisbane",
    "Australia/Broken_Hill",
    "Australia/Currie",
    "Australia/Darwin",
    "Australia/Eucla",
    "Australia/Hobart",
    "Australia/Lindeman",
    "Australia/Lord_Howe",
    "Australia/Melbourne",
    "Australia/Perth",
    "Australia/Sydney",
    "Europe/Amsterdam",
    "Europe/Andorra",
    "Europe/Astrakhan",
    "Europe/Athens",
    "Europe/Belgrade",
    "Europe/Berlin",
    "Europe/Bratislava",
    "Europe/Brussels",
    "Europe/Bucharest",
    "Europe/Budapest",
    "Europe/Busingen",
    "Europe/Chisinau",
    "Europe/Copenhagen",
    "Europe/Dublin",
    "Europe/Gibraltar",
    "Europe/Guernsey",
    "Europe/Helsinki",
    "Europe/Isle_of_Man",
    "Europe/Istanbul",
    "Europe/Jersey",
    "Europe/Kaliningrad",
    "Europe/Kiev",
    "Europe/Kirov",
    "Europe/Lisbon",
    "Europe/Ljubljana",
    "Europe/London",
    "Europe/Luxembourg",
    "Europe/Madrid",
    "Europe/Malta",
    "Europe/Mariehamn",
    "Europe/Minsk",
    "Europe/Monaco",
    "Europe/Moscow",
    "Europe/Oslo",
    "Europe/Paris",
    "Europe/Podgorica",
    "Europe/Prague",
    "Europe/Riga",
    "Europe/Rome",
    "Europe/Samara",
    "Europe/San_Marino",
    "Europe/Sarajevo",
    "Europe/Saratov",
    "Europe/Simferopol",
    "Europe/Skopje",
    "Europe/Sofia",
    "Europe/Stockholm",
    "Europe/Tallinn",
    "Europe/Tirane",
    "Europe/Ulyanovsk",
    "Europe/Uzhgorod",
    "Europe/Vaduz",
    "Europe/Vatican",
    "Europe/Vienna",
    "Europe/Vilnius",
    "Europe/Volgograd",
    "Europe/Warsaw",
    "Europe/Zagreb",
    "Europe/Zaporozhye",
    "Europe/Zurich",
    "Indian/Antananarivo",
    "Indian/Chagos",
    "Indian/Christmas",
    "Indian/Cocos",
    "Indian/Comoro",
    "Indian/Kerguelen",
    "Indian/Mahe",
    "Indian/Maldives",
    "Indian/Mauritius",
    "Indian/Mayotte",
    "Indian/Reunion",
    "Pacific/Apia",
    "Pacific/Auckland",
    "Pacific/Bougainville",
    "Pacific/Chatham",
    "Pacific/Chuuk",
    "Pacific/Easter",
    "Pacific/Efate",
    "Pacific/Enderbury",
    "Pacific/Fakaofo",
    "Pacific/Fiji",
    "Pacific/Funafuti",
    "Pacific/Galapagos",
    "Pacific/Gambier",
    "Pacific/Guadalcanal",
    "Pacific/Guam",
    "Pacific/Honolulu",
    "Pacific/Kiritimati",
    "Pacific/Kosrae",
    "Pacific/Kwajalein",
    "Pacific/Majuro",
    "Pacific/Marquesas",
    "Pacific/Midway",
    "Pacific/Nauru",
    "Pacific/Niue",
    "Pacific/Norfolk",
    "Pacific/Noumea",
    "Pacific/Pago_Pago",
    "Pacific/Palau",
    "Pacific/Pitcairn",
    "Pacific/Pohnpei",
    "Pacific/Port_Moresby",
    "Pacific/Rarotonga",
    "Pacific/Saipan",
    "Pacific/Tahiti",
    "Pacific/Tarawa",
    "Pacific/Tongatapu",
    "Pacific/Wake",
    "Pacific/Wallis"
  ], t = () => {
    const [s, i, c] = JSON.stringify(/* @__PURE__ */ new Date()).slice(1, 11).split("-"), h = `${i}/${c}/${s}`, m = `${s}-${i}-${c}`, p = +new Date(h), g = +new Date(m);
    return ~~+((p - g) / 6e4);
  }, a = ({ year: s, city: i = void 0 }) => {
    const c = {
      timeZone: "",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }, h = 6e4;
    let m, p;
    if (i) {
      const b = {
        ...c,
        timeZone: i
      };
      m = new Intl.DateTimeFormat("en", b), p = +new Date(m.format(/* @__PURE__ */ new Date(`7/1/${s}`)));
    } else
      p = +/* @__PURE__ */ new Date(`7/1/${s}`);
    const g = +/* @__PURE__ */ new Date(`${s}-07-01`);
    return (p - g) / h;
  }, l = (s, i) => {
    const c = s.length, h = Math.floor(c / 2), [m, p] = [s.slice(0, h), s.slice(h, c)], g = i(m);
    return c === 1 || g.length ? g : l(p, i);
  }, o = ({ year: s, timeZone: i }) => {
    const c = a({ year: s }), h = a({ year: s, city: i }), m = c === h ? [i] : l(
      e,
      (g) => g.filter((n) => c === a({ year: s, city: n }))
    );
    return m.length === 1 && m[0] === i ? i : ye(m);
  }, r = (s) => {
    try {
      return s.replace(/_/, " ").split("/").join(", ");
    } catch {
    }
    return s;
  };
  try {
    const s = "1113", { timeZone: i } = Intl.DateTimeFormat().resolvedOptions(), c = o({ year: s, timeZone: i }), h = +new Date(/* @__PURE__ */ new Date(`7/1/${s}`)), m = /.*\(|\).*/g;
    return { ...{
      zone: `${/* @__PURE__ */ new Date()}`.replace(m, ""),
      location: r(i),
      locationMeasured: r(c),
      locationEpoch: h,
      offset: (/* @__PURE__ */ new Date()).getTimezoneOffset(),
      offsetComputed: t()
    } };
  } catch {
  }
}
const at = [
  "ALIASED_LINE_WIDTH_RANGE",
  "ALIASED_POINT_SIZE_RANGE",
  "ALPHA_BITS",
  "BLUE_BITS",
  "DEPTH_BITS",
  "GREEN_BITS",
  "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
  "MAX_CUBE_MAP_TEXTURE_SIZE",
  "MAX_FRAGMENT_UNIFORM_VECTORS",
  "MAX_RENDERBUFFER_SIZE",
  "MAX_TEXTURE_IMAGE_UNITS",
  "MAX_TEXTURE_SIZE",
  "MAX_VARYING_VECTORS",
  "MAX_VERTEX_ATTRIBS",
  "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
  "MAX_VERTEX_UNIFORM_VECTORS",
  "MAX_VIEWPORT_DIMS",
  "RED_BITS",
  "RENDERER",
  "SHADING_LANGUAGE_VERSION",
  "STENCIL_BITS",
  "VERSION"
], nt = [
  "MAX_VARYING_COMPONENTS",
  "MAX_VERTEX_UNIFORM_COMPONENTS",
  "MAX_VERTEX_UNIFORM_BLOCKS",
  "MAX_VERTEX_OUTPUT_COMPONENTS",
  "MAX_PROGRAM_TEXEL_OFFSET",
  "MAX_3D_TEXTURE_SIZE",
  "MAX_ARRAY_TEXTURE_LAYERS",
  "MAX_COLOR_ATTACHMENTS",
  "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",
  "MAX_COMBINED_UNIFORM_BLOCKS",
  "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",
  "MAX_DRAW_BUFFERS",
  "MAX_ELEMENT_INDEX",
  "MAX_FRAGMENT_INPUT_COMPONENTS",
  "MAX_FRAGMENT_UNIFORM_COMPONENTS",
  "MAX_FRAGMENT_UNIFORM_BLOCKS",
  "MAX_SAMPLES",
  "MAX_SERVER_WAIT_TIMEOUT",
  "MAX_TEXTURE_LOD_BIAS",
  "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",
  "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",
  "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS",
  "MAX_UNIFORM_BLOCK_SIZE",
  "MAX_UNIFORM_BUFFER_BINDINGS",
  "MIN_PROGRAM_TEXEL_OFFSET",
  "UNIFORM_BUFFER_OFFSET_ALIGNMENT"
], de = {
  uniformBuffers: [
    "MAX_UNIFORM_BUFFER_BINDINGS",
    "MAX_UNIFORM_BLOCK_SIZE",
    "UNIFORM_BUFFER_OFFSET_ALIGNMENT",
    "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",
    "MAX_COMBINED_UNIFORM_BLOCKS",
    "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS"
  ],
  debugRendererInfo: [
    "UNMASKED_VENDOR_WEBGL",
    "UNMASKED_RENDERER_WEBGL"
  ],
  fragmentShader: [
    "MAX_FRAGMENT_UNIFORM_VECTORS",
    "MAX_TEXTURE_IMAGE_UNITS",
    "MAX_FRAGMENT_INPUT_COMPONENTS",
    "MAX_FRAGMENT_UNIFORM_COMPONENTS",
    "MAX_FRAGMENT_UNIFORM_BLOCKS",
    "FRAGMENT_SHADER_BEST_FLOAT_PRECISION",
    "MIN_PROGRAM_TEXEL_OFFSET",
    "MAX_PROGRAM_TEXEL_OFFSET"
  ],
  frameBuffer: [
    "MAX_DRAW_BUFFERS",
    "MAX_COLOR_ATTACHMENTS",
    "MAX_SAMPLES",
    "RGBA_BITS",
    "DEPTH_STENCIL_BITS",
    "MAX_RENDERBUFFER_SIZE",
    "MAX_VIEWPORT_DIMS"
  ],
  rasterizer: [
    "ALIASED_LINE_WIDTH_RANGE",
    "ALIASED_POINT_SIZE_RANGE"
  ],
  textures: [
    "MAX_TEXTURE_SIZE",
    "MAX_CUBE_MAP_TEXTURE_SIZE",
    "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
    "MAX_TEXTURE_MAX_ANISOTROPY_EXT",
    "MAX_3D_TEXTURE_SIZE",
    "MAX_ARRAY_TEXTURE_LAYERS",
    "MAX_TEXTURE_LOD_BIAS"
  ],
  transformFeedback: [
    "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",
    "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",
    "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS"
  ],
  vertexShader: [
    "MAX_VARYING_VECTORS",
    "MAX_VERTEX_ATTRIBS",
    "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
    "MAX_VERTEX_UNIFORM_VECTORS",
    "MAX_VERTEX_UNIFORM_COMPONENTS",
    "MAX_VERTEX_UNIFORM_BLOCKS",
    "MAX_VERTEX_OUTPUT_COMPONENTS",
    "MAX_VARYING_COMPONENTS",
    "VERTEX_SHADER_BEST_FLOAT_PRECISION"
  ],
  webGLContextInfo: [
    "CONTEXT",
    "ANTIALIAS",
    "DIRECT_3D",
    "MAJOR_PERFORMANCE_CAVEAT",
    "RENDERER",
    "SHADING_LANGUAGE_VERSION",
    "VERSION"
  ]
};
function rt(e) {
  try {
    const t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
    return e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
  } catch (t) {
    console.error(t);
  }
}
function ot(e) {
  try {
    const t = e.getExtension("WEBGL_draw_buffers") || e.getExtension("WEBKIT_WEBGL_draw_buffers") || e.getExtension("MOZ_WEBGL_draw_buffers");
    return e.getParameter(t.MAX_DRAW_BUFFERS_WEBGL);
  } catch {
    return;
  }
}
function he(e) {
  if (!e)
    return;
  const t = {};
  try {
    for (const a in e) {
      const l = e[a];
      l && (t[a] = {
        precision: l.precision,
        rangeMax: l.rangeMax,
        rangeMin: l.rangeMin
      });
    }
    return t;
  } catch {
  }
}
function Ne(e, t) {
  const a = ["LOW_FLOAT", "MEDIUM_FLOAT", "HIGH_FLOAT"], l = {};
  try {
    return a.forEach((o) => {
      l[o] = e.getShaderPrecisionFormat(e[t], e[o]);
    }), l;
  } catch {
    return;
  }
}
function pe(e, t) {
  try {
    const a = e.getExtension("WEBGL_debug_renderer_info");
    return a ? e.getParameter(a[t]) : void 0;
  } catch {
  }
}
function it(e) {
  if (e)
    return [
      ...new Set(Object.values(e).filter((t) => t && typeof t != "string").flat().map((t) => Number(t) || 0))
    ].sort((t, a) => t - a);
}
function st(e) {
  if (!e)
    return;
  const t = /(adreno|amd|apple|intel|llvm|mali|microsoft|nvidia|parallels|powervr|samsung|swiftshader|virtualbox|vmware)/i;
  return /radeon/i.test(e) ? "AMD" : /geforce/i.test(e) ? "NVIDIA" : (t.exec(e) || [])[0] || "Other";
}
function Z(e) {
  var b;
  let t = {};
  const a = /^(?:experimental-)?webgl$/, l = /^(?:experimental-)?webgl2$/, o = a.test(e) && "WebGLRenderingContext" in window, r = l.test(e) && "WebGLRenderingContext" in window;
  if (!o && !r)
    return t;
  let s, i, c;
  try {
    if (s = document.createElement("canvas"), i = s.getContext(e, { failIfMajorPerformanceCaveat: !0 }), !i && (c = !0, i = s.getContext(e), !i))
      throw new Error(`context of type ${typeof i}`);
  } catch (N) {
    return console.error(N), t;
  }
  let h;
  try {
    h = i.getSupportedExtensions();
  } catch (N) {
    console.error(N);
  }
  let m = {};
  try {
    const N = he(Ne(i, "VERTEX_SHADER")), u = he(Ne(i, "FRAGMENT_SHADER"));
    m = {
      ANTIALIAS: (b = i.getContextAttributes()) == null ? void 0 : b.antialias,
      CONTEXT: e,
      MAJOR_PERFORMANCE_CAVEAT: c,
      MAX_TEXTURE_MAX_ANISOTROPY_EXT: rt(i),
      MAX_DRAW_BUFFERS_WEBGL: ot(i),
      VERTEX_SHADER: N,
      VERTEX_SHADER_BEST_FLOAT_PRECISION: Object.values(N == null ? void 0 : N.HIGH_FLOAT),
      FRAGMENT_SHADER: u,
      FRAGMENT_SHADER_BEST_FLOAT_PRECISION: Object.values(u == null ? void 0 : u.HIGH_FLOAT),
      UNMASKED_VENDOR_WEBGL: pe(i, "UNMASKED_VENDOR_WEBGL"),
      UNMASKED_RENDERER_WEBGL: pe(i, "UNMASKED_RENDERER_WEBGL")
    }, [...at, ...r ? nt : []].forEach((d) => {
      const M = i.getParameter(i[d]), v = M && (M.constructor === Float32Array || M.constructor === Int32Array);
      m[d] = v ? [...M] : M;
    }), m.RGBA_BITS = [
      m.RED_BITS,
      m.GREEN_BITS,
      m.BLUE_BITS,
      m.ALPHA_BITS
    ], m.DEPTH_STENCIL_BITS = [
      m.DEPTH_BITS,
      m.STENCIL_BITS
    ], m.DIRECT_3D = /Direct3D|D3D\d+/.test(m.UNMASKED_RENDERER_WEBGL);
  } catch (N) {
    console.error(N);
  }
  const p = String([m.UNMASKED_VENDOR_WEBGL, m.UNMASKED_RENDERER_WEBGL]), g = st(p), n = {};
  return m && Object.keys(de).forEach((N) => {
    const u = de[N].reduce((E, d) => (m[d] !== void 0 && (E[d] = m[d]), E), {});
    Object.keys(u).length && (n[N] = u);
  }), t = {
    gpuHash: m ? [g, ...it(m) ?? []].join(":") : void 0,
    gpu: p,
    gpuBrand: g,
    ...n,
    webGLExtensions: h
  }, t;
}
async function It() {
  try {
    const [e, t, a] = await Promise.all([
      Z("webgl"),
      Z("webgl2"),
      Z("experimental-webgl")
    ]);
    return {
      webGL: e,
      webGL2: t,
      experimentalWebGL: a
    };
  } catch (e) {
    console.error(e);
  }
}
function Ot() {
  try {
    let t = Object.getOwnPropertyNames(F || window).filter((c) => !/_|\d{3,}/.test(c));
    const a = "Event", l = ["PerformanceNavigationTiming", "Performance"];
    if (z) {
      const c = t.indexOf(a);
      c !== -1 && (t = t.slice(0, c).concat(t.slice(c + 1)), t = [...t, a]), l.forEach((h) => {
        const m = t.indexOf(h);
        return m !== -1 && (t = t.slice(0, m).concat(t.slice(m + 1))), t;
      });
    }
    const o = t.filter((c) => /moz/i.test(c)).length, r = t.filter((c) => /webkit/i.test(c)).length, s = t.filter((c) => /apple/i.test(c)).length;
    return { ...{ keys: t, apple: s, moz: o, webkit: r } };
  } catch {
  }
}
export {
  lt as getAudio,
  mt as getCanvas,
  dt as getCss,
  ht as getCssMedia,
  Nt as getDocument,
  pt as getDomRect,
  gt as getError,
  At as getFeatures,
  Et as getFont,
  bt as getHeadlessFeatures,
  ft as getIntl,
  yt as getMath,
  Mt as getMedia,
  St as getNavigator,
  vt as getResistance,
  wt as getSVG,
  Tt as getScreen,
  Rt as getSpeech,
  _t as getStatus,
  Ct as getTimezone,
  It as getWebGl,
  Ot as getWindow
};
