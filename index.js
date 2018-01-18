const https = require('https');

// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var languageStrings = {
    'en': {
        'translation': {
            'WELCOME' : "Hi, I'm Lulu. Try asking for a status update.",
            'TITLE'   : "Lulu: ",
            'HELP'    : "Try asking for a status update.",
            'STOP'    : "Okay, see you next time!"
        }
    }
};

var bgImgURLs = { //they are all 1024x600
    "Paris" : "http://i.imgur.com/ox8c5vX.png", //darker
    "Berlin" : "http://i.imgur.com/mjL3pls.png", //darker
    "LosAngeles" : "http://i.imgur.com/OM3nDXf.png", //darker
    "Moscow" : "http://i.imgur.com/foYjIeZ.png", //darker
    "Geneva": "http://i.imgur.com/ro4uWog.png", //darker
    "Rome" : "http://i.imgur.com/ihhnRSS.png", //darker
    "Seoul" : "http://i.imgur.com/lyrRz6N.png", //darker 
    "Tokyo" : "http://i.imgur.com/qaqaJMa.png", //darker
    "SanFrancisco" : "http://i.imgur.com/W0QNswQ.png", //darker
    "MexicoCity" : "http://i.imgur.com/pLjIkBx.png", //darker
    "WashingtonDC" : "http://i.imgur.com/X5PUNQ2.png", //darker
    "Dallas" : "http://i.imgur.com/UWMfFui.png", //darker
    "Boston" : "http://i.imgur.com/9HfAgm0.png", //darker
    "MIA" : "http://i.imgur.com/yUYae4K.png", //darker
    "FLL" : "http://i.imgur.com/bZ4axh9.png" //darker
};


