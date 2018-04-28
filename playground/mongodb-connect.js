/**
 * Created by shank on 28/04/2018.
 */

//const mongoclient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//Change the Server URL to your Mongod.exe running URL
MongoClient.connect('mongodb://localhost:27017/MyApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to MongoDB server successfully');

    var db = client.db('test_DB');

    //Insert document
    db.collection('Article').insertOne({
        text:'Article 2 created',
        completed:false
    },(err, result) => {
        if(err){
            return console.log(`Unable to insert to Todos Collection : ERROR ${err}`)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name:'Test 1',
        age:27,
        location:'New Zealand'
    },(err, result) =>{
        if(err){
            return console.log(`Unable to insert to Users Collection : ERROR ${err}`)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    //Search/Select Document
    db.collection('Users').find({_id: new ObjectID('5ae42afb9365be3eb877f963')}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));
    },(err)=>{
        console.log("Error reading from Users");
    });

    //Delete a User
    db.collection('Users').findOneAndDelete({_id:new ObjectID('5ae42afb9365be3eb877f963')}).then((result) => {
        console.log(result.value);
    },(err) => {
        console.log("Error deleting from Users");
    });
    
    //Update a user
    db.collection('Users').findOneAndUpdate({name:'Test 1'},{location:'New Zealand'}).then((result) => {
        console.log(result);
    },(err) => {
        console.log("Error updating the user");
    });

    client.close();
});

