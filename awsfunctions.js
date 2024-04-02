
import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'eu-west-1',
    secretAccessKey: '4QlDlQRa1RARe/3Fbx8hVD9HtI5D60s0RbQkQn33',
    accessKeyId: 'AKIAVRUVWLO6VMCVEZWN',
    dynamoDbCrc32: false
})

// export const fetchData = (tableName) => {
//     var params = {
//         TableName: tableName
//     }

//     docClient.scan(params, function (err, data) {
//         if (!err) {
//             console.log("fetched data",data)
//             return data;
//         }
//     })
// }

export const fetchData = (tableName) => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: tableName
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log("fetched data", data);
                resolve(data);
            }
        });
    });
};

export const putData = async (tableName , data) => {
    var params = {
        TableName: tableName,
        Item: data,
        ReturnValues: 'ALL_OLD'
    }
    
    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
        }
    })
}

