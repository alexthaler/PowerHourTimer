var  JAKE = require("jake");

//default MacOS X webserver directory
var localWebServHome = '/Library/WebServer/Documents/',
    webSrcDir = 'html/',
    buildDir = 'build/',
    deployContentDirs = ['css','img','js','sounds'],
    cleanDirs = [buildDir, localWebServHome]

desc('clean task: deletes specified cleanDirs')
task('clean', function(){
    console.log('cleaning directories ' + cleanDirs)
    cleanDirs.forEach(function(item) {
        jake.rmRf(item);
    });
});

task('build', ['clean'], function(){
    jake.mkdirP(buildDir);
    deployContentDirs.forEach(function(item) {
        jake.cpR(item, buildDir);
        jake.exec('cp -r ' + webSrcDir + ' ' + buildDir);
    });
});

task('ld', ['localDeploy'], function(){
    
});

task('localDeploy', ['clean', 'build'], function(){
    jake.mkdirP(localWebServHome);
    jake.exec('cp -r ' + buildDir + '* ' + localWebServHome)
});