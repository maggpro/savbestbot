const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio'); // npm install cheerio
const request = require('request'); // npm install request
const token = '699117607:AAHB_NrU7ZcbrkOThEX8Fz9WFBkcjwcgehw';
const bot = new TelegramBot(token, {polling: true});

var URL  // Video URL
var URL2
var videoTag
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text=='/start') {
      bot.sendMessage(chatId, 'Hi!\nJust send me a link to the video from instagram!');
    }
    else  {
  URL=msg.text


  URL2=URL.slice(0,15);
//console.log(URL2)

  request(URL, function (error, response, body) {

    const $ = cheerio.load(body);
if (URL2=='https://www.ins'){
  //console.log('Instagram');
     videoTag = $('meta[property="og:video"]').attr('content');
  }
  if (URL2=='https://vk.com/'){
    //console.log('VK');
  bot.sendMessage(chatId, 'Download from vk.com is not available');


  }


      bot.sendVideo(chatId, videoTag, {
        caption: 'Downloaded by: @savbestbot'
      });
  // console.log(videoTag); // console output:

  })};



})
