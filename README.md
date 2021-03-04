# 11ty Starter Kit with SCSS

Based on the official starter kit and come with 7 in 1 folder structure SCSS development using postcss, purgecss and cssnano.

# NPM Scripts

```
  "watch:sass": "sass  --no-source-map --watch src/assets/scss:_site/assets/css",
  "watch:eleventy": "eleventy --serve",
  "build:sass": "sass  --no-source-map src/assets/scss:_site/assets/css",
  "build:eleventy": "eleventy",
  "build:purge": "purgecss -c ./purgecss.config.js -o _site/assets/css/main.css",
  "postbuild": "postcss _site/assets/css/*.css -r --no-map build:purge",
  "start": "npm-run-all build:sass --parallel watch:*",
  "build": "npm-run-all build:sass build:eleventy"
```

```json
// to start develop
npm run start
```

```json
// to buidl with purgecss
npm run build
```

or you can use any of the provided scripts to run the task you need.
