const axios = require('axios')

exports.getMembers = async function()
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let data = [];
    resp.data.map(d => {
        data.push({
                   userName:d.name,
                   email:d.email,
                   city:d.address.city})
    });
    return {data:data};
}