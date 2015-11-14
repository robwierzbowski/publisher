/*global supportsWoff2:false */
'use strict';

// Create prefetch links for assets
const prefetch = (url) => {
  const link = document.createElement('link');
  link.setAttribute('rel', 'prefetch');
  link.setAttribute('href', url);
  document.head.appendChild(link);
};

const fontPath = '/fonts/';
const fontType = supportsWoff2 ? '.woff2' : '.woff';
const sources = [
  `${fontPath}charter-bt-roman${fontType}`,
  `${fontPath}charter-bt-italic${fontType}`,
  '/images/sprites/icons.svg'
];

sources.forEach( (source) => { prefetch(source); });
