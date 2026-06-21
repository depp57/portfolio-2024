import next from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...next,
  prettier,
];

export default eslintConfig;
