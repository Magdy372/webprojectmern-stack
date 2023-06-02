$(document).ready(function () {
    $("#fullname").on('keyup', function (e) {
        e.preventDefault();
        var value = $('#fullname').val();
        $.ajax({
            url: '/signupform/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ fullname: value }),
            success: function (result) {
                $('#result').html('UserName is ' + result);

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