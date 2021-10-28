
if (window.origin === "https://www.google.com") {
    function cycleGoogleSuggestions(forward) {
        var suggestions = document.querySelectorAll("ul>li.sbct");
        var selected = document.querySelector("ul>li.sbct.sbhl");
        var next;
        if (selected) {
            selected.classList.remove("sbhl");
            var next = Array.from(suggestions).indexOf(selected) + (forward ? 1 : -1);
            if (next === suggestions.length || next === -1) {
                next = {innerText: window.userInput};
            } else {
                next = suggestions[next];
                next.classList.add("sbhl");
            }
        } else {
            window.userInput = document.querySelector("input.gsfi").value;
            next = forward ? suggestions[0] : suggestions[suggestions.length - 1];
            next.classList.add("sbhl");
        }
        document.querySelector("input.gsfi").value = next.innerText;
    }
    imapkey('<Ctrl-p>', 'cycle google suggestions', function () {
        cycleGoogleSuggestions(false);
    });
    imapkey('<Ctrl-n>', 'cycle google suggestions', function () {
        cycleGoogleSuggestions(true);
    });
}

// limit to certain origin
if (window.origin === "https://www.google.com") {
mapkey('1', 'first google result', function() {
var cssSelector = '#search h1+div>div:first-child>div:first-child a';
// open browser console (F12) on page with search engine results to test CSS selector you build from left to right (look at elements tree)
document.querySelector(cssSelector).click();
});

///...
}
map("L", "R");
map("H", "E");
vmap("v", "zv");
cmap("<Ctrl-n>", "<Tab>");
cmap("<Ctrl-p>", "<Shift-Tab>");
imap("<Ctrl-w>", "Alt-w>");
// jj as escape
imap("jj", "<Esc>");
map("sU", "su");
//map hh and ll to go forward and backward a page
unmap("h");
unmap("l");
map("hh", "S");
map("ll", "]]");
cmap("<Ctrl-n>", "<Tab>");
cmap("<Ctrl-p>", "<Shift-Tab>");

settings.stealFocusOnLoad = true;

// Removing default search aliases
removeSearchAliasX("b");
removeSearchAliasX("g");
removeSearchAliasX("s");
removeSearchAliasX("w");
removeSearchAliasX("p");

// [+] Remove omnibar mappings to removed search aliases
unmap("oi");
unmap("ob");
unmap("og");
unmap("os");
unmap("ow");
unmap("op");
unmap("oy");
unmap("od");

//General

