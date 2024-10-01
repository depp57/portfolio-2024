// Use type safe message keys with `next-intl`
type Messages = typeof import('./i18n-messages/en.json');
declare interface IntlMessages extends Messages {}

declare module '*.glsl' {
  const value: string;
  export default value;
}

// https://stackoverflow.com/questions/64785096/how-to-use-definitelytyped-types-on-forked-packages
// is not working with TurboRepo, but using this tricks works. Took me hours to figure out.
declare module '@depp57/matter-js' {
  export = Matter;
}
