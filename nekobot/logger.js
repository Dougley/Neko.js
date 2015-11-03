var Winston		= require("winston");

// ========================================================================
// Logger
// ========================================================================

Winston.emitErrs = true;

exports.ChatLogger = new Winston.Logger({
	transports: [
		new Winston.transports.File({
			handleExceptions: false,
			name: 'file:chat',
			filename: __dirname + '/../logs/chat.log',
			formatter: function(args) { return args.message; },
			level: 'info',
			json: false
		}),
	]
});

exports.Logger = new Winston.Logger({
	colors: {
		verbose: 'cyan',
		debug: 'blue',
		info: 'green',
		warn: 'yellow',
		error: 'red'
	},
	transports: [
		new Winston.transports.DailyRotateFile({
			humanReadableUnhandledException: true,
			handleExceptions: true,
			name: 'file:exceptions',
			filename: __dirname + '/../logs/exceptions',
			datePattern: '-yyyy-MM-dd.json',
			level: 'exception',
			json: true
		}),
		new Winston.transports.DailyRotateFile({
			handleExceptions: false,
			name: 'file:error',
			filename: __dirname + '/../logs/errors',
			datePattern: '-yyyy-MM-dd.log',
			level: 'error',
			json: false
		}),
		new Winston.transports.DailyRotateFile({
			handleExceptions: false,
			name: 'file:console',
			filename: __dirname + '/../logs/console',
			datePattern: '-yyyy-MM-dd.log',
			level: 'verbose',
			json: false
		}),
		new Winston.transports.Console({
			handleExceptions: true,
			level: 'verbose',
			colorize: true,
			json: false
		})
	],
	exitOnError: false
});
