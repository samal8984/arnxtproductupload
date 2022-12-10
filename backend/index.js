const AWS= require('aws-sdk');
const util= require('../utils/utils')
AWS.config.update({
    region:'ap-south-1'
})
const dynomodb= new AWS.DynamoDB.DocumentClient();
const usertable= 'arnxt_seller_images';




const registerPath= '/productsadd'


const util= require('./utils/utils')


exports.handler= async (event)=>{
    console.log('Request Event:' ,event);
    let response;
    switch(true){
        case event.httpMethod ==='POST' && event.path === registerPath:
        
            response=await saveproduct(JSON.parse(event.body));
            console.log(response)
            break;

            case event.httpMethod ==='GET' && event.path === getProductsPath:
            response= buildResponse(200);
            break;


            default:
                const body = {
                    msg: 'Create the API'
                };
                response =buildResponse(200, body);
        }
        return response;

    }

    function buildResponse(statusCode, body) {
        return {
            statusCode: statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
        };
    }
    
    async function saveproduct(requestData){
        const params={
            TableName: usertable,
            Item:{
                productName: requestData.productname,
                productDescription: requestData.productdescription,
                productPrice: requestData.productprice,
                currency: requestData.currency
            }
        }
        return await dynomodb.put(params).promise().then(async ()=>{
            return success;
        },error=>{
            console.error('Error while saving the product',error)
        })

    }
   

