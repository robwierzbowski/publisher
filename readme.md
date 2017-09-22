# Publisher

Publishes to my personal site's s3 bucket. A reduction of my older static site gulpfile; now the site is in a new repo, and the gulpfile is just a publisher.

## Usage

Run `gulp publish [--flags]` to deploy.

### Flags

##### `--source [path]`
Required. Path to the directory to be published.

##### `--prod`
If set, publishes to `robwierzbowski.com`. Otherwise publishes to `dev.robwierzbowski.com`.

##### `--force`
If set, ignores cache and publishes all assets.

##### `--sync`
If set, deletes all files that aren't in the current deploy.

## TODO

- [x] Update node version
- [ ] Update eslint settings to my new fav, AirBnB with some alterations.
- [ ] Refactor into small node app, remove gulp.
