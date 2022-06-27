class TinyUrlClient {
    constructor() {

    }
    async triggerGetUrl(urlId) {
        let response = await fetch(`POST_URL?id=${urlId}`, {
            method: 'GET',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": 'application/json',
            }
        })
        .then(res => res.json())
        .then(response => {
            let responseJson = JSON.stringify(response)
            console.log("getting response: " + responseJson)
            return responseJson
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        console.log(`response: ${response}`)
        return response
    }

     async triggerPutUrl(url) {
        return await fetch("GET_URL?", {
            method: 'POST',
            body: JSON.stringify({
            "originalUrl": url
            })
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      }
}

const tinyUrlClient = new TinyUrlClient()
Object.freeze(tinyUrlClient)
export default tinyUrlClient