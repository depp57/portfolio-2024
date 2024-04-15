// Use type safe message keys with `next-intl`
type Messages = typeof import('./i18n-messages/en.json');
declare interface IntlMessages extends Messages {}

declare module '*.glsl' {
  const value: string;
  export default value;
}
