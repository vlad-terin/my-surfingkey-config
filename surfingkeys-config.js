map('L', 'R');
map('H', 'E');
imap("<Ctrl-w>","Alt-w>");
// jj as escape
imap('jj', "<Esc>");
map('sU', 'su');
map('os', ':openSession');

settings.stealFocusOnLoad = true;

// Removing default search aliases
removeSearchAliasX('b')
removeSearchAliasX('g')
removeSearchAliasX('s')
removeSearchAliasX('w')
removeSearchAliasX('p');

// [+] Remove omnibar mappings to removed search aliases
unmap('ob');
unmap('og');
unmap('os');
unmap('ow');
unmap('op');



//General

(function(){

const
// put first to minimize retained size
openSearchOmnibar = function(){ Front.openOmnibar({ type: 'SearchEngine', extra: this.extra }); }
//,openLink = function(){ RUNTIME("openLink", { tab: { tabbed: true, active: true }, url: this.url }); }
,cl = window.console.log.bind(window.console)
// fix overrides so this block of code can be replaced by NOOP
// @todo: consider reporting all registered mappings that can be [before|after] key sequence
// normalOverrideF
,nOF = function(key){
    const nmEntry = Normal.mappings.find(key);
    
    if (nmEntry){
        // if meta isn't present then we're blocking set of key sequences
        cl('Override of '+ key, nmEntry.meta || nmEntry);
    }
}
// addSearchAliasX and omnibar mapping (removes previous omnibar mapping)
// addSAXWithOmnibar
,saxo = function(){
    const a = arguments,
    key  = a[0],
    desc = a[1],
    okey = 'o'+ key,
    skey = 's'+ key;

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
    // mapkey(key, a[0], openLink.bind({ url: a[2].split('{0}')[0] }));
    
    unmap(okey);
    // adds 'o'+ key mapping (open Omnibar to trigger search selected text in new tab on Enter, where selected text is value in Omnibar) 
    mapkey(okey, 'Open with '+ desc, openSearchOmnibar.bind({ extra: key }));
};



// Searches
// @todo: registered key sequences are free for mapping, must decide if it should be so
// @note: press [o|s] and wait for a list of possible commands (must be >=59 in both, otherwise some conflict blocked something)
const
googleSearchQ = 'https://www.google.com/search?q='
,googleSearchBase = googleSearchQ +'{0}'
,tStr = googleSearchBase +'&tbs=qdr:';

saxo('G', 'Google', googleSearchBase, 's');
saxo('gm', 'googlemonth', tStr +'m', 's');
saxo('gw', 'googleweek', tStr +'w', 's');
saxo('gy', 'googleyear', tStr +'y', 's');
saxo('gd', 'googleday', tStr +'d', 's');
saxo('gh', 'googlehour', tStr +'h', 's');

// conflict, changed from l to ll
saxo('ll', 'lucky', googleSearchBase +'&btnI', 's');
// conflict, changed from t to tt
saxo('tt', 'onelook', 'https://www.onelook.com/?w={0}&ls=a', 's');
saxo('s', 'onelook synonyms', 'https://www.onelook.com/thesaurus/?s={0}', 's');
saxo('d', 'google drive search', 'https://drive.google.com/drive/u/1/search?q={0}', 's');
// conflict, changed from c to cc
saxo('cc', 'technical translation', 'https://techterms.com/definition/{0}', 's');
// conflict, changed from w to ww
saxo('ww', 'wiki', 'https://en.wikipedia.org/wiki/{0}', 's');

// conflict, changed from p to ppp
saxo('ppp', 'duckHTML', 'https://duckduckgo.com/html/?q={0}', 's');

//map
saxo('gM', '구글맵', 'https://www.google.com/maps?q=');

//coding
saxo('C', 'search coding', 'https://searchcode.com/?q=');
saxo('cC', 'search coding', 'https://searchcode.com/?q=');
saxo('cW', 'chrome webstore', 'https://chrome.google.com/webstore/search/'); // chrome
saxo('cS', 'slant (editor 비교 사이트)', 'https://www.slant.co/search?query=');
saxo('gH', 'github', 'https://github.com/search?q=');
saxo('ghS', 'githubStars', 'https://github.com/vlad-terin?page=1&q=face&tab=stars&utf8=%E2%9C%93&utf8=%E2%9C%93&q=');
saxo('gC', 'githubCode', 'https://github.com/search?q={0}&type=Code');

//language
saxo('lJ', 'language Javascript', googleSearchQ +'Javascript+');
saxo('lj', 'language java', googleSearchQ +'Java+');
saxo('lC', 'C++', googleSearchQ +'C++');
saxo('lc', 'language c', googleSearchQ +'c+language+');
saxo('l#', 'language C#', googleSearchQ +'c%23+');
saxo('lR', 'language R', googleSearchQ +'languag+');
saxo('lr', 'language Ruby', googleSearchQ +'Ruby+');
saxo('lP', 'language Python', googleSearchQ +'Python+');
saxo('lp', 'language php', googleSearchQ +'php+');
saxo('lK', 'language Kotlin', googleSearchQ +'Kotlin+');
saxo('lS', 'language Swift', googleSearchQ +'Swift+');
saxo('lQ', 'language SQL Query', googleSearchQ +'SQL+');
saxo('ls', 'language Shell script', googleSearchQ +'Shell+Schript+');
saxo('lT', 'language Typescript', googleSearchQ +'TypeScript+');
saxo('lH', 'language HTML', googleSearchQ +'HTML+');

//sns
saxo('fb', 'faceBook(페이스북)', 'https://www.facebook.com/search/top/?q=');
saxo('tw', 'tWitter', 'https://twitter.com/search?q=');
saxo('ig', 'InstaGram HashTag', 'https://www.instagram.com/explore/tags/');
saxo('rd', 'redDit', 'https://www.reddit.com/search?q=');

//shorten - what is.. who is.. where is..
saxo('wa', 'advanced', googleSearchQ +'advanced+');
saxo('wb', 'basic', googleSearchQ +'basic+');
saxo('wc', 'classification', googleSearchQ +'classfication+of+');
saxo('wd', 'difference', googleSearchQ +'difference+between+');
saxo('we', 'example', googleSearchQ +'example+of+');
saxo('ww', 'wherefrom', googleSearchQ +'where+from+');
saxo('wg', 'goalof', googleSearchQ +'what+is+goal+of+');
saxo('wh', 'historyof', googleSearchQ +'history+of+');
saxo('wi', 'introductionof', googleSearchQ +'Introduction+of');

//file
saxo('pdf', 'pdf', googleSearchQ +'filetype%3Apdf+');
saxo('cpp', 'cpp', googleSearchQ +'filetype%3Acpp+');
saxo('hwp', 'hwp', googleSearchQ +'filetype%3Ahwp+');
saxo('ppt', 'ppt', googleSearchQ +'filetype%3Appt+');



// Session command shortcuts (FF only right now)
// @todo: find a way to overcome limitation of chromium extension content script
// security model (content script inherits page origin instead of having extension origin)
const
onMatch = function(d, i, cmdPrefix){
    const omnibarInput = d.getElementById('sk_omnibarSearchArea').getElementsByTagName('input')[0];
    omnibarInput.value = cmdPrefix;
    omnibarInput.focus();
    omnibarInput.dispatchEvent(new Event('input'));
}
,omnibarCmdArgs = { type: 'Commands' }
,mapToCmdPrefix = function(key, cmdPrefix, optionalOmnibarName){
    mapkey(key, (optionalOmnibarName || (':'+ (cmdPrefix || ''))) +'', function(){
        // open command omnibar (equivalent to ':' key press)
        Front.openOmnibar(omnibarCmdArgs);
    
        // find omnibar frame and fill command input field with cmdPrefix
        for (let i = 0, l = this.frames.length; i < l; i++){
            try{
                let w = this.frames[i],
                d = w.document;
                
                if (/.*\/pages\/frontend\.html$/i.test(d.URL)){
                    w.setTimeout(onMatch, 64, d, i, cmdPrefix);
                    
                    break;
                }
            }catch(e){
                cl(e);
            }
        }
    });
};

// Temporary naming (better to build Huffman-like tree from all registered keybindings to test for possible conflicts)
// @update: Normal.mappings, Visual.mappings, Instert.mappings provide methods to check if key sequence is taken
// We can reuse existing Trie constructor to find and report conflicts inside this config only
// [o]mnibar - main state
// [s]ession - common part
// [ ] - changing part - action name
unmap(';s');
mapToCmdPrefix(';sc', 'createSession ');
mapToCmdPrefix(';sd', 'deleteSession ');
mapToCmdPrefix(';sl', 'listSession');
mapToCmdPrefix(';so', 'openSession ');

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




// Youtube Fullscreen, credit github.com/okiptkn/dotfiles
function ytFullscreen() {
  $(".ytp-fullscreen-button.ytp-button").click()
}

const siteleader = "x"
const ri = { repeatIgnore: true }

function mapsitekey(domainRegex, key, desc, f, o) {
  const opts = o || {}
  mapkey(`${siteleader}${key}`, desc, f, Object.assign({}, opts, { domain: domainRegex }))
}

function mapsitekeys(d, maps) {
  const domain = d.replace(".", "\\.")
  const domainRegex = new RegExp(`^http(s)?://(([a-zA-Z0-9-_]+\\.)*)(${domain})(/.*)?`)
  maps.forEach((map) => {
    mapsitekey(domainRegex, map[0], map[1], map[2])
  })
}

mapsitekeys("youtube.com", [
  ['F', 'Toggle fullscreen', ytFullscreen],
])

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

var setLanguages = function(langSettings) {

    // Enter the appropriate app_id and app_key here only
    var _oxfordHeaders = {
        "app_id": "b9c84084",
        "app_key": "b96b8e9a328df6d70563d04c6ec4dcf4"
    };

    var _showOxfordQueryResult = function(queryResult) {
        var b = document.getSelection().getRangeAt(0).getClientRects()[0];
        Front.showBubble({
            top: b.top,
            left: b.left,
            height: b.height,
            width: b.width
        }, queryResult, false);
    };

    var parseDefinitions = function(res) {
        try {
            var obj = JSON.parse(res.text);
            results = obj.results[0];
            var word = results.word;

            var lexEntries = results.lexicalEntries;

            var entryHtml = lexEntries.map(function(entry) {
                var category = entry.lexicalCategory;

                var categoryEntriesHtml = entry.entries[0].senses.map(function(sense) {
                    var senseHtml = "";
                    if (sense.hasOwnProperty("definitions")) {
                        senseHtml = "<li><b>" + sense.definitions[0] + "</b>";
                    }
                    if (sense.hasOwnProperty("examples") && sense.hasOwnProperty("definitions")) {
                        var senseExamples = sense.examples.map(function(ex) {
                            return "<i>'" + ex.text + "'</i><br/>";
                        }).join("");
                        senseHtml = senseHtml + "<br/>Examples:<br/>" + senseExamples + "</dd>";
                    }
                    return senseHtml;
                }).join("");

                var categoryHtml = "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

                return categoryHtml;
            }).join("");
            var html = "<div><h3>Definition of " + word + "</h3>" + entryHtml + "</div>";

            return html;
        } catch (e) {
            return res.text;
        }
    };

    var parseSynonyms = function(res) {
        try {
            var obj = JSON.parse(res.text);
            results = obj.results[0];
            var word = results.word;

            var lexEntries = results.lexicalEntries;

            var entryHtml = lexEntries.map(function(entry) {
                var category = entry.lexicalCategory;

                var categoryEntriesHtml = entry.entries[0].senses.map(function(sense) {
                    var senseHtml = "<li>";
                    if (sense.hasOwnProperty("synonyms")) {
                        var senseExamples = sense.synonyms.map(function(ex) {
                            return ex.text + ", ";
                        }).join("");
                        senseHtml = senseHtml + senseExamples + "</dd>";
                    }
                    return senseHtml;
                }).join("");

                var categoryHtml = "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

                return categoryHtml;
            }).join("");
            var html = "<div><h3>Synonyms for " + word + "</h3>" + entryHtml + "</div>";

            return html;
        } catch (e) {
            return res.text;
        }
    };

    var parseAntonyms = function(res) {
        try {
            var obj = JSON.parse(res.text);
            results = obj.results[0];
            var word = results.word;

            var lexEntries = results.lexicalEntries;

            var entryHtml = lexEntries.map(function(entry) {
                var category = entry.lexicalCategory;

                var categoryEntriesHtml = entry.entries[0].senses.map(function(sense) {
                    var senseHtml = "<li>";
                    if (sense.hasOwnProperty("antonyms")) {
                        var senseExamples = sense.antonyms.map(function(ex) {
                            return ex.text + ", ";
                        }).join("");
                        senseHtml = senseHtml + senseExamples + "</dd>";
                    }
                    return senseHtml;
                }).join("");

                var categoryHtml = "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

                return categoryHtml;
            }).join("");
            var html = "<div><h3>Antonyms for " + word + "</h3>" + entryHtml + "</div>";

            return html;
        } catch (e) {
            return res.text;
        }
    };

    // Function that retrives translations given a response object
    var parseTranslations = function(res) {
        try {
            var obj = JSON.parse(res.text);

            results = obj.results[0];
            var word = results.word;

            var lexEntries = results.lexicalEntries;

            var entryHtml = lexEntries.map(function(entry) {
                var category = entry.lexicalCategory;

                var categoryEntriesHtml = entry.entries[0].senses.map(function(sense) {
                    var senseHtml = "";
                    if (sense.hasOwnProperty("translations")) {
                        senseHtml = "<li><b>" + sense.translations[0].text + "</b>";
                    }
                    if (sense.hasOwnProperty("examples") && sense.hasOwnProperty("translations")) {
                        var senseExamples = sense.examples.map(function(ex) {
                            return "<i>'" + ex.text + "'</i><br/>";
                        }).join("");
                        senseHtml = senseHtml + "<br/>Examples:<br/>" + senseExamples + "</dd>";
                    }
                    return senseHtml;
                }).join("");

                var categoryHtml = "<b>" + category + "</b>" + "<ol>" + categoryEntriesHtml + "</ol>";

                return categoryHtml;
            }).join("");

            var html = "<div><h3>Translation of " + word + "</h3>" + entryHtml + "</div>";

            return html;
        } catch (e) {
            return res.text;
        }
    }

    var searchThenQuery = function(obj) {
        var parseResult = function(res, urlCallback, callback) {
            try {
                var obj = JSON.parse(res.text);
                // for more strict filtering:
                // obj.results.length > 0 && ["headword", "inflection"].includes(obj.results[0].matchType)
                if (obj.results.length > 0) {
                    best_match = obj.results[0].id;

                    httpRequest({
                        url: urlCallback(best_match),
                        headers: _oxfordHeaders,
                    }, function(res) {
                        _showOxfordQueryResult(callback(res));
                    });
                } else {
                    var query = Visual.getWordUnderCursor();
                    _showOxfordQueryResult("<div>No match found for " + query + "</div>")
                }
            } catch (e) {
                _showOxfordQueryResult(res.text);
            }
        }
        var urlCallback = obj.url_callback;
        var callback = obj.callback;

        var query = Visual.getWordUnderCursor();
        var url =  "https://od-api.oxforddictionaries.com/api/v2/search/"

        if (obj.hasOwnProperty("translate") && obj.translate) {
            var fromlang = langSettings.translate_from;
            var tolang = langSettings.translate_to;
            url = url + fromlang + "/translations=" + tolang + "?q=" + query;
        } else {
            var lang = langSettings.definitions;
            url = url + lang + "?q=" + query;
        }

        httpRequest({
            url: url,
            headers: _oxfordHeaders,
        }, function(res) {
            return parseResult(res, urlCallback, callback);
        });

    }

    Front.registerInlineQuery({
        url: function(query) {
            var fromlang = langSettings.translate_from;
            var tolang = langSettings.translate_to;
            return "https://od-api.oxforddictionaries.com/api/v2/entries/" + fromlang + "/" + query + "/translations=" + tolang;
        },
        headers: _oxfordHeaders,
        parseResult: parseTranslations
    });

    vmapkey("q", "Translation of the selected word", function() {
        var urlCallback = function(best_match) {
            var fromlang = langSettings.translate_from;
            var tolang = langSettings.translate_to;
            return url = "https://od-api.oxforddictionaries.com/api/v2/entries/" + fromlang + "/" + best_match + "/translations=" + tolang;
        }

        searchThenQuery({
            url_callback : urlCallback,
            callback: parseTranslations,
            translate: true
        })
    });

    vmapkey("d", "Definition of the selected word", function() {
        var urlCallback = function(best_match) {
            var lang = langSettings.definitions;
            return "https://od-api.oxforddictionaries.com/api/v2/entries/" + lang + "/" + best_match;
        }

        searchThenQuery({
            url_callback : urlCallback,
            callback: parseDefinitions,
            translate: false
        })
    });


    vmapkey("z", "Synonyms of the selected word", function() {
        var urlCallback = function(best_match) {
            var lang = langSettings.definitions;
            return "https://od-api.oxforddictionaries.com/api/v2/entries/" + lang + "/" + best_match + "/synonyms";
        }

        searchThenQuery({
            url_callback : urlCallback,
            callback: parseSynonyms,
            translate: false
        })
    });

    vmapkey("a", "Antonyms of the selected word", function() {
        var urlCallback = function(best_match) {
            var lang = langSettings.definitions;
            return "https://od-api.oxforddictionaries.com/api/v2/entries/" + lang + "/" + best_match + "/antonyms";
        }

        searchThenQuery({
            url_callback : urlCallback,
            callback: parseAntonyms,
            translate: false
        })
    });

};

// Here you set the languages to use for translations, and the language to use for definitions and synonyms.

setLanguages({
    translate_from: "en",
    translate_to: "en",
    definitions: "en"
});


// tab swither

mapkey('B', 'Choose a tab with omnibar', function() {
    Front.openOmnibar({type: "Tabs"});

});


// Properties list
Hints.numericHints           = false;
settings.omnibarSuggestion   = true;
settings.defaultSearchEngine = 'G';                          // Google I'm Feeling Luckey
settings.focusFirstCandidate = false;

mapkey(',s', 'opne new tab and split', function () {
    RUNTIME("newWindow");
});


mapkey('ymr', '#7Copy multiple link regex URLs to the clipboard', function () {
    var linksToYank = [];
    Hints.create('*[href]', function (element) {
        linksToYank.push('domain: ' + '\/' + element.href.slice(8, ).split('/')[0].replace(/\./g, "\\\.") + '\/' + 'i');
        Clipboard.write(linksToYank.join('\n'));
    }, {
        multipleHits: true
    });
});

mapkey('yE', '#7 Yank Element info. copy link element id or classname', function () {
    var linksToYank = [];
    Hints.create("", function (element) {

        linksToYank.push('id: ' + element.id + '\n');
        linksToYank.push('innertext: ' + element.innerText + '\n');
        linksToYank.push('className: ' + element.className + '\n');
        linksToYank.push('href: ' + element.href + '\n');
        linksToYank.push('type: ' + element.type + '\n');
        linksToYank.push('style: ' + element.style + '\n');
        linksToYank.push('src: ' + element.src + '\n');
        linksToYank.push('alt: ' + element.alt + '\n');
        (Clipboard.write(linksToYank.join('\n')));
    });
});


// ADD: read like this yank element ~~~
mapkey('yeI', '#7 Yank Element info. copy link element id or classname', function (element) { (Clipboard.write('element.id')); });
mapkey('yeC', '#7 Yank Element info. copy link element id or classname', function (element) { (Clipboard.write('element.className')); });
mapkey('yeT', '#7 Yank Element info. copy link element id or classname', function (element) { (Clipboard.write('element.type')); });
mapkey('yeS', '#7 Yank Element info. copy link element id or classname', function (element) { (Clipboard.write('element.style')); });
mapkey('yeA', '#7 Yank Element info. copy link element id or classname', function (element) { (Clipboard.write('element.alt')); });

mapkey('ymE', '#7 Yank Multiple Element info  (copy multiple link element id or classname)', function () {
    var linksToYank = [];
    Hints.create('*[href]', function (element) {

        linksToYank.push('id: ' + element.id + '\n');
        linksToYank.push('innertext: ' + element.innerText + '\n');
        linksToYank.push('className: ' + element.className + '\n');
        (Clipboard.write(linksToYank.join('\n')));
    }, {
        multipleHits: true
    });
});


//git clone
mapkey('yg', '#7 git clone', function () {
    Clipboard.write('git clone ' + window.location.href + '.git');
}, {
    domain: /github\.com/i
});


//////////////////////////////////////////////////////////
// visualmode setting
//////////////////////////////////////////////////////////
vmapkey('"y', "surround selection with doube quotation mark", function () {
    Clipboard.write('"' + window.getSelection().toString().replace(/\n/g, " ") + '"');
});
vmapkey('<y', "surround selection ", function () {
    Clipboard.write('<' + window.getSelection().toString() + '>');
});
vmapkey('(y', "surround selection ", function () {
    Clipboard.write('(' + window.getSelection().toString() + ')');
});
vmapkey('[y', "surround selection ", function () {
    Clipboard.write('[' + window.getSelection().toString() + ']');
});
vmapkey('{y', "surround selection ", function () {
    Clipboard.write('{' + window.getSelection().toString() + '}');
});
vmapkey('/*y', "surround selection ", function () {
    Clipboard.write('/*' + window.getSelection().toString() + '*/');
});
vmapkey('<--!y', "surround selection ", function () {
    Clipboard.write('<--!' + window.getSelection().toString() + '-->');
});
vmapkey('~y', "surround selection ", function () {
    var UpperSelected = window.getSelection().toString()
    Clipboard.write(UpperSelected.toUpperCase());
});
vmapkey('~jy', "Remove enter", function () {
    Clipboard.write(window.getSelection().toString().replace(/\n/g, " "));
});
vmapkey('~cy', "Added comma", function () {
    Clipboard.write(window.getSelection().toString().replace(/[ ,]+/g, ","));
});
vmapkey('~dy', "Delete first 1 character", function () {
    Clipboard.write(window.getSelection().toString().substr(1));
});
vmapkey('~Dy', "Delete surrounded", function () {
    Clipboard.write(window.getSelection().toString().slice(1, -1));
});
vmapkey('~sy', "Remove special character (blank is not considered as special character", function () { //TODO: Black is not work
    Clipboard.write(window.getSelection().toString().replace(/[^A-Z0-9:blank:]/ig, ""));
});
vmapkey('~dy', "Markdown Strikethrough", function () {
    Clipboard.write('~~ ' + window.getSelection().toString() + ' ~~');
});
//TODO: multiple clipboard test
vmapkey('my', '#7Copy multiple  동작하지 않음 FIXlink URLs to the clipboard', function () {
    var textToYank = [];
    textToYank.push(window.getSelection.toString());
    Clipboard.write('"' + textToYank.join('\n') + '"');
});

// markdown
vmapkey('miy', "Markdown italic", function () {
    Clipboard.write('*' + window.getSelection().toString() + '*');
});
vmapkey('mby', "Markdown bold", function () {
    Clipboard.write('**' + window.getSelection().toString() + '**');
});
vmapkey('mly', "Markdown link", function () {
    Clipboard.write('[replaceit](' + window.getSelection().toString() + ')');
});
mapkey('yml', "Markdown link", function () {
    Clipboard.write(`[${document.title}](${window.location.href})`);
});
vmapkey('msy', "Markdown Strikethrough", function () {
    Clipboard.write('~~ ' + window.getSelection().toString() + ' ~~');
});


//setting
mapkey('gs', '#12 go Setting - Open Chrome Settings', function () {
    tabOpenLink("chrome://settings/");
});
mapkey('gE', '#12 go Extensions - Open Chrome extensions Shortcut setting', function () {
    tabOpenLink("chrome://extensions/shortcuts");
});

//github shortcuts
mapkey('gC', 'Go to the code tab', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[0].click();
}, {
    domain: /github\.com/i
});


mapkey('gI', 'Go to the Issues tab. ', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[1].click();
}, {
    domain: /github\.com/i
});

