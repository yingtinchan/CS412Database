$(document).ready(function() {
    $('.hamburger').click(function() {
        $('.left_sidebar').css({
            'transform': 'translateX(0)'
        });
    });
    $('.student').click(function() {
        $('.right_sidebar').css({
            'transform': 'translateX(0)'
        });
    });

    $('.close_btn').click(function() {
        $('.right_sidebar').css({
            'transform': 'translateX(150%)'
        })
    })

    $('.close_hamburger_btn').click(function() {
        $('.left_sidebar').css({
            'transform': 'translateX(-150%)'
        })
    })

});

function darkMode() {
    $('body').toggleClass('dark-mode');
    $('.table tr:nth-child(even)').css({
        'color': '#000',
    })
    $('.table tr:nth-child(4)').css({
        'background-color': '#5bb9c0',
        'color': '#fff',
    })

    $('.main_content .main_navbar .dark_mode_icon .bx-sun').click(function() {
        $(this).css('display', 'none');
        $('.main_content .main_navbar .dark_mode_icon .bx-moon').css('display', 'block');
    });

    $('.main_content .main_navbar .dark_mode_icon .bx-moon').click(function() {
        $(this).css('display', 'none');
        $('.main_content .main_navbar .dark_mode_icon .bx-sun').css('display', 'block');
    });
}

jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })
});

  