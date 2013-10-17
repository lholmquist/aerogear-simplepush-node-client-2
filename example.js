var sps = require( "./lib/sps-client" );

var url = "http://localhost:7777/update/MeyCk9QKRP4axrJbseCmwo1yXAzFrnbu_sMO0yaaR3pK9j267FcMkWiaivUBGoA0t7o_GsPCDUKpaA2MF6Md8_Suhq45rWxLSeX13xPAID1YN46euowCqdE1g6ytIj4u";

sps.Sender( url ).send( "version=2" ).on( "success", function( response ) { console.log( "successs", response ); } ).on( "error", function( err ) {  console.log( err, "error" ); } );
