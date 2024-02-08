//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// Korean Specific Surfing Keys config                                                          //
// Version - 1.0 - debug copy all tab urls                                                      //
// Korean specific surfing key config                                                           //
// Please copy this url to text box [load settings from:], and 'Save'                           //
// https:   raw.githubusercontent.com/mindgitrwx/gitconventions/master/SurfingKeys-config-ko.js //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////


// ------------ for page moving -------------- (every time it would be returned zero when refreshed)
var namuPage = 0;
wikiPage = 0;
stackAnswer = 0;
naverAnswer = 0;
codeWrapper = 0;
lineNum = 0;

var linkCounter = 0;

// Properties list
api.Hints.numericHints = false;
// api.Hints.characters             = "asdfgqwertzxcvbyuiopmnhlk";  // without j for esc (TODO: jj for esc when hints mode)
api.Hints.scrollKeys = "G";
settings.caseSensitive = true;
settings.omnibarSuggestion = true;
settings.defaultSearchEngine = 'L';                          // Google I'm Feeling Luckey
settings.nextLinkRegex = /((forward|>>|next)+)/i;
settings.prevLinkRegex = /((back|<<|prev(ious)?)+)/i;
settings.tabsThreshold = 0;
////////////////////////////////
// api.unapi.map default key api.mapings  //
////////////////////////////////
api.unmap('<Ctrl-6>');
// api.cmap('<Ctrl-p>');
// api.cmap('<Ctrl-n>');
api.unmap('<Ctrl-p>');
api.unmap('<Ctrl-n>');
api.map(']', ']]');
api.map('[', '[[');


// My default vim key binding: https://gist.github.com/millermedeiros/1262085
//--Like Nerd Tree--- TODO: FIX IT LIKE VERTICALLY
// api.map(',nt', 'T');
// api.map(',q', 'x');
// api.mapkey(',s', 'opne new tab and split', function () {
//     RUNTIME("newWindow");
// });
api.cmap('<Ctrl-j>', '<Ctrl-n>');
api.cmap('<Ctrl-k>', '<Ctrl-p>');
//TODO: making spell check ,ts

// FIXME: it doesn't work
// iapi.map('<Ctrl-[>', "<Esc>");
// api.vmap('<Ctrl-[>', "<Esc>");

api.removeSearchAlias('g');
api.removeSearchAlias('w');
api.removeSearchAlias('s');

//////////////////////////
// for url heml extract //
//////////////////////////

// var request = require('request'),
//     cheerio = require('cheerio');

// request(url, function (err, res, html) {
//     if (!err) {
//         var $ = cheerio.load(html);
//     }
// })

// 광고차단 즉시 실행
//
// (function stop(){
// document.getElementById('slide-close').click(); // NULL 실행 안됨
// document.getElementByClassName('slide-close').click();
// })();

let zenModeActive = false;
let originalStyles = []; // Store the original styles to restore later

// Function to restore styles
function restoreStyles() {
    originalStyles.forEach(({ el, style }) => {
        el.style.opacity = style.opacity; // Restore original opacity
    });
    originalStyles = []; // Clear the array after resetting styles
}

function applyZenModeToElement(targetElement) {
    let parentElements = [];
    for (let el = targetElement; el; el = el.parentElement) {
        parentElements.push(el);
    }

    document.querySelectorAll('body *').forEach(function (el) {
        if (!parentElements.includes(el) && el.tagName !== 'SCRIPT' && el.tagName !== 'NOSCRIPT') {
            originalStyles.push({ el, style: { opacity: el.style.opacity } }); // Save original opacity
            el.style.opacity = '0.1'; // Dim non-focused elements
        }
    });

    originalStyles.push({ el: targetElement, style: { opacity: targetElement.style.opacity } }); // Save targetDiv's original opacity
    targetElement.style.opacity = '1'; // Ensure the targetDiv is fully visible
}

api.mapkey('Z', 'Toggle Zen Mode', function () {
    if (zenModeActive) {
        restoreStyles();
        zenModeActive = false;
    } else {
        // Use Hints.create to allow selection of a div
        api.Hints.create('div', function (element) {
            let targetDiv = element instanceof HTMLElement && element.tagName === 'DIV' ? element : element.closest('div');

            if (targetDiv) {
                applyZenModeToElement(targetDiv);
                console.log(targetDiv)
                zenModeActive = true;
            } else {
                console.error('Zen Mode: No target div found.');
            }
        });
    }
});


api.mapkey('os', '#8Open Search Engines Omnibar', function () {
    Front.openOmnibar({ type: "SearchEngine", extra: "searchEngines" });
});

api.mapkey('on', '#3Open newtab', function () {
    api.tabOpenLink("www.google.com"); // TODO: addded api, but not work
});

api.mapkey('sfr', '#13show failed web requests of current page', function () {
    runtime.command({
        action: 'getTabErrors'
    }, function (response) {
        if (response.tabError && response.tabError.length) {
            var errors = response.tabError.map(function (e) {
                var url = new URL(e.url);
                return "<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>".format(e.error, e.type, url.host);
            });
            Front.showPopup("<table style='width:100%'>{0}</table>".format(errors.join('')));
        } else {
            Front.showPopup("No errors from webRequest.");
        }
    });
});

// TODO: to try think conflict prefix g,c (google and github)
//General
api.addSearchAlias('L', 'Im feeling lucky', 'https://duckduckgo.com/?q=\\');
api.addSearchAlias('D', 'download', 'https://www.google.com/search?q=download+');
api.addSearchAlias('G', 'google', 'https://www.google.com/search?q=');

