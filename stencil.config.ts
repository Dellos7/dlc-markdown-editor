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
  copy: [
    {
      src: '../node_modules/showdown/dist/showdown.min.js',
      dest: 'assets/js/showdown.min.js'
    }
  ]
};
