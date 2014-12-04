var browserify = require("browserify");
var gulp = require("gulp");
var nodemon = require("nodemon");
var source = require("vinyl-source-stream");
var watchify = require("watchify");


function getBundleFunction(watcher, directory, file){
	return function(){
		watcher
			.bundle()
			.pipe(source(file))
			.pipe(gulp.dest(directory))		
	}	
}

gulp.task("watch", function(){

	var bundler = browserify(watchify.args)
	bundler.add("./public/scripts/app.js")

	var watcher = watchify(bundler),
		bundle = getBundleFunction(watcher, "./public/scripts", "bundle.js")
	watcher.on("update", bundle);
	bundle();

});

gulp.task("develop", function(){
	nodemon({
		ignore: ["public/*"],
		script: "./server.js"
	});
});


gulp.task("default", ["watch", "develop"])