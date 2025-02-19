 $(document).ready(function() {
        $('input[name="paymentMethod"]').on('change', function() {
            $('.payment-method').hide();
            $('#' + $(this).val()).show();
        });
    });