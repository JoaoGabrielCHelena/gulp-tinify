// through2 is a thin wrapper around node transform streams
var path        = require('path'),
    through     = require('through2-concurrent'),
    gutil       = require('gulp-util'),
    tinify      = require('tinify'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-tinify';

function tinypng(file) {
    var validExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    if(!process.env.TINIFY_KEY) {
        throw new PluginError(PLUGIN_NAME, 'We can\'t upload images without your API Key. Looking for it in an enviroment variable named TINIFY_KEY');
    }
    tinify.key = process.env.TINIFY_KEY;

    return through.obj(async function(file, enc, cb) {
        if(file.isNull()) {
            cb(null, file);
            return;
        }

        if(file.isStream()) {
            cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        if(validExtensions.indexOf(path.extname(file.path)) === -1) {
            gutil.log(PLUGIN_NAME + ': Skipping unsupported image ' + file.path);
            cb(null, file);
            return;
        }

        if (file.contents.length === 0) {
            const errorMessage = 'File is empty: ' + file.path + "\nThis is a unavoidable error when copying or moving files\nThe file will (probably) be converted anyway soon";
            cb(new PluginError(PLUGIN_NAME, errorMessage));
            return;
        }

        const source = tinify.fromFile(file.path)

        const converted = source.convert({ type: ["image/webp", "image/png"] });
        const convertedExtension = await converted.result().extension()
        converted.toBuffer(function(err, resultData) {
            if(!err) {
                gutil.log('Image processed: ' + file.basename + " -> " + gutil.replaceExtension(file.basename, '.' + convertedExtension))
                file.contents = resultData;
                file.path = gutil.replaceExtension(file.path, '.' + convertedExtension);
            }
            cb(null, file);
        })
    });
};
// Exporting the plugin main function
module.exports = tinypng;