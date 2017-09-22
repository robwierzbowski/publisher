'use strict';

import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { argv } from 'yargs';

if (!argv.source) {
  console.log('Ya need a --source dir, buddy');
  process.exit(1);
}

if (!argv.bucket) {
  console.log('Ya need a --bucket, buddy');
  process.exit(1);
}

const bucket = argv.bucket;
const force = !!argv.force;
const sync = !!argv.sync;

const $ = gulpLoadPlugins();
const base = path.resolve(__dirname, argv.source);
const source = path.resolve(base, '**/*');

const awsSettings = {
  params: {
    Bucket: bucket,
  },
  region: 'us-east-1'
};

const day = 86400;
const farFuture = {'Cache-Control': `max-age=${day * 365}`};
const future = {'Cache-Control': `max-age=${day * 7}`};
const noCache = {'Cache-Control': 'no-cache'};

gulp.task('publish', () => {
  const gzipTypes = '**/*.{html,css,js,svg,ico,json,txt}';
  const cacheBustedTypes = '**/*.{css,js,gif,jpeg,jpg,png,svg,webp,woff,woff2}';
  const cachedTypes = '**/*.{ico}';
  const noCacheTypes = '**/*.{html,json,xml,txt}';
  const otherTypes = [
    '**/*',
    `!${cacheBustedTypes}`,
    `!${cachedTypes}`,
    `!${noCacheTypes}`
  ];

  const publisher = $.awspublish.create(awsSettings);

  const options = {
    force: force,
  }

  return gulp.src(source, {base: base})
  .pipe($.if(gzipTypes, $.awspublish.gzip()))
  .pipe($.if(cacheBustedTypes, publisher.publish(farFuture, options)))
  .pipe($.if(cachedTypes, publisher.publish(future, options)))
  .pipe($.if(noCacheTypes, publisher.publish(noCache, options)))
  .pipe($.if(otherTypes, publisher.publish(null, options)))
  .pipe($.if(sync, publisher.sync()))
  .pipe($.awspublish.reporter());
});