(function () {
  const // function call factory needed to fix unstable/freezing behaviour of '.bind'ed callbacks
    fcFactory = function (f, t, a, b, c, d, e) {
      return function () {
        return f.call(t, a, b, c, d, e);
      };
    },
    openSearchOmnibar = function () {
      Front.openOmnibar({ type: "SearchEngine", extra: this.extra });
    },
    openLink = function (url) {
      RUNTIME("openLink", {
        tab: { tabbed: true, active: false },
        url: url || this.url,
      });
    },
    cl = window.console.log.bind(window.console),
    // unmap if mappings already exist
    // @todo: consider removing all registered mappings that can be [before|after] key sequence
    // fix overrides so this block of code can be replaced by NOOP
    // normalOverrideFix
    nOF = function (key) {
      const nmEntry = Normal.mappings.find(key);

      if (nmEntry) {
        // if meta isn't present then we're blocking set of key sequences
        cl("Override of " + key, nmEntry.meta || nmEntry);
      }
    },
    // addSearchAliasX and omnibar mapping (removes previous omnibar mapping)
    // addSAXWithOmnibargoogle
    saxo = function () {
      const a = arguments,
        key = a[0],
        desc = a[1],
        okey = "o" + key,
        skey = "s" + key;

      nOF(key);
      nOF(okey);
      nOF(skey);

      // overall 59 global searches registered
      // @todo: plan out hotkeys for searches
      // key, okey, skey will be taken by them

      // adds key and 's'+ key mappings:
      // open new search tab (doesn't work, fix below)
      // search selected text in new tab (works)
      addSearchAliasX.apply(null, a);

      // 1 character hotkeys break whole thing
      // unmap(key);
      // mapkey(key, a[0], fcFactory(openLink, { url: a[2].split('{0}')[0] }));

      unmap(okey);
      // adds 'o'+ key mapping (open Omnibar to trigger search selected text in new tab on Enter, where selected text is value in Omnibar)
      mapkey(
        okey,
        "Open with " + desc,
        fcFactory(openSearchOmnibar, { extra: key })
      );
    },
    searchWithGroup = function (data) {
      const t = this;
      data = encodeURIComponent(
        typeof data == "string" && data.length > 1
          ? data
          : Visual.getWordUnderCursor()
      );

      let url = "";
      for (let i = 0; i < t.length; i++) {
        url = t[i];

        if (!url) {
          continue;
        } else if (/\{0\}/g.test(url)) {
          url = url.replace(/\{0\}/g, data);
        } else {
          url = url + data;
        }

        openLink(url);
      }
    },
    openWithGroup = function (name, warn) {
      const msg =
          'Enter query for "' +
          name +
          '" group.' +
          (typeof warn == "string" && warn.length > 4 ? "\n" + warn : ""),
        // @note: hacking Omnibar seems not possible
        data = window.prompt(msg, Visual.getWordUnderCursor() || "");

      if (!data || /^\s+$/g.test(data)) {
        return (
          typeof data == "string" &&
          setTimeout(
            openWithGroup.bind(this),
            16,
            name,
            "Please enter something or cancel group open"
          )
        );
      }

      return searchWithGroup.call(this, data);
    },
    addSearchGroup = function (key, data, searches) {
      const okey = "o" + key,
        skey = "s" + key,
        gSearches = data.list.slice(0);

      nOF(okey);
      nOF(skey);

      for (let i = 0; i < gSearches.length; i++) {
        gSearches[i] = searches[gSearches[i]][1];
      }

      unmap(okey);
      mapkey(
        okey,
        'Open with "' + data.name + '"',
        fcFactory(openWithGroup, gSearches, data.name)
      );

      unmap(skey);
      mapkey(
        skey,
        'Search selected with "' + data.name + '"',
        fcFactory(searchWithGroup, gSearches)
      );
    };

  // Searches
  // Mappings with 's' and 'o' prefixes also will be taken
  // @todo: registered key sequences are free for mapping, must decide if it should be so
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
    /* db: ["behance", behanceBase],
      dd: ["dribble", dribbleBase],
      daw: ["awwards", awwardsBase],
      dui: ["uisources", uisourcesBase],
      dm: ["muzli", searchmuzliBase],
      dpu: ["unsplash", "https://unsplash.com/s/photos/{0}"],
      dps: ["shutterstock", "https://www.shutterstock.com/search/{0}"],
      dpp: ["pexels", "https://www.pexels.com/search/{0}/"], */
      d: ["dotdoggo", "https://dotdoggo.com:8080/.doggo?{0}"],

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
      ghc: ["github", githubBaseCode],
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
    // only 's' and 'o' prefixed mappings will be taken
    searchGroups = {
      0: {
        name: "Social networks searches",
        list: ["fb", "tw", "ig", "rd"],
      },
      gg: {
        name: "Google group searches",
        list: ["G", "gy", "gm", "gw", "gd", "gH"],
      },
      ghg: {
        name: "Github group",
        list: [
          "gH",
          "ghc",
          "ghC",
          "ghi",
          "ghd",
          "ghr",
          "ghm",
          "ght",
          "ghw",
          "ghu",
        ],
      },
      hnc: {
        name: "Hacker News Combined",
        list: ["hN", "hny", "hnm", "hnw", "hnd"],
      },
      phc: {
        name: "Product Hunt Combined",
        list: ["phy", "ph3m", "phm"],
      },
      cpy: {
        name: "combined product search by year",
        list: ["gy", "hny", "phy", "yy", "gH"],
      },
      cpm: {
        name: "combined product search by month",
        list: ["gm", "hnm", "phy", "ym", "gH"],
      },
      cpd: {
        name: "combined product search by day",
        list: ["gd", "hnd", "phm", "yd", "gH"],
      },
      cD: {
        name: "combined design",
        list: ["db", "dee", "dd", "daw", "dui", "dm"],
      },
      cdp: {
        name: "combined design photos",
        list: ["dpu", "dps", "dpp"],
      },
      ccr: {
        name: "code references",
        list: ["crdd", "crm"],
      },
    };

  // register mappings for searches
  for (let k in searches) {
    saxo.apply(null, [k].concat(searches[k]));
  }

  // register mappings for search groups
  for (let k in searchGroups) {
    addSearchGroup(k, searchGroups[k], searches);
  }

  // Session command shortcuts (FF only right now)
  // @todo: find a way to overcome limitation of chromium extension content script
  // security model (content script inherits page origin instead of having extension origin)
  const omnibarCmdArgs = { type: "Commands" },
    mapToCmdPrefix = function (key, cmdPrefix, optionalOmnibarName) {
      mapkey(
        key,
        (optionalOmnibarName || ":" + (cmdPrefix || "")) + "",
        function () {
          // open command omnibar (equivalent to ':' key press)
          omnibarCmdArgs.extra = cmdPrefix;
          Front.openOmnibar(omnibarCmdArgs);
        }
      );
    };

  // Temporary naming (better to build Huffman-like tree from all registered keybindings to test for possible conflicts)
  // @update: Normal.mappings, Visual.mappings, Instert.mappings provide methods to check if key sequence is taken
  // We can reuse existing Trie constructor to find and report conflicts inside this config only
  // [o]mnibar - main state
  // [s]ession - common part
  // [ ] - changing part - action name
  unmap(";s");
  mapToCmdPrefix(";sc", "createSession ");
  mapToCmdPrefix(";sd", "deleteSession ");
  mapToCmdPrefix(";sl", "listSession");
  mapToCmdPrefix(";so", "openSession ");
})();

