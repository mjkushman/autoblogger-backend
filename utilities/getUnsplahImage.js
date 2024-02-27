const axios = require('axios')
/**
 * Get a single image from unsplash.
 * Uses the first n words from title as search query
 * 
 * @param {string} titlePlaintext 
 */

async function getImage(titlePlaintext) {
    const clientId = '3B0pbBrBzxRtn9RGE3BCPIqiLjkbtctTGBPj8at4GNE'

    let response = await axios.get(`https://api.unsplash.com/search/photos`,{
    params:{
        query:titlePlaintext
    },
    headers: {
            'Authorization':`Client-ID ${clientId}`
        }
    })
    .catch(error => {
        console.log('error fetching image:',error)
    })
    // get ther first response
    let image = response.data.results[0]
    let imageUrl = image.urls.regular
    // console.log('retrieved image:',image.urls.regular)
    return imageUrl
    
}

module.exports = getImage
