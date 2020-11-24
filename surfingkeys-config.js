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

// [+] Remove omnibar mappings to removed search aliases
unmap('ob');
unmap('og');
unmap('os');
unmap('ow');

//General

// [+-] Google searches
(function(){

const
openOmnibar = function(){ Front.openOmnibar(this); },
// addSearchAliasX and omnibar mapping (removes previous omnibar mapping)
addSAXWithOmnibar = function(){
    unmap('o'+ arguments[0]);
    
    addSearchAliasX.apply(null, arguments);
    
    mapkey('o'+ arguments[0], 'Open with '+ arguments[1], openOmnibar.bind({type: "SearchEngine", extra: arguments[0] +''}));
},
googleSearchBase = 'https://www.google.com/search?q={0}';

addSAXWithOmnibar('G', 'Google', googleSearchBase, 's');
addSAXWithOmnibar('gm', 'googlemonth', googleSearchBase +'&tbs=qdr:m', 's');
addSAXWithOmnibar('gw', 'googleweek', googleSearchBase +'&tbs=qdr:w', 's');
addSAXWithOmnibar('gy', 'googleyear', googleSearchBase +'&tbs=qdr:y', 's');
addSAXWithOmnibar('gd', 'googleday', googleSearchBase +'&tbs=qdr:d', 's');
addSAXWithOmnibar('gh', 'googlehour', googleSearchBase +'&tbs=qdr:h', 's');

})();

// [+] Session command shortcuts
(function(){

const
omnibarCmdArgs = { type: 'Commands' },
mapToCmdPrefix = function(key, cmdPrefix, optionalOmnibarName){
    mapkey(key, (optionalOmnibarName || (':'+ (cmdPrefix || ''))) +'', function(){
        // open command omnibar (equivalent to ':' key press)
        Front.openOmnibar(omnibarCmdArgs);
    
        // find omnibar frame and fill command input field with cmdPrefix
        for (var i = 0, l = this.frames.length; i < l; i++){
            try{
                var w = this.frames[i],
                d = w.document;
                
                if (/.*\/pages\/frontend\.html$/i.test(d.URL)){
                    w.setTimeout(function(i){
                        var omnibarInput = d.getElementById('sk_omnibarSearchArea').getElementsByTagName('input')[0];
                        omnibarInput.value = cmdPrefix;
                        omnibarInput.focus();
                        omnibarInput.dispatchEvent(new Event('input'));
                    }, 64, i);
                    
                    break;
                }
            }catch(e){
                //window.console.log(e);
            }
        }
    });
};

// Temporary naming (better to build Huffman-like tree from all registered keybindings to test for possible conflicts)
// [o]mnibar - main state
// [s]ession - common part
// [ ] - changing part - action name
mapToCmdPrefix('osc', 'createSession ');
mapToCmdPrefix('osd', 'deleteSession ');
mapToCmdPrefix('osl', 'listSession');
mapToCmdPrefix('oso', 'openSession ');

})();

addSearchAliasX('l', 'lucky', 'http://www.google.com/search?q={0}&btnI', 's');
addSearchAliasX('t', 'onelook', 'https://www.onelook.com/?w={0}&ls=a', 's');
addSearchAliasX('s', 'onelook synonyms', 'https://www.onelook.com/thesaurus/?s=', 's');
addSearchAliasX('d', 'google drive search', 'https://drive.google.com/drive/u/1/search?q=', 's');
addSearchAliasX('c', 'technical translation', 'https://techterms.com/definition/{0}', 's');
addSearchAliasX('w', 'wiki', 'https://en.wikipedia.org/wiki/{0}', 's');
//addSearchAliasX('d', 'duckHTML', 'https://duckduckgo.com/html/?q=', 's', 'https://duckduckgo.com/ac/?q=', function(response) {
//    var res = JSON.parse(response.text);
//    return res.map(function(r){
//        return r.phrase;
//    });
//});
mapkey('op', '#8Open Search with duckduckgoHTML', function() {
    Front.openOmnibar({type: "SearchEngine", extra: "p"});
});

