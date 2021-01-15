import sys

c.ServerProxy.servers = {
    "y-websocket": {
        "command": [
            "HOST=0.0.0.0",
            "PORT=1234",
            f"{sys.prefix}/bin/npx",
            "-y",
            "y-websocket"
        ],
        "timeout": 120
    }
}