// headings navigation
(function () {
  var w = window,
    d = w.document,
    // querySelector/querySelectorAll shorthand
    qs = function (selector, parent, all) {
      return (parent || d)["querySelector" + (all ? "All" : "")](selector);
    },
    isHidden = function (el) {
      if (el.hidden) {
        return true;
      }

      var style = w.getComputedStyle(el);

      return (
        (!(el.offsetWidth > 0 && el.offsetHeight > 0) &&
          style.getPropertyValue("overflow") != "visible") ||
        style.getPropertyValue("display") == "none" ||
        parseFloat(style.getPropertyValue("opacity")) < 0.015
      );
    },
    current_heading = 0,
    headings = [],
    headingsSelectors = ["h1", "h2", "h3", "h4", "h5", "h6"],
    update = function (key) {
      var diff = -6,
        topNotFound = true,
        cTop = -Infinity;
      current_heading = 0;

      // @note: not optimal but fast enough to not care
      headings = Array.from(qs(headingsSelectors.join(","), null, true))
        // filter out invisible elements
        .filter(function (el) {
          el.__top = el.getBoundingClientRect().top | 0;
          return !isHidden(el);
        })
        // sort in ascending order by rendered position
        .sort(function (a, b) {
          return a.__top - b.__top;
        });

      headings.forEach(function (el, i) {
        if (topNotFound) {
          var top = el.__top;

          if (Math.abs(cTop) > Math.abs(top)) {
            cTop = top;
            current_heading = i;
          } else {
            topNotFound = false;
          }
        }

        delete el.__top;
      });
    },
    selectNodeContents = function (node) {
      var range = document.createRange();
      range.selectNodeContents(node);
      w.getSelection().removeAllRanges();
      w.getSelection().addRange(range);

      return range;
    },
    goToBeginningOfCurrentHeading = function () {
      var el = headings[current_heading];
      el && el.scrollIntoView(true);
      selectNodeContents(el);
    },
    goToFirstHeading = function () {
      current_heading = 0;
      return goToBeginningOfCurrentHeading();
    },
    goToLastHeading = function () {
      current_heading = headings.length - 1;
      return goToBeginningOfCurrentHeading();
    },
    goToPrevHeading = function () {
      if (current_heading == 0) {
        current_heading = headings.length;
      }

      --current_heading;

      return goToBeginningOfCurrentHeading();
    },
    goToNextHeading = function () {
      ++current_heading;

      if (current_heading == headings.length) {
        current_heading = 0;
      }

      return goToBeginningOfCurrentHeading();
    },
    goToPrevSameLevelHeading = function () {
      var i = current_heading,
        tagName = headings[i].tagName;

      for (; i > 0; i--) {
        if (current_heading != i && headings[i].tagName == tagName) {
          current_heading = i;
          return goToBeginningOfCurrentHeading();
        }
      }

      for (i = headings.length; i > current_heading; i--) {
        if (current_heading != i && headings[i].tagName == tagName) {
          current_heading = i;
          return goToBeginningOfCurrentHeading();
        }
      }
    },
    goToNextSameLevelHeading = function () {
      var i = current_heading,
        tagName = headings[i].tagName;

      for (; i < headings.length; i++) {
        if (current_heading != i && headings[i].tagName == tagName) {
          current_heading = i;
          return goToBeginningOfCurrentHeading();
        }
      }

      for (i = 0; i < current_heading; i++) {
        if (current_heading != i && headings[i].tagName == tagName) {
          current_heading = i;
          return goToBeginningOfCurrentHeading();
        }
      }
    },
    pickHeadingSpecifiedByName = function () {
      var res = (w.prompt("String to search in headings:") || "").toLowerCase();

      if (res) {
        for (var i = current_heading; i < headings.length; i++) {
          if (headings[i].textContent.toLowerCase().indexOf(res) != -1) {
            current_heading = i;
            goToBeginningOfCurrentHeading();
            selectNodeContents(headings[i]);

            return false;
          }
        }

        for (var i = 0; i <= current_heading; i++) {
          if (headings[i].textContent.toLowerCase().indexOf(res) != -1) {
            current_heading = i;
            goToBeginningOfCurrentHeading();
            selectNodeContents(headings[i]);

            return false;
          }
        }
      }

      return false;
    },
    enabled = false,
    oldKeyDown = null,
    onDisable = function () {
      headings = [];
      current_heading = 0;
      d.body.onkeydown = oldKeyDown;
      // enable back normal handling
      Normal.enter();
      Normal.enable();
      enabled = false;
    },
    mappings = {
      Esc: onDisable,
      Escape: onDisable,
      b: function () {
        update();
        goToBeginningOfCurrentHeading();
      },
      ",": goToFirstHeading,
      ".": goToLastHeading,
      "[": goToPrevHeading,
      "]": goToNextHeading,
      p: goToPrevSameLevelHeading,
      n: goToNextSameLevelHeading,
      m: pickHeadingSpecifiedByName,
      //'^' - didn't get what `Move "up" from this heading` means regarding heading navigation in https://github.com/brookhong/Surfingkeys/issues/1353
    },
    onKeyDown = function (e) {
      if (enabled) {
        var code = e.key;

        console.log(code);

        if (typeof mappings[code] == "function") {
          e.preventDefault();

          mappings[code]();

          return false;
        }
      }

      if (typeof oldKeyDown == "function") {
        return oldKeyDown(e);
      }
    };

  mapkey("h0", "Enter headings mode", function () {
    update();
    // disable normal handling
    Normal.exit();
    Normal.disable();
    d.body.focus();
    oldKeyDown = d.body.onkeydown;
    d.body.onkeydown = onKeyDown;
    enabled = true;
  });
})();

