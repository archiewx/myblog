function qiniuUpload(bbtnId, containerId) {
  let uploader = Qiniu.uploader({
    runtimes: 'html5, flash, html4',
    browse_button: bbtnId,
    uptoken_url: '/upload/token',
    domain: 'myblog',
    get_new_uptoken: false,
    container: containerId,
    max_file_size: '100mb',
    flash_swf_url: '/libs/plupload/js/Moxie.swf',
    max_retries: 3,
    dragdrop: true,
    drop_element: containerId,
    chunk_size: '4mb',
    auto_start: true,
    init: {
      'FilesAdded': function (up, files) {
        plupload.each(files, function (file) {
          // 文件添加进队列后,处理相关的事情
        });
      },
      'BeforeUpload': function (up, file) {
        // 每个文件上传前,处理相关的事情
      },
      'UploadProgress': function (up, file) {
        // 每个文件上传时,处理相关的事情
      },
      'FileUploaded': function (up, file, info) {
        // 每个文件上传成功后,处理相关的事情
        // 其中 info 是文件上传成功后，服务端返回的json，形式如
        // {
        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
        //    "key": "gogopher.jpg"
        //  }
        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

        // var domain = up.getOption('domain');
        // var res = parseJSON(info);
        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
      },
      'Error': function (up, err, errTip) {
        //上传出错时,处理相关的事情
      },
      'UploadComplete': function () {
        //队列文件处理完毕后,处理相关的事情
      },
      'Key': function (up, file) {
        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
        // 该配置必须要在 unique_names: false , save_key: false 时才生效

        var key = "";
        // do something with key here
        return key
      }
    }

  })
}
