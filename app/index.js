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

        function isDockerized(answers) {
            return !answers.forDocker;
        }


        var prompts = [{
            type: 'confirm',
            name: 'forDocker',
            message: 'Do you want to dockerize this generator? (i.e. Are you using Docker?)',
            default: true
        }, {
            when: function(answers) {
                return isDockerized(answers);
            },
            type: 'input',
            name: 'projectName',
            message: 'What is your Django project name?',
            default: folderName
        }, {
            when: function(answers) {
                return isDockerized(answers);
            },
            type: 'input',
            name: 'adminName',
            message: 'What is the admin name?',
            default: 'Your Name'
        }, {
            when: function(answers) {
                return isDockerized(answers);
            },
            type: 'input',
            name: 'adminEmail',
            message: 'What is the admin email?',
            default: 'your_email@domain.com'
        }, {
            when: function(answers) {
                return isDockerized(answers);
            },
            type: 'list',
            name: 'djangoVersion',
            message: 'Which version of Django would you like to use?',
            store: true, // allows you to specify that from now on you want to use the answer as the default value
            choices: ['1.7'],
            default: 0
        }];

        this.prompt(prompts, function(props) {
            this.forDocker = props.forDocker;
            this.projectName = props.projectName;
            this.adminName = props.adminName;
            this.adminEmail = props.adminEmail;
            this.djangoVersion = props.djangoVersion;

            done();
        }.bind(this));
    },

    askForDatabaseInfo: function() {
        var done = this.async();

        function isActive(answers) {
            return answers && answers.databaseEngine && (answers.databaseEngine == 'mysql' || answers.databaseEngine == 'postgresql');
        }

        var prompts = [{
            when: function(answers) {
                return isActive(answers) && !this.forDocker;
            },
            type: 'list',
            name: 'databaseEngine',
            message: 'Which database would you like to use? (postgresql only available at present)',
            choices: [
                //{
                //     value: 'mysql',
                //     name: 'MySQL',
                //}
                //, {
                //   value: 'sqlite3',
                //   name: 'SQLite3'
                //}, 
                {
                   value: 'postgresql',
                   name: 'PostgreSQL'
                }
            ]
        }, {
            when: function(answers) {
                return isActive(answers) && !this.forDocker;
            },
            type: 'input',
            name: 'databaseName',
            message: 'Please enter the database name',
            default: this.projectName
        }, {
            when: function(answers) {
                return isActive(answers) && !this.forDocker;
            },
            type: 'input',
            name: 'databaseUser',
            message: 'Please enter the database user',
            default: 'root'
        }, {
            when: function(answers) {
                return isActive(answers) && !this.forDocker;
            },
            type: 'input',
            name: 'databasePassword',
            message: 'Please enter the database password'
        }, {
            when: function(answers) {
                return isActive(answers) && !this.forDocker;
            },
            type: 'input',
            name: 'databaseHost',
            message: 'Please enter the database host',
            default: 'localhost'
        }, {
            when: function(answers) {
                return isActive(answers) && !this.forDocker;
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

            done();
        }.bind(this));

    },

    app: function() {
        // create secret key
        this.secretKey = require('crypto').randomBytes(Math.ceil(50 * 3 / 4)).toString('base64');
        this.releaseVersion = '0.0.1';

        /***** Dockerfile Support *****/
        // Ok if using docker - we will let docker decide what the default should be 
        // override to environment variables
        if (this.forDocker)
        {
            this.databaseEngine = "postgresql";
            this.adminName = "os.environ.get('ADMIN_NAME')";
            this.adminEmail = "os.environ.get('ADMIN_EMAIL')";
            this.databaseName = "os.environ.get('DB_NAME')";
            this.databaseUser = "os.environ.get('DB_USER')";
            this.databasePassword = "os.environ.get('DB_PASSWORD')";
            this.databaseHost = "os.environ.get('DB_HOST')";
            this.databasePort = "os.environ.get('DB_PORT')";

            logging.DEBUG
            DEV_SETTINGS = <%= django_dev_settings %>
            LOG_LEVEL = <%= django_log_level %> 


        }

        /***** Project folder *****/
        this.fs.copyTpl(this.templatePath('manage.py'), this.destinationPath('manage.py'));
        this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README_backend.md'));

        this.fs.copyTpl(this.templatePath('backend/__init__.py'), this.destinationPath('backend/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/README.md'), this.destinationPath('backend/README.md'));
        this.fs.copyTpl(this.templatePath('backend/urls.py'), this.destinationPath('backend/urls.py'));

        // apps
        this.fs.copyTpl(this.templatePath('backend/apps/'), this.destinationPath('backend/apps/'));

        // settings
        this.fs.copyTpl(this.templatePath('backend/settings/__init__.py'), this.destinationPath('backend/settings/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/settings/README.md'), this.destinationPath('backend/settings/README.md'));
        this.fs.copyTpl(this.templatePath('backend/settings/test.py'), this.destinationPath('backend/settings/test.py'));




        this.fs.copyTpl(this.templatePath('backend/settings/base.py'), this.destinationPath('backend/settings/base.py'), {
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
        this.fs.copyTpl(this.templatePath('backend/settings/dev.py'), this.destinationPath('backend/settings/dev.py'), {
            installed_apps: "'debug_toolbar',\n        'django_nose', # testing - better functionality\n        'django_dynamic_fixture', # testing - fixtures (best test integration with fixtures. (dynamic data generation)\n"
        });

        // static
        //this.fs.copyTpl(this.templatePath('backend/static/'), this.destinationPath(/static/'));

        // templates
        this.fs.copyTpl(this.templatePath('backend/templates/'), this.destinationPath('backend/templates/'));

        // test factories
        this.fs.copyTpl(this.templatePath('backend/test_factories/'), this.destinationPath('backend/test_factories/'));

        // bin
        this.fs.copyTpl(this.templatePath('backend/bin/run.py'), this.destinationPath('backend/bin/run.py'));

        // utils
        this.fs.copyTpl(this.templatePath('backend/utils/__init__.py'), this.destinationPath('backend/utils/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/utils/README.md'), this.destinationPath('backend/utils/README.md'));
        this.fs.copyTpl(this.templatePath('backend/utils/logger.py'), this.destinationPath('backend/utils/logger.py'));
        this.fs.copyTpl(this.templatePath('backend/utils/colours.py'), this.destinationPath('backend/utils/colours.py'));
        this.fs.copyTpl(this.templatePath('backend/utils/messages.py'), this.destinationPath('backend/utils/messages.py'));

        // views
        this.fs.copyTpl(this.templatePath('backend/views/__init__.py'), this.destinationPath('backend/views/__init__.py'));
        this.fs.copyTpl(this.templatePath('backend/views/README.md'), this.destinationPath('backend/views/README.md'));
        this.fs.copyTpl(this.templatePath('backend/views/mixins.py'), this.destinationPath('backend/views/mixins.py'));

        // for logging
        this.fs.copyTpl(this.templatePath('var/log/project.log'), this.destinationPath('var/log/project.log'));        

    },

    // Modify Polymer Generator to make compatible with a Django Project
    DjangoifyPolymerGenerator: function() {
        //this.log(yosay("Making some special modifications to structure..."));
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