// Surfingkey Ctrl-p Ctrl-n in google
if (window.origin === "https://www.google.com") {
  function cycleGoogleSuggestions(forward) {
    var suggestions = document.querySelectorAll("ul>li.sbct");
    var selected = document.querySelector("ul>li.sbct.sbhl");
    var next;
    if (selected) {
      selected.classList.remove("sbhl");
      var next = Array.from(suggestions).indexOf(selected) + (forward ? 1 : -1);
      if (next === suggestions.length || next === -1) {
        next = { innerText: window.userInput };
      } else {
        next = suggestions[next];
        next.classList.add("sbhl");
      }
    } else {
      window.userInput = document.querySelector("input.gsfi").value;
      next = forward ? suggestions[0] : suggestions[suggestions.length - 1];
      next.classList.add("sbhl");
    }
    document.querySelector("input.gsfi").value = next.innerText;
  }
  imapkey("<Ctrl-p>", "cycle google suggestions", function () {
    cycleGoogleSuggestions(false);
  });
  imapkey("<Ctrl-n>", "cycle google suggestions", function () {
    cycleGoogleSuggestions(true);
  });
}

// Youtube Fullscreen, credit github.com/okiptkn/dotfiles
function ytFullscreen() {
  $(".ytp-fullscreen-button.ytp-button").click();
}

const siteleader = "x";
const ri = { repeatIgnore: true };

function mapsitekey(domainRegex, key, desc, f, o) {
  const opts = o || {};
  mapkey(
    `${siteleader}${key}`,
    desc,
    f,
    Object.assign({}, opts, { domain: domainRegex })
  );
}

function mapsitekeys(d, maps) {
  const domain = d.replace(".", "\\.");
  const domainRegex = new RegExp(
    `^http(s)?://(([a-zA-Z0-9-_]+\\.)*)(${domain})(/.*)?`
  );
  maps.forEach((map) => {
    mapsitekey(domainRegex, map[0], map[1], map[2]);
  });
}

mapsitekeys("youtube.com", [["F", "Toggle fullscreen", ytFullscreen]]);