//Google 
api.addSearchAlias(
    "gm",
    "Google Month",
    "https://www.google.com/search?q={0}&tbs=qdr:m",
);
api.addSearchAlias(
    "gw",
    "Google Week",
    "https://www.google.com/search?q={0}&tbs=qdr:w",
);
api.addSearchAlias(
    "gy",
    "Google Year",
    "https://www.google.com/search?q={0}&tbs=qdr:y",
);
api.addSearchAlias(
    "gd",
    "Google Day",
    "https://www.google.com/search?q={0}&tbs=qdr:d",
);
api.addSearchAlias(
    "gH",
    "Google Hour",
    "https://www.google.com/search?q={0}&tbs=qdr:h",
);
api.addSearchAlias(
    "gsh",
    "Google Search History",
    "https://myactivity.google.com/myactivity?authuser=0&q={0}",
);
api.addSearchAlias(
    "gi",
    "Google Images",
    "https://www.google.com/search?q={0}&tbm=isch",
);

api.addSearchAlias(
    "os",
    "One Search",
    "https://historysearch.com/search/list?q={0}",
);
api.addSearchAlias(
    "Hs",
    "History Search",
    "https://historysearch.com/search/list?q={0}",
);
//ai
api.addSearchAlias('af', 'futurepedia', 'https://www.futurepedia.io/?searchTerm=');
api.addSearchAlias('Y', 'you', 'https://you.com/search?q=');
api.addSearchAlias('ap', 'perplexity', 'https://www.perplexity.ai/?q=');

//Microsoft
api.addSearchAlias('b', 'bing', 'https://www.bing.com/search?q=');

//GoogleTrand
api.addSearchAlias('gT', 'google trend', 'trends.google.com/trends/explore?q=');
api.addSearchAlias('gtK', 'google trend Korea', 'trends.google.com/trends/explore?geo=KR&q=');
api.addSearchAlias('gtU', 'google trend USA', 'trends.google.com/trends/explore?geo=US&q=');
api.addSearchAlias('gtI', 'google trend India', 'trends.google.com/trends/explore?geo=IN&q=');

//api
api.addSearchAlias('gM', 'Google map', 'https://www.google.com/maps?q=');
api.addSearchAlias('R', '도로명주소', 'http://www.juso.go.kr/support/AddressMainSearch.do?searchType=location_newaddr&searchKeyword=');

// network
api.addSearchAlias('ip', 'ipinfo', 'https://ipinfo.io/');

//coding -- 미완성
api.addSearchAlias('C', 'search coding', 'https://searchcode.com/?q=');
api.addSearchAlias('cA', 'Alternative', 'https://alternativeto.net/browse/search?q=');
api.addSearchAlias('cC', 'search coding', 'https://searchcode.com/?q=');
api.addSearchAlias('cW', 'chrome webstore', 'https://chrome.google.com/webstore/search/'); // chrome
api.addSearchAlias('cr', 'rfc search', 'https://rfc.fyi/?search=');
api.addSearchAlias('rfC', 'rfc search', 'https://rfc.fyi/?search=');
api.addSearchAlias('cs', 'codesandbox (online interactive IDE)', 'https://codesandbox.io/search?query=');
api.addSearchAlias('cS', 'slant (editor 비교 사이트)', 'https://www.slant.co/search?query=');
api.addSearchAlias(
    "gH",
    "GitHub Repositories",
    "https://github.com/search?q={0}&type=repositories",
);
api.addSearchAlias(
    "ghC",
    "GitHub Commits",
    "https://github.com/search?q={0}&type=code",
);
api.addSearchAlias(
    "ghi",
    "GitHub Issues",
    "https://github.com/search?q={0}&type=issues",
);
api.addSearchAlias(
    "ghd",
    "GitHub Discussions",
    "https://github.com/search?q={0}&type=discussions",
);
api.addSearchAlias(
    "ghr",
    "GitHub Registry",
    "https://github.com/search?q={0}&type=registrypackages",
);
api.addSearchAlias(
    "ghm",
    "GitHub Marketplace",
    "https://github.com/search?q={0}&type=marketplace",
);
api.addSearchAlias(
    "ght",
    "GitHub Topics",
    "https://github.com/search?q={0}&type=topics",
);
api.addSearchAlias(
    "ghw",
    "GitHub Wiki",
    "https://github.com/search?q={0}&type=wikis",
);
api.addSearchAlias(
    "ghu",
    "GitHub Users",
    "https://github.com/search?q={0}&type=users",
);
api.addSearchAlias('ghS', 'githubStars', 'https://github.com/mindgitrwx?page=1&q=face&tab=stars&utf8=%E2%9C%93&utf8=%E2%9C%93&q=');

// slides
api.addSearchAlias('ss', 'slideshare', 'https://www.slideshare.net/search/slideshow?searchfrom=header&q=');

api.addSearchAlias('sd', 'soundsnap', 'https://www.soundsnap.com/search/audio/');


// Front-end development references
api.addSearchAlias('lt', 'tailwind', 'https://duckduckgo.com/?q=!ducky+tailwind');
api.addSearchAlias('ln', 'Next.js', 'https://duckduckgo.com/?q=!ducky+Next.js');
api.addSearchAlias('lm', 'MDN', 'https://duckduckgo.com/?q=!ducky+MDN');
api.addSearchAlias('lT', 'TypeScript', 'https://duckduckgo.com/?q=!ducky+TypeScript');
api.addSearchAlias('lR', 'React', 'https://duckduckgo.com/?q=!ducky+React');
// Add more aliases for other front-end development references here


//sentence search
api.addSearchAlias('S', 'sentencestack', 'https://sentencestack.com/q/');

//book
api.addSearchAlias('bS', 'snu library', 'https://primoapac01.hosted.exlibrisgroup.com/primo-explore/search?vid=82SNU&query=any,contains,');
api.addSearchAlias('bY', 'yonsei library', 'https://library.yonsei.ac.kr/main/searchBrief?q=');
api.addSearchAlias('bP', 'pnu library', 'https://lib.pusan.ac.kr/en/resource/?query=');

//rate
api.addSearchAlias('rmA', 'rate your music artist', 'https://rateyourmusic.com/search?bx=82d55e544de2ee5b27b2fd0e7153bbee&searchtype=a&searchterm=');
api.addSearchAlias('rmR', 'rate your music releases', 'https://rateyourmusic.com/search?bx=dfd8f4911473234b6e1362952e1b29e4&searchtype=l&searchterm=');

