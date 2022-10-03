const express = require('express');
const app = new express();

//Watson packages
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require('dotenv');
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

//console.log(api_key,api_url)

function getNLUInstance() {
    /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/

    return new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator ({apikey: api_key}),
        serviceUrl: api_url
    });
}



//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
     //Extract the url passed from the client through the request object
     let urlToAnalyze = req.query.url;
     const analyzeParams = 
         {
             "url": urlToAnalyze,
             "features": {
                 "keywords": {
                                 "emotion": true,
                                 "limit": 1
                             }
             }
         }
          const naturalLanguageUnderstanding = getNLUInstance();
          naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
         //Please refer to the image to see the order of retrieval

         //return res.send(analysisResults.result.keywords[0].emotion,null,2);
         return res.json(analysisResults.result.keywords[0].emotion);

      })
      .catch(err => {
      //return res.send("Could not do desired operation "+err);
      console.error("Could not do desired operation "+err);
      return res.json([{"error":"Could not do desired operation "}]);
      });
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req,res) => {
    let urlToAnalyze = req.query.url;
    const analyzeParams = 
    {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    }
    
    const naturalLanguageUnderstanding = getNLUInstance();
    
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the sentiment and return it as a formatted string

        //return res.send(analysisResults.result.keywords[0].sentiment,null,2);        
        return res.json(analysisResults.result.keywords[0].sentiment);
    })
    .catch(err => {
        //return res.send("Could not do desired operation "+err);
        console.error("Could not do desired operation "+err);
        return res.json([{"error":"Could not do desired operation "}]);
    });
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req,res) => {
    let textToAnalyze = req.query.text;
    console.log("GET text/emotion text:",textToAnalyze );
    const analyzeParams = 
    {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    }
    
    const naturalLanguageUnderstanding = getNLUInstance();
    
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the emotion and return it as a formatted string
        return res.json(analysisResults.result.keywords[0].emotion);
    })
    .catch(err => {
        //return res.sendJson("Could not do desired operation "+err);
        console.error("Could not do desired operation "+err);
        return res.json([{"error":"Could not do desired operation "}]);
       
    });
});

app.get("/text/sentiment", (req,res) => {
    let textToAnalyze = req.query.text;
    console.log("GET text/sentiment text:",textToAnalyze );
    const analyzeParams = 
    {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    }
    
    const naturalLanguageUnderstanding = getNLUInstance();
    
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        //Retrieve the sentiment and return it as a formatted string

        //return res.send(analysisResults.result.keywords[0].sentiment,null,2);
        return res.json(analysisResults.result.keywords[0].sentiment);
    })
    .catch(err => {
        
        //return res.send("Could not do desired operation "+err);
        console.error("Could not do desired operation "+err);
        return res.json([{"error":"Could not do desired operation "}]);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

