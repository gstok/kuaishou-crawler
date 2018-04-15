
const axios = require('axios');
const cheerio = require('cheerio');


(async () => {
    for (let i = 0; i < 100; ++i) {
        let response;
        try {
            response = await axios.get("http://yongzhou.s.gifshow.com/user/321375148");
        }
        catch (e) {
            console.log("网络访问出错");
        }
        let $ = cheerio.load(response.data);
        let $feedList = $(".feed-list");
        
        if ($feedList.length > 0) {
            let $lis = $feedList.children("li");
            for (let i = 0; i < $lis.length; ++i) {
                let $li = $lis.eq(i);
                let $a = $li.find("a");
                let url = "http:" + $a.attr("href");

                let test = await axios.get("http://www.kuaishou.com/photo/1XPaCXnlajP7KKLZiDPKv7cQ/1XYbUaSReeL-t9DQsDwvkrSg?f=pc_live");
                let $ = cheerio.load(test.data);
                let video = $("video");
                console.log(video.attr("src"));
            }
        }
        else {
            console.log("页面出错");
        }


        await (new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 100);
        }));
    }
})();