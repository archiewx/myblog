$(function() {
    $('.ui.dropdown').dropdown();

    $('.post-content .avatar').popup({
        inline: true,
        position: 'buttom right',
        lastResort: 'bottom right'
    })
});