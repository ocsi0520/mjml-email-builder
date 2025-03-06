import { configureLocalization, LocaleModule } from '@lit/localize';
import { sourceLocale, targetLocales } from './generated/config';
import { NonDefaultLocaleIdentifier } from './locale-type';

const preloadedLocales = targetLocales.reduce(
  (acc, locale) => ({
    ...acc,
    [locale]: import(`./generated/locales/${locale}.js`),
  }),
  {}
) as Record<NonDefaultLocaleIdentifier, LocaleModule>;

// if the locale is the sourceLocale, then the loadLocale is not going to be executed
// instead the default one is loaded without it (I guess it's somehow cached)
export const localization = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale) =>
    preloadedLocales[locale as NonDefaultLocaleIdentifier],
});
