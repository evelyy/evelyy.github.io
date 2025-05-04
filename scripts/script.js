$(document).ready(function(e) {
    $('div.hidden').hide();
    $('img#evebass').click(function(enterSite) {
        console.log('hi');
        $('div.vines').fadeOut(1000);
        $('div.entryWrapper').fadeOut(1000, function() {
            $('div.music-player').fadeIn(1000);
            $('div.navi').fadeIn(1000);
            $('div.footer').fadeIn(1000);
            $('div.header').fadeIn(1000);
        });
    })
});

let activeMiddleDiv = '';
function transitionMiddle(divClass) {
    if(activeMiddleDiv == '') {
        $('div.' + divClass).fadeIn(500);
        activeMiddleDiv = divClass;
        return;
    }
    if($('div.' + divClass).css('display') == 'none') {
        $('div.' + activeMiddleDiv).fadeOut(500, function() {
            $('div.' + divClass).fadeIn(500);
            activeMiddleDiv = divClass;
            return;
        });
    } else {
       return;
    }
}

function resetMiddle() {
    $('div.middle').fadeOut(500);
}