from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

###############################################################################################################
## APP Url Imports
##############################################################################################################
from search import urls as urls_search
from blog import urls as urls_blog
from blog.views import PostEditView
from accounts import urls as urls_accounts
#from content import urls as urls_content
#from users import urls as urls_users
#from .views_proj import *

urlpatterns = patterns('', 
    #url(r'^home/', include(urls_content, namespace="content")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^search/', include(urls_search, namespace="search")),
    url(r'^blog', include(urls_blog, namespace="blog")),
    url(r'^preview', PostEditView.as_view(), name="preview"),
    url(r'^polymer/home/polymer/language/polymer-result', TemplateView.as_view(template_name="index4.html")),
    url(r'^polymer_test', TemplateView.as_view(template_name="index5.html")),
    url(r'^polymer_list', TemplateView.as_view(template_name="index6.html")),
    url(r'^personal', TemplateView.as_view(template_name="index7.html")),
    #url(r'^@j/', include(urls_content, namespace="content")),
    #(r'^grappelli/', include('grappelli.urls')),
    # ==================================== #
    # User Profile & Registration
    # ==================================== #
    #(r'^users/profile/', include(urls_users)),
    url(r'^accounts/', include(urls_accounts, namespace="accounts")),
    #url(r'^regression/', include(urls_regression, namespace="regression"))
)


# ==================================== #
# Static Pages for Dev Only
# ==================================== #
# if DEBUG (This is implicit)  i.e. DEBUG must be set to TRUE

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns += staticfiles_urlpatterns()

# ==================================== #
# Other Pages
# ==================================== #
# 404  - defaults to 404.html
# 500  - defaults to 500.html
# 403
#handler404 = 'project.views.home'
