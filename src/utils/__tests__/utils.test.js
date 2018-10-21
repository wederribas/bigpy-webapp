import { deburr } from '../utils'

test('Deburr function returns correct values', () => {
  const charsWithAccents = `àÀáÁäÄÂèÈéÉùÙúÚüÜãÃõÕñÑçÇ`
  const charsWithoutAccents = `aAaAaAAeEeEuUuUuUaAoOnNcC`
  const charsTransformed = deburr(charsWithAccents)

  expect(charsTransformed).toEqual(charsWithoutAccents)
})