//sns
api.addSearchAlias('fB', 'faceBook', 'https://www.facebook.com/search/top/?q=');
api.addSearchAlias('tW', 'tWitter', 'https://twitter.com/search?q=');
api.addSearchAlias('ig', 'InstaGram HashTag', 'https://www.instagram.com/explore/tags/');
api.addSearchAlias('rD', 'redDit', 'https://www.reddit.com/search?q=');

//shorten - what is.. who is.. where is..
api.addSearchAlias('wA', 'advanced', 'https://www.google.com/search?q=advanced+');
api.addSearchAlias('wB', 'basic', 'https://www.google.com/search?q=basic+');
api.addSearchAlias('wC', '분류', 'https://www.google.com/search?q=classification+of+');
api.addSearchAlias('wD', '차이점', 'https://www.google.com/search?q=difference+between+');
api.addSearchAlias('wE', '예제', 'https://www.google.com/search?q=example+of+');
api.addSearchAlias('wF', '어디서부터', 'https://www.google.com/search?q=where+from+');
api.addSearchAlias('wG', '목적', 'https://www.google.com/search?q=what+is+goal+of+');
api.addSearchAlias('wH', '역사', 'https://www.google.com/search?q=history+of+');
api.addSearchAlias('wI', '소개', 'https://www.google.com/search?q=Introduction+of+');
api.addSearchAlias('wJ', '직업', 'https://www.google.com/search?q=jo+of+');
api.addSearchAlias('wK', '한국', 'https://www.google.com/search?q=Korea+');
api.addSearchAlias('wL', '리스트', 'https://www.google.com/search?q=list+of+');
api.addSearchAlias('wM', '방법', 'https://www.google.com/search?q=method+of+');
api.addSearchAlias('wm', '뜻', 'https://www.google.com/search?q=what+is+the+meaning+of+');
api.addSearchAlias('wN', '이름', 'https://www.google.com/search?q=name+of+');
api.addSearchAlias('wO', '순서', 'https://www.google.com/search?q=order+of+');
api.addSearchAlias('wP', '문제', 'https://www.google.com/search?q=problem+of+');
api.addSearchAlias('wQ', '질문', 'https://www.google.com/search?q=questions+of+');
api.addSearchAlias('wR', '랭킹', 'https://www.google.com/search?q=rank+of+');
api.addSearchAlias('wS', '공통점', 'https://www.google.com/search?q=common+point+of+');
api.addSearchAlias('wT', '표', 'https://www.google.com/search?q=q=table+of+');
api.addSearchAlias('wU', '사용예', 'https://www.google.com/search?q=usage+of+');
api.addSearchAlias('wW', '사용예', 'https://www.google.com/search?q=usage+of+');
api.addSearchAlias('wX', '사용예', 'https://www.google.com/search?q=usage+of+');
api.addSearchAlias('wY', '사용예', 'https://www.google.com/search?q=usage+of+');
api.addSearchAlias('wZ', '사용예', 'https://www.google.com/search?q=usage+of+');

