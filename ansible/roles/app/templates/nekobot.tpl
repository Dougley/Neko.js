[Unit]
Description=NekoBot
After=redis-server.service
RequiresMountsFor=/vagrant
ConditionPathIsSymbolicLink=/srv/nekobot

[Service]
Type=forking
Restart=on-failure
RestartSec=10
ExecStart=/usr/bin/forever -a -l "/srv/nekobot/logs/nekobot-forever.log" -e "/srv/nekobot/logs/nekobot-error.log" --minUptime 5000 --spinSleepTime 2000 start "/srv/nekobot/neko.js"
ExecStop=/usr/bin/forever stop "/srv/nekobot/neko.js"

[Install]
WantedBy=multi-user.target
