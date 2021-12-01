$(document).ready(function () {

    let initialamCount = 0, initalnzCount = 0, amCount = 0, nzCount = 0;

    $.ajax({
        type: "Get",
        url: "movie.json",
        dataType: "json",
        contentType: "application/json",
        searchText: {},
        success: function (data) {
            characterDetails = data;
            movieData = data;
            createTable(characterDetails)
            amFilter();
            nzFilter();
        },
        error: function () {
            alert("data not found");
        }


    });

    function createTable(data){
        for (i = 0; i < data.length; i++) {
            $('#main_Table').append(
                '<tr><td class="movieid">' + data[i].id +
                '</td><td class="character_name">'
                + data[i]["characterName"] +
                '</td><td>' + data[i]["date"]
                + '</td><td>' + data[i]["played by"] +
                '</td><td>' + data[i]["film title"] +
                '</td></tr>');
        }
    }

    $("#search").keyup(function () {
        var searchText = this.value.toLowerCase().split(" ");
        $('#main_Table tr').each(function (index) {            
            var fiction = $(this).find('.character_name').html();
            if (fiction.toLowerCase().indexOf(searchText[0] !== "" && searchText[0]) != -1) {
                $(this).addClass('highlight');
            } else {
                $(this).removeClass('highlight');
            }
        });
    })

    function amFilter() {      
        $('#main_Table tr').each(function (index) {
            var fiction = $(this).find('.character_name').html();
            if (fiction.charCodeAt(0) <= 77) {
                initialamCount++;
            }
            $('.ambutton').html(`A-M (${initialamCount})`);

        });

    }

    function amButtonFilter() {
        console.log("btn1");
        $('#main_Table tr').each(function (index) {
            var fiction = $(this).find('.character_name').html();
            if (fiction.charCodeAt(0) <= 77) {
                amCount++;
            } else {
                $(this).addClass('hide');
            }
            $('.ambutton').html(`A-M (${amCount})`);
            $('.ambutton').attr('disabled', true);
            nzCount = 0;
            $('.nzbutton').attr('disabled', false);
        });       
    }

    // AM button click event
    $(".ambutton").on('click', function () {
        $('#main_Table tr').each(function (index) {
            $(this).removeClass('hide');
        });
        amButtonFilter();
    })

    function nzFilter() {
        console.log("btn2");
        $('#main_Table tr').each(function (index) {
            var fiction = $(this).find('.character_name').html();
            if (fiction.charCodeAt(0) >= 78) {
                initalnzCount++;
            }
            $('.nzbutton').html(`N-Z (${initalnzCount})`);

        });
    }

    function nzButtonFilter() {
        console.log("btn2");
        $('#main_Table tr').each(function (index) {
            var fiction = $(this).find('.character_name').html();
            if (fiction.charCodeAt(0) >= 78) {
                nzCount++;
            } else {
                $(this).addClass('hide');
            }
            $('.nzbutton').html(`N-Z (${nzCount})`);
            $('.nzbutton').attr('disabled', true);
            amCount = 0;
            $('.ambutton').attr('disabled', false);
        });
    }

    // NZ button click event
    $(".nzbutton").on('click', function () {
        $('#main_Table tr').each(function (index) {
            $(this).removeClass('hide');
        });
        nzButtonFilter();
    }) 

});