export type PasswordOptions = {
  length?: number;
  includeLower?: boolean;
  includeUpper?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  excludeAmbiguous?: boolean;
};

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>/?";
const AMBIGUOUS = "'`\"\\|/;:.,<>";

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff) * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
}

export function generatePassword(opts: PasswordOptions = {}): string {
  const {
    length = 16,
    includeLower = true,
    includeUpper = true,
    includeNumbers = true,
    includeSymbols = false,
    excludeAmbiguous = true,
  } = opts;

  let pool = '';
  if (includeLower) pool += LOWER;
  if (includeUpper) pool += UPPER;
  if (includeNumbers) pool += NUMBERS;
  if (includeSymbols) pool += SYMBOLS;

  if (pool.length === 0) {
    throw new Error('At least one character set must be enabled');
  }

  if (excludeAmbiguous) {
    pool = pool.split('').filter((c) => !AMBIGUOUS.includes(c)).join('');
  }

  const result: string[] = [];
  const poolArr = pool.split('');
  const poolLen = poolArr.length;

  const rand = (n: number) => {
    // returns uniform integer in [0, n)
    const r = crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
    return Math.floor(r * n);
  };

  for (let i = 0; i < length; i++) {
    result.push(poolArr[rand(poolLen)]);
  }

  // final shuffle to reduce predictability
  return shuffle(result).join('');
}
