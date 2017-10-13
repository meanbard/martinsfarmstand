(function ($) {
    'use strict';

    function setupLazyLoad(){
        $('img.lazy').lazyload();
    };

    /** SELECTED NAVIGATION LINKS **/

    function setupHeaderImg() {
        var imgNum = Math.floor(Math.random() * 4) + 1;
        if (imgNum === 1){
            $('header').css('background', 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0)), url("img/header-r-01.jpg") no-repeat center center fixed');
        } else if (imgNum === 2){
            $('header').css('background', 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0)), url("img/strawberry-opt.jpg") no-repeat center center fixed');
        } else if (imgNum === 3){
            $('header').css('background', 'linear-gradient(to bottom, rgba(0,0,0,0.375), rgba(0,0,0,0)), url("img/stand-01.jpg") no-repeat center center fixed'); 
        } else if (imgNum === 4){
            $('header').css('background', 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0)), url("img/strawberry-lav.jpg") no-repeat center center fixed'); 
        }
    }

    function setupNavSelect() {

        $('div#nav .nav-right-box a').on('click touchend', function(){
            $('div#nav .nav-right-box a').removeClass('selected');
            $(this).addClass('selected');
        });

        $('.contact-link').on('click touchend', function(){
            $('.contact').slideDown();
            $('.header-row2').css('margin-top', '4em');
        });
    };

    /** MOBILE NAVIGATION **/
    function setupMobileNavigation() {
        var $btn = $('.glyphicon-menu-hamburger'),
            $nav = $('.mobile-nav');

        $btn.on('click touchend', function () {
            $nav.slideDown();
            $btn.hide();
            $('img[src*="logo"]').hide();
        });

        /** SMOOTH SCROLLING TO ANCHORS ON SAME PAGE **/

        $(function () {
            $('a[href*=#]:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1300);
                        return false;
                    }
                }
            });
        });
    }

    /** Highlight Some Divs On Anchor Click **/
    function setupMailFormFunctions() {
        var $subBtn = $('nav button'),
            $subInput = $('nav input'),
            $mceMail = $('#mce-EMAIL'),
            $mceFname = $('#mce-FNAME');

        $('.directions-anchor').on('click touchend', function () {
            $('#directions-anchor').css('box-shadow', 'inset 0.005em 0.005em 0.8em #0e1b42');
        });

        /** GET INPUT FROM .subscribe AND ADD TO MAILCHIMP FORM ON BUTTON CLICK **/
        $subBtn.on('click touchend', function () {
            var $email = $subInput.val();
            $mceMail.val($email);
        });

        $subInput.keypress(function (e) {
            if (e.which === 13) {
                $subBtn.click();
            }
        });
    }

    function setupHoursToggle() {
        /** Summer / Winter Hours Toggle & CSS Animation **/
        var $hrs = $('div.hours'),
            $winter = $('.winter-hrs'),
            $summer = $('.summer-hrs'),
            $hrsToggle = $('.hrs-toggle');
            
        $hrsToggle.text('Summer Hours');

        $hrsToggle.on('click touchend', function () {
            if ($(this).text() === "Summer Hours") {
                $winter.hide();
                $summer.fadeIn();
                $(this).text('Winter Hours');
            } else if ($(this).text() === "Winter Hours") {
                $summer.hide();
                $winter.fadeIn();
                $(this).text('Summer Hours');
            }
        });
    }

        /** Directions to Farmstand from User's Location **/
        /** Wrap me in a function when you get the chance! **/
        var $getDirections = $('.directions-btn'),
            startingLocation,
            destination = "11 Needham Road, Potsdam NY 13676";

        $getDirections.on('click touchend', function () {

        function goToGoogleMaps(startingLocation, destination) {
            window.location = "https://maps.google.com/maps?saddr=" + startingLocation + "&daddr=" + destination;
    }

            // check if browser supports geolocation
            if (navigator.geolocation) {

                // get user's current position
                navigator.geolocation.getCurrentPosition(function (position) {
                    // get latitude and longitude
                    var latitude = position.coords.latitude,
                        longitude = position.coords.longitude;
                    startingLocation = latitude + "," + longitude;
                    console.log(startingLocation);

                    // send starting location and destination to goToGoogleMaps function
                    goToGoogleMaps(startingLocation, destination);
                });
            }
        });



    //Wunderground API and Weather Data Implementation
    function setupWeather() {
        $.ajax({
            type: "GET",
            url: "https://api.wunderground.com/api/4cb2a2c2502b2cc6/geolookup/conditions/forecast/date/q/44.670857,-74.904974.json",
            dataType: "jsonp",
            success: function (parsed_json) {

                //Today's weather
                var temp = parsed_json["current_observation"]["temp_f"],
                    feels = parsed_json["current_observation"]["feelslike_f"],
                    forecast = parsed_json['forecast']['simpleforecast']['forecastday'],
                    index, iconCondition, icon, weekday, month, day, conditions, avg, forecastStr

                $('.weather').append("<h3>Current temperature at Martin's Farmstand: " + temp + "&deg;F</h3>");
                $('.weather').append("<h3>Feels like: " + feels + "&deg;F</h3>");

                //Forecast for today and the following three days

                //loop through available weather forecast days
                for (index in forecast) {
                    //set icon based on current weather conditions
                    iconCondition = forecast[index]['icon'];
                    icon = "<img src='http://icons.wxug.com/i/c/f/" + iconCondition + ".gif'></img>";

                    //set date variables
                    weekday = forecast[index]["date"]["weekday"];
                    month = forecast[index]["date"]["monthname"];
                    day = forecast[index]["date"]["day"];

                    //forecast conditions
                    conditions = forecast[index]["conditions"];

                    //find average of the day's high and low
                    avg = parseInt((parseInt(forecast[index]["high"]["fahrenheit"]) + parseInt(forecast[index]["low"]["fahrenheit"])) / 2);

                    //print it all out neatly
                    forecastStr = $("<h3>" + icon + weekday + ", " + month + " " + day + ": " + conditions + ", " + avg + "&deg;F" + "</h3>");

                    //append to body
                    $(".weather").append(forecastStr);
                }

                //Append Wunderground logo
                $(".weather").append("<br />" + "<img src='img/wunderground.png' />");

            }
        });
    }


    function setupAvailability() {
        /** AVAILABILITY TABS **/

        var $available = $('.available'),
            $schedule = $('.schedule'),
            $content = $('.available-content');

        /** EXTENSIVE AVAILABLE LIST BUTTON **/

        $available.click(function () {

            $('.available-content h1, .available-content h2, .available-content ul, .available-content p').detach();

            $.ajax({
                type: "GET",
                url: "daniel/EditItems.xml",
                dataType: "xml",
                success: function (xml) {
                    $content.append("<h1>Produce Availability List</h1>");
                    $('.available-content').append("<ul class='alpha'></ul>");

                    $(xml).find('AvailableitemsQuery').each(function () {
                        var item = $(this).find("Description").text();

                        $('#available ul').append("<li>" + item + "</li>");
                    });

                        //Sort items alphabetically using TinySort plugin
                        tinysort('.alpha>li');


                },
                error: function () {
                    $content.append("<p>Unfortunately, we encountered an error trying to get the availability list. Please <a href='mailto:andrew@martinsfarmstand.com'>email Andrew</a> to report the problem.</p>")
                }
            });

        });
            /** SEASON SCHEDULE BUTTON **/
            $schedule.click(function () {
            $('.available-content h1, .available-content h2, .available-content ul, .available-content p').hide();
                $.get('daniel/seasonschedule.html', function (data) {
                    $content.append("<h1>Our Crop Schedule</h1>");
                    $content.append(data);
                });

            });

        /** AVAILABILITY LIST PAGE **/

        $.ajax({
            type: "GET",
            url: "daniel/EditItems.xml",
            dataType: "xml",
            success: function (xml) {
                $('.availability-page-list').append("<h1>Produce Availability List</h1>");
                $('.availability-page-list').append("<ul class='alpha'></ul>");

                $(xml).find('AvailableitemsQuery').each(function () {
                    var item = $(this).find("Description").text();

                    $('.availability-page-list').append("<li>" + item + "</li>");

                        //Sort items alphabetically using TinySort plugin
                        tinysort('.alpha>li');

                });
            },
            error: function () {
                $('.availability-page-list').append("<p>Unfortunately, we encountered an error trying to get the availability list. Please <a href='mailto:andrew@martinsfarmstand.com'>email Andrew</a> to report the problem.</p>");
            }
        });
    }

    setupHeaderImg();
    setupLazyLoad();
    setupNavSelect();
    setupMobileNavigation();
    setupMailFormFunctions();
    setupHoursToggle();
    setupWeather();
    setupAvailability();

}(jQuery));


function initMap() {
    var myLatlng = {
            lat: 44.670491,
            lng: -74.904158
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 10,
            center: myLatlng
        }),
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Click to zoom'
        });
    map.addListener('center_changed', function () {
        // 10 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 10000);
    });

    marker.addListener('click', function () {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
    });
}