//map
addSearchAliasX('gM', '구글맵', 'https://www.google.com/maps?q=');

//coding
addSearchAliasX('C', 'search coding', 'https://searchcode.com/?q=');
addSearchAliasX('cC', 'search coding', 'https://searchcode.com/?q=');
addSearchAliasX('cW', 'chrome webstore', 'https://chrome.google.com/webstore/search/'); // chrome
addSearchAliasX('cS', 'slant (editor 비교 사이트)', 'https://www.slant.co/search?query=');
addSearchAliasX('gH', 'github', 'https://github.com/search?q=');
addSearchAliasX('ghS', 'githubStars', 'https://github.com/vlad-terin?page=1&q=face&tab=stars&utf8=%E2%9C%93&utf8=%E2%9C%93&q=');
addSearchAliasX('gC', 'githubCode', 'https://github.com/search?q={0}&type=Code');

//language
addSearchAliasX('lJ', 'language Javascript', 'https://www.google.com/search?q=Javascript+');
addSearchAliasX('lj', 'language java', 'https://www.google.com/search?q=Java+');
addSearchAliasX('lC', 'C++', 'https://www.google.com/search?q=C++');
addSearchAliasX('lc', 'language c', 'https://www.google.com/search?q=c+language+');
addSearchAliasX('l#', 'language C#', 'https://www.google.com/search?q=c%23+');
addSearchAliasX('lR', 'language R', 'https://www.google.com/search?q=languag+');
addSearchAliasX('lr', 'language Ruby', 'https://www.google.com/search?q=Ruby+');
addSearchAliasX('lP', 'language Python', 'https://www.google.com/search?q=Python+');
addSearchAliasX('lp', 'language php', 'https://www.google.com/search?q=php+');
addSearchAliasX('lK', 'language Kotlin', 'https://www.google.com/search?q=Kotlin+');
addSearchAliasX('lS', 'language Swift', 'https://www.google.com/search?q=Swift+');
addSearchAliasX('lQ', 'language SQL Query', 'https://www.google.com/search?q=SQL+');
addSearchAliasX('ls', 'language Shell script', 'https://www.google.com/search?q=Shell+Schript+');
addSearchAliasX('lT', 'language Typescript', 'https://www.google.com/search?q=TypeScript+');
addSearchAliasX('lH', 'language HTML', 'https://www.google.com/search?q=HTML+');

//sns
addSearchAliasX('fb', 'faceBook(페이스북)', 'https://www.facebook.com/search/top/?q=');
addSearchAliasX('tw', 'tWitter', 'https://twitter.com/search?q=');
addSearchAliasX('ig', 'InstaGram HashTag', 'https://www.instagram.com/explore/tags/');
addSearchAliasX('rd', 'redDit', 'https://www.reddit.com/search?q=');

//shorten - what is.. who is.. where is..
addSearchAliasX('wa', 'advanced', 'https://www.google.com/search?q=advanced+');
addSearchAliasX('wb', 'basic', 'https://www.google.com/search?q=basic+');
addSearchAliasX('wc', 'classification', 'https://www.google.com/search?q=classfication+of+');
addSearchAliasX('wd', 'difference', 'https://www.google.com/search?q=difference+between+');
addSearchAliasX('we', 'example', 'https://www.google.com/search?q=example+of+');
addSearchAliasX('ww', 'wherefrom', 'https://www.google.com/search?q=where+from+');
addSearchAliasX('wg', 'goalof', 'https://www.google.com/search?q=what+is+goal+of+');
addSearchAliasX('wh', 'historyof', 'https://www.google.com/search?q=history+of+');
addSearchAliasX('wi', 'introductionof', 'https://www.google.com/search?q=Introduction+of');
//file
addSearchAliasX('pdf', 'pdf', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Apdf+');
addSearchAliasX('cpp', 'cpp', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Acpp+');
addSearchAliasX('hwp', 'hwp', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Ahwp+');
addSearchAliasX('ppt', 'ppt', 'https://www.google.com/search?hl=en&biw=1600&bih=817&ei=ufUTW5_5FcGVmAXPqAc&q=filetype%3Appt+');


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