//file
api.addSearchAlias('pdF', 'pdf', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Apdf+');
api.addSearchAlias('cpP', 'cpp', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Acpp+');
api.addSearchAlias('hwP', 'hwp', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Ahwp+');
api.addSearchAlias('ppT', 'ppt', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Appt+');
api.addSearchAlias('giF', 'gif', 'https://giphy.com/search/');

//translation
api.addSearchAlias('t', 'tlanslate Hangle to English 한글영어번역', 'https://translate.google.co.kr/?hl=ko#ko/en/');
api.addSearchAlias('T', 'tlanslate English to Hangle 영어한글번역', 'https://translate.google.co.kr/?hl=ko#en/ko/');
api.addSearchAlias('tA', 'tlanslate All 네이버사전all', 'http://dic.naver.com/search.nhn?dicQuery=');
api.addSearchAlias('tE', 'tlanslate Examples 네어버사전example', 'http://endic.naver.com/search_example.nhn?sLn=kr&query=');
api.addSearchAlias('tL', 'tlanslate lyrics 가사해석', 'https://www.google.com/search?q=가사+해석+');
api.addSearchAlias('ll', '가사', 'https://www.google.com/search?q=lyrics+of+');

//TODO: 검색을 통해서 google tlanslated 된 걸 clipboard에 복사 붙여넣는 것 만들기
api.addSearchAlias('ty', '한글영어번역', 'https://translate.google.co.kr/?hl=ko#ko/en/');
api.addSearchAlias('Ty', '영어한글번역', 'https://translate.google.co.kr/?hl=ko#en/ko/');

//naver : naver is one of the most famous potal site of korea
api.addSearchAlias('N', 'naver', 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=');
api.addSearchAlias('nM', 'navermap', 'https://map.naver.com/?query=');
api.addSearchAlias('nA', 'naver all 네이버사전all', 'https://dict.naver.com/dict.search?query=');
api.addSearchAlias('nD', 'naver Dictionary 네이버사전all', 'https://dict.naver.com/dict.search?query=');
api.addSearchAlias('nE', 'naver Example 네어버사전example', 'http://endic.naver.com/search_example.nhn?sLn=kr&query=');

//Daum : daum is one of the most famous potal site of korea
api.addSearchAlias('D', '다음', 'https://search.daum.net/search?w=');
api.addSearchAlias('dA', '다음 사전all', 'http://dic.daum.net/search.do?q=');
api.addSearchAlias('dD', '다음 사전all', 'http://dic.daum.net/search.do?q=');
api.addSearchAlias('dE', '다음 사전example', 'http://endic.naver.com/search_example.nhn?sLn=kr&query=');
api.addSearchAlias('dM', '다음 map', 'http://local.daum.net/map/index.jsp?q=');

//Shopping : without amazon, all the sites are korean-specific sites.
api.addSearchAlias('aZ', '아마존', 'https://www.amazon.com/s?k=');
api.addSearchAlias('sA', 'shop아마존', 'https://www.amazon.com/s?k='); // gmarket 과 자리를 바꿔야 할 지 고민
api.addSearchAlias('sE', 'shopEbay', 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=');
api.addSearchAlias('sC', 'shop 쿠팡', 'http://www.coupang.com/np/search?component=&q=');
api.addSearchAlias('sI', 'shop 인터파크', 'http://isearch.interpark.com/isearch?q=');
api.addSearchAlias('sY', 'shop yes24', 'http://www.yes24.com/searchcorner/Search?keywordAd=&keyword=&domain=ALL&qdomain=%C0%FC%C3%BC&Wcode=001_005&query=');

//music
api.addSearchAlias('msC', 'soundcloud', 'https://soundcloud.com/search?q=');
api.addSearchAlias('msI', 'soundcloudid', 'https://soundcloud.com/');
api.addSearchAlias('mS', 'spotify', 'https://open.spotify.com/search/results/');
api.addSearchAlias('msA', 'spotify Albums', 'https://open.spotify.com/search/albums/');
api.addSearchAlias('mL', 'meLon', 'https://www.melon.com/search/total/index.htm?q=');
api.addSearchAlias('mfM', 'lastFm', 'https://www.last.fm/search?q=');
api.addSearchAlias('mH', 'Hiphople', 'http://hiphople.com/index.php?_filter=search&mid=lyrics&search_keyword=');
api.addSearchAlias('mG', 'Genius', 'https://genius.com/search?q=');
api.addSearchAlias('mP', 'Pitchfork', 'https://pitchfork.com/search/?query=');
api.addSearchAlias('mC', 'metaCritic', 'http://www.metacritic.com/search/all/');

//Video
api.addSearchAlias('y', 'youtube', 'https://www.youtube.com/results?search_query=');
api.addSearchAlias('yg', 'youglish', 'https://youglish.com/pronounce/');
api.addSearchAlias('ul', 'underline', 'https://underline.io/library/search?query=');


//Wiki
api.addSearchAlias('nW', '나무위키', 'https://namu.wiki/w/');
api.addSearchAlias('eW', '영문위키', 'https://www.wikiwand.com/en/');
api.addSearchAlias('kW', '한글위키', 'https://www.wikiwand.com/ko/');

//papaers
api.addSearchAlias('pS', 'paper copilot (SCISPACE)', 'https://typeset.io/search?q=');
api.addSearchAlias('pG', 'paper 구글 스콜라', 'https://scholar.google.co.kr/scholar?hl=ko&as_sdt=0%2C5&q=');
api.addSearchAlias('pB', 'paper (biology) nCBI', 'http://www.ncbi.nlm.nih.gov/search/?term=');
api.addSearchAlias('pR', 'paper RISS', 'http://www.riss.kr/search/Search.do?detailSearch=false&searchGubun=true&strQuery=&queryText=&exQuery=&colName=all&query=');
api.addSearchAlias('pE', 'paper ELSEVIER', 'https://www.elsevier.com/search-results?query=');
api.addSearchAlias('pC', 'paper with code', 'https://paperswithcode.com/search?q_meta=&q_type=&q=');
api.addSearchAlias('pN', 'paper Nature', 'https://www.nature.com/search?q=');

// FIXME: focus 관련 명령어는 바로 redirect 되지 않음
api.mapkey('osA', '#7 open stackoverflow ask', function () {
    window.location.replace("https://stackoverflow.com/questions/ask");
    //It cannot be happened document.getElementById('title').focus();      // 제목에 포커스
    //
    //document.getElementById('wmd-input').focus();
});

api.mapkey('ouA', '#7 open ubuntu ask', function () {
    window.location.replace("https://askubuntu.com/questions/ask");
    //It cannot be happened document.getElementById('title').focus();      // 제목에 포커스
    //
    //document.getElementById('wmd-input').focus();
});

// api.mapkey('oo', '#7 open chatgpt4 ', function () {
//     window.location.replace("https://chat.openai.com/?model=gpt-4")
// });

// api.mapkey('oO', '#7 open chatgpt ', function () {
//     window.location.replace("https://chat.openai.com")
// });

api.mapkey('ll', '#7 open twitter like ', function () {
    window.location.replace("https://twitter.com/mindgitrwx/likes")
});

api.mapkey('oSA', '#7 open stackoverflow ask', function () {
    window.location.replace("https://stackoverflow.com/questions/ask").getElementById('wmd-input').addEventListener('paste', handlePaste).focus();
    // It cannot be happened
    // document.getElementById('wmd-input').addEventListener('paste',handlePaste).focus();
});

api.mapkey('oR', '#7 open reddit write', function () {
    window.location.replace("https://www.reddit.com/submit");
});

api.mapkey('oGM', '#7 open gmail send ', function () {
    window.location.replace("https://mail.google.com/mail/u/1/#inbox?compose=new")
});

api.mapkey('oGD', '#7 open google docs send ', function () {
    window.location.replace("https://docs.google.com/document/u/0/")
});

api.mapkey('oGI', '#7 open gist', function () {
    window.location.replace("https://gist.github.com/")
});

api.mapkey('oP', '#7 open pastebin', function () {
    window.location.replace("https://pastebin.com/")
});

api.mapkey('oGB', '#7 open google Book', function () {
    window.location.replace("https://books.google.com/books?")
});

api.mapkey('oK', '#7 open kindle', function () {
    window.location.replace("https://read.amazon.com/")
});

api.mapkey('Q', '#1Click on an Image or a button', function () {
    function imageToBlob(imageURL) {
        const img = new Image;
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        img.crossOrigin = "";
        img.src = imageURL;
        return new Promise(resolve => {
            img.onload = function () {
                c.width = this.naturalWidth;
                c.height = this.naturalHeight;
                ctx.drawImage(this, 0, 0);
                c.toBlob((blob) => {
                    https://www.w3.org/          // here the image is a blob
                    resolve(blob);
                }, "image/png", 0.75);
            };
        });
    }
    async function copyImage(imageURL) {
        const blob = await imageToBlob(imageURL);
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
    }
    api.Hints.create("img, button", function (element) {
        copyImage(element.src);
    });
});

api.mapkey('gq', '#1get image address with wget', function () {
    async function copyImageAddress(imgAddress) {
        imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "ico", "tiff", "tif", "jfif", "pjpeg", "pjp", "avif", "apng"];
        // if imgAddress string has imageFormats, then cut the trailing address after the imageFormats
        for (var i = 0; i < imageFormats.length; i++) {

            if (imgAddress.includes(imageFormats[i])) {
                imgAddress = imgAddress.split(imageFormats[i])[0] + imageFormats[i];
                api.Clipboard.write("wget " + imgAddress);
                break;
            }
        }
    }
    api.Hints.create("img, button", function (element) {
        copyImageAddress(element.src);
    });
});

// wiki를 copy 할때 [1] 이런 정보가 나오는 것이 annoying 하므로 없애준다.
api.vmapkey('y', "copy without reference notation on wikipedia", function () {
    api.Clipboard.write(window.getSelection().toString().replace(/\[[0-9]*\]/g, "test")); // TODO: 동작하지 않음
}, {
    domain: /www\.wikiwand\.com/i
}); // TODO: 여러 도메인을 한꺼번에 집어 넣는 것 추가해야 함

api.mapkey('ymr', '#7Copy multiple link regex URLs to the clipboard', function () {
    var linksToYank = [];
    api.Hints.create('*[href]', function (element) {
        linksToYank.push('domain: ' + '\/' + element.href.slice(8,).split('/')[0].replace(/\./g, "\\\.") + '\/' + 'i');
        api.Clipboard.write(linksToYank.join('\n'));
    }, {
        multipleHits: true
    });
});

// Map 'yg' to copy the git clone command for GitHub repositories
api.mapkey("yg", "Copy git clone command", function () {
  // Check if the current page is a GitHub repository
  if (/github\.com/i.test(window.location.href)) {
    // Construct the git clone command
    var gitCommand = "git clone " + window.location.href + ".git";

    // Copy the command to the clipboard
    api.Clipboard.write(gitCommand);

    // Optionally, you can display a message to the user
    api.Front.showBanner(`Copied to clipboard: ${gitCommand}`);
  } else {
    api.Front.showBanner("Not a GitHub repository page", 3000);
  }
});

// api.mapkey('yg', '#7 git blog', function () {
//     var address = window.location.href.split(".");
//     var githubId = address[0].replace(/(^\w+:|^)\/\//, '');
//     var githubAddress = 'github.com' + '/' + githubId;
//     api.Clipboard.write(githubAddress);
//     window.location.href(githubAddress);
// })

//TODO: git clone , get id
api.mapkey('yG', '#7 git clone', function () {
    api.Clipboard.write('git clone ' + window.location.href + '.git');
}, {
    domain: /github\.com/i
});

api.mapkey('yeI', '#7 Yank Element ID', function () {
    api.Hints.create("", function (element) {
        api.Clipboard.write(element.id);
    });
});

api.mapkey('yeC', '#7 Yank Element Class Name', function () {
    api.Hints.create("", function (element) {
        api.Clipboard.write(element.className);
    });
});

api.mapkey('yeT', '#7 Yank Element Type', function () {
    api.Hints.create("", function (element) {
        api.Clipboard.write(element.type);
    });
});

api.mapkey('yeS', '#7 Yank Element Style', function () {
    api.Hints.create("", function (element) {
        api.Clipboard.write(element.style);
    });
});

api.mapkey('yeA', '#7 Yank Element Alt', function () {
    api.Hints.create("", function (element) {
        api.Clipboard.write(element.alt);
    });
});

api.mapkey('ymE', '#7 Yank Multiple Element info  (copy multiple link element id or classname)', function () {
    var linksToYank = [];
    api.Hints.create('*[href]', function (element) {

        linksToYank.push('id: ' + element.id + '\n');
        linksToYank.push('innertext: ' + element.innerText + '\n');
        linksToYank.push('className: ' + element.className + '\n');
        (api.Clipboard.write(linksToYank.join('\n')));
    }, {
        multipleHits: true
    });
});

api.mapkey('yE', '#7 Yank Element info. copy link element id or classname', function () {
    var linksToYank = [];
    api.Hints.create("", function (element) {
        linksToYank.push('id: ' + element.id + '\n');
        linksToYank.push('innertext: ' + element.innerText + '\n');
        linksToYank.push('className: ' + element.className + '\n');
        linksToYank.push('href: ' + element.href + '\n');
        linksToYank.push('type: ' + element.type + '\n');
        linksToYank.push('style: ' + element.style + '\n');
        linksToYank.push('src: ' + element.src + '\n');
        linksToYank.push('alt: ' + element.alt + '\n');
        (api.Clipboard.write(linksToYank.join('\n')));
    });
});

api.mapkey('ymR', '#7Copy multiple link Regex URLs to the clipboard and add commas', function () {
    var linksToYank = [];
    api.Hints.create('*[href]', function (element) {
        if (linkCounter === 0) {
            api.Clipboard.write('{')
        }
        linksToYank.push('"' + element.href + '"',);
        api.Clipboard.write(linksToYank.join('\n'));
        linkCounter++;
    }, {
        multipleHits: true
    });
});

// Copy url as regex of SurfingKeys
api.mapkey('yr', "Copy url as regex", function () {
    api.Clipboard.write('domain: ' + '\/' + window.location.href.slice(8,).split('/')[0].replace(/\./g, "\\\.") + '\/' + 'i');
});


// pre is often used for insert codeblocks on webpage. some code blocks just in pre,
// yQ와 동일함
api.mapkey('gyq', "Copy first pre and exist", function () {
    var cssSelector = "pre";

    var elements = getVisibleElements(function (e, v) {
        if (e.matches(cssSelector)) {
            v.push(e);
        }
    });
    if (elements.length === 0 &&
        document.querySelector(cssSelector) !== null) {
        document.querySelector(cssSelector).scrollIntoView();
        elements = getVisibleElements(function (e, v) {
            if (e.matches(cssSelector)) {
                v.push(e);
            }
        });
    }
    api.Clipboard.write(elements[0].innerText);
    RUNTIME("closeTab");
});
api.mapkey('yQ', "Copy first pre", function () {
    var cssSelector = "pre";

    var elements = getVisibleElements(function (e, v) {
        if (e.matches(cssSelector)) {
            v.push(e);
        }
    });
    if (elements.length === 0 &&
        document.querySelector(cssSelector) !== null) {
        document.querySelector(cssSelector).scrollIntoView();
        elements = getVisibleElements(function (e, v) {
            if (e.matches(cssSelector)) {
                v.push(e);
            }
        });
    }
    api.Clipboard.write(elements[0].innerText);
});

// for get search url
api.mapkey('yk', "Copy url before Keyowrd insertion", function () {
    api.Clipboard.write(window.location.href.split('=')[0] + '=');
});
// surrounded
api.mapkey('"yy', "surround url with double quotation mark", function () {
    api.Clipboard.write('"' + window.location.href + '"');
});
// for get badename
api.mapkey('yb', "Copy basename url (last path)", function () {
    api.Clipboard.write(window.location.href.split('/').pop());
});

//////////////////////////////////////////////////////////
// visualmode setting - vsual mode에 진입했을 때 동작가능 //
//////////////////////////////////////////////////////////
api.vmapkey('"y', "surround selection with doube quotation mark", function () {
    api.Clipboard.write('"' + window.getSelection().toString().replace(/\n/g, " ") + '"');
});
api.vmapkey('<y', "surround selection ", function () {
    api.Clipboard.write('<' + window.getSelection().toString() + '>');
});
api.mapkey('(y', "surround selection ", function () {
    api.Clipboard.write('(' + window.getSelection().toString() + ')');
});
api.mapkey('[y', "surround selection ", function () {
    api.Clipboard.write('[' + window.getSelection().toString() + ']');
});
api.vmapkey('{y', "surround selection ", function () {
    api.Clipboard.write('{' + window.getSelection().toString() + '}');
});
api.vmapkey('/*y', "surround selection ", function () {
    api.Clipboard.write('/*' + window.getSelection().toString() + '*/');
});
api.vmapkey('<--!y', "surround selection ", function () {
    api.Clipboard.write('<--!' + window.getSelection().toString() + '-->');
});
api.vmapkey('~y', "surround selection ", function () {
    var UpperSelected = window.getSelection().toString()
    api.Clipboard.write(UpperSelected.toUpperCase());
});
api.vmapkey('~jy', "Remove enter", function () {
    api.Clipboard.write(window.getSelection().toString().replace(/\n/g, " "));
});
api.vmapkey('~cy', "Added comma", function () {
    api.Clipboard.write(window.getSelection().toString().replace(/[ ,]+/g, ","));
});
api.vmapkey('~dy', "Delete first 1 character", function () {
    api.Clipboard.write(window.getSelection().toString().substr(1));
});
api.vmapkey('~Dy', "Delete surrounded", function () {
    api.Clipboard.write(window.getSelection().toString().slice(1, -1));
});
api.vmapkey('~sy', "Remove special character (blank is not considered as special character", function () { //TODO: Black is not work
    api.Clipboard.write(window.getSelection().toString().replace(/[^A-Z0-9:blank:]/ig, ""));
});
api.vmapkey('~dy', "Markdown Strikethrough", function () {
    api.Clipboard.write('~~ ' + window.getSelection().toString() + ' ~~');
});

// markdown
api.vmapkey('miy', "Markdown italic", function () {
    api.Clipboard.write('*' + window.getSelection().toString() + '*');
});
api.vmapkey('mby', "Markdown bold", function () {
    api.Clipboard.write('**' + window.getSelection().toString() + '**');
});
api.vmapkey('mly', "Markdown link", function () {
    api.Clipboard.write('[replaceit](' + window.getSelection().toString() + ')');
});
api.vmapkey('msy', "Markdown Strikethrough", function () {
    api.Clipboard.write('~~ ' + window.getSelection().toString() + ' ~~');
});
// etc
api.mapkey('"yma', '#7Copy multiple link URLs to the clipboard', function () {
    var linksToYank = [];
    api.Hints.create('*[href]', function (element) {
        linksToYank.push('"' + element.href + '"');
        api.Clipboard.write(linksToYank.join('\n'));
    }, {
        multipleHits: true
    });
});

//setting
api.mapkey('gs', '#12 go Setting - Open Chrome Settings', function () {
    tabOpenLink("chrome://settings/");
});
api.mapkey('gE', '#12 go Extensions - Open Chrome extensions Shortcut setting', function () {
    tabOpenLink("chrome://extensions/shortcuts");
});
// intellij bind
api.mapkey('<Ctrl-Alt-s>', '#12Open Chrome Settings', function () {
    tabOpenLink("chrome://settings/");
});

api.map('<Ctrl-V>', 'sm'); // markdown preview

api.mapkey('D', '', function () {
    pageHeadLine = document.querySelectorAll("pre");
    if (pageHeadLine.length > codeWrapper) {
        codeWrapper++;
    }
    pageHeadLine[codeWrapper].scrollIntoView();
});
api.mapkey('U', '', function () {
    pageHeadLine = document.querySelectorAll("pre");
    if (0 < codeWrapper) {
        codeWrapper--;
    }
    pageHeadLine[codeWrapper].scrollIntoView();
});

api.mapkey('D', '나무위키 목차 대단위 다운스크롤', function () {
    pageHeadLine = document.querySelectorAll(".wiki-heading");
    if (pageHeadLine.length > namuPage) {
        namuPage++;
    }
    pageHeadLine[namuPage].scrollIntoView();
}, {
    domain: /namu\.wiki/i
});
api.mapkey('U', '나무위키 목차 대단위 up스크롤', function () {
    pageHeadLine = document.querySelectorAll(".wiki-heading");
    if (0 < namuPage) {
        namuPage--;
    }
    pageHeadLine[namuPage].scrollIntoView();
}, {
    domain: /namu\.wiki/i
});

api.mapkey('D', '위키 목차 대단위 다운스크롤', function () {
    pageHeadLine = document.querySelectorAll(".mw-headline");
    if (pageHeadLine.length > wikiPage) {
        wikiPage++;
    }
    wikiPage++;
    pageHeadLine[wikiPage].scrollIntoView();
}, {
    domain: /\.wikipedia\.org/i
});
api.mapkey('U', '위키 목차 대단위 up스크롤', function () {
    pageHeadLine = document.querySelectorAll(".mw-headline");
    if (0 < wikiPage) {
        wikiPage--;
    }
    pageHeadLine[wikiPage].scrollIntoView();
}, {
    domain: /\.wikipedia\.org/i
});


api.mapkey('D', '위키 목차 대단위 다운스크롤', function () {
    pageHeadLine = document.querySelectorAll(".mw-headline");
    if (pageHeadLine.length > wikiPage) {
        wikiPage++;
    }
    wikiPage++;
    pageHeadLine[wikiPage].scrollIntoView();
}, {
    domain: /en\.wiktionary\.org/i
});

api.mapkey('U', '위키 목차 대단위 up스크롤', function () {
    pageHeadLine = document.querySelectorAll(".mw-headline");
    if (0 < wikiPage) {
        wikiPage--;
    }
    pageHeadLine[wikiPage].scrollIntoView();
}, {
    domain: /en\.wiktionary\.org/i
});
api.mapkey('D', 'wikiwand 목차 대단위 스크롤 ', function () {
    pageHeadLine = document.querySelectorAll(".mw-headline");
    if (pageHeadLine.length > wikiPage) {
        wikiPage++;
    }
    pageHeadLine[wikiPage].scrollIntoView();
}, {
    domain: /www\.wikiwand\.com/i
});
api.mapkey('U', 'wikiwand 목차  up 스크롤 ', function () {
    pageHeadLine = document.querySelectorAll(".mw-headline");
    if (0 < wikiPage) {
        wikiPage--;
    }
    pageHeadLine[wikiPage].scrollIntoView();
}, {
    domain: /www\.wikiwand\.com/i
});

// query select all 내부에서 regular expression 이 먹히지 않음
api.mapkey('D', 'stackoverflow 답변 다운 스크롤', function () {
    pageHeadLine = document.querySelectorAll(".answer");
    if (pageHeadLine.length > stackAnswer) {
        stackAnswer++;
    }
    pageHeadLine[stackAnswer].scrollIntoView();
    window.scrollBy(0, -47); // Adjust scrolling with a negative value : stackoverflow upper bar
}, {
    domain: /stackoverflow\.com/i
});
api.mapkey('U', 'stackoverflow 답변 up 스크롤 ', function () {
    pageHeadLine = document.querySelectorAll(".answer");
    if (0 < stackAnswer) {
        stackAnswer--;
    }
    pageHeadLine[stackAnswer].scrollIntoView();
    window.scrollBy(0, -47); // Adjust scrolling with a negative value here : stackoverflow upper bar
}, {
    domain: /stackoverflow\.com/i
});
api.mapkey('D', 'naver 답변 다운 스크롤', function () {
    pageHeadLine = document.querySelectorAll(".line_horizontal");
    if (pageHeadLine.length > naverAnswer) {
        naverAnswer++;
    }
    pageHeadLine[naverAnswer].scrollIntoView();
}, {
    domain: /kin\.naver\.com/i
});
api.mapkey('U', 'naver 답변 up 스크롤 ', function () {
    pageHeadLine = document.querySelectorAll(".line_horizontal");
    if (0 < naverAnswer) {
        naverAnswer--;
    }
    pageHeadLine[naverAnswer].scrollIntoView();
}, {
    domain: /kin\.naver\.com/i
});
//https://www.slideshare.net/mandrewmartin/regression-presentation
//div.j-prev-btn.arrow-left  btnPrevious
//div.j-prev-btn.arrow-right btnNext
//
//--------------End of D key and U key ----------------------

/*
window.onload = function(){
}
*/

// github default shortcut lists
// https://help.github.com/articles/using-keyboard-shortcuts/

api.mapkey('gC', 'Go to the code tab', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[0].click();
}, {
    domain: /github\.com/i
});

api.mapkey('gI', 'Go to the Issues tab. ', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[1].click();
}, {
    domain: /github\.com/i
});

api.mapkey('gP', 'Go to the Pull requests tab.  ', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[2].click();
}, {
    domain: /github\.com/i
});
api.mapkey('gB', 'Go to the Projects tab. "', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[3].click();
}, {
    domain: /github\.com/i
});

api.mapkey('gW', 'Go to the Wiki tab. ', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[4].click();
}, {
    domain: /github\.com/i
});

