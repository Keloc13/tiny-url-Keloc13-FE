import React from "react";
import { useParams } from "react-router-dom"

async function triggerGetUrl(urlId) {
    let response = await fetch(`GET_URL?id=${urlId}`, {
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

async function updateUrl(urlId) {
    let getResponse = JSON.parse(await triggerGetUrl(urlId))
    console.log(`getResponse: ${getResponse}`)
    console.log("getResponse.item: " + getResponse.Item.originalUrl.S)

    let tinyUrl = getResponse.Item
    window.location.replace(tinyUrl.originalUrl.S)
    let urlLink = document.getElementById("url_response")
    urlLink.href = tinyUrl.originalUrl.S
    urlLink.innerText = window.location.href

}

function UrlRedirect() {
    let params = useParams()
    let urlId = params.urlId
    updateUrl(urlId)
    return <div>
        this param id: {params.urlId}
        <div>url = <a id="url_response"></a></div>
    </div>
}

export default UrlRedirect