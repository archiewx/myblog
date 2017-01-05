$(function () {
    let weditor = new wangEditor('article_content');
    weditor.config.menus = editor_config.menus;
    weditor.create();
    $('select.dropdown').dropdown();
});