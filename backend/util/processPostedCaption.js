/**
 * CREDITS: Special thanks to Techno-cratz for providing the code required for preprocessing the content
 * of the post to make it more accessibility friendly. (Github: @Bhavnoor-Kaur, @raquibk)
 */

const camelCase = require('camelcase');
const axios = require("axios").default;
class ProcessPostCaption {

    constructor(caption, rapidApiKey) {
        this.caption = caption;
        this.rapidApiKey = rapidApiKey;
    }

    removeemoji() {
        // Will find the emojis > Make new string with no emoji > Make another string with emojis
        var regex = /\p{Emoji_Presentation}/gu;
        let emojis = this.caption.match(regex);
        if (emojis.length == 1 || emojis.length == 0) {
            return this.caption;
        } else {
            let new_cap = this.caption.replace(regex, '');
            let indexPosition = new_cap.indexOf("#");
            new_cap = new_cap.split('');
            new_cap.splice(indexPosition-1, 0, emojis[0]);
            new_cap = new_cap.join('');
            //new_cap += emojis[0];
            this.caption = new_cap;
            return this.caption;
        }
    }

    async correcthashtags() {
        let tags =  this.caption.match(/#[a-z]+/gi);
        var hash = "#";
        var oldtagstring = "";
        var newtagstring = "";
        var regexp = /\#\w\w+\s?/g
        this.caption = this.caption.replace(regexp, '');

        for (let i=0; i<tags.length; i++) {
            tags[i] = tags[i].replace(/\#/g, '');
            oldtagstring+= tags[i]
        }
        for (let i=0; i<tags.length; i++) {
            var options = {
                method: 'POST',
                url: 'https://dnaber-languagetool.p.rapidapi.com/v2/check',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-rapidapi-host': 'dnaber-languagetool.p.rapidapi.com',
                    'x-rapidapi-key': this.rapidApiKey
                },
                params: {text: tags[i], language: 'en-US'}
            };

            var str = await axios.request(options).then(function (response) {
                return response.data["matches"][0]["replacements"][0]["value"];
            }).catch(function (error) {
                console.error(error);
            });
            tags[i] = hash.concat(camelCase(str));
            newtagstring += tags[i].concat(" ");
        }
        this.caption += newtagstring;
        return this.caption;
    }

    correctcaps() {
        let words = this.caption.trim().split(" ");

        var corrected_string = '';
        var updated = '';

        for (let i = 0; i < words.length; i++ ) {
            words[i].toLowerCase();
            if (i == 0) {
                updated = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            } else {
                updated = words[i].toLowerCase();
            }
            corrected_string += updated;
            corrected_string += " ";
        }

        this.caption = corrected_string;
        return this.caption;
    }
}

const processPostCaption = async (postCaption, rapidApiKey) => {
    let cap = new ProcessPostCaption(postCaption, rapidApiKey);
    cap.removeemoji();
    cap.correctcaps();

    await cap.correcthashtags();
    console.log(cap.caption);
    return  cap.caption;
}

module.exports =  {
    processPostCaption
}