# Admin Template

A minimalist admin template, requiring as little manual styling as possible.


## Dev

Needs a Sass compiler installed, I'm using [SassC](https://github.com/sass/libsass/blob/master/docs/build.md).

[Get Bootstrap v4](https://github.com/twbs/bootstrap/archive/v4.0.0-alpha.2.zip) and
extract it to `src/sass`.

[Get Font-Awesome](https://fortawesome.github.io/Font-Awesome/assets/font-awesome-4.5.0.zip) and
extract it to `dist`.

Compile:

    sassc -m src/sass/index.sass dist/admin.css

Serve test files:

    python -m SimpleHTTPServer

Access <http://localhost:8000/src/pages/>.