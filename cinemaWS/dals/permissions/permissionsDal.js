const jsonfile = require('jsonfile')

exports.readFile = function()
{
    return new Promise(resolve =>
    {
        jsonfile.readFile(__dirname + "/permissions.json", function(err,data)
        {
            resolve(data)
        })
    })
}

exports.writeFile = (fileContent) => 
{
    return new Promise((resolve, reject) => {
        jsonfile.writeFile(__dirname + "/permissions.json", fileContent, err => {
        if (err) {
            reject(err);
            return;
        }
            resolve("Success");
        });
    });
}