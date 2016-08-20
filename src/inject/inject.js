function injectSaveButton() {

    var FLAG = "injected";
    var $postFooter = $("._42nr").filter(function (idx) {
        return !$(this).hasClass(FLAG);
    });

    var $a = $("<a></a>");
    var $attrs = {
        "class": "save",
        "role": "button",
        "href": "#",
        "title": "게시물 저장"
    };
    for (var key in $attrs) {
        $a.attr(key, $attrs[key]);
    }
    $a.html("저장하기"); // 모든 엘리멘트에 삽입되는게 아님. 이상이상
    $postFooter.each(function (idx) {
        var $span = $("<span></span>");
        $span.html($a.clone().wrapAll("<div/>").parent().html());
        $th = $($postFooter[idx]);
        //console.log($th, $span);
        $th.append($span);
        $th.addClass(FLAG);
        $span.click(save);
    });
}


function save(event) {
    var $target = $(event.target);
    var $contentElem = $target.parentsUntil(".userContentWrapper").last().prev();
    var $author = $contentElem.find("._6a ._5u5j .fwb a");
    var authorName = $author.text();
    var authorUrl = $author.attr("href").split("?")[0];


    var originUrl = $contentElem.find("a._5pcq").first().attr('href');
    var $pList = $contentElem.first().find(".userContent p");
    var content = "";
    $pList.each(function () {
        content += $(this).text() + "\n";
        // TODO: a태그랑 p태그 구분해서 저장하게
    });
    var isUrl = new RegExp("^http");
    if (!isUrl.test(originUrl))
        originUrl = "https://facebook.com" + originUrl;
    var data = {
        "url": originUrl,
        "content": content,
        "author_name": authorName,
        "author_url": authorUrl
    };
    var url = "http://localhost:8000/save";
    console.log(data);
    $.post(url, data,
        function (data) {
            console.log(data);
        },
        "json"
    );
}

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            injectSaveButton();

            //clearInterval(readyStateCheckInterval);
        }
    }, 100);
});
