$(document).ready(function() {
    var $appAdminWrap = $(".app-admin-wrap");
    var $html = $("html");
    var $body = $("body");
    var $customizer = $(".customizer");
    var $sidebarColor = $(".sidebar-colors a.color");

    // Change sidebar color
    $sidebarColor.on("click", function(e) {
        e.preventDefault();
        $appAdminWrap.removeClass(function(index, className) {
            return (className.match(/(^|\s)sidebar-\S+/g) || []).join(" ");
        });
        $appAdminWrap.addClass($(this).data("sidebar-class"));
        $sidebarColor.removeClass("active");
        $(this).addClass("active");
    });

    // Dark version
    $("#dark-checkbox").change(function() {
        if (this.checked) {
            $body.addClass("dark-theme");
        } else {
            $body.removeClass("dark-theme");
        }
    });

    let $themeLink = $("#gull-theme");
    initTheme("gull-theme");

    function initTheme(storageKey) {
        if (!localStorage) {
            return;
        }
        let fileUrl = localStorage.getItem(storageKey);
        if (fileUrl) {
            $themeLink.attr("href", fileUrl);
        }

        /*document.querySelectorAll("[data-perfect-scrollbar]").forEach(function(index) {
            var $el = $(this);
            var ps = new PerfectScrollbar($el, {
                suppressScrollX: $el.data("suppress-scroll-x"),
                suppressScrollY: $el.data("suppress-scroll-y"),
            });
        });*/ // Full screen
        /* document
             .querySelectorAll(".perfect-scrollbar")
             .forEach(function(index) {
                 var $el = $(this);
                 var ps = new PerfectScrollbar(this, {
                     suppressScrollX: $el.data("suppress-scroll-x"),
                     suppressScrollY: $el.data("suppress-scroll-y"),
                 });
             }); // Full screen*/
    }

    // Toggle customizer
    $(".handle").on("click", function(e) {
        $customizer.toggleClass("open");
    });

    $(".colors .color").on("click", function(e) {
        e.preventDefault();
        let color = $(this).attr("title");
        console.log(color);
        let fileUrl = "../../assets/css/theme/sidebar-colors/" + color + ".min.css";
        if (localStorage) {
            gullUtils.changeCssLink("gull-theme", fileUrl);
        } else {
            $themeLink.attr("href", fileUrl);
        }
    });
});
//https://themeforest.net/item/gull-angular-bootstrap-admin-dashboard-template/22866096
//http://preview.themeforest.net/item/gull-angular-bootstrap-admin-dashboard-template/full_screen_preview/22866096?_ga=2.106840515.1382536194.1600650592-473041216.1581867007
//https://themeforest.net/item/gull-bootstrap-laravel-admin-dashboard-template/23101970
//http://preview.themeforest.net/item/gull-bootstrap-laravel-admin-dashboard-template/full_screen_preview/23101970?_ga=2.251203590.1693533477.1600650592-473041216.1581867007
//http://demos.ui-lib.com/gull-html-doc/
//https://bootswatch.com/
//http://gull-vue.ui-lib.com/app/dashboards/dashboard.v1
//https://google-webfonts-helper.herokuapp.com/fonts/saira?subsets=vietnamese
//https://developers.google.com/fonts/docs/getting_started
