var endpoint = 'https://jsonplaceholder.typicode.com/users';

$('#search').on('focus', function() {
    $(this).addClass('focus');

    // Show results box only if have at least one item
    if ($('#search_container').children().length > 0) {
        $('#search_container').show();
    }
});

$('#search').on('blur', function() {
    // This timeout is to prevent closing container before
    // result item event is fired
    setTimeout(function() {
        $('#search_container').hide();
        $('#search').removeClass('focus');
    }, 200);
});

$('#search').on('keyup', function() {
    var userInputText = $(this).val();

    $('#search_container').html('').hide();

    // Checks if user has entered some text on inputbox
    if (userInputText) {
        var options = [];
        
        // Add searching class to animate component
        $('#search').addClass('searching');

        // Calls users API and search items by name
        // Then uses a regular expression to find search query and highlight in results box
        $.getJSON(endpoint, function(data) {
            $.each(data, function(index, item) {
                if (item.name && item.name.toLowerCase().indexOf(userInputText.toLowerCase()) !== -1) {
                    var regex = new RegExp('(' + userInputText + ')', 'gi');
                    var highlighted = item.name.replace(regex, '<strong>$1</strong>');

                    options.push('<div class="result-item">');
                    options.push(highlighted);
                    options.push('</div>');
                }
            });

            // Adds all results items to a box to show to user
            // And sets the search box position related to search box
            $('#search_container').css({
                'position': 'absolute',
                'width': $('#search').outerWidth(),
                'left': $('#search').position().left,
            }).html(options.join('')).show();

            // Back to common search icon
            $('#search').removeClass('searching');
        });
    }
});

$('body').on('click', '.result-item', function(e) {
    $('#search').val($(this).text());
});