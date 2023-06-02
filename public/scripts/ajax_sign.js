$(document).ready(function () {
    $("#mail").on('keyup', function (e) {
        e.preventDefault();
        var value = $('#mail').val();
        $.ajax({
            url: '/signupform/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ mail: value }),
            success: function (result) {
                $('#result').html('Email is ' + result);

                if (result == 'taken') {
                    $('#result').css("color", "red");
                }
                else {
                    $('#result').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});