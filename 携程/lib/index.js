$(function () {


    // 轮播图js代码
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:true,
    });

    // 添加搜索框焦点事件
    $('.container .searchbar').focus(function () {
        $('.container').hide();
        $('.searchpage').show();
    })
    $('.searchpage .header .back').click(function () {
        $('.container').show();
        $('.searchpage').hide();
    })


    // 打开页面,判读本地存储中有无数据,有遍历到页面上
    append();

    function append() {
        var shwords = localStorage.getItem('shword');
        var shinfo = JSON.parse(shwords);
        if (shinfo) {
            infoarr = shinfo;
            $('.searchinfo').show();
        } else {
            infoarr = [];
        }
        var html = template('tpl', {
            list: shinfo
        })
        $('.searchinfo').html(html);
        return infoarr;
    }

    var infoarr = [];
    // 点击搜索,键输入框的信息存储到本地存储
    $('.search').click(function () {
        save();
    })

    function save() {
        var text = $('.searchpage .searchbar').val();
        //console.log(text);
        // console.log();

        if (text != "") {
            //获取输入框的信息,添加到数组中
            infoarr.push(text);
            //将数组存储到本地存储
            localStorage.setItem('shword', JSON.stringify(infoarr));
            $('.searchpage .searchbar').val("")
            append();
        } else {
            return;
        }
    }

    // 给清空所有历史设置点击事件,清除本地存储中的数据
    $('.searchinfo').on('click', '.clear', function () {
        localStorage.removeItem('shword');
        //清除后,调用添加添加事件
        append();
        $('.searchinfo').hide();
    })

})