/*
Usage for Oxford dictionary in visual mode:

d - pull up the definition
z - get the synonyms (instead S, so no need to press shift+s)
q - translate the word (looking first to find a close match)
Q - also translations (exact, without finding the best match)
a - searching for antonyms

Set the languages by calling setLanguages like below, after the function definition.
Enjoy!
*/

var setLanguages = function (langSettings) {
  // Enter the appropriate app_id and app_key here only
  var _oxfordHeaders = {
    app_id: "b9c84084",
    app_key: "b96b8e9a328df6d70563d04c6ec4dcf4",
  };

  var _showOxfordQueryResult = function (queryResult) {
    var b = document.getSelection().getRangeAt(0).getClientRects()[0];
    Front.showBubble(
      {
        top: b.top,
        left: b.left,
        height: b.height,
        width: b.width,
      },
      queryResult,
      false
    );
  };

  var parseDefinitions = function (res) {
    try {
      var obj = JSON.parse(res.text);
      results = obj.results[0];
      var word = results.word;

      var lexEntries = results.lexicalEntries;

      var entryHtml = lexEntries
        .map(function (entry) {
          var category = entry.lexicalCategory;

          var categoryEntriesHtml = entry.entries[0].senses
            .map(function (sense) {
              var senseHtml = "";
              if (sense.hasOwnProperty("definitions")) {
                senseHtml = "<li><b>" + sense.definitions[0] + "</b>";
              }
              if (
                sense.hasOwnProperty("examples") &&
                sense.hasOwnProperty("definitions")
              ) {
                var senseExamples = sense.examples
                  .map(function (ex) {
                    return '<i>"' + ex.text + '"</i><br/>';
                  })
                  .join("");
                senseHtml =
                  senseHtml + "<br/>Examples:<br/>" + senseExamples + "</dd>";
              }
              return senseHtml;
            })
            .join("");

          var categoryHtml =
            "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

          return categoryHtml;
        })
        .join("");
      var html =
        "<div><h3>Definition of " + word + "</h3>" + entryHtml + "</div>";

      return html;
    } catch (e) {
      return res.text;
    }
  };

  var parseSynonyms = function (res) {
    try {
      var obj = JSON.parse(res.text);
      results = obj.results[0];
      var word = results.word;

      var lexEntries = results.lexicalEntries;

      var entryHtml = lexEntries
        .map(function (entry) {
          var category = entry.lexicalCategory;

          var categoryEntriesHtml = entry.entries[0].senses
            .map(function (sense) {
              var senseHtml = "<li>";
              if (sense.hasOwnProperty("synonyms")) {
                var senseExamples = sense.synonyms
                  .map(function (ex) {
                    return ex.text + ", ";
                  })
                  .join("");
                senseHtml = senseHtml + senseExamples + "</dd>";
              }
              return senseHtml;
            })
            .join("");

          var categoryHtml =
            "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

          return categoryHtml;
        })
        .join("");
      var html =
        "<div><h3>Synonyms for " + word + "</h3>" + entryHtml + "</div>";

      return html;
    } catch (e) {
      return res.text;
    }
  };

  var parseAntonyms = function (res) {
    try {
      var obj = JSON.parse(res.text);
      results = obj.results[0];
      var word = results.word;

      var lexEntries = results.lexicalEntries;

      var entryHtml = lexEntries
        .map(function (entry) {
          var category = entry.lexicalCategory;

          var categoryEntriesHtml = entry.entries[0].senses
            .map(function (sense) {
              var senseHtml = "<li>";
              if (sense.hasOwnProperty("antonyms")) {
                var senseExamples = sense.antonyms
                  .map(function (ex) {
                    return ex.text + ", ";
                  })
                  .join("");
                senseHtml = senseHtml + senseExamples + "</dd>";
              }
              return senseHtml;
            })
            .join("");

          var categoryHtml =
            "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

          return categoryHtml;
        })
        .join("");
      var html =
        "<div><h3>Antonyms for " + word + "</h3>" + entryHtml + "</div>";

      return html;
    } catch (e) {
      return res.text;
    }
  };

  // Function that retrives translations given a response object
  var parseTranslations = function (res) {
    try {
      var obj = JSON.parse(res.text);

      results = obj.results[0];
      var word = results.word;

      var lexEntries = results.lexicalEntries;

      var entryHtml = lexEntries
        .map(function (entry) {
          var category = entry.lexicalCategory;

          var categoryEntriesHtml = entry.entries[0].senses
            .map(function (sense) {
              var senseHtml = "";
              if (sense.hasOwnProperty("translations")) {
                senseHtml = "<li><b>" + sense.translations[0].text + "</b>";
              }
              if (
                sense.hasOwnProperty("examples") &&
                sense.hasOwnProperty("translations")
              ) {
                var senseExamples = sense.examples
                  .map(function (ex) {
                    return '<i>"' + ex.text + '"</i><br/>';
                  })
                  .join("");
                senseHtml =
                  senseHtml + "<br/>Examples:<br/>" + senseExamples + "</dd>";
              }
              return senseHtml;
            })
            .join("");

          var categoryHtml =
            "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

          return categoryHtml;
        })
        .join("");

      var html =
        "<div><h3>Translation of " + word + "</h3>" + entryHtml + "</div>";

      return html;
    } catch (e) {
      return res.text;
    }
  };

  var searchThenQuery = function (obj) {
    var parseResult = function (res, urlCallback, callback) {
      try {
        var obj = JSON.parse(res.text);
        // for more strict filtering:
        // obj.results.length > 0 && ['headword', 'inflection'].includes(obj.results[0].matchType)
        if (obj.results.length > 0) {
          best_match = obj.results[0].id;

          httpRequest(
            {
              url: urlCallback(best_match),
              headers: _oxfordHeaders,
            },
            function (res) {
              _showOxfordQueryResult(callback(res));
            }
          );
        } else {
          var query = Visual.getWordUnderCursor();
          _showOxfordQueryResult("<div>No match found for " + query + "</div>");
        }
      } catch (e) {
        _showOxfordQueryResult(res.text);
      }
    };
    var urlCallback = obj.url_callback;
    var callback = obj.callback;

    var query = Visual.getWordUnderCursor();
    var url = "https://od-api.oxforddictionaries.com/api/v2/search/";

    if (obj.hasOwnProperty("translate") && obj.translate) {
      var fromlang = langSettings.translate_from;
      var tolang = langSettings.translate_to;
      url = url + fromlang + "/translations=" + tolang + "?q=" + query;
    } else {
      var lang = langSettings.definitions;
      url = url + lang + "?q=" + query;
    }

    httpRequest(
      {
        url: url,
        headers: _oxfordHeaders,
      },
      function (res) {
        return parseResult(res, urlCallback, callback);
      }
    );
  };

  Front.registerInlineQuery({
    url: function (query) {
      var fromlang = langSettings.translate_from;
      var tolang = langSettings.translate_to;
      return (
        "https://od-api.oxforddictionaries.com/api/v2/entries/" +
        fromlang +
        "/" +
        query +
        "/translations=" +
        tolang
      );
    },
    headers: _oxfordHeaders,
    parseResult: parseTranslations,
  });

  vmapkey("q", "Translation of the selected word", function () {
    var urlCallback = function (best_match) {
      var fromlang = langSettings.translate_from;
      var tolang = langSettings.translate_to;
      return (url =
        "https://od-api.oxforddictionaries.com/api/v2/entries/" +
        fromlang +
        "/" +
        best_match +
        "/translations=" +
        tolang);
    };

    searchThenQuery({
      url_callback: urlCallback,
      callback: parseTranslations,
      translate: true,
    });
  });

  vmapkey("d", "Definition of the selected word", function () {
    var urlCallback = function (best_match) {
      var lang = langSettings.definitions;
      return (
        "https://od-api.oxforddictionaries.com/api/v2/entries/" +
        lang +
        "/" +
        best_match
      );
    };

    searchThenQuery({
      url_callback: urlCallback,
      callback: parseDefinitions,
      translate: false,
    });
  });

  vmapkey("z", "Synonyms of the selected word", function () {
    var urlCallback = function (best_match) {
      var lang = langSettings.definitions;
      return (
        "https://od-api.oxforddictionaries.com/api/v2/entries/" +
        lang +
        "/" +
        best_match +
        "/synonyms"
      );
    };

    searchThenQuery({
      url_callback: urlCallback,
      callback: parseSynonyms,
      translate: false,
    });
  });

  vmapkey("a", "Antonyms of the selected word", function () {
    var urlCallback = function (best_match) {
      var lang = langSettings.definitions;
      return (
        "https://od-api.oxforddictionaries.com/api/v2/entries/" +
        lang +
        "/" +
        best_match +
        "/antonyms"
      );
    };

    searchThenQuery({
      url_callback: urlCallback,
      callback: parseAntonyms,
      translate: false,
    });
  });
};

