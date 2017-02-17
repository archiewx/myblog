$(function() {
    $('.nav-item').each(function (index, ele) {
        if (location.href.indexOf($(this).find('a').attr('href')) != -1) {
            $(this).addClass('nav-active');
        }
    });
    $('div.ui.dropdown').dropdown({
        action: 'hide'
    });
    $('select.ui.dropdown').dropdown();

});