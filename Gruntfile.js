module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      default: {
        src: ['lib']
      }
    },
		ts: {
			compile : {
				tsconfig: true,
        options: {
					fast: 'never'
				}
			}
		},
    mochaTest: {
      surreal: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['clean', 'ts', 'mochaTest']);
};