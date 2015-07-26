""" Project Test Settings

    Import base settings - Override settings for testing
    The aim is to keep Test settings as simpler the base settings

"""
from project.settings.base import *


DEBUG = False
TEMPLATE_DEBUG = DEBUG  # above, you idiot!

TIME_ZONE = 'UTC'
LANGUAGE_CODE = 'en-US'
SITE_ID = 1
USE_L10N = False
USE_TZ = False

SECRET_KEY = 'local'

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

#ROOT_URLCONF = 'project.views.tests.urls'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

MIDDLEWARE_CLASSES = [
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATE_CONTEXT_PROCESSORS = [
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.tz',
    'django.core.context_processors.request',
    'django.contrib.messages.context_processors.messages'
]

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
# Override
# INSTALLED_APPS = (
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
#     'django.contrib.sites',
#     'accounts',
#     'blog',
#     'south',
#     'django_nose',
#     'project.views.tests',
#     'search'
# )

PASSWORD_HASHERS = (
    'django.contrib.auth.hashers.MD5PasswordHasher',
)
