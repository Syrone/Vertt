/******* Do not edit this file *******
Woody Code Snippets CSS and JS
Saved: Jan 28 2023 | 16:38:45 */
		$ =	jQuery;

        $('.men').click(function(event) {
            event.preventDefault();
            $(".lin2").toggleClass("lin_width");
            $('.menu').slideToggle();
            $(".shop_menu").fadeOut();
            $(".menu").css("display", "flex");
        });

        $("#shop").click(function() {
            $(".shop_menu").slideToggle();
            $(".shop_menu").css("display", "grid");
            $("body").toggleClass("overflow_hidden_body")
        });