# gulp-boilerplate

#### Boilerplate project with gulp environment

---

Gulp boilerplate is core project structure based on Node.js dev environment. It provide ready to use set of tools
created by [*Gulp*](https://github.com/gulpjs/gulp).
Given tools helps developing client (HTML, CSS, JS, Angular) and server (Node.js) as well.

---

## Documentation

Project is design to cover frontend and backend (Node.js) development at once. Project has granulated structure
that divide different functionality under different directories.

### Frontend
All frontend source files are placed in `/src/client`.
Client folder consists of:
 - `index.html` html that will bootstrap application prepare to inject all frontend dependencies (JS & CSS).
 - `scripts` all angular js source files and angular templates. All templates needs to be created with `.tpl.html`
 - `styles` all styles defined in [*LESS*](https://github.com/less)
 - `images` all application images

### Backend
All backend source files are placed in `/src/server`.
Server folder consists of:
 - `app` basic node.js server providing static frontend files

### Client unit tests
Unit tests are running with usage of [*Jasmine*](https://github.com/jasmine/jasmine) and
[*Karma*](https://github.com/karma-runner/karma).
Default Karma configuration file is available in `karma.conf.js`.
All frontend unit test files are placed in `tests/client`. This folder consist of:
 - `scripts` folder that is dedicated for testing each module created in `/src/client/scripts`. It is suggested to have
 the same file structure in unit test folder as in source folder.
 - `server-integration` unit test for testing integration between client and server.
 - `test-helpers` helper methods and fixtures needed for unit tests

### Frontend dependencies
 ...
### Build - distribution version
 ...
 
### Gulp tasks
 ...

### Reports
 ...