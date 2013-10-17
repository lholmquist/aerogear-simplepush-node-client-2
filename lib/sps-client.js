var http = require( "http" ),
    https = require( "https" ),
    urlParser = require( "url" ),
    util = require( "util" ),
    events = require( "events" );

function send( serverSettings, message ) {
    var caller = (serverSettings.protocol === "https:") ? https : http,
        that = this,
        req = caller.request( serverSettings, function( res ) {
            if( res.statusCode >= 400 ) {
                that.emit( "error", res.statusCode );
            } else {
                res.setEncoding('utf8');
                res.on( "data", function ( chunk ) {
                    that.emit( "success", chunk );
                });
            }
        });

    req.on( "error", function( error ) {
        console.log( "err" );
        that.emit( "error", "problem with request: " + error.message );
    });
    req.write( message );
    req.end();
}

function createServerSettings( url, settings ) {
    var serverSettings = {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        method: "PUT"
    };
    return serverSettings;
}

var AG_SPS = {};

/**
    @param url - The pushEndpoint
*/

AG_SPS.Sender = function( url ) {
    if ( !( this instanceof  AG_SPS.Sender ) ) {
        return new  AG_SPS.Sender( url );
    }

    events.EventEmitter.call( this );

    this.getUrl = function() {
        return url;
    };
};

util.inherits( AG_SPS.Sender, events.EventEmitter );

module.exports = AG_SPS;

/**
    @param message - a new version number message.  example: "version=2"
*/
AG_SPS.Sender.prototype.send = function( message ) {

    var serverSettings = createServerSettings( urlParser.parse( this.getUrl() ) );

    send.call( this, serverSettings, message );

    return this;
};
