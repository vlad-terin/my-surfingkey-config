//################################################################################################## Warning
// @note: here and below brackets used for ease of code block folding
{
// ************************* WARNING *************************
//
// The file contains the default mappings, and it is released un-minified
// for your referrence on creating your own mappings.
//
// But please don't just copy statement from this file to your own settings.
// As the bound functions in this file may rely on some unstable functions/
// variables, which may be changed some day. If you insist on that, please
// compare your settings with this file to find what stops your keystrokes
// from working.
//
// Therefore, the best practice to remap is using map instead of mapkey, for
// example:
//
//      map('F', 'af');
//
// is better than
//
//      mapkey('F', '#1Open a link in new tab', 'Hints.create("", Hints.dispatchMouseClick, {tabbed: true})');
//
// ************************* WARNING *************************
}





function createDefaultMappings() {
//################################################################################################## console.warn filter for surfingkeys
{
// supress annoying console warnings from surfingkeys
// @note: comment out if you need to fix warnings
this.console.warn	=	(function(warn, undefined){
	return function(msg){
		const supress	=	typeof msg == 'string'
			? (
				msg.indexOf(' precedes ') != -1
				|| msg.indexOf(' is overridden by ') != -1
			)
			: msg && typeof msg.join == 'function' && (
				msg.join('').indexOf(' precedes ') != -1
				|| msg.join('').indexOf(' is overridden by ') != -1
			);

		return supress ? undefined : warn(msg);
	};
})(this.console.warn.bind(null));

}





//################################################################################################## Default Mappings
// @todo: remap to avoid conflicts with Custom Mappings
{
imapkey("<Ctrl-'>", '#15Toggle quotes in an input element', toggleQuote);
imapkey('<Ctrl-i>', '#15Open vim editor for current input', function() {
    var element = getRealEdit();
    element.blur();
    Insert.exit();
    Front.showEditor(element);
});
function toggleProxySite(host) {
    RUNTIME('updateProxy', {
        host: host,
        operation: "toggle"
    });
    return true;
}
mapkey('cp', '#13Toggle proxy for current site', function() {
    var host = window.location.host.replace(/:\d+/,'');
    if (host && host.length) {
        toggleProxySite(host);
    }
});
mapkey(';cp', '#13Copy proxy info', function() {
    RUNTIME('getSettings', {
        key: ['proxyMode', 'proxy', 'autoproxy_hosts']
    }, function(response) {
        Clipboard.write(JSON.stringify(response.settings, null, 4));
    });
});
mapkey(';ap', '#13Apply proxy info from clipboard', function() {
    Clipboard.read(function(response) {
        var proxyConf = JSON.parse(response.data);
        RUNTIME('updateProxy', {
            operation: 'set',
            host: proxyConf.autoproxy_hosts,
            proxy: proxyConf.proxy,
            mode: proxyConf.proxyMode
        });
    });
});
// create shortcuts for the command with different parameters
map(';pa', ':setProxyMode always', 0, '#13set proxy mode `always`');
map(';pb', ':setProxyMode byhost', 0, '#13set proxy mode `byhost`');
map(';pd', ':setProxyMode direct', 0, '#13set proxy mode `direct`');
map(';ps', ':setProxyMode system', 0, '#13set proxy mode `system`');
map(';pc', ':setProxyMode clear', 0, '#13set proxy mode `clear`');
mapkey('gr', '#14Read selected text or text from clipboard', function() {
    Clipboard.read(function(response) {
        readText(window.getSelection().toString() || response.data, {verbose: true});
    });
});
vmapkey('gr', '#9Read selected text', function() {
    readText(window.getSelection().toString(), {verbose: true});
});
map('g0', ':feedkeys 99E', 0, "#3Go to the first tab");
map('g$', ':feedkeys 99R', 0, "#3Go to the last tab");
mapkey('zr', '#3zoom reset', function() {
    RUNTIME('setZoom', {
        zoomFactor: 0
    });
});
mapkey('zi', '#3zoom in', function() {
    RUNTIME('setZoom', {
        zoomFactor: 0.1
    });
});
mapkey('zo', '#3zoom out', function() {
    RUNTIME('setZoom', {
        zoomFactor: -0.1
    });
});

map('ZQ', ':quit');
mapkey(".", '#0Repeat last action', Normal.repeatLast, {repeatIgnore: true});
mapkey(";ql", '#0Show last action', function() {
    Front.showPopup(htmlEncode(runtime.conf.lastKeys.map(function(k) {
        return KeyboardUtils.decodeKeystroke(k);
    }).join(' → ')));
}, {repeatIgnore: true});
mapkey('ZZ', '#5Save session and quit', function() {
    RUNTIME('createSession', {
        name: 'LAST',
        quitAfterSaved: true
    });
});
mapkey('ZR', '#5Restore last session', function() {
    RUNTIME('openSession', {
        name: 'LAST'
    });
});
mapkey('T', '#3Choose a tab', function() {
    Front.chooseTab();
});
mapkey('?', '#0Show usage', function() {
    Front.showUsage();
});
map('u', 'e');
mapkey('af', '#1Open a link in active new tab', function() {
    Hints.create("", Hints.dispatchMouseClick, {tabbed: true, active: true});
});
mapkey('gf', '#1Open a link in non-active new tab', function() {
    Hints.create("", Hints.dispatchMouseClick, {tabbed: true, active: false});
});
mapkey('cf', '#1Open multiple links in a new tab', function() {
    Hints.create("", Hints.dispatchMouseClick, {multipleHits: true});
});
// map('C', 'gf');
mapkey('<Ctrl-h>', '#1Mouse over elements.', function() {
    Hints.create("", Hints.dispatchMouseClick, {mouseEvents: ["mouseover"]});
});
mapkey('<Ctrl-j>', '#1Mouse out elements.', function() {
    Hints.create("", Hints.dispatchMouseClick, {mouseEvents: ["mouseout"]});
});
mapkey('ya', '#7Copy a link URL to the clipboard', function() {
    Hints.create('*[href]', function(element) {
        Clipboard.write(element.href);
    });
});
// mapkey('yma', '#7Copy multiple link URLs to the clipboard', function() {
//     var linksToYank = [];
//     Hints.create('*[href]', function(element) {
//         linksToYank.push(element.href);
//         Clipboard.write(linksToYank.join('\n'));
//     }, {multipleHits: true});
// });
// function getTableColumnHeads() {
//     var tds = [];
//     document.querySelectorAll("table").forEach(function(t) {
//         var tr = t.querySelector("tr");
//         if (tr) {
//             tds.push(...tr.children);
//         }
//     });
//     return tds;
// }
// mapkey('yc', '#7Copy a column of a table', function() {
//     Hints.create(getTableColumnHeads(), function(element) {
//         var column = Array.from(element.closest("table").querySelectorAll("tr")).map(function(tr) {
//             return tr.children.length > element.cellIndex ? tr.children[element.cellIndex].innerText : "";
//         });
//         Clipboard.write(column.join("\n"));
//     });
// });
// mapkey('ymc', '#7Copy multiple columns of a table', function() {
//     var rows = null;
//     Hints.create(getTableColumnHeads(), function(element) {
//         var column = Array.from(element.closest("table").querySelectorAll("tr")).map(function(tr) {
//             return tr.children.length > element.cellIndex ? tr.children[element.cellIndex].innerText : "";
//         });
//         if (!rows) {
//             rows = column;
//         } else {
//             column.forEach(function(c, i) {
//                 rows[i] += "\t" + c;
//             });
//         }
//         Clipboard.write(rows.join("\n"));
//     }, {multipleHits: true});
// });
mapkey('yq', '#7Copy pre text', function() {
    Hints.create("pre", function(element) {
        Clipboard.write(element.innerText);
    });
});
mapkey('i', '#1Go to edit box', function() {
    Hints.create("input, textarea, *[contenteditable=true], *[role=textbox], select, div.ace_cursor", Hints.dispatchMouseClick);
});
// mapkey('gi', '#1Go to the first edit box', function() {
//     Hints.createInputLayer();
// });
mapkey('I', '#1Go to edit box with vim editor', function() {
    Hints.create("input, textarea, *[contenteditable=true], select", function(element) {
        Front.showEditor(element);
    });
});
mapkey('O', '#1Open detected links from text', function() {
    Hints.create(runtime.conf.clickablePat, function(element) {
        window.location.assign(element[2]);
    }, {statusLine: "Open detected links from text"});
});

mapkey(';s', 'Toggle PDF viewer from SurfingKeys', function() {
    var pdfUrl = window.location.href;
    if (pdfUrl.indexOf(chrome.extension.getURL("/pages/pdf_viewer.html")) === 0) {
        pdfUrl = window.location.search.substr(3);
        chrome.storage.local.set({"noPdfViewer": 1}, function() {
            window.location.replace(pdfUrl);
        });
    } else {
        if (document.querySelector("EMBED") && document.querySelector("EMBED").getAttribute("type") === "application/pdf") {
            chrome.storage.local.remove("noPdfViewer", function() {
                window.location.replace(pdfUrl);
            });
        } else {
            chrome.storage.local.get("noPdfViewer", function(resp) {
                if(!resp.noPdfViewer) {
                    chrome.storage.local.set({"noPdfViewer": 1}, function() {
                        Front.showBanner("PDF viewer disabled.");
                    });
                } else {
                    chrome.storage.local.remove("noPdfViewer", function() {
                        Front.showBanner("PDF viewer enabled.");
                    });
                }
            });
        }
    }
});
map('<Ctrl-i>', 'I');
cmap('<ArrowDown>', '<Tab>');
cmap('<ArrowUp>', '<Shift-Tab>');
cmap('<Ctrl-n>', '<Tab>');
cmap('<Ctrl-p>', '<Shift-Tab>');
mapkey('q', '#1Click on an Image or a button', function() {
    Hints.create("img, button", Hints.dispatchMouseClick);
});
mapkey('<Alt-i>', '#0enter PassThrough mode to temporarily suppress SurfingKeys', function() {
    Normal.passThrough();
});
mapkey('p', '#0enter ephemeral PassThrough mode to temporarily suppress SurfingKeys', function() {
    Normal.passThrough(1000);
});
mapkey('<Alt-p>', '#3pin/unpin current tab', function() {
    RUNTIME("togglePinTab");
});
mapkey('<Alt-m>', '#3mute/unmute current tab', function() {
    RUNTIME("muteTab");
});
mapkey('B', '#4Go one tab history back', function() {
    RUNTIME("historyTab", {backward: true});
}, {repeatIgnore: true});
mapkey('F', '#4Go one tab history forward', function() {
    RUNTIME("historyTab", {backward: false});
}, {repeatIgnore: true});
mapkey('<Ctrl-6>', '#4Go to last used tab', function() {
    RUNTIME("goToLastTab");
});
mapkey('gT', '#4Go to first activated tab', function() {
    RUNTIME("historyTab", {index: 0});
}, {repeatIgnore: true});
mapkey('gt', '#4Go to last activated tab', function() {
    RUNTIME("historyTab", {index: -1});
}, {repeatIgnore: true});
mapkey('S', '#4Go back in history', function() {
    history.go(-1);
}, {repeatIgnore: true});
mapkey('D', '#4Go forward in history', function() {
    history.go(1);
}, {repeatIgnore: true});
mapkey('r', '#4Reload the page', function() {
    RUNTIME("reloadTab", { nocache: false });
});
mapkey('t', '#8Open a URL', function() {
    Front.openOmnibar({type: "URLs", extra: "getAllSites"});
});
mapkey('go', '#8Open a URL in current tab', function() {
    Front.openOmnibar({type: "URLs", extra: "getAllSites", tabbed: false});
});
// mapkey('oi', '#8Open incognito window', function() {
//     RUNTIME('openIncognito', {
//         url: window.location.href
//     });
// });
mapkey('ox', '#8Open recently closed URL', function() {
    Front.openOmnibar({type: "URLs", extra: "getRecentlyClosed"});
});
mapkey('H', '#8Open opened URL in current tab', function() {
    Front.openOmnibar({type: "URLs", extra: "getTabURLs"});
});
mapkey('Q', '#8Open omnibar for word translation', function() {
    Front.openOmniquery({query: Normal.getWordUnderCursor(), style: "opacity: 0.8;"});
});
mapkey('b', '#8Open a bookmark', function() {
    Front.openOmnibar(({type: "Bookmarks"}));
});
mapkey('ab', '#8Bookmark current page to selected folder', function() {
    var page = {
        url: window.location.href,
        title: document.title
    };
    Front.openOmnibar(({type: "AddBookmark", extra: page}));
});
mapkey('ohh', '#8Open URL from history', function() {
    Front.openOmnibar({type: "History"});
});
mapkey('om', '#8Open URL from vim-like marks', function() {
    Front.openOmnibar({type: "VIMarks"});
});
mapkey(':', '#8Open commands', function() {
    Front.openOmnibar({type: "Commands"});
});
mapkey('yv', '#7Yank text of an element', function() {
    Visual.toggle("y");
});
// mapkey('ymv', '#7Yank text of multiple elements', function() {
//     Visual.toggle("ym");
// });
mapkey('yi', '#7Yank text of an input', function() {
    Hints.create("input, textarea, select", function(element) {
        Clipboard.write(element.value);
    });
});
mapkey('V', '#9Restore visual mode', function() {
    Visual.restore();
});
mapkey('*', '#9Find selected text in current page', function() {
    Visual.star();
    Visual.toggle();
});
vmapkey('<Ctrl-u>', '#9Backward 20 lines', function() {
    Visual.feedkeys('20k');
});
vmapkey('<Ctrl-d>', '#9Forward 20 lines', function() {
    Visual.feedkeys('20j');
});
mapkey('x', '#3Close current tab', function() {
    RUNTIME("closeTab");
});
mapkey('X', '#3Restore closed tab', function() {
    RUNTIME("openLast");
});
mapkey('W', '#3New window with current tab',  function() {
    RUNTIME("newWindow");
});
mapkey('m', '#10Add current URL to vim-like marks', Normal.addVIMark);
mapkey("'", '#10Jump to vim-like mark', Normal.jumpVIMark);
mapkey("<Ctrl-'>", '#10Jump to vim-like mark in new tab.', function(mark) {
    Normal.jumpVIMark(mark);
});
mapkey('<<', '#3Move current tab to left', function() {
    RUNTIME('moveTab', {
        step: -1
    });
});
mapkey('>>', '#3Move current tab to right', function() {
    RUNTIME('moveTab', {
        step: 1
    });
});
mapkey('w', '#2Switch frames', function() {
    Normal.rotateFrame();
});
mapkey(';w', '#2Focus top window', function() {
    top.focus();
});
mapkey('cc', '#7Open selected link or link from clipboard', function() {
    if (window.getSelection().toString()) {
        tabOpenLink(window.getSelection().toString());
    } else {
        Clipboard.read(function(response) {
            tabOpenLink(response.data);
        });
    }
});
mapkey('[[', '#1Click on the previous link on current page', previousPage);
mapkey(']]', '#1Click on the next link on current page', nextPage);
// mapkey('ys', "#7Copy current page's source", function() {
//     var aa = document.documentElement.cloneNode(true);
//     Clipboard.write(aa.outerHTML);
// });
mapkey('yj', "#7Copy current settings", function() {
    RUNTIME('getSettings', {
        key: "RAW"
    }, function(response) {
        Clipboard.write(JSON.stringify(response.settings, null, 4));
    });
});
mapkey(';pj', "#7Restore settings data from clipboard", function() {
    Clipboard.read(function(response) {
        RUNTIME('updateSettings', {
            settings: JSON.parse(response.data.trim())
        });
    });
});
// mapkey('yd', "#7Copy current downloading URL", function() {
//     RUNTIME('getDownloads', {
//         query: {state: "in_progress"}
//     }, function(response) {
//         var items = response.downloads.map(function(o) {
//             return o.url;
//         });
//         Clipboard.write(items.join(','));
//     });
// });
mapkey('yt', '#3Duplicate current tab', function() {
    RUNTIME("duplicateTab");
});
mapkey('yT', '#3Duplicate current tab in background', function() {
    RUNTIME("duplicateTab", {active: false});
});
// mapkey('yy', "#7Copy current page's URL", function() {
//     Clipboard.write(window.location.href);
// });
// mapkey('yh', "#7Copy current page's host", function() {
//     var url = new URL(window.location.href);
//     Clipboard.write(url.host);
// });
mapkey('yl', "#7Copy current page's title", function() {
    Clipboard.write(document.title);
});
mapkey('yQ', '#7Copy all query history of OmniQuery.', function() {
    RUNTIME('getSettings', {
        key: 'OmniQueryHistory'
    }, function(response) {
        Clipboard.write(response.settings.OmniQueryHistory.join("\n"));
    });
});
function generateFormKey(form) {
    return (form.method || "get") + "::" + new URL(form.action).pathname;
}
mapkey('yf', '#7Copy form data in JSON on current page', function() {
    var fd = {};
    document.querySelectorAll('form').forEach(function(form) {
        fd[generateFormKey(form)] = getFormData(form, "json");
    });
    Clipboard.write(JSON.stringify(fd, null, 4));
});
mapkey(';pf', '#7Fill form with data from yf', function() {
    Hints.create('form', function(element, event) {
        var formKey = generateFormKey(element);
        Clipboard.read(function(response) {
            var forms = JSON.parse(response.data.trim());
            if (forms.hasOwnProperty(formKey)) {
                var fd = forms[formKey];
                element.querySelectorAll('input, textarea').forEach(function(ip) {
                    if (fd.hasOwnProperty(ip.name) && ip.type !== "hidden") {
                        if (ip.type === "radio") {
                            var op = element.querySelector(`input[name='${ip.name}'][value='${fd[ip.name]}']`);
                            if (op) {
                                op.checked = true;
                            }
                        } else if (Array.isArray(fd[ip.name])) {
                            element.querySelectorAll(`input[name='${ip.name}']`).forEach(function(ip) {
                                ip.checked = false;
                            });
                            var vals = fd[ip.name];
                            vals.forEach(function(v) {
                                var op = element.querySelector(`input[name='${ip.name}'][value='${v}']`);
                                if (op) {
                                    op.checked = true;
                                }
                            });
                        } else if (typeof(fd[ip.name]) === "string") {
                            ip.value = fd[ip.name];
                        }
                    }
                });
            } else {
                Front.showBanner("No form data found for your selection from clipboard.");
            }
        });
    });
});
mapkey('yg', '#7Capture current page', function() {
    Front.toggleStatus(false);
    setTimeout(function() {
        RUNTIME('captureVisibleTab', null, function(response) {
            Front.toggleStatus(true);
            Front.showPopup("<img src='{0}' />".format(response.dataUrl));
        });
    }, 500);
});
// mapkey('yp', '#7Copy form data for POST on current page', function() {
//     var aa = [];
//     document.querySelectorAll('form').forEach(function(form) {
//         var fd = {};
//         fd[(form.method || "get") + "::" + form.action] = getFormData(form);
//         aa.push(fd);
//     });
//     Clipboard.write(JSON.stringify(aa, null, 4));
// });
// mapkey('ob', '#8Open Search with alias b', function() {
//     Front.openOmnibar({type: "SearchEngine", extra: "b"});
// });
// mapkey('og', '#8Open Search with alias g', function() {
//     Front.openOmnibar({type: "SearchEngine", extra: "g"});
// });
// mapkey('od', '#8Open Search with alias d', function() {
//     Front.openOmnibar({type: "SearchEngine", extra: "d"});
// });
// mapkey('ow', '#8Open Search with alias w', function() {
//     Front.openOmnibar({type: "SearchEngine", extra: "w"});
// });
// mapkey('oy', '#8Open Search with alias y', function() {
//     Front.openOmnibar({type: "SearchEngine", extra: "y"});
// });
if (window.navigator.userAgent.indexOf("Firefox") > 0) {
    mapkey('on', '#3Open newtab', function() {
        tabOpenLink("about:blank");
    });
} else {
    mapkey('on', '#3Open newtab', function() {
        tabOpenLink("chrome://newtab/");
    });
    mapkey('ga', '#12Open Chrome About', function() {
        tabOpenLink("chrome://help/");
    });
    mapkey('gb', '#12Open Chrome Bookmarks', function() {
        tabOpenLink("chrome://bookmarks/");
    });
    mapkey('gc', '#12Open Chrome Cache', function() {
        tabOpenLink("chrome://cache/");
    });
    // mapkey('gd', '#12Open Chrome Downloads', function() {
    //     tabOpenLink("chrome://downloads/");
    // });
    mapkey('gh', '#12Open Chrome History', function() {
        tabOpenLink("chrome://history/");
    });
    mapkey('gk', '#12Open Chrome Cookies', function() {
        tabOpenLink("chrome://settings/content/cookies");
    });
    mapkey('ge', '#12Open Chrome Extensions', function() {
        tabOpenLink("chrome://extensions/");
    });
    mapkey('gn', '#12Open Chrome net-internals', function() {
        tabOpenLink("chrome://net-internals/#proxy");
    });
    mapkey(';i', '#12Open Chrome Inspect', function() {
        tabOpenLink("chrome://inspect/#devices");
    });
    mapkey('<Ctrl-Alt-d>', '#11Mermaid diagram generator', function() {
        tabOpenLink("/pages/mermaid.html");
    });
}
mapkey('gs', '#12View page source', function() {
    RUNTIME("viewSource", { tab: { tabbed: true }});
});
mapkey('gu', '#4Go up one path in the URL', function() {
    var pathname = location.pathname;
    if (pathname.length > 1) {
        pathname = pathname.endsWith('/') ? pathname.substr(0, pathname.length - 1) : pathname;
        var last = pathname.lastIndexOf('/'), repeats = RUNTIME.repeats;
        RUNTIME.repeats = 1;
        while (repeats-- > 1) {
            var p = pathname.lastIndexOf('/', last - 1);
            if (p === -1) {
                break;
            } else {
                last = p;
            }
        }
        pathname = pathname.substr(0, last);
    }
    window.location.href = location.origin + pathname;
});
mapkey('g?', '#4Reload current page without query string(all parts after question mark)', function() {
    window.location.href = window.location.href.replace(/\?[^\?]*$/, '');
});
mapkey('g#', '#4Reload current page without hash fragment', function() {
    window.location.href = window.location.href.replace(/\#[^\#]*$/, '');
});
mapkey('gU', '#4Go to root of current URL hierarchy', function() {
    window.location.href = window.location.origin;
});
mapkey('gxt', '#3Close tab on left', function() {
    RUNTIME("closeTabLeft");
});
mapkey('gxT', '#3Close tab on right', function() {
    RUNTIME("closeTabRight");
});
mapkey('gx0', '#3Close all tabs on left', function() {
    RUNTIME("closeTabsToLeft");
});
mapkey('gx$', '#3Close all tabs on right', function() {
    RUNTIME("closeTabsToRight");
});
mapkey('gxx', '#3Close all tabs except current one', function() {
    RUNTIME("tabOnly");
});
mapkey(';e', '#11Edit Settings', function() {
    tabOpenLink("/pages/options.html");
});
mapkey(';pm', '#11Preview markdown', function() {
    tabOpenLink("/pages/markdown.html");
});
mapkey(';u', '#4Edit current URL with vim editor, and open in new tab', function() {
    Front.showEditor(window.location.href, function(data) {
        tabOpenLink(data);
    }, 'url');
});
mapkey(';U', '#4Edit current URL with vim editor, and reload', function() {
    Front.showEditor(window.location.href, function(data) {
        window.location.href = data;
    }, 'url');
});
mapkey(';m', '#1mouse out last element', function() {
    Hints.mouseoutLastElement();
});
mapkey(';di', '#1Download image', function() {
    Hints.create('img', function(element) {
        RUNTIME('download', {
            url: element.src
        });
    });
});
mapkey(';j', '#12Close Downloads Shelf', function() {
    RUNTIME("closeDownloadsShelf", {clearHistory: true});
});
mapkey(';pp', '#7Paste html on current page', function() {
    Clipboard.read(function(response) {
        document.documentElement.removeAttributes();
        document.body.removeAttributes();
        setSanitizedContent(document.head, "<title>" + new Date() +" updated by Surfingkeys</title>");
        setSanitizedContent(document.body, response.data);
    });
});

function openGoogleTranslate() {
    if (window.getSelection().toString()) {
        searchSelectedWith('https://translate.google.com/?hl=en#auto/en/', false, false, '');
    } else {
        tabOpenLink("https://translate.google.com/translate?js=n&sl=auto&tl=zh-CN&u=" + window.location.href);
    }
}
mapkey(';t', 'Translate selected text with google', openGoogleTranslate);
vmapkey('t', '#9Translate selected text with google', openGoogleTranslate);
mapkey(';dh', '#14Delete history older than 30 days', function() {
    RUNTIME('deleteHistoryOlderThan', {
        days: 30
    });
});
mapkey(';db', '#14Remove bookmark for current page', function() {
    RUNTIME('removeBookmark');
});

}





//################################################################################################## Custom Mappings

//################################################################################################## Mappings fixes
{
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

}





//################################################################################################## General search
{
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

	// [-] search engine key isn't reserved as key mapping
    // nOF(key);
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
    creativemarketBase = "https://creativemarket.com/search?q={0}",
    elementsenvatoBase = "https://elements.envato.com/all-items/{0}",
    behanceBase = "https://www.behance.net/search?search={0}",
    dribbleBase = "https://dribbble.com/search/{0}",
    awwardsBase = "https://www.awwwards.com/inspiration/search?text={0}",
    uisourcesBase = "https://www.uisources.com/search?query={0}",
    searchmuzliBase = "https://search.muz.li/search/{0}",
    pinterestBase = "https://www.pinterest.com/search/pins/?q={0}",
    searches = {
      // search
      dcm: ["creative market", creativemarketBase],
      dee: ["envato elements", elementsenvatoBase],
      db: ["behance", behanceBase],
      dd: ["dribble", dribbleBase],
      daw: ["awwards", awwardsBase],
      dui: ["uisources", uisourcesBase],
      dm: ["muzli", searchmuzliBase],
      dp: ["pinterest", pinterestBase],

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
      ghC: ["github", githubBaseCommits],
      ghi: ["github", githubBaseIssues],
      ghd: ["github", githubBaseDiscussions],
      ghr: ["github", githubBaseRegistrypackages],
      ghm: ["github", githubBaseMarketplace],
      ght: ["github", githubBaseTopics],
      ghw: ["github", githubBaseWikis],
      ghu: ["github", githubBaseUsers],

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

      // conflict, changed from l to ll
      ll: ["lucky", googleSearchBase + "&btnI"],
      // conflict, changed from t to tt
      tt: ["onelook", "https://www.onelook.com/?w={0}&ls=a"],
      s: ["onelook synonyms", "https://www.onelook.com/thesaurus/?s={0}"],
      D: [
        "google drive search",
        "https://drive.google.com/drive/u/1/search?q={0}",
      ],
      // conflict, changed from c to cc
      cc: ["technical translation", "https://techterms.com/definition/{0}"],
      // conflict, changed from w to ww to wk
      wk: ["wiki", "https://en.wikipedia.org/wiki/{0}"],

      //map
      gM: ["google maps", "https://www.google.com/maps?q="],

      //coding
      C: ["search coding", "https://searchcode.com/?q="],
      cC: ["search coding", "https://searchcode.com/?q="],
      cw: ["chrome webstore", "https://chrome.google.com/webstore/search/"], // chrome
      cS: ["slant (editor 비교 사이트)", "https://www.slant.co/search?query="],
      gH: ["github", "https://github.com/search?q="],

      //language
      lJ: ["language Javascript", googleSearchQ + "Javascript+"],
      lj: ["language java", googleSearchQ + "Java+"],
      lC: ["C++", googleSearchQ + "C++"],
      lc: ["language c", googleSearchQ + "c+language+"],
      "l#": ["language C#", googleSearchQ + "c%23+"],
      lR: ["language R", googleSearchQ + "languag+"],
      lr: ["language Ruby", googleSearchQ + "Ruby+"],
      lP: ["language Python", googleSearchQ + "Python+"],
      lp: ["language php", googleSearchQ + "php+"],
      lK: ["language Kotlin", googleSearchQ + "Kotlin+"],
      lS: ["language Swift", googleSearchQ + "Swift+"],
      lQ: ["language SQL Query", googleSearchQ + "SQL+"],
      ls: ["language Shell script", googleSearchQ + "Shell+Schript+"],
      lT: ["language Typescript", googleSearchQ + "TypeScript+"],
      lH: ["language HTML", googleSearchQ + "HTML+"],

      //sns
      fb: ["faceBook(페이스북)", "https://www.facebook.com/search/top/?q="],
      tw: ["tWitter", "https://twitter.com/search?q="],
      ig: ["InstaGram HashTag", "https://www.instagram.com/explore/tags/"],
      rd: ["redDit", "https://www.reddit.com/search?q="],

      //shorten - what is.. who is.. where is..
      wa: ["advanced", googleSearchQ + "advanced+"],
      wb: ["basic", googleSearchQ + "basic+"],
      wc: ["classification", googleSearchQ + "classfication+of+"],
      wd: ["difference", googleSearchQ + "difference+between+"],
      we: ["example", googleSearchQ + "example+of+"],
      ww: ["wherefrom", googleSearchQ + "where+from+"],
      wg: ["goalof", googleSearchQ + "what+is+goal+of+"],
      wh: ["historyof", googleSearchQ + "history+of+"],
      wi: ["introductionof", googleSearchQ + "Introduction+of"],

      //file
      pdf: ["fppdf", googleSearchQ + "filetype%3Apdf+"],
      cpp: ["fpcpp", googleSearchQ + "filetype%3Acpp+"],
      hwp: ["fphwp", googleSearchQ + "filetype%3Ahwp+"],
      ppt: ["fpppt", googleSearchQ + "filetype%3Appt+"],
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
      cd: {
        name: "combined design",
        list: ["dcm", "db", "dee", "dd", "daw", "dui", "dm", "dp"],
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

}





//################################################################################################## Headings navigation
{
var w = window,
d = w.document,
// querySelector/querySelectorAll shorthand
qs = function(selector, parent, all){
    return (parent || d)['querySelector'+ (all ? 'All' : '')](selector);
},
isHidden = function(el){
    if (el.hidden){ return true; }

    var style = w.getComputedStyle(el);

    return !(el.offsetWidth > 0 && el.offsetHeight > 0) && style.getPropertyValue('overflow') != 'visible'
        || style.getPropertyValue('display') == 'none'
        || parseFloat(style.getPropertyValue('opacity')) < 0.015;
},
current_heading = 0,
headings = [],
headingsSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
update = function(key){
    var diff = -6,
    topNotFound = true,
    cTop = -Infinity;
    current_heading = 0;

    // @note: not optimal but fast enough to not care
    headings = Array
        .from(qs(headingsSelectors.join(','), null, true))
        // filter out invisible elements
        .filter(function(el){
            el.__top = el.getBoundingClientRect().top |0;
            return !isHidden(el);
        })
        // sort in ascending order by rendered position
        .sort(function(a, b){
            return a.__top - b.__top;
        });


    headings.forEach(function(el, i){
        if (topNotFound){
            var top = el.__top;

            if (Math.abs(cTop) > Math.abs(top)){
                cTop = top;
                current_heading = i;
            } else {
                topNotFound = false;
            }
        }

        delete el.__top;
    });


},
selectNodeContents = function(node){
    var range = document.createRange();
    range.selectNodeContents(node);
    w.getSelection().removeAllRanges();
    w.getSelection().addRange(range);

    return range;
},
goToBeginningOfCurrentHeading = function(){
    var el = headings[current_heading];
    el && el.scrollIntoView(true);
    selectNodeContents(el);
},
goToFirstHeading = function(){
    current_heading = 0;
    return goToBeginningOfCurrentHeading();
},
goToLastHeading = function(){
    current_heading = headings.length - 1;
    return goToBeginningOfCurrentHeading();
},
goToPrevHeading = function(){
    if (current_heading == 0){
        current_heading = headings.length;
    }

    --current_heading;

    return goToBeginningOfCurrentHeading();
},
goToNextHeading = function(){
    ++current_heading;

    if (current_heading == headings.length){
        current_heading = 0;
    }

    return goToBeginningOfCurrentHeading();
},
goToPrevSameLevelHeading = function(){
    var i = current_heading,
    tagName = headings[i].tagName;

    for (; i > 0; i--){
        if (current_heading != i && headings[i].tagName == tagName){
            current_heading = i;
            return goToBeginningOfCurrentHeading();
        }
    }

    for (i = headings.length; i > current_heading; i--){
        if (current_heading != i && headings[i].tagName == tagName){
            current_heading = i;
            return goToBeginningOfCurrentHeading();
        }
    }
},
goToNextSameLevelHeading = function(){
    var i = current_heading,
    tagName = headings[i].tagName;

    for (; i < headings.length; i++){
        if (current_heading != i && headings[i].tagName == tagName){
            current_heading = i;
            return goToBeginningOfCurrentHeading();
        }
    }

    for (i = 0; i < current_heading; i++){
        if (current_heading != i && headings[i].tagName == tagName){
            current_heading = i;
            return goToBeginningOfCurrentHeading();
        }
    }
},
pickHeadingSpecifiedByName = function(){
    var res = (w.prompt('String to search in headings:') || '').toLowerCase();

    if (res){
        for (var i = current_heading; i < headings.length; i++){
            if (headings[i].textContent.toLowerCase().indexOf(res) != -1){
                current_heading = i;
                goToBeginningOfCurrentHeading();
                selectNodeContents(headings[i]);

                return false;
            }
        }

        for (var i = 0; i <= current_heading; i++){
            if (headings[i].textContent.toLowerCase().indexOf(res) != -1){
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
onDisable = function(){
    headings = [];
    current_heading = 0;
    d.body.onkeydown = oldKeyDown;
    // enable back normal handling
    Normal.enter();
    Normal.enable();
    enabled = false;
},
mappings = {
    'Esc': onDisable,
    'Escape': onDisable,
    'b': function(){
        update();
        goToBeginningOfCurrentHeading();
    },
    ',': goToFirstHeading,
    '.': goToLastHeading,
    '[': goToPrevHeading,
    ']': goToNextHeading,
    'p': goToPrevSameLevelHeading,
    'n': goToNextSameLevelHeading,
    'm': pickHeadingSpecifiedByName
    //'^' - didn't get what `Move "up" from this heading` means regarding heading navigation in https://github.com/brookhong/Surfingkeys/issues/1353
},
onKeyDown = function(e){
    if (enabled){
        var code = e.key;

        console.log(code);

        if (typeof mappings[code] == 'function'){
            e.preventDefault();

            mappings[code]();

            return false;
        }
    }

    if (typeof oldKeyDown == 'function'){
        return oldKeyDown(e);
    }
};

mapkey("h0", "Enter headings mode", function(){
    update();
    // disable normal handling
    Normal.exit();
    Normal.disable();
    d.body.focus();
    oldKeyDown = d.body.onkeydown;
    d.body.onkeydown = onKeyDown;
    enabled = true;
});
}





//################################################################################################## Word/Sentence hinting
{
mapkey('zvw', '#9Enter visual mode, and select word', function() {
	Visual.toggle("z");
});
mapkey('zvs', '#9Enter visual mode, and select sentence', function() {
	Hints.create(
		/(^[\n\r\s]*\d*\.{0,1}[^\.\!\?]+[\.\!\?]{0,1}|[^\.\!\?]+[\.\!\?]{0,1}|[^\.\!\?]+[\.\!\?]{0,1}[\n\r\s]*$)/g
		, function(el){
			var range = document.createRange();
			range.setStart(el[0], el[1]);
			range.setEnd(el[0], el[1] + el[2].length);
			w.getSelection().removeAllRanges();
			w.getSelection().addRange(range);
		}
		, {
			tabbed: true,
			statusLine: 'Hints to select sentence'
		}
	);
});
}





//################################################################################################## Unsorted
{
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

mapkey(",s", "opne new tab and split", function () {
  RUNTIME("newWindow");
});

// mapkey("ymr", "#7Copy multiple link regex URLs to the clipboard", function () {
//   var linksToYank = [];
//   Hints.create(
//     "*[href]",
//     function (element) {
//       linksToYank.push(
//         "domain: " +
//           "/" +
//           element.href.slice(8).split("/")[0].replace(/\./g, "\\.") +
//           "/" +
//           "i"
//       );
//       Clipboard.write(linksToYank.join("\n"));
//     },
//     {
//       multipleHits: true,
//     }
//   );
// });

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

// mapkey(
//   "ymE",
//   "#7 Yank Multiple Element info  (copy multiple link element id or classname)",
//   function () {
//     var linksToYank = [];
//     Hints.create(
//       "*[href]",
//       function (element) {
//         linksToYank.push("id: " + element.id + "\n");
//         linksToYank.push("innertext: " + element.innerText + "\n");
//         linksToYank.push("className: " + element.className + "\n");
//         Clipboard.write(linksToYank.join("\n"));
//       },
//       {
//         multipleHits: true,
//       }
//     );
//   }
// );

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
// mapkey("yml", "Markdown link", function () {
//   Clipboard.write(`[${document.title}](${window.location.href})`);
// });
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


}





//################################################################################################## Misc
{
// Properties list
Hints.numericHints = false;

}





//################################################################################################## Settings
{
const settings	=	{};
settings.omnibarSuggestion = true;
settings.defaultSearchEngine = "G"; // Google I'm Feeling Luckey
settings.focusFirstCandidate = true;
settings.stealFocusOnLoad = false;
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


// apply Settings
RUNTIME('updateSettings', { settings: settings });

}

}
