const AWS= require('aws-sdk');
const util= require('../utils/utils')
AWS.config.update({
    region:'ap-south-1'
})
const dynomodb= new AWS.DynamoDB.DocumentClient();
const usertable= 'arnxt_seller_images';

async function register(productInfo){
   const productName= productInfo.productname;
   const productDescription= productInfo.productdescription;
   const productPrice= productInfo.productprice;
   const currency= productInfo.currency;
   if(!productName || !productDescription || !productPrice || !currency){
   return util.buildResponse(401, {
    message: 'All fields are Required'
   })
   }
   
   const product={
     productName: productName,
     productDescription: productDescription,
     productPrice: productPrice,
     currency: currency
   }
   const saveProduct= await saveproduct(product);
   if(!saveProduct){
    return util.buildResponse(501,{
        message:'server error while creating product'
    })

   }
   return util.buildResponse(200,{productName:productName})

 

}

async function getProducts(){
    const params={
        TableName:producttable
    }
    const allProducts= await scanDynamoRecords(params,[]);
    const body={
        products: allProducts
    }
    return buildResponse(200, body)
}

async function scanDynamoRecords(scanParams, itemArray){
    try{
        const dynamoData= await dynamodb.scan(scanParams).promise();
        itemArray= itemArray.concat(dynamoData.Items)
        if(dynamoData.LastEvaluatedkey){
            scanParams.ExclusiveStartkey=dynamoData.LastEvaluatedkey;
            return scanDynamoRecords(scanParams, itemArray);
        

        }
        return itemArray;
    }catch(error){
        console.error('error while getting your item',error)
    }
    
 }

async function saveproduct(product){
    const params={
        TableName: usertable,
        Item: product
    }
    return await dynomodb.put(params).promise().then(()=>{
        return true;
    },error=>{
        console.error('Error while saving the product',error)
    })
    
}
module.exports.register= register;