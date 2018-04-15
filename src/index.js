
const axios = require('axios');
const cheerio = require('cheerio');


async function getUserPage (id) {
    let response;
    try {
        response = await axios.get("http://yongzhou.s.gifshow.com/user/" + id);
    }
    catch (e) {
        console.log("访问用户页面出现网络错误");
    }
    let $ = cheerio.load(response.data);
    let $feedList = $(".feed-list");
    if ($feedList.length < 1) {
        console.log("用户页面错误");
    }
    else {
        console.log("访问用户页面成功");
    }
}


async function getFeedPage (url) {
    let response;
    try {
        response = await axios.get(url);
    }
    catch (e) {
        console.log("访问作品页面出现网络错误");
    }
    let $ = cheerio.load(response.data);
    let $videoWarp = $(".video-wrap");
    if ($videoWarp.length < 1) {
        console.log("作品页面错误");
    }
    else {
        console.log("访问作品页面成功");
    }   
}

function sleep (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


(async () => {
    for (let i = 0; i < 100; ++i) {
        console.log(i + 1);
        await getUserPage(3);
        await sleep(10000);
        await getFeedPage("http://www.kuaishou.com/photo/1XPaCXnlajP7KKLZiDPKv7cQ/1XYbUaSReeL-tX2iWkbNWmmw?f=pc_live");
        await sleep(10000);

        // let $ = cheerio.load(response.data);
        // let $feedList = $(".feed-list");
        
        // if ($feedList.length > 0) {
        //     let $lis = $feedList.children("li");
        //     for (let i = 0; i < $lis.length; ++i) {
        //         let $li = $lis.eq(i);
        //         let $a = $li.find("a");
        //         let url = "http:" + $a.attr("href");

        //         let feedPage;
        //         try {
        //             feedPage = await axios.get("http://www.kuaishou.com/photo/1XPaCXnlajP7KKLZiDPKv7cQ/1XYbUaSReeL-t9DQsDwvkrSg?f=pc_live");
        //         }
        //         catch (e) {

        //         }
        //         let $ = cheerio.load(test.data);
        //         let video = $("video");
        //         console.log(video.attr("src"));
        //     }
        // }
        // else {
        //     console.log("页面出错");
        // }
    }
})();