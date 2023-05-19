import json

from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def format_http_prefix(is_secure: bool)-> str:
    """Format the base url prefix and return it.

    Args:
        is_secure(bool): if the server is using the
        secure part of the http method or not

    Returns:
        str: http web protocol with security (https)
        or not (http)
    """
    if(is_secure):
        return "https://"
    else:
        return "http://"


def user_managment_root_view(request:WSGIRequest):
    """Display in a JSON Web View a list of every
    routes used here.

    Args:
        request (WSGIRequest): request sent by the user

    Returns:
        HttpResponse: Response sent by the server to the
        browser
    """
    base_url = format_http_prefix(request.is_secure())+\
               request.get_host()+\
               "/api/v1/user/"
    
    urls_index_array = {
        'register':base_url+"register",
        'auth':base_url+"auth",
        'refresh_token':base_url+"auth/refresh"
    }
    return HttpResponse(
        json.dumps(
            urls_index_array
        ),
        content_type="application/json"
    )