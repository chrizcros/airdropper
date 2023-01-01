export function pickNRandom<T>(array: T[], n: number): T[] {
  const result = new Array(n)
  let len = array.length
  const taken = new Array(len)
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available")
  while (n--) {
      const x = Math.floor(Math.random() * len)
      result[n] = array[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
  }
  return result
}
