$(function () {
    getUserInfo()

    let confirm = layer.confirm
    $('#btnLogout').on('click', function () {
        localStorage.removeItem('token')
        location.href = '../../login.html'
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //更换信息
            let name = res.data.nickname || res.data.username
            $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            //更换头像
            if (res.data.user_pic !== null) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                $('.text-avatar').html(name[0].toUpperCase()).show()
                $('.layui-nav-img').hide()
            }
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem('token')
        //         location.href = '../../login.html'
        //     }
        // }
    })
}
