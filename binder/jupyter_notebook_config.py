c.ServerProxy.servers = {
    "y-websocket": {
        "command": [
            "HOST=localhost",
            "PORT={port}",
            "npx",
            "-y",
            "y-websocket"
        ],
        "timeout": 120
    }
}
