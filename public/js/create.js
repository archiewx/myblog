$(function () {

    let weditor = new wangEditor('article_content');

    // 配置菜单栏菜单
    weditor.config.menus = editor_config.menus;
    // 配置关闭控制台答应
    weditor.config.printLog = false;
    // 配置粘贴复制
    weditor.config.parseFilter = false;
    // 配置baidu 云地图
    weditor.config.mapAk = editor_config.mapAk;
    // 配置表情包
    weditor.config.emotions = editor_config.emotions;

    weditor.create();
});