// Here you set the languages to use for translations, and the language to use for definitions and synonyms.

setLanguages({
  translate_from: "en",
  translate_to: "en",
  definitions: "en",
});

// tab swither

mapkey("B", "Choose a tab with omnibar", function () {
  Front.openOmnibar({ type: "Tabs" });
});

// Properties list
Hints.numericHints = false;
settings.omnibarSuggestion = true;
settings.defaultSearchEngine = "G"; // Google I'm Feeling Luckey
settings.focusFirstCandidate = true;

mapkey(",s", "opne new tab and split", function () {
  RUNTIME("newWindow");
});

mapkey("ymr", "#7Copy multiple link regex URLs to the clipboard", function () {
  var linksToYank = [];
  Hints.create(
    "*[href]",
    function (element) {
      linksToYank.push(
        "domain: " +
          "/" +
          element.href.slice(8).split("/")[0].replace(/\./g, "\\.") +
          "/" +
          "i"
      );
      Clipboard.write(linksToYank.join("\n"));
    },
    {
      multipleHits: true,
    }
  );
});

mapkey(
  "yE",
  "#7 Yank Element info. copy link element id or classname",
  function () {
    var linksToYank = [];
    Hints.create("", function (element) {
      linksToYank.push("id: " + element.id + "\n");
      linksToYank.push("innertext: " + element.innerText + "\n");
      linksToYank.push("className: " + element.className + "\n");
      linksToYank.push("href: " + element.href + "\n");
      linksToYank.push("type: " + element.type + "\n");
      linksToYank.push("style: " + element.style + "\n");
      linksToYank.push("src: " + element.src + "\n");
      linksToYank.push("alt: " + element.alt + "\n");
      Clipboard.write(linksToYank.join("\n"));
    });
  }
);

