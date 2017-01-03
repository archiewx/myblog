$(function() {
    let editor = new wangEditor('article_content');
    editor.config.menus = editor_config.menus;
    editor.create();
});