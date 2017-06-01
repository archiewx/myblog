/**
 * Created by zhenglfsir on 2017/1/2.
 */
let editor_config = {
  bounds: '#article_content',
  debug: 'warning',
  modules: {
    'syntax': true,
    'toolbar': [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block', 'image', 'video'],
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu']}],
      [{'align': []}],
      ['clean'],                                         // remove formatting button
    ],
    // formula: true, // 数学计算
    'history': {
      'delay': 200,
      'userOnly': true,
      'maxStack': 500
    },
  },
  'placeholder': '骚年，来一发吧...',
  'theme': 'snow'
}


