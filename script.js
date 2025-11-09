window.onload = function () {  // display webpage,event fullloaded(html,css, js),event triggered
    setTimeout(() => {  // function delays the execution of code for a specified time (in milliseconds).
        // Fade out preloader
        document.getElementById("preloader").classList.add("hidden");  //html docu,find id in html elements, list of CSS classes, Adds the "hidden" class to the element.

        setTimeout(() => {
            // Hide preloader and show content
            document.getElementById("preloader").style.display = "none"; //entire web page,Finds an HTML element with the id ,hides the element completely.
            document.getElementById("mainContent").style.display = "block";

            // Play audio after preloader disappears
            let audio = document.getElementById("introAudio");  //JavaScript method (.getElementById)that allows you to select an HTML element using its id attribute.
            if (audio) {
                audio.play().catch((error) => console.log("Audio autoplay blocked, user interaction required."));
            }   // audio is a JavaScript variable,if audio.play() fails .catch() method captures the error.,
        }, 1000); // Delay hiding preloader (1 sec)
    }, 3000); // Show preloader for 3 seconds
};

document.addEventListener("DOMContentLoaded", function () {
    // Get slides after DOM is fully loaded
    let slideIndex = 0; // Start with the first slide
    let slides = document.querySelectorAll(".slide");
    let totalSlides = slides.length;

    function showSlide() {
        slides.forEach((slide) => (slide.style.display = "none")); // Hide all slides
        if (slides.length > 0) {
            slides[slideIndex].style.display = "block"; // Show current slide
        }
    }

    if (totalSlides > 0) {
        showSlide();

        // Auto-slide every 4 seconds for smooth transition
        setInterval(function () {
            slideIndex = (slideIndex + 1) % totalSlides; // Move to the next slide
            showSlide();
        }, 4000); // Change slide every 4 seconds
    }

    // Login button event listener
    // Login button event listener
let loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form from submitting automatically

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        // Proceed with login request
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => response.json())
            .then(data => {
                console.log("Response from server:", data); // Debugging response
                if (data.message) {
                    showSuccessPopup();  // Call the popup function on success
                } else {
                    alert(data.error || "Invalid login. Please try again."); // Handle error
                }
            })
            .catch((error) => console.error("Error:", error));
    });
}

// Function to show success popup
function showSuccessPopup() {
    document.getElementById("popup-overlay").style.display = "block";
    document.getElementById("success-popup").style.display = "block";

    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
}

    // Logout functionality
    let logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("userLoggedIn"); // Remove login state
            if (loginBtn) loginBtn.style.display = "inline-block"; // Show login
            logoutBtn.style.display = "none"; // Hide logout
            alert("You have been logged out!");
            window.location.href = "login.html"; // Redirect to login page
        });
    }
});