var data = {
      "travelers" : //alphabetically ordered by last name
        [   
            {
                "nameFirst": "Jeff",  
                "nameLast": "Davis",
                "pronoun" : "he",
                "vipStatus": false,
                "currentLocationCity": "Mexico City", 
                "currentLocationCountry": "Mexico", 
                "currentLocationPhoto": bgImgURLs["MexicoCity"], //to be the bg image in profile view intent
                "departureAirport": "MEX",       //BOS>FLL>MVD
                "connectingAirport": "FLL",
                "destinationAirport": "MVD", 
                "photo340x340": "https://i.imgur.com/op2LasA.png", 
                "photo280x280": "https://i.imgur.com/XQ3rbW9.png",
                "photo88x88": "https://i.imgur.com/imVyGP8.png"
            },
            {
                "nameFirst": "Tim",  
                "nameLast": "Haynes",
                "pronoun" : "he",
                "vipStatus": false,
                "currentLocationCity": "Washington D.C.", 
                "currentLocationCountry": "USA", 
                "currentLocationPhoto": bgImgURLs["WashingtonDC"],
                "departureAirport": "BWI",       //BWI>FLL>MEX
                "connectingAirport": "FLL",
                "destinationAirport": "MEX", 
                "photo340x340": "http://i.imgur.com/P5CMmZa.png", 
                "photo280x280": "http://i.imgur.com/SGB209r.png", 
                "photo88x88": "http://i.imgur.com/buUAwc9.png"
            },
            {
                "nameFirst": "Hannah",  
                "nameLast": "Howell",
                "pronoun" : "she",
                "vipStatus": false,
                "currentLocationCity": "Dallas", 
                "currentLocationCountry": "USA",
                "currentLocationPhoto": bgImgURLs["Dallas"],
                "departureAirport": "DFW",       
                "connectingAirport": "DFW",
                "destinationAirport": "DFW", 
                "photo340x340": "https://i.imgur.com/TSCaSN8.png", 
                "photo280x280": "https://i.imgur.com/a3VwNZj.png", 
                "photo88x88": "https://i.imgur.com/ss50hwS.png"
            },
            {
                "nameFirst": "Philip",  
                "nameLast": "Likens",
                "pronoun" : "he",
                "vipStatus": true,
                "currentLocationCity": "Boston", 
                "currentLocationCountry": "USA",
                "currentLocationPhoto": bgImgURLs["Boston"],
                "departureAirport": "BOS",      //BOS>FLL>MVD
                "connectingAirport": "FLL", 
                "destinationAirport": "MVD",
                "photo340x340": "http://i.imgur.com/8N93yXC.png", 
                "photo280x280": "http://i.imgur.com/VuASu28.png", 
                "photo88x88": "http://i.imgur.com/ImBJqOu.png"
            },
            {
                "nameFirst": "Mark",  
                "nameLast": "McSpadden",
                "pronoun" : "he",
                "vipStatus": true,
                "currentLocationCity": "Mexico City", 
                "currentLocationCountry": "Mexico", 
                "currentLocationPhoto": bgImgURLs["MexicoCity"],
                "departureAirport": "MEX",      //MEX>MIA>LGA
                "connectingAirport": "MIA", 
                "destinationAirport": "LGA",
                "photo340x340": "http://i.imgur.com/nK6QvYB.png", 
                "photo280x280": "http://i.imgur.com/YCv25ua.png", 
                "photo88x88": "http://i.imgur.com/lR2wn4p.png"
            },
            {
                "nameFirst": "Sean",
                "nameLast": "Menke",
                "pronoun" : "he",
                "vipStatus": true,
                "currentLocationCity": "San Francisco", 
                "currentLocationCountry": "USA", 
                "currentLocationPhoto": bgImgURLs["SanFrancisco"],
                "departureAirport": "SFO",      //SFO>DEN>DFW
                "connectingAirport": "DEN",
                "destinationAirport": "DFW",
                "profileImgCard": { //TODO: image sizes needs to be card-appropriate
                    "smallImageUrl": "https://i.imgur.com/y9kbigf.png",
                    "largeImageUrl": "https://i.imgur.com/V4w7d4S.png"
                },
                "photo340x340": "http://i.imgur.com/y9kbigf.png", 
                "photo280x280": "http://i.imgur.com/V4w7d4S.png", 
                "photo88x88": "http://i.imgur.com/XitPmJA.png"
            },
            {
                "nameFirst": "John",  
                "nameLast": "Samuel",
                "pronoun" : "he",
                "vipStatus": true,
                "currentLocationCity": "Mexico City", 
                "currentLocationCountry": "Mexico", 
                "currentLocationPhoto": bgImgURLs["MexicoCity"],
                "departureAirport": "MEX",      //MEX>FLL>JFK
                "connectingAirport": "FLL",
                "destinationAirport": "JFK",
                "photo340x340": "http://i.imgur.com/tYKN8MM.png", 
                "photo280x280": "http://i.imgur.com/TLmDI3N.png",
                "photo88x88": "http://i.imgur.com/h1Tv3Ym.png"
            },
            {
                "nameFirst": "Jinny",  
                "nameLast": "Seo",
                "pronoun" : "she",
                "vipStatus": false,
                "currentLocationCity": "Boston", 
                "currentLocationCountry": "USA", 
                "currentLocationPhoto": bgImgURLs["Boston"],
                "departureAirport": "BOS",       //BOS>FLL>MVD
                "connectingAirport": "FLL",
                "destinationAirport": "MVD", 
                "photo340x340": "http://i.imgur.com/YnHzD4y.png", 
                "photo280x280": "http://i.imgur.com/77folx9.png", 
                "photo88x88": "http://i.imgur.com/rqlQAJV.png"
            },
            {
                "nameFirst": "Maegan",  
                "nameLast": "Snee",
                "pronoun" : "she",
                "vipStatus": false,
                "currentLocationCity": "Mexico City", 
                "currentLocationCountry": "Mexico", 
                "currentLocationPhoto": bgImgURLs["MexicoCity"],
                "departureAirport": "MEX",  //MEX>MIA>DFW
                "connectingAirport": "MIA",
                "destinationAirport": "DFW",
                "photo340x340": "http://i.imgur.com/oI0LWd6.png", 
                "photo280x280": "http://i.imgur.com/LwJdoCi.png", 
                "photo88x88": "http://i.imgur.com/wP1Ri9t.png"
            }
        ]
};

// 2. Skill Code =======================================================================================================

var Options = {
    host: 'lulu.sabrelabs.codes',
    path: '/lulu/webhook',
    port: '443',
    method: 'POST',
    headers: {
        'User-Agent':'Custom-Lulu-Webhook'
    }
}

