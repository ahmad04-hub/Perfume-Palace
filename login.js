$(document).ready(function(){
    $('#show-signup').click(function(e){
        e.preventDefault();
        $('#login-form').hide();
        $('#signup-form').removeClass('d-none');
    });

    $('#show-login').click(function(e){
        e.preventDefault();
        $('#signup-form').addClass('d-none');
        $('#login-form').show();
    });
});