// ADD: read like this yank element ~~~
mapkey(
  "yeI",
  "#7 Yank Element info. copy link element id or classname",
  function (element) {
    Clipboard.write("element.id");
  }
);
mapkey(
  "yeC",
  "#7 Yank Element info. copy link element id or classname",
  function (element) {
    Clipboard.write("element.className");
  }
);
mapkey(
  "yeT",
  "#7 Yank Element info. copy link element id or classname",
  function (element) {
    Clipboard.write("element.type");
  }
);
mapkey(
  "yeS",
  "#7 Yank Element info. copy link element id or classname",
  function (element) {
    Clipboard.write("element.style");
  }
);
mapkey(
  "yeA",
  "#7 Yank Element info. copy link element id or classname",
  function (element) {
    Clipboard.write("element.alt");
  }
);

mapkey(
  "ymE",
  "#7 Yank Multiple Element info  (copy multiple link element id or classname)",
  function () {
    var linksToYank = [];
    Hints.create(
      "*[href]",
      function (element) {
        linksToYank.push("id: " + element.id + "\n");
        linksToYank.push("innertext: " + element.innerText + "\n");
        linksToYank.push("className: " + element.className + "\n");
        Clipboard.write(linksToYank.join("\n"));
      },
      {
        multipleHits: true,
      }
    );
  }
);

//git clone
mapkey(
  "yg",
  "#7 git clone",
  function () {
    Clipboard.write("git clone " + window.location.href + ".git");
  },
  {
    domain: /github\.com/i,
  }
);

