$(function() {
    // 点击去注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layUI中获取form对象
    var form = layui.form
    var layer = layui.layer
        //通过form.verify()函数来自定义校验规则
    form.verify({
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验密码是否一致
        //     repwd: function(value) {
        //         var pwd = $('.reg-box[name=password]').val()
        //         if (pwd !== value) { return '两次密码不一致' }
        // }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) { return layer.msg(res.message) }
            layer.msg('注册成功');
            //模拟人的点击行为
            $('#link_login').click()
        })

    })

    //监听登录表单的提交时间
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('no')
                }
                layer.msg('ok')
                    //登陆成功得到的字符串保存到localstorage
                localStorage.setItem('token', res.token)
                console.log(res.token);
                location.href = '/index.html'
            }
        })
    })
})