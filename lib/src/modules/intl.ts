export async function getIntl() {
  const getLocale = () => {
    const constructors = [
      'Collator',
      'DateTimeFormat',
      'DisplayNames',
      'ListFormat',
      'NumberFormat',
      'PluralRules',
      'RelativeTimeFormat',
    ]

    const locale = constructors.reduce((acc, name) => {
      try {
        // @ts-expect-error error
        const obj = new Intl[name]()
        if (!obj)
          return acc

        const { locale } = obj.resolvedOptions() || {}
        return [...acc, locale]
      }
      catch (error) {
        return acc
      }
    }, [] as string[])

    return [...new Set(locale)]
  }

  try {
    const dateTimeFormat = (() => {
      return new Intl.DateTimeFormat(undefined, {
        month: 'long',
        timeZoneName: 'long',
      }).format(963644400000)
    })()

    const displayNames = (() => {
      return new Intl.DisplayNames(undefined, {
        type: 'language',
      }).of('en-US')
    })()

    const listFormat = (() => {
      return new Intl.ListFormat(undefined, {
        style: 'long',
        type: 'disjunction',
      }).format(['0', '1'])
    })()

    const numberFormat = (() => {
      return new Intl.NumberFormat(undefined, {
        notation: 'compact',
        compactDisplay: 'long',
      }).format(21000000)
    })()

    const pluralRules = (() => {
      return new Intl.PluralRules().select(1)
    })()

    const relativeTimeFormat = (() => {
      return new Intl.RelativeTimeFormat(undefined, {
        localeMatcher: 'best fit',
        numeric: 'auto',
        style: 'long',
      }).format(1, 'year')
    })()

    const locale = getLocale()

    return {
      dateTimeFormat,
      displayNames,
      listFormat,
      numberFormat,
      pluralRules,
      relativeTimeFormat,
      locale: `${locale}`,
    }
  }
  catch (error) {}
}
