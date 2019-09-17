require('dotenv').config();
const director = require('director');
const axios = require('axios');

const Run = function()
{
    const mannaUrl = 'http://www.ourmanna.com/verses/api/get?format=text&order=random';
    let verse = '';
    if((new Date().getMinutes() % 1) == 0 )
    {
        // get bible verse
        axios.get(mannaUrl)
            .then((response) => {
                verse = response.data;

                const verseMessage = 
                    `Good morning everyone!\n`+
                    `Today's verse of the day: "${verse}"\n`+
                    `Have a great day! 😄`

                // send it to group me
                PostMessage(verseMessage);
            })
            .catch((err) => console.error('Error getting verse: ' + err))
    }
}

const PostMessage = function(verseMessage)
{
    const groupMeUrl = `${process.env.BASE_URL}/v3/bots/post`;
    const data =
    {
        "bot_id" : process.env.BOT_ID,
        "text" : verseMessage,
    }
    console.log(`Sending verse, ${verse}, to group ${process.env.GROUP_ID}`)
    axios.post(url, data)
        .then(response => {
            console.log("It is done")
        })
        .catch(error => console.error("Error posting message" + error));
}
Run();