mapkey('gP', 'Go to the Pull requests tab.  ', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[2].click();
}, {
    domain: /github\.com/i
});
mapkey('gB', 'Go to the Projects tab. "', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[3].click();
}, {
    domain: /github\.com/i
});

mapkey('gW', 'Go to the Wiki tab. ', function () {
    document.querySelectorAll('.js-selected-navigation-item.reponav-item')[4].click();
}, {
    domain: /github\.com/i
});

mapkey('gO', 'Go to the Overview tab. ', function () {
    document.querySelectorAll('.UnderlineNav-item')[0].click();
}, {
    domain: /github\.com/i
});
mapkey('gR', 'Go to the Repository tab. ', function () {
    document.querySelectorAll('.UnderlineNav-item')[1].click();
}, {
    domain: /github\.com/i
});
mapkey('gS', 'Go to the Stars tab. ', function () {
    document.querySelectorAll('.UnderlineNav-item')[2].click();
}, {
    domain: /github\.com/i
});

// goto comment - Usually comments are in textarea format
mapkey('gT', 'Goto Text Area', function () {
    documents.getElementsByClassName('.textarea')[0].click();
});


    settings.theme = `
    .sk_theme {
        font-family: Input Sans Condensed, Charcoal, sans-serif;
        font-size: 10pt;
        background: #24272e;
        background: #24272e;
        color: #3de447;
    }
    .sk_theme tbody {
        color: #fff;
    }
    .sk_theme input {
        color: #d0d0d0;
    }
    .sk_theme .url {
        color: #61afef;
    }
    .sk_theme .annotation {
        color: #3de447;
    }
    .sk_theme .omnibar_highlight {
        color: #528bff;
    }
    .sk_theme .omnibar_timestamp {
        color: #e5c07b;
    }
    .sk_theme .omnibar_visitcount {
        color: #98c379;
    }
  
    #sk_status, #sk_find {
        font-size: 20pt;
    }`;
    // click `Save` button to make above settings to take effect.
