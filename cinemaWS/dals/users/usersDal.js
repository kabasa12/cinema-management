const jsonfile = require('jsonfile')

exports.readFile = function()
{
    return new Promise((resolve, reject) => {  
        jsonfile.readFile(__dirname + "/users.json", (err,data) => {
        if(err) {
            reject(err);
            return;
        }
            resolve(data)
        });
    });
}

exports.writeFile = (fileContent) => 
{
    return new Promise((resolve, reject) => {
        jsonfile.writeFile(__dirname + "/users.json", fileContent, err => {
        if (err) {
            reject(err);
            return;
        }
            resolve("Success");
        });
    });
}