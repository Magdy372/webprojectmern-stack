$(document).ready(function () {
    $("#mail").on('keyup', function (e) {
        e.preventDefault();
        var value = $('#mail').val();
        $.ajax({
            url: '/adduserform/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ mail: value }),
            success: function (result) {
                $('#result').html('Email is ' + result);

                if (result == 'taken') {
                    $('#result').css("color", "red");
                    //document.querySelector('#btn-sub').disabled = true;
                    $('#btn-sub').css("background-color", "red");
                   // $('#btn-sub').querySelector.disabled = true;
                    $('#btn-sub').prop("disabled", true);
                    console.log()

                }
                else {
                    $('#result').css("color", "green");
                   // document.querySelector('#button').disabled = false;
                }
            },
            error:function(err){

            }
        });
    });
});