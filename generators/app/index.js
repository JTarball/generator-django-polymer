 /*jshint node:true */
'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var folderName = path.basename(process.cwd());

// Add some methods - normally run in order, but some
// special method names will trigger a specific run order
var DjangoPolymerGenerator = generators.Base.extend({

    polymer: function() {
        this.log('Firing generator polymer...');
        this.composeWith('polymer', {
            options: {
                "skip-install": true
            }
        });
    },

    askForProjectInfo: function() {
        var done = this.async();

        // Have a Yeoman greet the user 
        this.log(yosay("Welcome to the awesome Django Polymer Generator.\nI'm fired up..."));
        this.log("I have a number of questions.. it might take a min or so... but it will be worth it... ");

        var prompts = [{
            type: 'input',
            name: 'projectName',
            message: 'What is your Django project name?',
            default: folderName
        }, {
            type: 'input',
            name: 'adminName',
            message: 'What is the admin name?',
            default: 'Your Name'
        }, {
            type: 'input',
            name: 'adminEmail',
            message: 'What is the admin email?',
            default: 'your_email@domain.com'
        }, {
            type: 'list',
            name: 'djangoVersion',
            message: 'Which version of Django would you like to use?',
            store: true, // allows you to specify that from now on you want to use the answer as the default value
            choices: ['1.7'],
            default: 0
        }];

        this.prompt(prompts, function(props) {
            this.projectName = props.projectName;
            this.adminName = props.adminName;
            this.adminEmail = props.adminEmail;
            this.djangoVersion = props.djangoVersion;

            done();
        }.bind(this));
    },

    askForDatabaseInfo: function() {
        var cb = this.async();

        function isActive(answers) {
            return answers && answers.databaseEngine && (answers.databaseEngine == 'mysql' || answers.databaseEngine == 'postgresql');
        }

        var prompts = [{
            type: 'list',
            name: 'databaseEngine',
            message: 'Which database would you like to use? (mysql only available at present)',
            choices: [{
                    value: 'mysql',
                    name: 'MySQL',
                }
                //, {
                //    value: 'sqlite3',
                //    name: 'SQLite3'
                //}, {
                //    value: 'postgresql',
                //    name: 'PostgreSQL'
                //}
            ]
        }, {
            type: 'input',
            name: 'databaseName',
            message: 'Please enter the database name',
            default: this.projectName
        }, {
            when: function(answers) {
                return isActive(answers);
            },
            type: 'input',
            name: 'databaseUser',
            message: 'Please enter the database user',
            default: 'root'
        }, {
            when: function(answers) {
                return isActive(answers);
            },
            type: 'input',
            name: 'databasePassword',
            message: 'Please enter the database password'
        }, {
            when: function(answers) {
                return isActive(answers);
            },
            type: 'input',
            name: 'databaseHost',
            message: 'Please enter the database host',
            default: 'localhost'
        }, {
            when: function(answers) {
                return isActive(answers);
            },
            type: 'input',
            name: 'databasePort',
            message: 'Please enter the database port',
            default: ''
        }];

        this.prompt(prompts, function(props) {

            this.databaseEngine = props.databaseEngine;
            this.databaseName = props.databaseName;
            if (this.databaseEngine !== 'dbSqlite3') {
                this.databaseUser = props.databaseUser;
                this.databasePassword = props.databasePassword;
                this.databaseHost = props.databaseHost;
                this.databasePort = props.databasePort;
            }

            cb();
        }.bind(this));

    },

    app: function() {
        // create secret key
        this.secretKey = require('crypto').randomBytes(Math.ceil(50 * 3 / 4)).toString('base64');
        this.releaseVersion = '0.0.1';

        /***** Project folder *****/
        // settings
        this.fs.copyTpl(this.templatePath('backend/settings/__init__.py'), this.destinationPath('project/settings/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/settings/README.md'), this.destinationPath('project/settings/README.md'));
        this.fs.copyTpl(this.templatePath('backend/settings/test.py'), this.destinationPath('project/settings/test.py'));
        this.fs.copyTpl(this.templatePath('backend/settings/base.py'), this.destinationPath('project/settings/base.py'), {
            generator_version: this.releaseVersion,
            secret_key: this.secretKey,
            admin_name: this.adminName,
            admin_email: this.adminEmail,
            db_engine: this.databaseEngine,
            db_name: this.databaseName,
            db_user: this.databaseUser,
            db_password: this.databasePassword,
            db_host: this.databaseHost,
            db_port: this.databasePort
        });
        this.fs.copyTpl(this.templatePath('backend/settings/dev.py'), this.destinationPath('project/settings/dev.py'), {
            installed_apps: "'debug_toolbar',\n        'django_nose', # testing - better functionality\n        'django_dynamic_fixture', # testing - fixtures (best test integration with fixtures. (dynamic data generation)\n"
        });

        // static
        this.fs.copyTpl(this.templatePath('backend/static/'), this.destinationPath('project/static/'));

        // templates
        this.fs.copyTpl(this.templatePath('backend/templates/'), this.destinationPath('project/templates/'));

        // bin
        this.fs.copyTpl(this.templatePath('backend/bin/run.py'), this.destinationPath('project/bin/run.py'));

        // utils
        this.fs.copyTpl(this.templatePath('backend/utils/__init__.py'), this.destinationPath('project/utils/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/utils/README.md'), this.destinationPath('project/utils/README.md'));
        this.fs.copyTpl(this.templatePath('backend/utils/logger.py'), this.destinationPath('project/utils/logger.py'));
        this.fs.copyTpl(this.templatePath('backend/utils/colours.py'), this.destinationPath('project/utils/colours.py'));
        this.fs.copyTpl(this.templatePath('backend/utils/messages.py'), this.destinationPath('project/utils/messages.py'));

        // views
        this.fs.copyTpl(this.templatePath('backend/views/__init__.py'), this.destinationPath('project/views/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/views/README.md'), this.destinationPath('project/views/README.md'));
        this.fs.copyTpl(this.templatePath('backend/views/mixins.py'), this.destinationPath('project/views/mixins.py'));

    },

    // Modify Polymer Generator to make compatible with a Django Project
    DjangoifyPolymerGenerator: function() {
        // move bower_components
        //this.fs.move(
        //  this.templatePath('bower_components'),
        //  this.destinationPath('projects/static/bower_components')
        //);
    },

    // Finally,
    end: function() {
        //if (!this.options['skip-install']) {
        //this.installDependencies();
        //}
        this.log(yosay("Excellent! You are ready for action!"));
    }
});


module.exports = DjangoPolymerGenerator