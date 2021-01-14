c.ServerProxy.servers = {
    "y-websocket": {
        "command": [
            "HOST=localhost",
            "PORT={port}",
            "npx",
            "y-websocket-server"
        ],
        "timeout": 120
    }
}