var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');  // this is defined to enable a DynamoDB connection from local testing
var AWSregion = 'us-east-1';   // eu-west-1
AWS.config.update({
    region: AWSregion
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
   // alexa.dynamoDBTableName = 'RecipeSkillTable'; // creates new table for session.attributes

    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        console.log("launchrequest intent")
        var say = this.t('WELCOME') + ' ' + this.t('HELP');
        this.emit(':askWithCard', say, say, this.t('TITLE')  + "Welcome", this.t('WELCOME'));
    },
    
    'Unhandled': function () {
        console.log("unhandled intent");
        this.emit(':ask', this.t('HELP'), this.t('HELP'));
        console.log("unhandled intent")
    },
    
    //'AMAZON.YesIntent': function (shouldEndSession, response) { var speechOutput = "Goodbye"; response.tell(speechOutput); },
    
    'FilterByConnectingAirportIntent': function() {
        var speechOutput = "";
        var airportValue = this.event.request.intent.slots["Airport"].value;
        
        //saving original dateValue so we can use it when you ask "how about Miami" on the second pass of filterByConnectingAirportIntent
        if (this.event.request.intent.slots["Date"].value) {
            var dateValue = this.event.request.intent.slots["Date"].value; 
        } else {
        //default to saying tomorrow when dateValue is unspecified
            dateValue = "tomorrow";
        }
        
        var connectingAirport = ""; //will resolve into the corresponding airport IATA code
        var connectingAirportFullName = ""; //full name of connectingAirport  
        var connectingAirportPhoto = "";

        // Why won't synonyms work??? doing it manually here...
        if (airportValue === "mia" || 
            airportValue === "m.i.a" || 
            airportValue === "am i a" ||
            airportValue === "Mia" || 
            airportValue === "MIA" ||
            airportValue === "Miami" ||
            airportValue === "Miami international airport" ||
            airportValue === "Miami international") {

            connectingAirport = "MIA";
            connectingAirportFullName = "Miami International Airport";
            connectingAirportPhoto = bgImgURLs["MIA"];
        }
        else if (airportValue === "fll" || 
            airportValue === "f.l.l" || 
            airportValue === "FLL" ||
            airportValue === "Fort Lauderdale" ||
            airportValue === "Fort Lauderdale airport" ||
            airportValue === "Fort Lauderdale international" ||
            airportValue === "Fort Lauderdale Hollywood" ||
            airportValue === "Fort Lauderdale Hollywood international airport") {

            connectingAirport = "FLL";
            connectingAirportFullName = "Fort Lauderdale Hollywood International Airport";
            connectingAirportPhoto = bgImgURLs["FLL"];
        }
        
        //-----------building items to pass through display directive----------//
        var travelersConnectingNamesList = []; //holds names of travelers connecting in airportValue to use in sayArray during speechOutput
        var travelersConnectingListOutput = []; //for display directives list items

        for (var i = 0; i < data.travelers.length; i++) {
            
            //finding travelers connecting through slots["Airport"]
            var item = data.travelers[i];
            if (connectingAirport === data.travelers[i].connectingAirport) {

                //this list will be used for speechOutput
                travelersConnectingNamesList.push(data.travelers[i].nameFirst + " " + data.travelers[i].nameLast);
                
                //to be used in tertiary text of display directive 
                var isVIP = "";     
                if (item.vipStatus) {
                    isVIP = "VIP";
                }
            
                //this list will be passed through "listItems" in display directive
                travelersConnectingListOutput.push({
                    "token": item.nameFirst,
                    "image": {
                        "sources": [{"url": item.photo88x88}],
                        contentDescription: "Profile photo - 88x88"
                    },
                    "textContent": {
                        "primaryText": {
                            "text": item.nameFirst + " " + item.nameLast,
                            "type": "PlainText",
                            },
                        "secondaryText": {
                            "text": "Currently in " + item.currentLocationCity,
                            "type": "PlainText"
                        },
                        "tertiaryText": {
                            "text": isVIP,
                            "type": "PlainText"
                        }
                    }
                });
            }
        }
        
        //final speechOutput to be used in both speech, display directive and card
        speechOutput += sayArray(travelersConnectingNamesList,'and') + " is connecting through " + connectingAirportFullName + " " + dateValue + ".";
        
        //To be used in display directive to manage sessions; 
        var askOrTell = ":ask"; //if you ask "who's connecting through FLL," Echo Show keeps session open & continues to listen,
        var askOrTellCard = ':askWithCard'; //same thing for when there is only a card output
        if (connectingAirport === "MIA") {
            askOrTell = ":tell"; //then you come in with "How about Miami" and it closes session. 
            askOrTellCard = ':tellWithCard'; //same thing for when there is only a cardOutput
        }
        
//------------FilterByConnectingAirportIntent display directive for the Echo Show--------------//
        // //check to see if the device we're working with supports display directives
        // //enable the simulator if you're testing
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));
          var content = {
             "hasDisplaySpeechOutput" : speechOutput,
             "hasDisplayRepromptText" : "Anything else?",
             "simpleCardTitle" : this.t('TITLE')  + "Travelers connecting through " + connectingAirport + " " + dateValue,
             "simpleCardContent" : speechOutput,
             "listItems" : travelersConnectingListOutput,
             "listTemplateTitle" : this.t('TITLE')  + "Travelers connecting through " + connectingAirport + " " + dateValue,
             "backgroundImageContent" : {
                 "contentDescription": "Textured grey background",
                 "sources": [
                     {
                         "url": connectingAirportPhoto
                     }
                  ]
             },
             "templateToken" : "TravelersListView", //this determines through which template to pass the content. (switch statement at the bottom of this code )
             "askOrTell" : askOrTell,
             "sessionAttributes": {}
          };
          renderTemplate.call(this, content);
        } else {
        // Use a card if the device doesn't support a display.
        this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "Travelers connecting through " + connectingAirport + " " + dateValue, speechOutput, "Anything else?");
        }
    },
    
    'CountryUpdateIntent': function() {
        
        var travelersInCountryList = []; //holds traveler objects in country
        var travelersListOutput = []; //to pass through display directive
        var content = {};

        for (var i = 0; i < data.travelers.length; i++) {
            var item = data.travelers[i];
            
            //getting everyone in {country}
            if (this.event.request.intent.slots.Country.value === data.travelers[i].currentLocationCountry) {
                
                //VIP status to be used in tertiary text of display directive 
                var isVIP = ""; 
                if (item.vipStatus) {
                    isVIP = "VIP";
                }
                
                //this list will be used for speechOutput
                travelersInCountryList.push(data.travelers[i].nameFirst + " " + data.travelers[i].nameLast);
                
                //this list will be used for display directive below
                travelersListOutput.push({
                    "token": item.nameFirst,
                    "image": {
                        "sources": [{"url": item.photo88x88}],
                        contentDescription: "Profile photo - 88x88"
                    },
                    "textContent": {
                        "primaryText": {
                            "text": item.nameFirst + " " + item.nameLast,
                            "type": "PlainText",
                            },
                        "secondaryText": {
                            "text": "Currently in " + item.currentLocationCity,
                            "type": "PlainText"
                        },
                        "tertiaryText": {
                            "text": isVIP,
                            "type": "PlainText"
                        }
                    }
                });
            }
        }

//------------CountryUpdateIntent display directive for the Echo Show--------------//
        // if there is no one in country return a body template
        if (travelersInCountryList.length === 0) {         
            console.log("there's no one here");
            speechOutput = "There are no travelers in " + this.event.request.intent.slots.Country.value + " currently.";
            //check to see if the device we're working with supports display directives
            //enable the simulator if you're testing
            if(supportsDisplay.call(this)||isSimulator.call(this)) {
              console.log("has display:"+ supportsDisplay.call(this));
              console.log("is simulator:"+isSimulator.call(this));
              content = {
                 "hasDisplaySpeechOutput" : speechOutput,
                 "hasDisplayRepromptText" : "Try asking for people in Mexico.",
                 "simpleCardTitle" : this.t('TITLE')  + "Travelers in " + this.event.request.intent.slots.Country.value,
                 "simpleCardContent" : speechOutput,
                 "bodyTemplateTitle" : this.t('TITLE')  + "Travelers in " + this.event.request.intent.slots.Country.value,
                 "bodyTemplateContent" : speechOutput,
                 "templateToken" : "BodyTemplate6", //this determines through which template to pass the content. (switch statement at the bottom of this code )
                 "backgroundImageContent": {
                     "contentDescription": "Background",
                     "sources": [
                         {
                             "url": bgImgURLs["Berlin"]
                         }
                      ]
                 },
                 "hintDirective" : "ask Lulu for travelers in Mexico right now",
                 "askOrTell" : ":tell",
                 "sessionAttributes": {}
              };
              renderTemplate.call(this, content);
            
            // Just use a card if the device doesn't support a card.
            } else { 
                this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "Travelers in " + this.event.request.intent.slots.Country.value, speechOutput);
            }
            
        }
        
        // if there are travelers in slots["Country"] return a list
        else {

            speechOutput = "You have " + travelersInCountryList.length + " travelers in " + this.event.request.intent.slots.Country.value + " right now. They are: " + sayArray(travelersInCountryList,'and') + ".";
            
            // //check to see if the device we're working with supports display directives
            // //enable the simulator if you're testing
            if(supportsDisplay.call(this)||isSimulator.call(this)) {
              console.log("has display:"+ supportsDisplay.call(this));
              //console.log("is simulator:"+isSimulator.call(this));
              content = {
                 "hasDisplaySpeechOutput" : speechOutput,
                 "hasDisplayRepromptText" : "Try asking where your VIPs are.",
                 "simpleCardTitle" : this.t('TITLE')  + "Travelers in " + this.event.request.intent.slots.Country.value,
                 "simpleCardContent" : speechOutput,
                 "listItems" : travelersListOutput,
                 "listTemplateTitle" : this.t('TITLE')  + "Travelers in " + this.event.request.intent.slots.Country.value,
                      "backgroundImageContent" : {
                         "contentDescription": "Textured grey background",
                         "sources": [
                             {
                                 "url": bgImgURLs["MexicoCity"]
                             }
                          ]
                     },
                 "templateToken" : "TravelersListView", //this determines through which template to pass the content. (switch statement at the bottom of this code )
                 "askOrTell" : ":tell",
                 "sessionAttributes": {}
              };
              console.log(content);
              renderTemplate.call(this, content);
            } else {
            // Just use a card if the device doesn't support a card.
            this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "Travelers in " + this.event.request.intent.slots.Country.value, speechOutput);
            }
        }
    },
    
    
    "ElementSelected" : function() {
      console.log("ELEMENT HAS BEEN SELECTED");
      //console.log(JSON.stringify(arguments));
      console.log("TRYING TO GET REQUEST");
      console.log(this.event.request);
      console.log("PRINTING OUT TOKEN");
      console.log(this.event.request.token);
      if(this.event.request.token === "checkin") {
        console.log("SEND TEXT");
        this.emitWithState("SendCheckinIntent", "Mark", "McSpadden");
      } else {
        console.log("GO TO PROFILE");
        this.emitWithState("ProfileIntent", this.event.request.token);
      }
    },
    
    "SendCheckinIntent": function (first, last) {
       var traveler = first + " " + last; 
       console.log(data.travelers);
       var speechOutput = "Sending check in request to " + traveler + ".";
       
       //check to see if the device we're working with supports display directives
        //enable the simulator if you're testing
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));
          var content = {
             "hasDisplaySpeechOutput" : speechOutput,
             "hasDisplayRepromptText" : "Try asking for a VIP update.",
             "simpleCardTitle" : this.t('TITLE')  + "Check-in Request",
             "simpleCardContent" : speechOutput,
             "bodyTemplateTitle" : this.t('TITLE')  + "Check-in Request",
             "bodyTemplateContent" : speechOutput,
            //  "bodyTemplateContent" : speechOutput,
             "templateToken" : "BodyTemplate6", //this determines through which template to pass the content. (switch statement at the bottom of this code )
             "backgroundImageContent": {
                 "contentDescription": "Textured grey background",
                 "sources": [
                     {
                         "url": bgImgURLs["MexicoCity"]
                     }
                  ]
             },
             "askOrTell" : ":tell",
             "sessionAttributes": {}
          };
            const pointer = this;
            https.request(Options, function(respy) {
                console.log("The response status code is --> " + respy.statusCode); 
                console.log('Rendering template');
                renderTemplate.call(pointer, content);
             }).end();
        // Just use a card if the device doesn't support a card.
        } else { 
            const pointer = this;
            https.request(Options, function(respy) {
                console.log("The response status code is --> " + respy.statusCode); 
                pointer.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "Check in", speechOutput);
             }).end();
        }
    },
    
    'CheckinRequestIntent': function () {
        var speechOutput = "";
        
        if (this.event.request.intent.slots.Country.value) {
            speechOutput = "Sending check in requests to 4 travelers in " + this.event.request.intent.slots.Country.value + ".";
        } else {
            speechOutput = "Sending check in requests to all 9 travelers."
        }
        
        //check to see if the device we're working with supports display directives
        //enable the simulator if you're testing
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));
          var content = {
             "hasDisplaySpeechOutput" : speechOutput,
             "hasDisplayRepromptText" : "Try asking for a VIP update.",
             "simpleCardTitle" : this.t('TITLE')  + "Check-in Request",
             "simpleCardContent" : speechOutput,
             "bodyTemplateTitle" : this.t('TITLE')  + "Check-in Request",
             "bodyTemplateContent" : speechOutput,
            //  "bodyTemplateContent" : speechOutput,
             "templateToken" : "BodyTemplate6", //this determines through which template to pass the content. (switch statement at the bottom of this code )
             "backgroundImageContent": {
                 "contentDescription": "Textured grey background",
                 "sources": [
                     {
                         "url": bgImgURLs["Tokyo"]
                     }
                  ]
             },
             "hintDirective" : "ask Lulu where Mark is",
             "askOrTell" : ":tell",
             "sessionAttributes": {}
          };
          renderTemplate.call(this, content);
        
        // Just use a card if the device doesn't support a card.
        } else { 
            this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "Check in", speechOutput);
        }
    },

    'StatusUpdateIntent': function () {
        //figure out how to enable SSML
        var speechOutput = "You have " + data.travelers.length+ " people traveling today. 4 of those are VIPs.";

        //check to see if the device we're working with supports display directives
        //enable the simulator if you're testing
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));
          var content = {
             "hasDisplaySpeechOutput" : speechOutput,
             "hasDisplayRepromptText" : "Try asking for a VIP update.",
             "simpleCardTitle" : this.t('TITLE')  + "Status Update",
             "simpleCardContent" : speechOutput,
             "bodyTemplateTitle" : this.t('TITLE')  + "Status Update",
             "bodyTemplateContent" : speechOutput,
             "templateToken" : "BodyTemplate6", //this determines through which template to pass the content. (switch statement at the bottom of this code )
             "backgroundImageContent": {
                 "contentDescription": "Textured grey background",
                 "sources": [
                     {
                         "url": bgImgURLs["Seoul"]
                     },
                     {
                         "url": bgImgURLs["Tokyo"]
                     }
                  ]
             },
             "hintDirective" : "ask Lulu where are my VIPs",
             "askOrTell" : ":tell",
             "sessionAttributes": {}
          };
          renderTemplate.call(this, content);
        // Just use a card if the device doesn't support a card.
        } else { 
          this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "Status Update", speechOutput);
        }
    },

    'ProfileIntent': function () {
        console.log("PROFILE INTENT LAUNCHED")
        console.log(this.event.request);
        console.log(this.event.request.token);
        var profileIndex = 0; //initializing the index
        var profileFirstName = "";

        if (this.event.request.intent) {
            console.log("why is this running");
            console.log(JSON.stringify(this.event.request.intent));
            profileFirstName = this.event.request.intent.slots["Name"].value.toLowerCase();
        } else {
            profileFirstName = this.event.request.token.toLowerCase();
            console.log(profileFirstName);
        }
        
        //resolving synonyms aka weird spellings. gotta figure out how to work synonyms on the skill builder
        if (profileFirstName === "phillip") {
            profileFirstName = "philip";
        } else if (profileFirstName === "megan") {
            profileFirstName = "maegan";
        }
        else if (profileFirstName === "jenny" || profileFirstName === "ginny") {
            profileFirstName = "jinny";
        }
        
        //going through data.travelers to find the first name match
        for (var i = 0; i < data.travelers.length; i++) {
            console.log(data.travelers[i].nameFirst); 
            if (profileFirstName === data.travelers[i].nameFirst.toLowerCase() ) {
                console.log("found the person. index is " + i);
                profileIndex = i;
            }
            else {
                console.log("not this person.");
            }
        }

        var speechOutput = data.travelers[profileIndex].nameFirst + " is currently in " + data.travelers[profileIndex].currentLocationCity + ". " + data.travelers[profileIndex].pronoun + " last checked in 20 minutes ago.";

        //check to see if the device we're working with supports display directives
        //enable the simulator if you're testing
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
            console.log("has display:"+ supportsDisplay.call(this));
            console.log("is simulator:"+isSimulator.call(this));
            var content = {
                "hasDisplaySpeechOutput" : speechOutput,
                "hasDisplayRepromptText" : "Try, Alexa, ask Lulu where is Sean",
                "simpleCardTitle" : this.t('TITLE')  + "Traveler Profile",
                "simpleCardContent" : speechOutput,
                "bodyTemplateTitle" : this.t('TITLE')  + "Traveler Profile",
                "bodyTemplateContentPrimary" : data.travelers[profileIndex].nameFirst + " " + data.travelers[profileIndex].nameLast,
                "bodyTemplateContentSecondary": "Last checked in 20 minutes ago<br/>in " + data.travelers[profileIndex].currentLocationCity,
                "bodyTemplateContentTertiary": "<br/>" + data.travelers[profileIndex].nameFirst + "." + data.travelers[profileIndex].nameLast + "@sabre.com<br/>123-456-7890<br/><action token='checkin'>Ask to check-in</action>",
                "bodyTemplateDisplayImage": data.travelers[profileIndex].photo340x340,
                "templateToken" : "ProfileView", //this determines through which template to pass the content. (switch statement at the bottom of this code )
                "backgroundImageContent": {
                    "contentDescription": "Textured grey background",
                    "sources": [
                        {
                            "url": data.travelers[profileIndex].currentLocationPhoto
                        }
                     ]
                },
                "askOrTell" : ":tell",
                "sessionAttributes": {}
            };
            renderTemplate.call(this, content);

        } else {
            // Just use a card if the device doesn't support a card.
            this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "CEO Update", speechOutput, data.travelers[0].profileImgCard);
        }
    },
    
    'VipUpdateIntent': function () {
        var speechOutput = "";
        var listOutput = [];
        
        //to use in sayArray during speechOutput
        var list = [];
        for (var i = 0; i < data.travelers.length; i++) {
            var item = data.travelers[i];
            if (item.vipStatus) {
                list.push(item.nameFirst + ' ' + item.nameLast);
                listOutput.push({
                    "token": item.nameFirst,
                    "image": {
                        "sources": [{"url": item.photo88x88}],
                        contentDescription: "Profile photo - 88x88"
                    },
                    "textContent": {
                        "primaryText": {
                            "text": item.nameFirst + " " + item.nameLast,
                            "type": "PlainText",
                            },
                        "secondaryText": {
                            "text": "Currently in " + item.currentLocationCity, 
                            "type": "PlainText"
                        },
                        "tertiaryText": {
                            "text": "VIP",
                            "type": "PlainText"
                        }
                    }
                });
            }
        }
        speechOutput = "You have " + list.length + " VIPs traveling currently. They are " + sayArray(list,'and');

        // //check to see if the device we're working with supports display directives
        // //enable the simulator if you're testing
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));
          var content = {
             "hasDisplaySpeechOutput" : speechOutput,
             "hasDisplayRepromptText" : "randomFact",
             "simpleCardTitle" : this.t('TITLE')  + "VIP Update",
             "simpleCardContent" : speechOutput,
             "listItems" : listOutput,
             "listTemplateTitle" : this.t('TITLE')  + "VIP Update",
             "backgroundImageContent" : {
                 "contentDescription": "Textured grey background",
                 "sources": [
                     {
                         "url": bgImgURLs["Tokyo"]
                     }
                  ]
             },
             "templateToken" : "TravelersListView", //this determines through which template to pass the content. (switch statement at the bottom of this code )
             "askOrTell" : ":tell",
             "sessionAttributes": {}
          };
          renderTemplate.call(this, content);
        } else {
        // Just use a card if the device doesn't support a card.
          this.emit(':tellWithCard', speechOutput, this.t('TITLE')  + "VIP Update", speechOutput);
        }
    },
    
    'AMAZON.YesIntent': function () {
        this.emit('AMAZON.NextIntent');

    },
    'AMAZON.NoIntent': function () {
        this.emit(':tell', 'Okay, see you next time!');
    },
    'AMAZON.PauseIntent': function () {
        this.emit(':tell', 'Okay, see you next time!');
    },

    'AMAZON.RepeatIntent': function () {
        // if (!this.attributes['currentStep'] ) {
        //     this.attributes['currentStep'] = 1;
        // } else {
        //     this.attributes['currentStep'] = this.attributes['currentStep'] - 1;
        // }

        // this.emit('AMAZON.NextIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t('HELP'));
    },
    'AMAZON.StartOverIntent': function () {
        delete this.attributes['currentStep'];
        this.emit('LaunchRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP'));
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':saveState', true);
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


