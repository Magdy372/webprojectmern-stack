$(document).ready(function () {
    $("#adduser").on('keyup', function (e) {
        e.preventDefault();
        var value = $('#fullname').val();
        $.ajax({
            url: '/adduserroute/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ fullname: value }),
            success: function (result) {
                $('#fullname').html('UserName is ' + result);

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