api.mapkey('gO', 'Go to the Overview tab. ', function () {
    document.querySelectorAll('.UnderlineNav-item')[0].click();
}, {
    domain: /github\.com/i
});
api.mapkey('gR', 'Go to the Repository tab. ', function () {
    document.querySelectorAll('.UnderlineNav-item')[1].click();
}, {
    domain: /github\.com/i
});
api.mapkey('gS', 'Go to the Stars tab. ', function () {
    document.querySelectorAll('.UnderlineNav-item')[2].click();
}, {
    domain: /github\.com/i
});

api.mapkey('h', 'slideshare previous page', function () {
    document.getElementById('previous-slide').click();
}, { domain: /www\.slideshare\.com/i });
api.mapkey('l', 'slideshare next page', function () {
    document.getElementById('next-slide').click();
}, { domain: /www\.slideshare\.com/i });

api.mapkey('h', 'slideserve previous page', function () {
    document.getElementById('btn_prev').click();
}, { domain: /slideserve\.com/i });
api.mapkey('l', 'slideserve next page', function () {
    document.getElementById('btn_next').click();
}, { domain: /slideserve\.com/i });

api.mapkey('h', 'slideplayer previous page', function () {
    document.querySelector("td[action='back']").click();
}, { domain: /slideplayer\.com/i });
api.mapkey('l', 'slideplayer next page', function () {
    document.querySelector("td[action='forward']").click();
}, { domain: /slideplayer\.com/i });