//==============================================================================
//=========================== Helper Functions  ================================
//==============================================================================

function sayArray(myData, andor) {
    //say items in an array with commas and conjunctions.
    // the first argument is an array [] of items
    // the second argument is the list penultimate word; and/or/nor etc.

    var listString = '';

    if (myData.length == 1) {
        //just say the one item
        listString = myData[0];
    } else {
        if (myData.length == 2) {
            //add the conjuction between the two words
            listString = myData[0] + ' ' + andor + ' ' + myData[1];
        } 
        // else if (myData.length == 4 && andor=='and'){
        //     //read the four words in pairs when the conjuction is and
        //     listString=myData[0]+" and "+myData[1]+", as well as, "
        //         + myData[2]+" and "+myData[3];

        // }  
        else {
            //build an oxford comma separated list
            for (var i = 0; i < myData.length; i++) {
                if (i < myData.length - 2) {
                    listString = listString + myData[i] + ', ';
                } else if (i == myData.length - 2) {            //second to last
                    listString = listString + myData[i] + ', ' + andor + ' ';
                } else {                                        //last
                    listString = listString + myData[i];
                }
            }
        }
    }

    return(listString);
}

function randomArrayElement(array) {
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}


//From: https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/sample-nodejs-plan-my-trip/src/index.js
//use when you want a dialog delegate
// function delegateSlotCollection(){
//   console.log("in delegateSlotCollection");
//   console.log("current dialogState: "+this.event.request.dialogState);
//     if (this.event.request.dialogState === "STARTED") {
//       console.log("in Beginning");
//       var updatedIntent=this.event.request.intent;
//       //optionally pre-fill slots: update the intent object with slot values for which
//       //you have defaults, then return Dialog.Delegate with this updated intent
//       // in the updatedIntent property
//       this.emit(":delegate", updatedIntent);
//     } else if (this.event.request.dialogState !== "COMPLETED") {
//       console.log("in not completed");
//       // return a Dialog.Delegate directive with no updatedIntent property.
//       this.emit(":delegate");
//     } else {
//       console.log("in completed");
//       console.log("returning: "+ JSON.stringify(this.event.request.intent));
//       // Dialog is now complete and all required slots should be filled,
//       // so call your normal intent handler.
//       return this.event.request.intent;
//     }
// }


