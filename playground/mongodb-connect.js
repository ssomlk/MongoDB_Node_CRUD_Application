/**
 * Created by shank on 28/04/2018.
 */

//const mongoclient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//Change the Server URL to your Mongod.exe running URL
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to MongoDB server successfully');

    var db = client.db('ToDoApp');

    //Insert document
    db.collection('Todos').insertOne({
        text:'Article 2 created',
        completed:false
    },(err, result) => {
        if(err){
            return console.log(`Unable to insert to Todos Collection : ERROR ${err}`)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name:'Laki',
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

    client.close();
});

