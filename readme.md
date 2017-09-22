# Publisher

Publishes a directory to an s3 bucket, applying correct expires headers and gzipping. Uses [gulp-awspublish](https://github.com/pgherveou/gulp-awspublish). Extracted from my old static site's gulpfile; now the site is in a new repo, and this gulpfile is just a publisher.

## Usage

Set up AWS credentials using [this guide](http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html).  
Clone the project.  
Run `nvm use` (if you use nvm)  
Run `npm install`.  
Run `gulp publish [--flags]` to publish.

I suggest setting up npm scripts for your common deploys, e.g.:

```
"scripts": {
  "deploy:dev": "gulp publish --source ../site/dist --bucket dev.foo.com",
  "deploy:prod": "gulp publish --source ../site/dist --bucket foo.com --sync",
}
```

### Flags

##### `--source [STRING]`
Required. Path to the directory to be published.

##### `--bucket [STRING]`
Required. Your s3 bucket to publish to.

##### `--force`
If set, ignores cache and publishes all assets.

##### `--sync`
If set, deletes all files that aren't in the current deploy.

## TODO

- [x] Update node version
- [ ] Update eslint settings to my new fav, AirBnB with some alterations.
- [ ] Configure eslint to recognize `import`.
- [ ] Refactor into small node app, remove gulp.