// getting the slot value via the resolutions 
// fallback to using slot.SlotName.value if resolutions are not present or there is no match).
// used in getting synonyms to work, but synonyms aren't working. so this is unused currently
// function slotValue(slot, useId){
//     let value = slot.value;
//     let resolution = (slot.resolutions && slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority.length > 0) ? slot.resolutions.resolutionsPerAuthority[0] : null;
//     if(resolution && resolution.status.code == 'ER_SUCCESS_MATCH'){
//         let resolutionValue = resolution.values[0].value;
//         value = resolutionValue.id && useId ? resolutionValue.id : resolutionValue.name;
//     }
//     return value;
// }

function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return isSimulator;
}

function renderTemplate (content) {

  //create a template for each screen you want to display.
  //This example has one that I called "factBodyTemplate".
  //define your templates using one of several built in Display Templates
  //https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#display-template-reference

    switch(content.templateToken) { //using the tokens to determine through which template to pass the content. 
        case "BodyTemplate6":
            // for reference, here's an example of the content object you'd
            // pass in for this template.
            //  var content = {
            //     "hasDisplaySpeechOutput" : "display "+speechOutput,
            //     "hasDisplayRepromptText" : randomFact,
            //     "simpleCardTitle" : this.t('SKILL_NAME'),
            //     "simpleCardContent" : randomFact,
            //     "bodyTemplateTitle" : this.t('GET_FACT_MESSAGE'),
            //     "bodyTemplateContent" : randomFact,
            //     "templateToken" : "factBodyTemplate",
            //     "sessionAttributes": {}
            //  };
    
            var response = {
                "version": "1.0",
                "response": {
                   "directives": [
                     {
                       "type": "Display.RenderTemplate",
                       "template": {
                         "type": "BodyTemplate6",
                         "title": content.bodyTemplateTitle,
                         "token": content.templateToken,
                         "backgroundImage": content.backgroundImageContent,
                         "textContent": {
                           "primaryText": {
                             "type": "RichText",
                             "text": "<font size = '7'>"+content.bodyTemplateContent+"<br/></font>"
                           }
                         },
                         "backButton": "HIDDEN"
                       }
                     },
                     {
                      "type": "Hint",
                      "hint": {
                        "type": "PlainText",
                        "text": content.hintDirective //TODO: pull random hints & make invocation name dynamic. 
                      }
                     }
                   ],
                   "outputSpeech": {
                     "type": "SSML",
                     "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
                   },
                   "reprompt": {
                     "outputSpeech": {
                       "type": "SSML",
                       "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                     }
                   },
                   "shouldEndSession": content.askOrTell==":tell",
                   "card": {
                     "type": "Simple",
                     "title": content.simpleCardTitle,
                     "content": content.simpleCardContent
                   }
                 },
                 "sessionAttributes": content.sessionAttributes
               }
               this.context.succeed(response);
        break;
               
        case "ProfileView":
            var response = {
                 "version": "1.0",
                 "response": {
                   "directives": [
                     {
                       "type": "Display.RenderTemplate",
                       "template": {
                         "type": "BodyTemplate3",
                         "title": content.bodyTemplateTitle,
                         "backgroundImage": content.backgroundImageContent,
                         "token": content.templateToken,
                         "textContent": {
                            "primaryText": {
                             "type": "RichText",
                             "text": "<font size = '7'>"+content.bodyTemplateContentPrimary+"</font>",
                            },
                            "secondaryText": {
                              "text": "<font size = '3'>"+content.bodyTemplateContentSecondary+"</font>",
                              "type": "RichText"
                            },
                            "tertiaryText": {
                              "text": "<font size = '3'>"+content.bodyTemplateContentTertiary+"</font>",
                              "type": "RichText"
                            }
                         },
                         "backButton": "HIDDEN"
                       }
                     }
                   ],
                   "outputSpeech": {
                     "type": "SSML",
                     "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
                   },
                   "reprompt": {
                     "outputSpeech": {
                       "type": "SSML",
                       "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                     }
                   },
                   "shouldEndSession": content.askOrTell== ":tell",
                   "card": {
                     "type": "Simple",
                     "title": content.simpleCardTitle,
                     "content": content.simpleCardContent
                   }
                 },
                 "sessionAttributes": content.sessionAttributes
             }
             
             if(content.bodyTemplateDisplayImage) {
                //when we have images, create a sources object
                //TODO switch template to one without picture?
                let sources = [
                  {
                    "contentDescription": "profile picture",
                    "url": content.bodyTemplateDisplayImage
                      
                  }
                ];
                
                //add the image sources object to the response
                response["response"]["directives"][0]["template"]["image"]={};
                response["response"]["directives"][0]["template"]["image"]["sources"]=sources;
              }
              //Send the response to Alexa
              console.log("ready to respond (ProfileView): "+JSON.stringify(response));
              this.context.succeed(response);
        break;
        
        case "TravelersListView":
            var response = {
                "version": "1.0",
                "sessionAttributes": {},
                "response": {
                   "directives": [
                        {
                          "type": "Display.RenderTemplate",
                          "token": content.templateToken, 
                          "backButton": "VISIBLE",
                          "template": {
                            "type": "ListTemplate1",
                            "backgroundImage": content.backgroundImageContent,
                            "token": "list_template_one",
                            "title": content.listTemplateTitle,
                            "listItems": content.listItems
                          }
                        }
                   ],
                   "outputSpeech": {
                     "type": "SSML",
                     "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
                   },
                  "reprompt": {
                     "outputSpeech": {
                      "type": "SSML",
                      "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                     }
                  },
                   "shouldEndSession": content.askOrTell== ":tell",
                   "card": {
                     "type": "Simple",
                     "title": content.simpleCardTitle,
                     "content": content.simpleCardContent
                   }
                 }
             }
            console.log("ready to respond (ProfileView): "+JSON.stringify(response));
            this.context.succeed(response);
        break;
            
               
        default:
            this.emit(':tell', "Thanks for chatting, goodbye");
   }

}
