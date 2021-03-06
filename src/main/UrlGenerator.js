import './UrlGenerator.css'
import "../common/normalized_container.css" 
import React from 'react';
import tinyUrlClient from "../api/TinyUrlClient"

class UrlGenerator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <main>
                <div className="main_outer_container">
                    <div className="main_inner_container">
                        <label>Please Input your URL</label>
                        <div>
                            <input type="text" id="url_text" placeholder='https://example.com' value={"https://example.com"}></input>
                        </div>
                        <div>
                            <button id="url_text_button" onClick={() => {this.generateTinyUrlAndDisplay()}}>Generate Tiny Url</button>
                        </div>
                    </div>                
                </div>
                <div className="main_outer_container shiftAbove initially_dont_load" id="display_urls_container">
                    <div className="main_inner_container">
                        <label>URLs</label>
                        <a id="tiny_url_output" href="">https://example.com</a>
                    </div>
                </div>
            </main>
        )
    }

    async generateTinyUrlAndDisplay() {
        const url = document.getElementById("url_text")
        let data = await tinyUrlClient.triggerPutUrl(this.verifyUrl(url.value))
        url.value = ""
        this.updateUrlDisplay(data)
    }

    updateUrlDisplay(new_url_data) {
        let display_container = document.getElementById("display_urls_container")
        display_container.style.visibility = "visible"
        display_container.style.display = "grid"

        let linked_output = document.getElementById("tiny_url_output")
        linked_output.href = new_url_data.Item.originalUrl.S
        linked_output.innerText = window.location.host + "/" + new_url_data.Item.id.S
    }

    verifyUrl(url) {
        return url
    }

}

export default UrlGenerator;