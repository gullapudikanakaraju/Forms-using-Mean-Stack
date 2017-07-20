var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var MongoClient = mongodb.MongoClient;

app.use(express.static(path.join(__dirname,'my_static')));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.get('/requirement_form_1',function(request, response){
	console.log(request.url);
	response.status(200);
	response.render('requirement_form_1');
});

app.get('/requirement_form_2',function(request, response){
	console.log(request.url);
	response.status(200);
	response.render('requirement_form_2');
});

app.post('/requirement_form_1',function(request, response){
	var data={
	 user_story : request.body.user_story,
	 end_result : request.body.end_result,
     time : request.body.time,
	 days : request.body.days,
	 platform : request.body.platform 
       };
	var url = 'mongodb://localhost:27017/forms';
	console.log(data);
	MongoClient.connect(url, function(err, db){
		if(err)
		{
			console.log("error occured while connecting to the database "+err);
			response.sendFile(path.join(__dirname,'my_static','form_1_error.html'));
		}
        else
        {
           db.collection('form_1').insert(data,function(err, result){
           	    if(err)
            	{
                    console.log("error occured while inserting the document in the database "+err);
                    response.sendFile(path.join(__dirname,'my_static','form_1_error.html'));

           	    }
           	    else
           	    {
                    console.log("document inserted successfully !");
                    db.close();
                    response.sendFile(path.join(__dirname,'my_static','form_1_success.html'));

           	    }
           });
        }

	});
});

app.post('/requirement_form_2',function(request, response){
	var data={
	 start_date : request.body.start_date,
	 end_date : request.body.end_date,
     man_power : request.body.man_power,
	 technologies : request.body.technologies,
	 testing_equipments : request.body.testing_equipments,
	 development_software : request.body.development_software,
	 technology_inhouse : request.body.radio
       };
	var url = 'mongodb://localhost:27017/forms';
	console.log(data);
	MongoClient.connect(url, function(err, db){
		if(err)
		{
			console.log("error occured while connecting to the database "+err);
			response.sendFile(path.join(__dirname,'my_static','form_2_error.html'));
		}
        else
        {
           db.collection('form_2').insert(data,function(err, result){
           	    if(err)
            	{
                    console.log("error occured while inserting the document in the database "+err);
                    response.sendFile(path.join(__dirname,'my_static','form_2_error.html'));

           	    }
           	    else
           	    {
                    console.log("document inserted successfully !");
                    db.close();
                    response.sendFile(path.join(__dirname,'my_static','form_2_success.html'));

           	    }
           });
        }

	});
});

app.set('port',8888);
app.listen(app.get('port'));
console.log("the server is listening on port number :"+app.get('port'));