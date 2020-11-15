const axios = require('axios')

exports.getMovies = async function()
{
    let resp = await  axios.get("https://api.tvmaze.com/shows");
    let data = [];
    resp.data.map(d => {
        data.push({
                   name:d.name,
                   image:d.image.medium,
                   premiered:d.premiered,
                   genres:[...d.genres]})
    });

    return {data:data};
}