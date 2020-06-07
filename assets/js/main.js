(function ($) {
    var imgContainer = $('.changable-image'),
        img = $('.changable-image > img'),
        navbar = $('.nav-bar'),
        postCard = $('.post-card'),
        progressBar = $('.progressBar'),
        marKer = $('.marker');
    $(function () {

        // Custom scroll
        new SimpleBar($('.nav-bar')[0]);

        var setFirstColor = $('.show').find('.post-card').attr('data-color');
        var colorPicker = marKer.find('.img-color-picker');

        TweenMax.to(colorPicker, .03, {
            css: {
                backgroundColor: '#' + setFirstColor
            },
            ease: Power1.easeInOut
        })

        // Set current image color
        // postCard.each(function (i) {
        //     var $this = $(this);
        //     $this.mouseenter(function (e) {
        //         e.preventDefault();
        //         var setColor = $(this).attr('data-color');
        //         var colorPicker = marKer.find('.img-color-picker');

        //         TweenMax.to(colorPicker, .03, {
        //             css: {
        //                 backgroundColor: '#' + setColor
        //             },
        //             ease: Power1.easeInOut
        //         })
        //     })
        // });


        // Image change on hover

        var $post_item = $('.post-card'),
            $post_img = $('.post_img'),
            $post_first_img = $('.show .post_img').eq(0);

        TweenMax.set($post_first_img, {
            autoAlpha: 1
        });

        $post_item.each(function (i) {
            var $this = $(this);
            $this.on('mouseenter', function (e) {
                var $thisPage = $('.post-tab-items > .post_img').eq(i);
                TweenMax.to($thisPage, 1, {
                    autoAlpha: 1
                });
                TweenMax.to($post_img.not($thisPage), 0.5, {
                    autoAlpha: 0
                }); // faster
            })

        })


        // Move mark with post card position
        if ($(window).width() > 1024) {
            $(".nav-bar, .changable-image").mousemove(function (e) {
                var masOverlay = $(".marker");
                var height = masOverlay.innerHeight();
                var newValueY = e.pageY - (height / 2);

                TweenMax.to(masOverlay, 0.7, {
                    top: newValueY,
                    y: 0,
                });
            });

            // $(".nav-bar").mouseleave(function (e) {
            //     TweenMax.to($(".marker"), 0.7, {
            //         top: 295,
            //         marginTop: 0,
            //     });
            // });
        }

        // Nav tab function
        var tl = new TimelineMax();
        $('.nav a').on('click', function (e) {
            e.preventDefault();
            var $label = $('.nav > .label');
            var $this = $(this);
            var el_width = $this.width();
            var offset_left = $this.offset();
            var initTabNum = $this.data('menu');
            var $post_items = $('.post-tab-items');
            var $show = $('.show');

            function step_1() {
                $post_items.removeClass('show');
            }

            function step_2() {
                $('.item_' + initTabNum).addClass('show');

                var $post_first_img = $('.item_' + initTabNum).find('.post_img:first-child');
                TweenMax.set($post_first_img, {
                    autoAlpha: 1
                });

                var setColor = $('.item_' + initTabNum).find('.post-card').attr('data-color');
                var colorPicker = marKer.find('.img-color-picker');

                TweenMax.to(colorPicker, .03, {
                    css: {
                        backgroundColor: '#' + setColor
                    },
                    ease: Power1.easeInOut
                })
            }

            if (!tl.isActive()) {
                tl.to($post_items, 0.3, {
                        y: 100,
                        ease: Linear.easeOut,
                        onComplete: step_1
                    })
                    .fromTo($('.item_' + initTabNum), 0.35, {
                        onStart: step_2,
                        y: -100
                    }, {
                        y: 0,
                        ease: Linear.easeOut,
                        immediateRender: false
                    })
                //.to($post_items, 0, {y: 0, ease: Sine.easeOut})	
                $label.offset({
                    left: offset_left.left
                }).css('width', el_width)
                $('.nav a').removeClass('active');
                $this.addClass('active');
            }
        })

        var initSize = function () {
            var start_element = $('.nav a:first-of-type');
            var $label = $('.nav .label');
            var initWidth = start_element.css('width')
            $label.css('width', initWidth)
        }
        initSize()
        // End nav tab

        $(".nav-bar").scroll(function () {
            var windowScrolPos = $(window).scrollTop();
            console.log(windowScrolPos);
            var navItemPos = $(".post-card").offset();
            if (navItemPos === 238) {
                console.log(windowScrolPos);
            }
        })

    }); // End ready function


    var statusTracker;
    var percentage = 0;

    function checkStatus() {
        percentage = percentage + 5;
        TweenMax.to(progressBar, 0.5, {
            css: {
                height: percentage + '%'
            },
            ease: Power2.easeOut
        });

        if (percentage == 100) stop();
    }

    function startProgress() {
        statusTracker = setInterval(checkStatus, 80);
    }

    function stop() {
        clearInterval(statusTracker);
    }


    $(window).on('load', function () {
        $('body').addClass('loaded');

        if ($(window).width() > 991) {
            startProgress();
        }

        TweenMax.to(marKer, 2, {
            css: {
                opacity: 1,
                visibility: 'visible'
            },
            delay: 3,
            ease: Power3.easeOut
        });

        TweenMax.to(img, 2, {
            scale: 1,
            alpha: 1,
            ease: Power3.easeOut
        });

        TweenMax.to(navbar, 1, {
            x: 0,
            delay: 2,
            ease: Cubic.easeInOut
        });

        TweenMax.to(imgContainer, 1, {
            css: {
                width: 50 + '%'
            },
            delay: 2,
            ease: Cubic.easeInOut
        });
    })
})(jQuery);