//////////////////////////////////////////////////////////
// visualmode setting
//////////////////////////////////////////////////////////
vmapkey('"y', "surround selection with doube quotation mark", function () {
  Clipboard.write(
    '"' + window.getSelection().toString().replace(/\n/g, " ") + '"'
  );
});
vmapkey("<y", "surround selection ", function () {
  Clipboard.write("<" + window.getSelection().toString() + ">");
});
vmapkey("(y", "surround selection ", function () {
  Clipboard.write("(" + window.getSelection().toString() + ")");
});
vmapkey("[y", "surround selection ", function () {
  Clipboard.write("[" + window.getSelection().toString() + "]");
});
vmapkey("{y", "surround selection ", function () {
  Clipboard.write("{" + window.getSelection().toString() + "}");
});
vmapkey("/*y", "surround selection ", function () {
  Clipboard.write("/*" + window.getSelection().toString() + "*/");
});
vmapkey("<--!y", "surround selection ", function () {
  Clipboard.write("<--!" + window.getSelection().toString() + "-->");
});
vmapkey("~y", "surround selection ", function () {
  var UpperSelected = window.getSelection().toString();
  Clipboard.write(UpperSelected.toUpperCase());
});
vmapkey("~jy", "Remove enter", function () {
  Clipboard.write(window.getSelection().toString().replace(/\n/g, " "));
});
vmapkey("~cy", "Added comma", function () {
  Clipboard.write(window.getSelection().toString().replace(/[ ,]+/g, ","));
});
vmapkey("~dy", "Delete first 1 character", function () {
  Clipboard.write(window.getSelection().toString().substr(1));
});
vmapkey("~Dy", "Delete surrounded", function () {
  Clipboard.write(window.getSelection().toString().slice(1, -1));
});
vmapkey(
  "~sy",
  "Remove special character (blank is not considered as special character",
  function () {
    //TODO: Black is not work
    Clipboard.write(
      window
        .getSelection()
        .toString()
        .replace(/[^A-Z0-9:blank:]/gi, "")
    );
  }
);
vmapkey("~dy", "Markdown Strikethrough", function () {
  Clipboard.write("~~ " + window.getSelection().toString() + " ~~");
});
//TODO: multiple clipboard test
vmapkey(
  "my",
  "#7Copy multiple  동작하지 않음 FIXlink URLs to the clipboard",
  function () {
    var textToYank = [];
    textToYank.push(window.getSelection.toString());
    Clipboard.write('"' + textToYank.join("\n") + '"');
  }
);

// markdown
vmapkey("miy", "Markdown italic", function () {
  Clipboard.write("*" + window.getSelection().toString() + "*");
});
vmapkey("mby", "Markdown bold", function () {
  Clipboard.write("**" + window.getSelection().toString() + "**");
});
vmapkey("mly", "Markdown link", function () {
  Clipboard.write("[replaceit](" + window.getSelection().toString() + ")");
});
mapkey("yml", "Markdown link", function () {
  Clipboard.write(`[${document.title}](${window.location.href})`);
});
vmapkey("msy", "Markdown Strikethrough", function () {
  Clipboard.write("~~ " + window.getSelection().toString() + " ~~");
});

//setting
mapkey("gs", "#12 go Setting - Open Chrome Settings", function () {
  tabOpenLink("chrome://settings/");
});
mapkey(
  "gE",
  "#12 go Extensions - Open Chrome extensions Shortcut setting",
  function () {
    tabOpenLink("chrome://extensions/shortcuts");
  }
);

//github shortcuts
mapkey(
  "gC",
  "Go to the code tab",
  function () {
    document
      .querySelectorAll(".js-selected-navigation-item.reponav-item")[0]
      .click();
  },
  {
    domain: /github\.com/i,
  }
);

mapkey(
  "gI",
  "Go to the Issues tab. ",
  function () {
    document
      .querySelectorAll(".js-selected-navigation-item.reponav-item")[1]
      .click();
  },
  {
    domain: /github\.com/i,
  }
);

mapkey(
  "gP",
  "Go to the Pull requests tab. ",
  function () {
    document
      .querySelectorAll(".js-selected-navigation-item.reponav-item")[2]
      .click();
  },
  {
    domain: /github\.com/i,
  }
);
mapkey(
  "gB",
  "Go to the Projects tab. ",
  function () {
    document
      .querySelectorAll(".js-selected-navigation-item.reponav-item")[3]
      .click();
  },
  {
    domain: /github\.com/i,
  }
);

mapkey(
  "gW",
  "Go to the Wiki tab. ",
  function () {
    document
      .querySelectorAll(".js-selected-navigation-item.reponav-item")[4]
      .click();
  },
  {
    domain: /github\.com/i,
  }
);

mapkey(
  "gO",
  "Go to the Overview tab. ",
  function () {
    document.querySelectorAll(".UnderlineNav-item")[0].click();
  },
  {
    domain: /github\.com/i,
  }
);
mapkey(
  "gR",
  "Go to the Repository tab. ",
  function () {
    document.querySelectorAll(".UnderlineNav-item")[1].click();
  },
  {
    domain: /github\.com/i,
  }
);
mapkey(
  "gS",
  "Go to the Stars tab. ",
  function () {
    document.querySelectorAll(".UnderlineNav-item")[2].click();
  },
  {
    domain: /github\.com/i,
  }
);

// goto comment - Usually comments are in textarea format
mapkey("gT", "Goto Text Area", function () {
  documents.getElementsByClassName(".textarea")[0].click();
});

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
