$('form').submit(function(e){
    e.preventDefault();
    var formData = $(this).serialize();
        $.ajax({
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScSTf9w08H3g6gmSkwp2BKy4DfHPeOcHX-MbK3fmPj0yXP39g/viewform?usp=sf_link',
        method: 'POST',
        data: formData,
        statusCode: {
            200: function(response) {
                alert('200');
            },
            201: function(response) {
                alert('201');
            },
            400: function(response) {
                alert('400');
            },
            404: function(response) {
                alert('401');
            }
        },
        success: function() {
            alert('Успешно');
        },
    });
});