const API_KEY = "af712d02-1689-4378-8590-cba02e8341a0";
const API_URL = "https://dictionaryapi.com/api/v3";

api.Front.registerInlineQuery({
    url: function (q) {
        const url = `${API_URL}/references/learners/json/${q}?key=${API_KEY}`;
        return url;
    },
    parseResult: function (res) {
        try {
            const [firstResult] = JSON.parse(res.text);
            if (firstResult) {
                let definitionsList = `<ul><li>No definitions found</li></ul>`;
                let pronunciationsList = `<ul><li>No pronunciations found</li></ul>`;
                if (firstResult.hasOwnProperty("shortdef")) {
                    const definitions = [];
                    for (let definition of firstResult.shortdef) {
                        definitions.push(`${definition}`);
                    }
                    const definitionListItems = definitions.map(function (definition) {
                        return `<li>${definition}</li>`;
                    });
                    definitionsList = `<ul>${definitionListItems.join("")}</ul>`;
                    //TODO: Separate this function if possible
                }
                if (firstResult.hasOwnProperty("hwi")) {
                    const pronunciations = [];
                    const resultPronunciationsArray = firstResult.hwi.prs;
                    if (
                        resultPronunciationsArray &&
                        resultPronunciationsArray.length !== 0
                    ) {
                        for (let i = 0; i < resultPronunciationsArray.length; i++) {
                            if (resultPronunciationsArray[i].l) {
                                pronunciations.push(
                                    `<li>${resultPronunciationsArray[i].l} -- ${resultPronunciationsArray[i].ipa}</li>`,
                                );
                            } else {
                                pronunciations.push(
                                    `<li>${resultPronunciationsArray[i].ipa}</li>`,
                                );
                            }
                        }

                        pronunciationsList = `<ul>${pronunciations.join("")}</ul>`;
                    }
                }
                return `
                   <h3>Pronunciations</h3>
                   ${pronunciationsList}
                   <hr/>
                   <h3>Definitions</h3>
                   ${definitionsList}
                `;
            } else {
                return `
                  <h3>This is not the definition you were looking for...</h3>
                `;
            }
        } catch (e) {
            console.log(e.message);
            return "Something bad happend... Look behind you, a three headed monkey!";
        }
    },
});


