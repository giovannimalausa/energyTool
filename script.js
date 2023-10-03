// Define an object to store target times
const targetTimes = {
    eveningTargetYellow: new Date().setHours(19, 0, 0, 0), // 19:00
    eveningTargetGreen: new Date().setHours(23, 0, 0, 0), // 23:00
    morningTargetYellow: new Date().setHours(7, 0, 0, 0), // 7:00
    morningTargetRed: new Date().setHours(8, 0, 0, 0) // 8:00
};

// Inizialize variable for day of the week
let currentDayOfWeek;
// Initialize variable for timestamp
let currentTimeStamp;

// Initialize variable for next change of time window
let nextTargetTime;

function updateCountdown() {
    // Get the current date and time
    const now = new Date();

    // Calculate the time difference
    let timeDifference = nextTargetTime - now;
    if (timeDifference < 0) {
        console.log(timeDifference);
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)).toString().padStart(2, '0');;
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');;
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');;

    // Display the countdown in the "nextTimeFrameCountdown" element
    $(".nextTimeFrameCountdownH").text(`${hours}`);
    $(".nextTimeFrameCountdownM").text(`${minutes}`);
    $(".nextTimeFrameCountdownS").text(`${seconds}`);

    currentDayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    currentTimeStamp = '${now.getHours}s'

    // Check the current day of the week
    if (currentDayOfWeek === 0) { // Sunday
        color = "green";
    } else if (currentDayOfWeek === 6) { // Saturday
        // Check the current hour and set the color accordingly
        const currentHour = now.getHours();
        if (currentHour >= 0 && currentHour < 7) {
            color = "green";
            nextTargetTime = targetTimes.morningTargetYellow;
        } else if (currentHour >= 23) {
            color = "green";
            nextTargetTime = "==>";
        } else {
            color = "yellow";
            nextTargetTime = eveningTargetGreen;
        }
    } else { // Monday to Friday
        // Check the current hour and set the color accordingly
        const currentHour = now.getHours();
        if (currentHour >= 7 && currentHour < 19) {
            color = "red";
            nextTargetTime = targetTimes.eveningTargetYellow;
        } else if (currentHour >= 19 && currentHour < 23) {
            color = "yellow";
            nextTargetTime = targetTimes.eveningTargetGreen;
        } else if (currentHour >= 23 || (currentHour >= 0 && currentHour < 6)) {
            color = "green";
            nextTargetTime = targetTimes.morningTargetYellow;
        } else {
            color = "yellow";
            nextTargetTime = targetTimes.morningTargetRed;
        }
    }

    if (nextTargetTime === targetTimes.eveningTargetGreen) {
        console.log("Next target time is green");
        colorOfNextTimeFrame = "green";
    } else if (nextTargetTime === targetTimes.eveningTargetYellow || nextTargetTime === targetTimes.morningTargetYellow) {
        console.log("Next target time is yellow");
        colorOfNextTimeFrame = "yellow";
    } else {
        console.log("Next target time is red");
        colorOfNextTimeFrame = "red";
    }

    // Output the result (you can replace this with your desired action)
    console.log(`The current color is: ${color}`);

    // Update the element with class "currentTimeFrameValue" with the 'color' variable
    $(".currentTimeFrameValue").text(color);
    $(".currentTimeFrameValue").css("color", color);
    $(".now").text();
    $(".colorOfNextTimeFrame").text(colorOfNextTimeFrame);

    changeIcons();
}

// Initialize the color variable
let color = "";

// Initialize next color variable
let colorOfNextTimeFrame = "";

// Update the countdown using the chosen target time
updateCountdown(nextTargetTime);

// Update the countdown every second
setInterval(() => {
    updateCountdown(nextTargetTime);
}, 1000);

function changeIcons() {
    if (color === "red") {
        $(".redIcon").css("display", "block");
        $(".yellowIcon").css("display", "none");
        $(".greenIcon").css("display", "none");
    } else if (color === "yellow") {
        $(".redIcon").css("display", "none");
        $(".yellowIcon").css("display", "block");
        $(".greenIcon").css("display", "none");
    } else { // color === green
        $(".redIcon").css("display", "none");
        $(".yellowIcon").css("display", "none");
        $(".greenIcon").css("display", "block");
    }
}