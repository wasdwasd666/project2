$(function() {

    var layer = layui.layer
    var form = layui.form
    initCate()
        //初始化富文本编辑器


    //定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/dates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    //调用form.render
                form.render()
            }
        })
    }


    //为选择封面按钮绑定事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    //定义文章发布状态
    var art_state = '已发布'

    //为存为草稿按钮绑定点击事件处理函数
    $('#btnSave2').on('click', function() {
            art_state = '草稿'
        })
        //为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
            //创建formdata
        var fd = new FormData($(this)[0])
            //将文章的发布状态存到fd中
        fd.append('state', art_state)

        fd.forEach(function(v, k) {
            console.log(k, v);

            publishArticle(fd)
        })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                }
                layer.msg('ok')
                location.href = '/art_list.html'
            }

        })
    }
})