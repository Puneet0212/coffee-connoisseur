// This is a file to separate the API related code to make the code simpler and easy to debug.


//Unsplash API to display images. **We didn't use fourSquare API for images, bcoz we are using free version and to access imgs we need to pay.
import { createApi } from 'unsplash-js';


const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});



//Function to shorten the coffee store data url
const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};


// Function to get coffee store images from unsplash
const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplash.search.getPhotos({
        query: 'cafe',
        page: 1,
        perPage: 30,
    });


    //Look at the terminal/server 
    const unsplashResults = photos.response.results;
    return unsplashResults.map( (result) => result.urls["small"] );
}

export const fetchCoffeeStores = async (
    latLong = "32.99036175919384,-117.20325169921702"
) => {

    //getting photos url from unsplash api
    const photos = await getListOfCoffeeStorePhotos();
    
    //initial/reqd code for adding foursquare_api
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
      };
      
    // The await operator is used to wait for a Promise and get its fulfillment value.
    // It can only be used inside an async function or a JavaScript module.
    const response = await fetch(getUrlForCoffeeStores ( latLong, "cafe", 6),
                                    options);
    
    const data = await response.json();
    //returning data results from foursquare api and adding imgUrl from unsplash api
    return data?.results?.map( (result, idx) => {

        
        return {
            //data results from foursquare api
            ...result,
            id: result.fsq_id,  
            name: result.name,
            address: result.location.address,
            
            


            //imgUrl from unsplash api
            imgUrl: photos[idx],      
        }
    });
    
    // catch(err => console.error(err));
}