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
All frontend dependencies are place in `bower_components` gathered by [*Bower*](https://github.com/bower/bower).

### Build - distribution version
Distribution version of of current application is created in `build` folder.
 
### Gulp tasks
Gulp tasks has been divided into 3 levels:
 - task config - when it comes to customize tasks to your own project you should first try to do it 
 only with config part. All configuration for all tasks is placed in `gulp.config.js`.
 - task registration (`gulpfile.js`) - on second place when task dependencies needs to be changed or some extra task 
 needs to be registered (from existing ones) - registration part needs to be changed.
 All gulp tasks are registered in `gulpfile.js`.
 - task definition (`gulp`) - on last position when task stream needs to be changed or new feature task needs
 to be created - definition part needs to be extended. Gulp definition is available under `gulp` directory and
 stored factory modules representing specific gulp task. It also consist utils module. 


Every factory module return function with unified list of parameters: task name, task configuration,
list of task dependency. Structure of configuration is different for different task.
 
Available task factories:
 - bump
 Bump the version of your project. Update bower.json and package.json. Available options:
  - `--type=pre` will bump the prerelease version *.*.*-x
  - `--type=patch` or no flag will bump the patch version *.*.x
  - `--type=minor` will bump the minor version *.x.*
  - `--type=major` will bump the major version x.*.*
  - `--version=1.2.3` will bump to a specific version and ignore other flags
 - clean
 - copy
 - images
 - inject
 - lint
 - nodemon
 - optimize
 - styles
 - templatecache
 - test
 - wiredep

### Reports
All reports should be generated to `report` folder. Currently only code coverage report is possible to generate.