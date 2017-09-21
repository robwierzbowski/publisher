/*
 Publishes to my personal site's s3 bucket.
 Run `gulp publish`. Add flags:
 --source [path]: path to the directory to be published.
 --prod: if set, publishes to robwierzbowski.com. Otherwise publishes to
    dev.robwierzbowski.com.
*/

'use strict';

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { argv } from 'yargs';

if (!argv.source) {
  console.log('Ya need a --source dir, buddy');
  process.exit(1);
}

const $ = gulpLoadPlugins();
const prod = argv.prod;
const base = path.resolve(__dirname, argv.source);
const source = path.resolve(base, '**/*');

const awsSettings = {
  params: {
    Bucket: prod ? 'robwierzbowski.com' : 'dev.robwierzbowski.com'
  },
  region: 'us-east-1'
};

const day = 86400;
const farFuture = {'Cache-Control': `max-age=${day * 365}`};
const future = {'Cache-Control': `max-age=${day * 7}`};
const noCache = {'Cache-Control': 'no-cache'};

gulp.task('publish', () => {
  const gzipTypes = '**/*.{html,css,js,svg,ico,json,txt}';
  const cacheBustedTypes = '**/*.{css,js}';
  const cachedTypes = '**/*.{gif,jpeg,jpg,png,svg,webp,ico,woff,woff2}';
  const noCacheTypes = '**/*.{html,json,xml,txt}';
  const otherTypes = [
    '**/*',
    `!${cacheBustedTypes}`,
    `!${cachedTypes}`,
    `!${noCacheTypes}`
  ];

  let publisher = $.awspublish.create(awsSettings);

  return gulp.src(source, {base: base})
  .pipe($.if(gzipTypes, $.awspublish.gzip()))
  .pipe($.if(cacheBustedTypes, publisher.publish(farFuture)))
  .pipe($.if(cachedTypes, publisher.publish(future)))
  .pipe($.if(noCacheTypes, publisher.publish(noCache)))
  .pipe($.if(otherTypes, publisher.publish()))
  .pipe($.awspublish.reporter());
});
