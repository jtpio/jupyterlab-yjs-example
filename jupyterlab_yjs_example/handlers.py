import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.serverapp import list_running_servers
from jupyter_server.utils import url_path_join
import tornado

class RouteHandler(APIHandler):
    @tornado.web.authenticated
    def get(self):
        # default to the first server
        server = next(list_running_servers())
        token = server['token']
        self.finish(json.dumps({
            "token": token
        }))


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "jupyterlab-yjs-example", "token")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
