var path = require('path'),
    _ = require('lodash'),
    gp = require('gulp-load-plugins')({lazy: true}),
    del = require('del');

module.exports = {
    /**
     * Shows gulp logs
     * @param msg
     */
    log: function log(msg) {
        var item;
        if(typeof msg === 'object') {
            for(item in msg) {
                if(msg.hasOwnProperty(item)) {
                    gp.util.log(gp.util.colors.blue(msg[item]));
                }
            }
        }
        else {
            gp.util.log(gp.util.colors.blue(msg));
        }
    },
    /**
     * Delete file from path
     * @param path
     * @param done
     */
    clean: function clean(path, done) {
        this.log('Cleaning: ' + path);
        return del(path, {
            force: true
        });
    },
    /**
     * Show notification in system
     * @param options Possible options: title, subtitle, message
     */
    notify: function notify(options) {
        var notifier = require('node-notifier'),
            notifyOptions = {
                sound: 'Bottle',
                contentImage: path.join(__dirname, '..', 'gulp.png'),
                icon: path.join(__dirname, '..', 'gulp.png')
            };
        _.assign(notifyOptions, options);
        notifier.notify(notifyOptions);
    }
};