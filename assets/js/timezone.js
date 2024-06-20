$(document).ready(function () {
    // Function to fetch timezone data from WorldTimeAPI
    function fetchTimezoneData(callback) {
        $.ajax({
            url: 'http://worldtimeapi.org/api/timezone',
            dataType: 'json',
            success: function(data) {
                callback(data);
            }
        });
    }

    // Get Info button click event
    $('#get_info').click(function () {
        const location1 = $('#location1').val().trim();
        const location2 = $('#location2').val().trim();

        if (location1) {
            fetchTimezoneInfo(location1, '#timezoneInfo1');
        }

        if (location2) {
            fetchTimezoneInfo(location2, '#timezoneInfo2');
        }

        // Show locations on map if at least one location is provided
        if (location1 || location2) {
            showLocationsOnMap(location1, location2);
        } else {
            alert('Please enter at least one location.');
        }
    });

    // Function to fetch timezone information for a location
    function fetchTimezoneInfo(location, elementId) {
        const apiUrl = `https://worldtimeapi.org/api/timezone/${encodeURIComponent(location)}`;

        $.get(apiUrl, function(data) {
            if (data && data.datetime) {
                const abbreviation = data.abbreviation;
                const timezone = data.timezone;
                const datetime = new Date(data.datetime);

                const formattedTime = datetime.toLocaleString('en-US', {
                    timeZone: timezone,
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });

                const tableContent = `
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Abbreviation</th>
                                <th>Timezone</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${abbreviation}</td>
                                <td>${timezone}</td>
                                <td>${formattedTime}</td>
                            </tr>
                        </tbody>
                    </table>
                `;

                $(elementId).html(tableContent);
            } else {
                alert(`Error fetching timezone data for ${location}`);
            }
        }).fail(function() {
            alert(`Error fetching timezone data for ${location}`);
        });
    }


    // Function to geocode and place marker on Google Map
    function geocodeAndPlaceMarker(geocoder, map, location) {
        geocoder.geocode({ 'address': location }, function(results, status) {
            if (status === 'OK') {
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: location
                });
                map.setCenter(results[0].geometry.location);
            } else {
                alert(`Geocode was not successful for ${location} due to: ${status}`);
            }
        });
    }
});
