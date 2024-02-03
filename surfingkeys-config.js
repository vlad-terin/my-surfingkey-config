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

settings.tabsThreshold = 0;
// Go to https://dictionaryapi.com/ and get an API key for Learners Dictionary.
const API_KEY = "af712d02-1689-4378-8590-cba02e8341a0";
const API_URL = "https://dictionaryapi.com/api/v3";

// api.mapkey("h", "Go to the first Google result", function () {
//   // Selector for the first search result title
//   var firstResult = document.querySelector(".LC20lb");
//   // Ensure the element exists and has a parent node which should be the anchor tag
//   if (firstResult && firstResult.parentNode) {
//     // Navigate to the href of the parent node
//     window.location.href = firstResult.parentNode.href;
//   } else {
//     // Alert if no result is found
//     alert("No search result link found.");
//   } });
//
api.mapkey("1h", "Go to the first Google result", function () {
  goToLink(0);
});

api.mapkey("2h", "Go to the second Google result", function () {
  goToLink(1);
});

api.mapkey("3h", "Go to the third Google result", function () {
  goToLink(2);
});

function goToLink(index) {
  // Selector for search result container
  var searchResultContainers = document.querySelectorAll("#search .g");
  // Ensure the selected search result container exists
  if (searchResultContainers.length > index) {
    // Find the anchor tag within the selected container
    var anchor = searchResultContainers[index].querySelector("a");
    if (anchor && anchor.href) {
      // Navigate to the href of the anchor tag
      window.location.href = anchor.href;
    } else {
      // Alert if no anchor is found or if it does not contain an href
      alert(
        "No navigable link found for search result at position " + (index + 1),
      );
    }
  } else {
    // Alert if the specified search result container is not found
    alert("No search result container found at position " + (index + 1));
  }
}

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
api.addSearchAlias("G", "Google Search", "https://www.google.com/search?q={0}");
api.addSearchAlias(
  "gm",
  "Google Month",
  "https://www.google.com/search?q={0}&tbs=qdr:m",
);
api.addSearchAlias(
  "gM",
  "MDN Docs",
  "https://www.google.com/search?btnI=1&q=mdn+{0}",
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
  "hs",
  "History Search",
  "https://historysearch.com/search/list?q={0}",
);
api.addSearchAlias(
  "dee",
  "Envato Elements",
  "https://elements.envato.com/all-items/{0}",
);
api.addSearchAlias(
  "db",
  "Behance",
  "https://www.behance.net/search?search={0}",
);
api.addSearchAlias("dd", "Dribble", "https://dribbble.com/search/{0}");
api.addSearchAlias(
  "daw",
  "Awwards",
  "https://www.awwwards.com/inspiration/search?text={0}",
);
api.addSearchAlias(
  "dui",
  "UI Sources",
  "https://www.uisources.com/search?query={0}",
);
api.addSearchAlias("dm", "Muzli", "https://search.muz.li/search/{0}");
api.addSearchAlias("dpu", "Unsplash", "https://unsplash.com/s/photos/{0}");
api.addSearchAlias(
  "dps",
  "Shutterstock",
  "https://www.shutterstock.com/search/{0}",
);
api.addSearchAlias("dpp", "Pexels", "https://www.pexels.com/search/{0}/");
api.addSearchAlias(
  "yy",
  "YouTube Year",
  "https://www.youtube.com/results?search_query={0}&sp=EgIIBQ%253D%253D",
);
api.addSearchAlias(
  "ym",
  "YouTube Month",
  "https://www.youtube.com/results?search_query={0}&sp=EgQIBBAB",
);
api.addSearchAlias(
  "yw",
  "YouTube Week",
  "https://www.youtube.com/results?search_query={0}&sp=EgQIAxAB",
);
api.addSearchAlias(
  "yd",
  "YouTube Day",
  "https://www.youtube.com/results?search_query={0}&sp=EgQIAhAB",
);
api.addSearchAlias(
  "yh",
  "YouTube Hour",
  "https://www.youtube.com/results?search_query={0}&sp=EgQIARAB",
);
api.addSearchAlias(
  "yc",
  "YouTube Channel",
  "https://www.youtube.com/results?search_query={0}&sp=EgIQAg%253D%253D",
);
api.addSearchAlias(
  "yp",
  "YouTube Playlist",
  "https://www.youtube.com/results?search_query={0}&sp=EgIQAw%253D%253D",
);
api.addSearchAlias(
  "yM",
  "YouTube Movie",
  "https://www.youtube.com/results?search_query={0}&sp=EgIQBA%253D%253D",
);
api.addSearchAlias(
  "ySh",
  "YouTube Show",
  "https://www.youtube.com/results?search_query={0}&sp=EgIQBQ%253D%253D",
);
api.addSearchAlias(
  "ys",
  "YouTube Short",
  "https://www.youtube.com/results?search_query={0}&sp=EgIYAQ%253D%253D",
);
api.addSearchAlias(
  "ylo",
  "YouTube Long",
  "https://www.youtube.com/results?search_query={0}&sp=EgIYAg%253D%253D",
);
api.addSearchAlias(
  "yli",
  "YouTube Live",
  "https://www.youtube.com/results?search_query={0}&sp=EgJAAQ%253D%253D",
);
api.addSearchAlias(
  "y4k",
  "YouTube 4K",
  "https://www.youtube.com/results?search_query={0}&sp=EgJwAQ%253D%253D",
);
api.addSearchAlias(
  "yHD",
  "YouTube HD",
  "https://www.youtube.com/results?search_query={0}&sp=EgIgAQ%253D%253D",
);
api.addSearchAlias(
  "ySu",
  "YouTube Subtitles",
  "https://www.youtube.com/results?search_query={0}&sp=EgIoAQ%253D%253D",
);
api.addSearchAlias(
  "yCC",
  "YouTube Creative Commons",
  "https://www.youtube.com/results?search_query={0}&sp=EgIwAQ%253D%253D",
);
api.addSearchAlias(
  "y360",
  "YouTube 360",
  "https://www.youtube.com/results?search_query={0}&sp=EgJ4AQ%253D%253D",
);
api.addSearchAlias(
  "yvr",
  "YouTube VR",
  "https://www.youtube.com/results?search_query={0}&sp=EgPQAQE%253D",
);
api.addSearchAlias(
  "y3d",
  "YouTube 3D",
  "https://www.youtube.com/results?search_query={0}&sp=EgI4AQ%253D%253D",
);
api.addSearchAlias(
  "yHDR",
  "YouTube HDR",
  "https://www.youtube.com/results?search_query={0}&sp=EgPIAQE%253D",
);
api.addSearchAlias(
  "yL",
  "YouTube Location",
  "https://www.youtube.com/results?search_query={0}&sp=EgO4AQE%253D",
);
api.addSearchAlias(
  "yP",
  "YouTube Purchased",
  "https://www.youtube.com/results?search_query={0}&sp=EgJIAQ%253D%253D",
);
api.addSearchAlias("G", "Google", "https://www.google.com/search?q={0}");
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
  "hN",
  "Hacker News",
  "https://hn.algolia.com/?q={0}&page=0&prefix=false",
);
api.addSearchAlias(
  "pH",
  "Product Hunt",
  "https://www.producthunt.com/search?q={0}",
);
api.addSearchAlias(
  "gh",
  "GitHub Repositories",
  "https://github.com/search?q={0}&type=repositories",
);
api.addSearchAlias(
  "ghC",
  "GitHub Commits",
  "https://github.com/search?q={0}&type=commits",
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
api.addSearchAlias(
  "i",
  "Gmail Search",
  "https://mail.google.com/mail/u/0/#search/{0}",
);
api.addSearchAlias(
  "Y",
  "YouTube Search",
  "https://www.youtube.com/results?search_query={0}",
);
api.addSearchAlias(
  "yH",
  "YouTube History",
  "https://www.youtube.com/feed/history?query={0}",
);
api.addSearchAlias(
  "crm",
  "Code Reference MDN",
  "https://developer.mozilla.org/en-US/search?q={0}",
);
api.addSearchAlias(
  "crdd",
  "Code Reference DevDocs",
  "http://devdocs.io/#q={0}",
);
api.addSearchAlias("wk", "Wikipedia", "https://en.wikipedia.org/wiki/{0}");
api.addSearchAlias(
  "fb",
  "Facebook",
  "https://www.facebook.com/search/top/?q={0}",
);
api.addSearchAlias("tw", "Twitter", "https://twitter.com/search?q={0}");
api.addSearchAlias(
  "ig",
  "Instagram Hashtag",
  "https://www.instagram.com/explore/tags/",
);
api.addSearchAlias("rd", "Reddit", "https://www.reddit.com/search?q={0}");

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
