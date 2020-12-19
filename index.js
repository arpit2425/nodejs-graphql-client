const express=require('express');
require('dotenv').config({path:'./.env'})
const app=express();
const {GraphQLClient,gql, default: request}=require('graphql-request');
app.use(express.json());
const endpoint=process.env.endpoint;
const token=process.env.token;
const client=new GraphQLClient(endpoint,{
    headers:{
        'x-hasura-admin-secret': process.env.token,
        'content-type': 'application/json'
    }
    
});
const query=gql`
query{
Teachers(limit:5){
  firstName
  lastName
  User{
    profile
    password
  }
}
}`;
app.get('/',async(req,res)=>{
    const response=await client.request(query);
    res.json({data:response});
})
app.listen(3030,()=>{
    console.log("Listening");
})