// Gruvbox Hard
settings.theme = `
.sk_theme {
  font-family: Input Sans Condensed, Charcoal, sans-serif;
  font-size: 12pt;
  background: #1d2021;
  color: #d5c4a1;
}
.sk_theme input {
  color: #d5c4a1;
}
.sk_theme .url {
  color: #83a598;
}
.sk_theme .annotation {
  color: #d5c4a1;
}
.sk_theme kbd {
  background: #000000;
  color: #fbf1c7;
}
.sk_theme .omnibar_highlight {
  color: #fe8019; /* Updated highlight color */
}
.sk_theme .omnibar_folder {
  color: #b8bb26;
}
.sk_theme .omnibar_timestamp {
  color: #bdae93;
}
.sk_theme .omnibar_visitcount {
  color: #fabd2f;
}
.sk_theme .prompt, .sk_theme .resultPage {
  color: #d5c4a1;
}
.sk_theme .feature_name {
  color: #8ec07c;
}
.sk_theme .separator {
  color: #8ec07c;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
  background: #282828;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
  background: #3c3836;
}
#sk_status, #sk_find {
  font-size: 14pt;
}
#sk_keystroke {
  background: #1d2021;
}

.expandRichHints kbd>.candidates {
  color: #fe8019;
}
#sk_keystroke {
  background: #1d2021;
}
.expandRichHints span.annotation {
  color: #d5c4a1;
}
/* New styles for centering and styling the omnibar */
#sk_omnibar {
  position: fixed; /* Fixed position to stay in place */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust the exact center position */
  width: 600px; /* Set the width you want for the omnibar */
  margin: 0 auto; /* For horizontal centering */
  border: 1px solid #d5c4a1; /* White-ish border color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* Add some shadow for depth */
  z-index: 2147483647; /* Ensure it's on top */
}

/* Style the input area of the omnibar */
#sk_omnibar input {
  margin: 0; /* Adjust margin as needed */
  padding: 8px 10px; /* Add some padding inside the input box */
  border: none; /* Remove border */
  outline: none; /* Remove outline */
  border-radius: 8px 8px 0 0; /* Rounded corners on top of the input */
  width: calc(100% - 20px); /* Full width minus padding */
}

/* Style the search results area */
#sk_omnibarSearchResult {
  padding: 0; /* Adjust padding as needed */
  border-radius: 0 0 8px 8px; /* Rounded corners on bottom of the results */
}

/* Style for search result list items */
#sk_omnibarSearchResult ul li {
  padding: 8px 10px; /* Add some padding to list items */
  border-bottom: 1px solid #d5c4a1; /* Add a separator between items */
}

/* Style for search result list item on focus */
#sk_omnibarSearchResult ul li.focused {
  background-color: #3c3836; /* Different background for focused item */
  border-radius: 4px; /* Optional: rounded corners for focused item */
}
`;
