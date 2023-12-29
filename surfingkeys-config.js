
// Removing default search aliases
api.removeSearchAlias("b");
api.removeSearchAlias("g");
api.removeSearchAlias("s");
api.removeSearchAlias("w");
api.removeSearchAlias("p");

// [+] Remove omnibar mappings to removed search aliases
api.unmap("oi");
api.unmap("ob");
api.unmap("og");
api.unmap("os");
api.unmap("ow");
api.unmap("op");
api.unmap("oy");
api.unmap("od");

  const googleSearchQ = "https://www.google.com/search?q=",
    googleSearchBase = googleSearchQ + "{0}",
    googleSearchHistory =
      "https://myactivity.google.com/myactivity?authuser=0&q={0}",
    tStr = googleSearchBase + "&tbs=qdr:",
    googleImages =
      "https://www.google.com/search?q={0}&sxsrf=ALeKk009TUWmnI1QbFWPVq4D4qrIZgdo2w:1607544914807&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiu0-2828HtAhWMslkKHT5qALgQ_AUoAXoECBQQAw&biw=1745&bih=916",
    // hackernews
    hackernewsBase = "https://hn.algolia.com/?q={0}&page=0&prefix=false",
    hnTStr = hackernewsBase + "&dateRange=",
    // product hunt
    producthuntBase = "https://www.producthunt.com/search?q={0}",
    phTStr = producthuntBase + "&postedDate=",
    //code reference
    mdnBase = "https://developer.mozilla.org/en-US/search?q={0}",
    devdocBase = "http://devdocs.io/#q={0}",
    // github code
    githubBaseRepo = "https://github.com/search?q={0}&type=repositories",
    githubBaseCode = "https://github.com/search?o=desc&q={0}&s=&type=Code",
    githubBaseCommits = "https://github.com/search?q={0}&type=commits",
    githubBaseIssues = "https://github.com/search?q={0}&type=issues",
    githubBaseDiscussions = "https://github.com/search?q={0}&type=discussions",
    githubBaseRegistrypackages =
      "https://github.com/search?q={0}&type=registrypackages",
    githubBaseMarketplace = "https://github.com/search?q={0}&type=marketplace",
    githubBaseTopics = "https://github.com/search?q={0}&type=topics",
    githubBaseWikis = "https://github.com/search?q={0}&type=wikis",
    githubBaseUsers = "https://github.com/search?q={0}&type=users",
    gmailBase = "https://mail.google.com/mail/u/0/#search/{0}",
    // youtube
    youtubeBase = "https://www.youtube.com/results?search_query={0}",
    youtubeChannel = youtubeBase + "&sp=EgIQAg%253D%253D",
    youtubePlaylist = youtubeBase + "&sp=EgIQAw%253D%253D",
    youtubeMovie = youtubeBase + "&sp=EgIQBA%253D%253D",
    youtubeShow = youtubeBase + "&sp=EgIQBQ%253D%253D",
    youtubeShort = youtubeBase + "&sp=EgIYAQ%253D%253D",
    youtubeLong = youtubeBase + "&sp=EgIYAg%253D%253D",
    youtubeLive = youtubeBase + "&sp=EgJAAQ%253D%253D",
    youtube4k = youtubeBase + "&sp=EgJwAQ%253D%253D",
    youtubeHD = youtubeBase + "&sp=EgIgAQ%253D%253D",
    youtubeSubtitles = youtubeBase + "&sp=EgIoAQ%253D%253D",
    youtubeCreativeCommons = youtubeBase + "&sp=EgIwAQ%253D%253D",
    youtube360 = youtubeBase + "&sp=EgJ4AQ%253D%253D",
    youtubeVR = youtubeBase + "&sp=EgPQAQE%253D",
    youtube3d = youtubeBase + "&sp=EgI4AQ%253D%253D",
    youtubeHDR = youtubeBase + "&sp=EgPIAQE%253D",
    youtubeLocation = youtubeBase + "&sp=EgO4AQE%253D",
    youtubePurchased = youtubeBase + "&sp=EgJIAQ%253D%253D",
    youtubeUploadDate = youtubeBase + "&sp=CAI%253D",
    youtubeViewCount = youtubeBase + "&sp=CAM%253D",
    youtubeRating = youtubeBase + "&sp=CAE%253D",
    youtubeHistory = "https://www.youtube.com/feed/history?query={0}",
    // web design
    elementsenvatoBase = "https://elements.envato.com/all-items/{0}",
    behanceBase = "https://www.behance.net/search?search={0}",
    dribbleBase = "https://dribbble.com/search/{0}",
    awwardsBase = "https://www.awwwards.com/inspiration/search?text={0}",
    uisourcesBase = "https://www.uisources.com/search?query={0}",
    searchmuzliBase = "https://search.muz.li/search/{0}",
    searches = {
      // search
      os: ["one search", "https://historysearch.com/search/list?q={0}"],
      hs: ["history search", "https://historysearch.com/search/list?q={0}"],
      dee: ["envato elements", elementsenvatoBase],
      db: ["behance", behanceBase],
      dd: ["dribble", dribbleBase],
      daw: ["awwards", awwardsBase],
      dui: ["uisources", uisourcesBase],
      dm: ["muzli", searchmuzliBase],
      dpu: ["unsplash", "https://unsplash.com/s/photos/{0}"],
      dps: ["shutterstock", "https://www.shutterstock.com/search/{0}"],
      dpp: ["pexels", "https://www.pexels.com/search/{0}/"],

      Y: ["youtube search", youtubeBase],
      yy: ["youtube year", youtubeBase + "&sp=EgIIBQ%253D%253D"],
      ym: ["youtube month", youtubeBase + "&sp=EgQIBBAB"],
      yw: ["youtube week", youtubeBase + "&sp=EgQIAxAB"],
      yd: ["youtube day", youtubeBase + "&sp=EgQIAhAB"],
      yh: ["youtube hour", youtubeBase + "&sp=EgQIARAB"],
      yH: ["youtube history", youtubeHistory],
      yc: ["youtube channel", youtubeChannel],
      yp: ["youtube Playlist", youtubePlaylist],
      yM: ["youtube Movie", youtubeMovie],
      ySh: ["youtube Show", youtubeShow],
      ys: ["youtube Short", youtubeShort],
      ylo: ["youtube Long", youtubeLong],
      yli: ["youtubeLive", youtubeLive],
      y4k: ["youtube4k", youtube4k],
      yHD: ["youtubeHD", youtubeHD],
      ySu: ["youtubeSubtitles", youtubeSubtitles],
      yCC: ["youtubeCreativeCommons", youtubeCreativeCommons],
      y360: ["youtube360", youtube360],
      yvr: ["youtubeVR", youtubeVR],
      y3d: ["youtube3d", youtube3d],
      yHDR: ["youtubeHDR", youtubeHDR],
      yL: ["youtubeLocation", youtubeLocation],
      yP: ["youtubePurchased", youtubePurchased],
      yu: ["youtubeUploadDate", youtubeUploadDate],
      uvc: ["youtubeViewCount", youtubeViewCount],
      yr: ["youtubeRating", youtubeRating],

      i: ["gmail search", gmailBase],

      pH: ["product hunt", producthuntBase],
      phy: ["product hunt year", phTStr + "12%3Amonths"],
      ph3m: ["product hunt year", phTStr + "90%3Adays"],
      phm: ["product hunt year", phTStr + "30%3Adays"],

      hN: ["hacker news", hackernewsBase],
      hny: ["hacker news year", hnTStr + "pastYear"],
      hnm: ["hacker news month", hnTStr + "pastMonth"],
      hnw: ["hacker news week", hnTStr + "pastWeek"],
      hnd: ["hacker news day", hnTStr + "last24h"],

      gH: ["github", githubBaseRepo],
      api.map('ghc', 'github', githubBaseCode);
      ghC: ["github commits", githubBaseCommits],
      ghi: ["github issues", githubBaseIssues],
      ghd: ["github discussions", githubBaseDiscussions],
      ghr: ["github registry", githubBaseRegistrypackages],
      ghm: ["github marketplace", githubBaseMarketplace],
      ght: ["github topics", githubBaseTopics],
      ghw: ["github wiki", githubBaseWikis],
      ghu: ["github users", githubBaseUsers],

      //code snippets
      csc: ["code snippet codepen", "https://codepen.io/search/pens?q={0}"],
      csj: [
        "code snippet jsfiddle",
        "https://www.google.com/search?q=site:jsfiddle.net+{0}",
      ],
      css: [
        "code snippet codesandbox",
        "https://www.google.com/search?q=site:codesandbox+{0}",
      ],

      //code reference
      crm: ["code reference mdn", mdnBase],
      crdd: ["code reference devdoc", devdocBase],

      G: ["Google", googleSearchBase],
      gm: ["googlemonth", tStr + "m"],
      gw: ["googleweek", tStr + "w"],
      gy: ["googleyear", tStr + "y"],
      gd: ["googleday", tStr + "d"],
      gH: ["googlehour", tStr + "h"],
      gsh: ["google search history", googleSearchHistory],
      gi: ["google images", googleImages],

      // forums
      ofa: ["arch linux", "https://wiki.archlinux.org/index.php?search={0}"],
      // conflict, changed from l to ll
      ll: ["lucky", googleSearchBase + "&btnI"],
      // conflict, changed from t to tt
      tt: ["onelook", "https://www.onelook.com/?w={0}&ls=a"],
      S: ["onelook synonyms", "https://www.onelook.com/thesaurus/?s={0}"],
      D: [
        "google drive search",
        "https://drive.google.com/drive/u/1/search?q={0}",
      ],
      // conflict, changed from w to ww to wk
      wk: ["wiki", "https://en.wikipedia.org/wiki/{0}"],

      //map
      gM: ["google maps", "https://www.google.com/maps?q="],

      //coding
      C: ["search coding", "https://searchcode.com/?q="],
      cC: ["search coding", "https://searchcode.com/?q="],
      cw: ["chrome webstore", "https://chrome.google.com/webstore/search/"], // chrome

      //alternative websites
      as: ["slant", "https://www.slant.co/search?query="],
      aa: ["alternativeto", "https://alternativeto.net/browse/search?q={0}"],
      ag: ["g2", "https://www.g2.com/products/{0}/competitors/alternatives"],

      //sns
      fb: ["faceBook", "https://www.facebook.com/search/top/?q="],
      tw: ["tWitter", "https://twitter.com/search?q="],
      ig: ["InstaGram HashTag", "https://www.instagram.com/explore/tags/"],
      rd: ["redDit", "https://www.reddit.com/search?q="],
    },



// solarized dark
settings.theme = `
.sk_theme {
  font-family: Input Sans Condensed, Charcoal, sans-serif;
  font-size: 10pt;
  background: #002B36;
  color: #93A1A1;
}
.sk_theme input {
  color: #93A1A1;
}
.sk_theme .url {
  color: #268BD2;
}
.sk_theme .annotation {
  color: #93A1A1;
}
.sk_theme kbd {
  background: #EEE8D5;
  color: #111;
}
.sk_theme .omnibar_highlight {
  color: #CB4B16;
}
.sk_theme .omnibar_folder {
  color: #2AA198;
}
.sk_theme .omnibar_timestamp {
  color: #657B83;
}
.sk_theme .omnibar_visitcount {
  color: #B58900;
}
.sk_theme .prompt, .sk_theme .resultPage {
  color: #93A1A1;
}
.sk_theme .feature_name {
  color: #859900;
}
.sk_theme .separator {
  color: #859900;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
  background: #002F3B;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
  background: #083D4A;
}
#sk_status, #sk_find {
  font-size: 12pt;
}
#sk_keystroke {
  background: #002B36;
}
.expandRichHints span.annotation {
  color: #93A1A1;
}`;
