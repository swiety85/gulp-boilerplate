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
 - `index.html` - html that will bootstrap application prepare to inject all frontend dependencies (JS & CSS).
 - `scripts` - all angular js source files and angular templates. All templates needs to be created with `.tpl.html`
 - `styles` - all styles defined in [*LESS*](https://github.com/less)
 - `images` - all application images

### Backend
All backend source files are placed in `/src/server`.
Server folder consists of:
 - `app` basic node.js server providing static frontend files

### Client unit tests
Unit tests are running with usage of [*Jasmine*](https://github.com/jasmine/jasmine) and
[*Karma*](https://github.com/karma-runner/karma).
Default Karma configuration file is available in `karma.conf.js`.
All frontend unit test files are placed in `tests/client`. This folder consist of:
 - `scripts` - folder that is dedicated for testing each module created in `/src/client/scripts`. It is suggested to have
 the same file structure in unit test folder as in source folder.
 - `server-integration` - unit test for testing integration between client and server.
 - `test-helpers` - helper methods and fixtures needed for unit tests

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
 - `bump` - Bump the version of your project. Update bower.json and package.json.
 Task configuration:
  - `src` - paths to bower.json and package.json file
 Command options:
  - `--type=pre` will bump the prerelease version *.*.*-x
  - `--type=patch` or no flag will bump the patch version *.*.x
  - `--type=minor` will bump the minor version *.x.*
  - `--type=major` will bump the major version x.*.*
  - `--version=1.2.3` will bump to a specific version and ignore other flags
 - `clean` - removes given directory.
 Task configuration:
  - `src` - path to directory to remove
 - `copy` - copy one directory to another.
  Task configuration:
   - `src` - path to directory to copy
   - `dest` - path to directory that will store copied directory
 - `images` - optimize and copy files to directory given by config
 Task configuration:
  - `src` - path to image files that needs to be optimize and moved
  - `dest` - path to directory that will save optimized image files
  - `optimizationLevel` - (default=4) optimization level (gulp-imagemin)
 - `inject` - connects JS and CSS files to html file. It use [*gulp-inject*](https://github.com/klei/gulp-inject)
 Task configuration:
  - `src` - path to JS/CSS files that needs to be injected to html file
  - `index` - path to index.html file or other html file
 - `lint`- run jshint against your source code. It use [gulp-jshint](https://github.com/spalger/gulp-jshint).
 It generates clean and readable console report about validation results. 
  Task configuration:
   - `src` - path to files that will be validated by jshint
  Command options:
    - `--verbose` - extends report about each step of the task e.g. lists all files that has been validated
 - `nodemon` - monitor for any changes in your server application and automatically restart the server.
 It also watches client changes to reload browser. It can be run in dev and prod mode.
 It use: [gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon) and [browserSync](http://www.browsersync.io/).
 Task configuration:
  - `server` - path to main node server file
  - `restartTasks` - list of task names to be executed on every server restart
  - `port` - port under which server is running
  - `idDev` - (default=true)
 - `optimize` - optimize js and css files by concatenating and minifying and connects them (with cached angular
 templates) to index.html.
  Task configuration:
   - `index` - path to index.html file or other html file
   - `templateCache` - path to angular service that handle cached templates
   - `build` - application build directory 
 - `styles`
 - `templatecache`
 - `test`
 - `wiredep`

### Reports
All reports should be generated to `report` folder. Currently only code coverage report is possible to generate.