function buildResponse(statusCode,body){
    return {
        statusCode: statusCode,
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'Application/json'
        },
        body: JSON.stringify(body)
    }

}
module.exports.buildResponse= buildResponse;