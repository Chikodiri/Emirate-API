$(document).ready(function() {
    // Initialize Google Map
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.67, lng: -79.38 }, // Default location (Humber college)
        zoom: 15 // Default zoom level
    });

    // Geocode location and place marker
    const geocoder = new google.maps.Geocoder();
    const address = '59 Hayden Street, Toronto';

    // Handle form submission
    $('#contactForm').submit(function(event) {
        event.preventDefault(); 
        // Get form data
        const formData = {
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        console.log(formData);

        // Clear form fields after submission
        $('#fullName').val('');
        $('#email').val('');
        $('#message').val('');

        // Show a success message
        alert('Form submitted successfully!');
    });
});
