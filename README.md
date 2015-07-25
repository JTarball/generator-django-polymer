[![NPM version](http://img.shields.io/npm/v/generator-django-polymer.svg?style=flat)](http://npmjs.org/generator-django-polymer)
[![NPM downloads](http://img.shields.io/npm/dm/generator-django-polymer.svg?style=flat)](http://npmjs.org/generator-django-polymer)
[![Build Status](http://img.shields.io/travis/JTarball/generator-django-polymer/master.svg?style=flat)](https://travis-ci.org/JTarball/generator-django-polymer)
[![Dependency Status](http://img.shields.io/david/JTarball/generator-django-polymer.svg?style=flat)](https://david-dm.org/JTarball/generator-django-polymer)

<a href="http://www.djangoproject.com/" ><img src="https://www.djangoproject.com/m/img/badges/djangoproject120x25.gif" border="0" alt="A Django project." title="A Django project." style="float: right;" /></a>

<img src="https://www.polymer-project.org/images/logos/lockup.svg" />
## Yeoman generator for Django Polymer projects

<img src="http://yeoman.io/assets/img/tool-yo.3dcc.png" />

### Introduction to generator-django-polymer

Yeoman generator that scaffolds out a Django project with Polymer.

> This generator extends [generator-polymer](https://github.com/yeoman/generator-polymer) and integrates it with a Django project generator

### Why extend generator-polymer?

Google Polymer is an awesome framework leveraging the new standards of web components however 
it is still a relatively new framework.

As of yet it has even reached version 1.0 likely to change which will have a knock on effect to 
the best standards and practices for Polymer project layouts/scaffolds.

Thus this generator project will periodically integrate new changes from __generator-polymer__
to incorporate the latest changes, methods and best practices

This currently is a better solution than creating a rigid custom layout for a Polymer compatible app which may change.

### How is Django and Polymer integrated in this project?
This is likely to be the more important question when deciding whether to use this generator or not.

Main points:

* The output of **generator-polymer** is kept largerly intact. 
* We symbolic link all polymer elements to Django's static folder.
* Routing is still performed by Django's urls
* Django templating is still used but is minimally required with a project like this compared to a standard Django project. See generated output for example on use.
* Where conflicts exist in templating we use the __verbatim__ django tag.

Thus, we get a project that has all the benefits of a polymer frontend app as well as all the benefits of Django's backend environment including
urls, templating etc. without having to interleave both projects in a complex way.

*in theory, if you decided that Polymer was not for you; removing it without affecting the Django project should be easy.*


### Directory Structure
The settings files are split for better separate of roles:

* __README.md__

> this file

* __app/__

> this is created by __generator-polymer__ Do not move or rename to keep compatible with polymer generator commands

* __bower_components__

> this folder is also created by __generator-polymer__

* __apps/__

> Django apps folder

* __project/__

> Django Project folder

* __tests/__

> Unit tests folder

* __Gulpfile.js | Gruntfile.js | etc. 
...__

> optional files created by *generator-polymer* 

### Considerations / Future
In the future I might consider incorporating ideas from the following projects:

* https://github.com/imkevinxu/django-kevin
* https://github.com/luzfcb/cookiecutter-django-oauth
* https://github.com/pydanny/cookiecutter-django

*e.g. caching, sendGrid email support, heroku, better management*
