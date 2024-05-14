/* eslint-disable no-new-func */
function getErrors(errFns: (() => void)[]) {
  const errors: string[] = []
  let i; const len = errFns.length
  for (i = 0; i < len; i++) {
    try {
      errFns[i]()
    }
    catch (error) {
      errors.push((err as Error).message)
    }
  }
  return errors
}

export function getError() {
  try {
    const errorTests = [
      () => new Function('alert(")')(),
      () => new Function('const foo;foo.bar')(),
      () => new Function('null.bar')(),
      () => new Function('abc.xyz = 123')(),
      () => new Function('const foo;foo.bar')(),
      () => new Function('(1).toString(1000)')(),
      () => new Function('[...undefined].length')(),
      () => new Function('var x = new Array(-1)')(),
      () => new Function('const a=1; const a=2;')(),
    ]
    const errors = getErrors(errorTests)
    return { errors }
  }
  catch (error) {
  }
}
