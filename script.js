function getLocation() {
    const message = document.getElementById("message");
    const whatsappLink = document.getElementById("whatsappLink");

    if (navigator.geolocation) {
        // Request location with high accuracy
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    } else {
        message.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy; // Optional: Check accuracy in meters
    const whatsappUrl = `https://wa.me/?text=My%20current%20location%20is:%20https://www.google.com/maps?q=${latitude},${longitude}`;
    
    const whatsappLink = document.getElementById("whatsappLink");
    whatsappLink.href = whatsappUrl;
    whatsappLink.style.display = "inline-block";
    whatsappLink.textContent = "Share Location on WhatsApp";

    // Display accuracy if needed
    console.log(`Location obtained with accuracy: ${accuracy} meters`);
}

function showError(error) {
    const message = document.getElementById("message");
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            message.innerHTML = "An unknown error occurred.";
            break;
    }
}
