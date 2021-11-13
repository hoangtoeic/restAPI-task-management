// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID=mongodb.ObjectId

const{MongoClient,ObjectID}=require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'




MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

      
    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


    //  db.collection('users').updateOne({
    //     _id: new ObjectID("617638fb21295f844781e081")
    // }, {
    //     $set: {
    //         age: 30
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })



   
   
   
    // db.collection('users').find({age:27}).toArray((error,users_array)=>{
   
    //     console.log(users_array)
    // })


    //const id=new ObjectID()

    // console.log(id.id)

    // console.log(id.id.length)
    
    // console.log(id.toHexString())
    
    // console.log(id.toHexString().length)

    
    // db.collection('users').insertOne({
    //     _id:id,
    //     name: 'bruno',
    //     age: 27
    // },(error,result)=>{
    //     if(error){
    //         return console.log("unable to insert user")
    //     }
    //     console.log(result)
    // })
   
   
   
    // db.collection('users').insertMany([
    //     {name:'alex',
    //     age:30},
    //     {
    //         name:'nico',
    //         age:30
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("unable to insert")
    //     }
    //     console.log(result)
    // })


})