export function getMath() {
  const n = 0.123
  const bigN = 5.860847362277284e+38
  const fns = [
    ['acos', [n], `acos(${n})`, 1.4474840516030247, Number.NaN, Number.NaN, 1.4474840516030245],
    ['acos', [Math.SQRT1_2], 'acos(Math.SQRT1_2)', 0.7853981633974483, Number.NaN, Number.NaN, Number.NaN],

    ['acosh', [1e308], 'acosh(1e308)', 709.889355822726, Number.NaN, Number.NaN, Number.NaN],
    ['acosh', [Math.PI], 'acosh(Math.PI)', 1.811526272460853, Number.NaN, Number.NaN, Number.NaN],
    ['acosh', [Math.SQRT2], 'acosh(Math.SQRT2)', 0.881373587019543, Number.NaN, Number.NaN, 0.8813735870195432],

    ['asin', [n], `asin(${n})`, 0.12331227519187199, Number.NaN, Number.NaN, Number.NaN],

    ['asinh', [1e300], 'asinh(1e308)', 691.4686750787736, Number.NaN, Number.NaN, Number.NaN],
    ['asinh', [Math.PI], 'asinh(Math.PI)', 1.8622957433108482, Number.NaN, Number.NaN, Number.NaN],

    ['atan', [2], 'atan(2)', 1.1071487177940904, Number.NaN, Number.NaN, 1.1071487177940906],
    ['atan', [Math.PI], 'atan(Math.PI)', 1.2626272556789115, Number.NaN, Number.NaN, Number.NaN],

    ['atanh', [0.5], 'atanh(0.5)', 0.5493061443340548, Number.NaN, Number.NaN, 0.5493061443340549],

    ['atan2', [1e-310, 2], 'atan2(1e-310, 2)', 5e-311, Number.NaN, Number.NaN, Number.NaN],
    ['atan2', [Math.PI, 2], 'atan2(Math.PI)', 1.0038848218538872, Number.NaN, Number.NaN, Number.NaN],

    ['cbrt', [100], 'cbrt(100)', 4.641588833612779, Number.NaN, Number.NaN, Number.NaN],
    ['cbrt', [Math.PI], 'cbrt(Math.PI)', 1.4645918875615231, Number.NaN, Number.NaN, 1.4645918875615234],

    ['cos', [n], `cos(${n})`, 0.9924450321351935, Number.NaN, Number.NaN, Number.NaN],
    ['cos', [Math.PI], 'cos(Math.PI)', -1, Number.NaN, Number.NaN, Number.NaN],
    ['cos', [bigN], `cos(${bigN})`, -0.10868049424995659, Number.NaN, -0.9779661551196617, Number.NaN],
    ['cos', [-1e308], 'cos(-1e308)', -0.8913089376870335, Number.NaN, 0.99970162388838, Number.NaN],
    ['cos', [13 * Math.E], 'cos(13*Math.E)', -0.7108118501064331, -0.7108118501064332, Number.NaN, Number.NaN],
    ['cos', [57 * Math.E], 'cos(57*Math.E)', -0.536911695749024, -0.5369116957490239, Number.NaN, Number.NaN],
    ['cos', [21 * Math.LN2], 'cos(21*Math.LN2)', -0.4067775970251724, -0.40677759702517235, -0.6534063185820197, Number.NaN],
    ['cos', [51 * Math.LN2], 'cos(51*Math.LN2)', -0.7017203400855446, -0.7017203400855445, Number.NaN, Number.NaN],
    ['cos', [21 * Math.LOG2E], 'cos(21*Math.LOG2E)', 0.4362848063618998, 0.43628480636189976, Number.NaN, Number.NaN],
    ['cos', [25 * Math.SQRT2], 'cos(25*Math.SQRT2)', -0.6982689820462377, -0.6982689820462376, Number.NaN, Number.NaN],
    ['cos', [50 * Math.SQRT1_2], 'cos(50*Math.SQRT1_2)', -0.6982689820462377, -0.6982689820462376, Number.NaN, Number.NaN],
    ['cos', [21 * Math.SQRT1_2], 'cos(21*Math.SQRT1_2)', -0.6534063185820198, Number.NaN, Number.NaN, Number.NaN],
    ['cos', [17 * Math.LOG10E], 'cos(17*Math.LOG10E)', 0.4537557425982784, 0.45375574259827833, Number.NaN, Number.NaN],
    ['cos', [2 * Math.LOG10E], 'cos(2*Math.LOG10E)', 0.6459044007438142, Number.NaN, 0.6459044007438141, Number.NaN],

    ['cosh', [1], 'cosh(1)', 1.5430806348152437, Number.NaN, Number.NaN, Number.NaN],
    ['cosh', [Math.PI], 'cosh(Math.PI)', 11.591953275521519, Number.NaN, Number.NaN, Number.NaN],
    ['cosh', [492 * Math.LOG2E], 'cosh(492*Math.LOG2E)', 9.199870313877772e+307, 9.199870313877774e+307, Number.NaN, Number.NaN],
    ['cosh', [502 * Math.SQRT2], 'cosh(502*Math.SQRT2)', 1.0469199669023138e+308, 1.046919966902314e+308, Number.NaN, Number.NaN],

    ['expm1', [1], 'expm1(1)', 1.718281828459045, Number.NaN, Number.NaN, 1.7182818284590453],
    ['expm1', [Math.PI], 'expm1(Math.PI)', 22.140692632779267, Number.NaN, Number.NaN, Number.NaN],

    ['exp', [n], `exp(${n})`, 1.1308844209474893, Number.NaN, Number.NaN, Number.NaN],
    ['exp', [Math.PI], 'exp(Math.PI)', 23.140692632779267, Number.NaN, Number.NaN, Number.NaN],

    ['hypot', [1, 2, 3, 4, 5, 6], 'hypot(1, 2, 3, 4, 5, 6)', 9.539392014169456, Number.NaN, Number.NaN, Number.NaN],
    ['hypot', [bigN, bigN], `hypot(${bigN}, ${bigN})`, 8.288489826731116e+38, 8.288489826731114e+38, Number.NaN, Number.NaN],
    ['hypot', [2 * Math.E, -100], 'hypot(2*Math.E, -100)', 100.14767208675259, 100.14767208675258, Number.NaN, Number.NaN],
    ['hypot', [6 * Math.PI, -100], 'hypot(6*Math.PI, -100)', 101.76102278593319, 101.7610227859332, Number.NaN, Number.NaN],
    ['hypot', [2 * Math.LN2, -100], 'hypot(2*Math.LN2, -100)', 100.0096085986525, 100.00960859865252, Number.NaN, Number.NaN],
    ['hypot', [Math.LOG2E, -100], 'hypot(Math.LOG2E, -100)', 100.01040630344929, 100.01040630344927, Number.NaN, Number.NaN],
    ['hypot', [Math.SQRT2, -100], 'hypot(Math.SQRT2, -100)', 100.00999950004999, 100.00999950005, Number.NaN, Number.NaN],
    ['hypot', [Math.SQRT1_2, -100], 'hypot(Math.SQRT1_2, -100)', 100.0024999687508, 100.00249996875078, Number.NaN, Number.NaN],
    ['hypot', [2 * Math.LOG10E, -100], 'hypot(2*Math.LOG10E, -100)', 100.00377216279416, 100.00377216279418, Number.NaN, Number.NaN],

    ['log', [n], `log(${n})`, -2.0955709236097197, Number.NaN, Number.NaN, Number.NaN],
    ['log', [Math.PI], 'log(Math.PI)', 1.1447298858494002, Number.NaN, Number.NaN, Number.NaN],

    ['log1p', [n], `log1p(${n})`, 0.11600367575630613, Number.NaN, Number.NaN, Number.NaN],
    ['log1p', [Math.PI], 'log1p(Math.PI)', 1.4210804127942926, Number.NaN, Number.NaN, Number.NaN],

    ['log10', [n], `log10(${n})`, -0.9100948885606021, Number.NaN, Number.NaN, Number.NaN],
    ['log10', [Math.PI], 'log10(Math.PI)', 0.4971498726941338, 0.49714987269413385, Number.NaN, Number.NaN],
    ['log10', [Math.E], 'log10(Math.E)', 0.4342944819032518, Number.NaN, Number.NaN, Number.NaN],
    ['log10', [34 * Math.E], 'log10(34*Math.E)', 1.9657733989455068, 1.965773398945507, Number.NaN, Number.NaN],
    ['log10', [Math.LN2], 'log10(Math.LN2)', -0.1591745389548616, Number.NaN, Number.NaN, Number.NaN],
    ['log10', [11 * Math.LN2], 'log10(11*Math.LN2)', 0.8822181462033634, 0.8822181462033635, Number.NaN, Number.NaN],
    ['log10', [Math.LOG2E], 'log10(Math.LOG2E)', 0.15917453895486158, Number.NaN, Number.NaN, Number.NaN],
    ['log10', [43 * Math.LOG2E], 'log10(43*Math.LOG2E)', 1.792642994534448, 1.7926429945344482, Number.NaN, Number.NaN],
    ['log10', [Math.LOG10E], 'log10(Math.LOG10E)', -0.36221568869946325, Number.NaN, Number.NaN, Number.NaN],
    ['log10', [7 * Math.LOG10E], 'log10(7*Math.LOG10E)', 0.4828823513147936, 0.48288235131479357, Number.NaN, Number.NaN],
    ['log10', [Math.SQRT1_2], 'log10(Math.SQRT1_2)', -0.15051499783199057, Number.NaN, Number.NaN, Number.NaN],
    ['log10', [2 * Math.SQRT1_2], 'log10(2*Math.SQRT1_2)', 0.1505149978319906, 0.15051499783199063, Number.NaN, Number.NaN],
    ['log10', [Math.SQRT2], 'log10(Math.SQRT2)', 0.1505149978319906, 0.15051499783199063, Number.NaN, Number.NaN],

    ['sin', [bigN], `sin(${bigN})`, 0.994076732536068, Number.NaN, -0.20876350121720488, Number.NaN],
    ['sin', [Math.PI], 'sin(Math.PI)', 1.2246467991473532e-16, Number.NaN, 1.2246063538223773e-16, Number.NaN],

    ['sin', [39 * Math.E], 'sin(39*Math.E)', -0.7181630308570677, -0.7181630308570678, Number.NaN, Number.NaN],
    ['sin', [35 * Math.LN2], 'sin(35*Math.LN2)', -0.7659964138980511, -0.765996413898051, Number.NaN, Number.NaN],
    ['sin', [110 * Math.LOG2E], 'sin(110*Math.LOG2E)', 0.9989410140273756, 0.9989410140273757, Number.NaN, Number.NaN],
    ['sin', [7 * Math.LOG10E], 'sin(7*Math.LOG10E)', 0.10135692924965616, 0.10135692924965614, Number.NaN, Number.NaN],
    ['sin', [35 * Math.SQRT1_2], 'sin(35*Math.SQRT1_2)', -0.3746357547858202, -0.37463575478582023, Number.NaN, Number.NaN],
    ['sin', [21 * Math.SQRT2], 'sin(21*Math.SQRT2)', -0.9892668187780498, -0.9892668187780497, Number.NaN, Number.NaN],

    ['sinh', [1], 'sinh(1)', 1.1752011936438014, Number.NaN, Number.NaN, Number.NaN],
    ['sinh', [Math.PI], 'sinh(Math.PI)', 11.548739357257748, Number.NaN, Number.NaN, 11.548739357257746],
    ['sinh', [Math.E], 'sinh(Math.E)', 7.544137102816975, Number.NaN, Number.NaN, Number.NaN],
    ['sinh', [Math.LN2], 'sinh(Math.LN2)', 0.75, Number.NaN, Number.NaN, Number.NaN],
    ['sinh', [Math.LOG2E], 'sinh(Math.LOG2E)', 1.9978980091062795, Number.NaN, Number.NaN, Number.NaN],
    ['sinh', [492 * Math.LOG2E], 'sinh(492*Math.LOG2E)', 9.199870313877772e+307, 9.199870313877774e+307, Number.NaN, Number.NaN],
    ['sinh', [Math.LOG10E], 'sinh(Math.LOG10E)', 0.44807597941469024, Number.NaN, Number.NaN, Number.NaN],
    ['sinh', [Math.SQRT1_2], 'sinh(Math.SQRT1_2)', 0.7675231451261164, Number.NaN, Number.NaN, Number.NaN],
    ['sinh', [Math.SQRT2], 'sinh(Math.SQRT2)', 1.935066822174357, Number.NaN, Number.NaN, 1.9350668221743568],
    ['sinh', [502 * Math.SQRT2], 'sinh(502*Math.SQRT2)', 1.0469199669023138e+308, 1.046919966902314e+308, Number.NaN, Number.NaN],

    ['sqrt', [n], `sqrt(${n})`, 0.3507135583350036, Number.NaN, Number.NaN, Number.NaN],
    ['sqrt', [Math.PI], 'sqrt(Math.PI)', 1.7724538509055159, Number.NaN, Number.NaN, Number.NaN],

    ['tan', [-1e308], 'tan(-1e308)', 0.5086861259107568, Number.NaN, Number.NaN, 0.5086861259107567],
    ['tan', [Math.PI], 'tan(Math.PI)', -1.2246467991473532e-16, Number.NaN, Number.NaN, Number.NaN],

    ['tan', [6 * Math.E], 'tan(6*Math.E)', 0.6866761546452431, 0.686676154645243, Number.NaN, Number.NaN],
    ['tan', [6 * Math.LN2], 'tan(6*Math.LN2)', 1.6182817135715877, 1.618281713571588, Number.NaN, 1.6182817135715875],
    ['tan', [10 * Math.LOG2E], 'tan(10*Math.LOG2E)', -3.3537128705376014, -3.353712870537601, Number.NaN, -3.353712870537602],
    ['tan', [17 * Math.SQRT2], 'tan(17*Math.SQRT2)', -1.9222955461799982, -1.922295546179998, Number.NaN, Number.NaN],
    ['tan', [34 * Math.SQRT1_2], 'tan(34*Math.SQRT1_2)', -1.9222955461799982, -1.922295546179998, Number.NaN, Number.NaN],
    ['tan', [10 * Math.LOG10E], 'tan(10*Math.LOG10E)', 2.5824856130712432, 2.5824856130712437, Number.NaN, Number.NaN],

    ['tanh', [n], `tanh(${n})`, 0.12238344189440875, Number.NaN, Number.NaN, 0.12238344189440876],
    ['tanh', [Math.PI], 'tanh(Math.PI)', 0.99627207622075, Number.NaN, Number.NaN, Number.NaN],

    ['pow', [n, -100], `pow(${n}, -100)`, 1.022089333584519e+91, 1.0220893335845176e+91, Number.NaN, Number.NaN],
    ['pow', [Math.PI, -100], 'pow(Math.PI, -100)', 1.9275814160560204e-50, 1.9275814160560185e-50, Number.NaN, 1.9275814160560206e-50],
    ['pow', [Math.E, -100], 'pow(Math.E, -100)', 3.7200759760208555e-44, 3.720075976020851e-44, Number.NaN, Number.NaN],
    ['pow', [Math.LN2, -100], 'pow(Math.LN2, -100)', 8269017203802394, 8269017203802410, Number.NaN, Number.NaN],
    ['pow', [Math.LN10, -100], 'pow(Math.LN10, -100)', 6.003867926738829e-37, 6.003867926738811e-37, Number.NaN, Number.NaN],
    ['pow', [Math.LOG2E, -100], 'pow(Math.LOG2E, -100)', 1.20933355845501e-16, 1.2093335584550061e-16, Number.NaN, Number.NaN],
    ['pow', [Math.LOG10E, -100], 'pow(Math.LOG10E, -100)', 1.6655929347585958e+36, 1.665592934758592e+36, Number.NaN, 1.6655929347585955e+36],
    // eslint-disable-next-line ts/no-loss-of-precision
    ['pow', [Math.SQRT1_2, -100], 'pow(Math.SQRT1_2, -100)', 1125899906842616.2, 1125899906842611.5, Number.NaN, Number.NaN],
    ['pow', [Math.SQRT2, -100], 'pow(Math.SQRT2, -100)', 8.881784197001191e-16, 8.881784197001154e-16, Number.NaN, Number.NaN],

    ['polyfill', [2e-3 ** -100], 'polyfill pow(2e-3, -100)', 7.888609052210102e+269, 7.888609052210126e+269, Number.NaN, Number.NaN],
  ]
  const data = fns.reduce((acc, fn) => {
    // @ts-expect-error TODO
    const value = Math[fn[0]] ? Math[fn[0]](...fn[1]) : false
    acc[fn[2] as string] = {
      name: fn[2],
      result: value,
      chrome: value === fn[3],
      firefox: fn[4] ? value === fn[4] : false,
      torBrowser: fn[5] ? value === fn[5] : false,
      safari: fn[6] ? value === fn[6] : false,
    }
    return acc
  }, {} as Record<string, any>)

  return data
}
