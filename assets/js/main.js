(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {
        
          //Mobile Menu Start
        $(document).ready(function () {
            $(".has-submenu ").prepend("<span></span>");
        });
        $(document).on('click', '.has-submenu > span', function (event) {
            $(this).parent().find("ul").toggleClass("active");
            $(this).parent().toggleClass("active");
        });

        $(".mainmenu ul li:has(ul)").addClass("has-submenu");
        $(".mainmenu ul li:has(ul)").addClass("small-submenu");
        $(".mainmenu ul li ul").addClass("sub-menu");
        $(".mainmenu ul.dropdown li").hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
        var $menu = $("#menu"),
            $menulink = $("#menu-toggle"),
            $header = $(".header-area"),
            $searchTrigger = $(".searchToggle"),
            $menuTriggercont = $("#menu_handler"),
            $menuTrigger = $(".has-submenu > span"),
            $body = $("body"),
            $megamenuTrigger = $(".megamenu > li > span");
        $menulink.click(function (e) {
            $menulink.toggleClass("active");
            $menu.toggleClass("active");
            $menuTriggercont.toggleClass("active");
            $header.toggleClass("active");
            $body.toggleClass("active");
        });

        $menuTrigger.click(function (e) {
            e.preventDefault();
            var t = $(this).next();
            t.toggleClass("active");
            t.toggleClass("active").next("ul").toggleClass("active");
            t.toggleClass("active").next(".megamenu-holder").toggleClass("active");
        });

        $megamenuTrigger.click(function (e) {
            e.preventDefault();
            var t = $(this).next();
            t.toggleClass("active").next(".mega-submenu").toggleClass("active");
        });

        $searchTrigger.click(function (e) {
            $menulink.removeClass("active");
            $menu.removeClass("active");

            $menuTriggercont.removeClass("active");
        });

        $(".mainmenu ul li:has(ul)");
        //Mobile Menu End

        
        
        $(".card-tilt").tilt({
            scale: 1.01,
            glare: false,
            maxGlare: 0.5,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            speed: 400
        });  
        
        AOS.init({
            duration: 1200
        });
        
        
        

    });
}(jQuery));

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".text-box.style1 .count");
    if (!counters.length) return;

    const animateCounter = (el) => {
        const text = el.textContent.trim();
        if (!text) return;

        const duration = 1500;
        const startTime = performance.now();

        // ✅ FRACTION (2/10)
        if (text.includes("/")) {
            const [num, den] = text.split("/");
            const target = parseFloat(num);
            if (isNaN(target)) return;

            const update = (now) => {
                const progress = Math.min((now-startTime)/duration,1);
                const value = (progress * target).toFixed(0);
                el.textContent = value + "/" + den;

                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = text;
            };
            requestAnimationFrame(update);
            return;
        }

        // ✅ PREFIX + DECIMAL NUMBER + SUFFIX
        const match = text.match(/^([^0-9]*)([0-9]*\.?[0-9]+)([^0-9]*)$/);
        if (!match) return;

        const prefix = match[1];
        const target = parseFloat(match[2]);
        const suffix = match[3];

        const isDecimal = match[2].includes(".");

        const update = (now) => {
            const progress = Math.min((now-startTime)/duration,1);
            let value = progress * target;

            value = isDecimal
                ? value.toFixed(1)
                : Math.floor(value);

            el.textContent = prefix + value + suffix;

            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = text;
        };

        requestAnimationFrame(update);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

});

