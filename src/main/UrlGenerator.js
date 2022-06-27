import './UrlGenerator.css'
import React from 'react';

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
                            <input type="text" id="url_text" placeholder='https://example.com'></input>
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
        this.triggerPutUrl(this.verifyUrl(url.value))
        url.value = ""
    }

    updateUrlDisplay(new_url_data) {
        let display_container = document.getElementById("display_urls_container")
        display_container.style.visibility = "visible"
        display_container.style.display = "block"

        let linked_output = document.getElementById("tiny_url_output")
        linked_output.href = new_url_data.Item.originalUrl.S
        linked_output.innerText = new_url_data.Item.id.S
    }

    verifyUrl(url) {
        return url
    }

    async triggerPutUrl(url) {
        await fetch("POS_URL", {
            method: 'POST',
            body: JSON.stringify({
            "originalUrl": url
            })
        })
        .then(res => res.json())
        .then(res => {
            this.updateUrlDisplay(res)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      }
    
      async triggerGetUrl() {
        let response = await fetch("GET_URL", {
            method: 'GET',
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": 'application/json',
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log("getting response: " + JSON.stringify(response))
            if (response.ok) {
                return JSON.stringify(response)
            } else {
                throw `Looks like something went wrong. Status: ${response.status}`;
            }
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });
          console.log(`response: ${response}`)
      }
    
}

export default UrlGenerator;