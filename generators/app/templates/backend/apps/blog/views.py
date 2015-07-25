'''
    blog.views
    ==========
'''
from django.views import DetailView, ListView

from views.mixins import JSONResponseMixin, PjaxResponseMixin

from blog.models import Post


class PostListView(JSONResponseMixin, PjaxResponseMixin, ListView):
    model = Post

class PostDetailView(JSONResponseMixin, PjaxResponseMixin, DetailView):
    model = Post

