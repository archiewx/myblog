let Clipboard = Quill.import('modules/clipboard'),
  Delta = Quill.import('delta'),
  Font = Quill.import('formats/font'),
  fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];


class PlainClipboard extends Clipboard {
  convert(html = null) {
    if (typeof html === 'string') {
      this.container.innerHTML = html;
    }
    return new Delta().insert(this.container.innerText);
  }
}
$(function () {

  hljs.initHighlightingOnLoad();

  Font.whitelist = fonts;
  Quill.register(Font, true)
  Quill.register('modules/clipboard', PlainClipboard, true);

  let qeditor = new Quill('#article_content', editor_config)
})

