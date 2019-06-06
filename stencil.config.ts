import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'dlc-markdown-editor',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      empty: false
    }
  ],
  plugins: [
    sass()
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.scss'
};
