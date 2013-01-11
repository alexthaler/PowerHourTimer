require 'yaml'
require 'fileutils'
require 'rake/clean'

@deploy_dir = ""

CLEAN.include('build')

task :clean => [:detect_deploy_dir]

task :detect_deploy_dir do
	yml = YAML::load(File.open('_build.yml'))
	@deploy_dir = yml['macosx_deploy_dir'] if Dir.exists?(yml['macosx_deploy_dir'])
	@deploy_dir = yml['local_deploy_dir'] if Dir.exists?(yml['local_deploy_dir'])
	puts "Deploy directory #{@deploy_dir}"
end

task :clean_deploy => [:detect_deploy_dir] do
	FileUtils.rm_rf(@deploy_dir)
	FileUtils.mkdir_p(@deploy_dir)
end

task :deploy => [:build,:clean_deploy] do 
	yml = YAML::load(File.open('_build.yml'))
	puts "deploying to #{@deploy_dir}"
	FileUtils.rm_rf(@deploy_dir)
	FileUtils.mkdir_p(@deploy_dir)
	files = FileList.new().include('build/*')
	cp_r files, @deploy_dir
end

task :build do
	puts "Moving files to build directory"
	build_dir = './build'
	mkdir './build' unless File.directory? './build'

	files = FileList.new()
	files.include("css")
	files.include("img")
	files.include("js")
	files.include("sounds")
	files.include("html/*.*")
	
	cp_r files, build_dir
end
