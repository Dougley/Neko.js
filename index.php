<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Neko.js &ndash; Control Panel</title>

		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css" />
		<link rel='stylesheet' href='//fonts.googleapis.com/css?family=Roboto' type='text/css' />

		<style>
			*:active, *:focus { outline: none !important; }
			html, body { font-family: 'Roboto'; }
			body { background-color: #000000; color: #FFFFFF; display: flex; flex-wrap: wrap; height: calc(100vh - 2rem); margin: 1rem; }
			h1 { color: #0275D8; font-size: 4em; margin-top: 0.5rem; }
			h2 { font-size: 1.5em; }
			strong { color: #0275D8; }
			button { margin-right: 0.5em; padding: 0.25em 0.50em; }
			#actions { margin: 1rem; }
			#logfile { background: none; border: 0.2em solid #0275D8; flex: 1; margin: 1rem; min-height: 33vh; min-width: 50vw; padding: 0.5em; resize: none; }
		</style>
	</head>
	<body>
		<div id="acions">
			<form method="POST">
				<h1>Neko.js Control Panel</h1>
				<h2>Chat log automatically refreshes every 10 seconds.</h2>
				<p>
					<strong>OS</strong> &mdash; <?php echo exec("more /etc/issue.net"); ?><br />
					<strong>Node</strong> &mdash; <?php echo exec("node -v"); ?>
					<strong>NPM</strong> &mdash; <?php echo "v" . exec("npm -v"); ?>
				</p>
				<p>
					<button class="btn btn-primary" name="start">Start</button>
					<button class="btn btn-primary" name="stop">Stop</button>
					<button class="btn btn-primary" name="start">Restart (may not work)</button>
				</p>
				<?php
					if (isset($_POST['start']))		{ echo "<p>" . exec("sudo service nekobot start")	. "</p>"; }
					if (isset($_POST['stop']))		{ echo "<p>" . exec("sudo service nekobot stop")	. "</p>"; }
					if (isset($_POST['restart']))	{ echo "<p>" . exec("sudo service nekobot restart")	. "</p>"; }
				?>
			</form>
		</div>
		<textarea id="logfile" autocomplete="off" readonly></textarea>
	</body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script>
		var logfile = $('#logfile');
		function getLog() {
			$.ajax({
				url: 'logs/chat.log',
				dataType: 'text',
				success: function(text) {
					logfile.text(text);
					logfile.scrollTop(logfile[0].scrollHeight);
					setTimeout(getLog, 10 * 1000);
				}
			});
		}
		getLog();
	</script>
</html>
