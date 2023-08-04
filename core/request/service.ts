import { IsAlphanumericSimbolsOptions, IsAlphaOptions, Locale } from './type'

const alpha = {
  'es-ES': /^[A-Za-z\-\s/_]+$/i,
}
const alphanumeric = {
  'es-ES': /^[0-9A-Za-z\-\s/_]+$/i,
}

export function isAlphaSimbols(
  _str: string,
  locale: Locale = 'es-ES',
  options: IsAlphaOptions = {}
) {
  var str = _str
  var ignore = options.ignore

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '')
    } else if (typeof ignore === 'string') {
      str = str.replace(
        new RegExp(
          '['.concat(ignore.replace(/[[\]{}()*+?.,\\^$|#]/g, '\\$&'), ']'),
          'g'
        ),
        ''
      ) // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp')
    }
  }
  if (locale in alpha) {
    return alpha['es-ES'].test(str)
  }

  throw new Error("Invalid locale '".concat(locale, "'"))
}
export function isAlphanumericSimbols(
  _str: string,
  locale: Locale = 'es-ES',
  options: IsAlphanumericSimbolsOptions = {}
) {
  var str = _str
  var ignore = options.ignore

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '')
    } else if (typeof ignore === 'string') {
      str = str.replace(
        new RegExp(
          '['.concat(ignore.replace(/[[\]{}()*+?.,\\^$|#]/g, '\\$&'), ']'),
          'g'
        ),
        ''
      ) // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp')
    }
  }

  if (locale in alphanumeric) {
    return alphanumeric['es-ES'].test(str)
  }

  throw new Error("Invalid locale '".concat(locale, "'"))
}

export function isAlpha(
  _str: string,
  locale: Locale = 'es-ES',
  options: IsAlphaOptions = {}
) {
  let str = _str
  const { ignore } = options

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '')
    } else if (typeof ignore === 'string') {
      str = str.replace(
        new RegExp(
          `[${ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')}]`,
          'g'
        ),
        ''
      ) // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp')
    }
  }

  if (locale in alpha) {
    return alpha['es-ES'].test(str)
  }
  throw new Error(`Invalid locale '${locale}'`)
}
