import React from "react";
import { useParams } from "react-router-dom"
import  tinyUrlClient  from '../api/TinyUrlClient'

async function updateUrl(urlId) {
    let getResponse = JSON.parse(await tinyUrlClient.triggerGetUrl(urlId))
    console.log(`getResponse: ${JSON.stringify(getResponse)}`)

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