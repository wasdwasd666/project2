//注意：每次调用$.get  $.post $.ajax 会先调用这个
//这个函数中会拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})