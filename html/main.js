//  script to load header.html in everyfiles 
fetch("header.html").then(response => {
            if(!response.ok) {
                throw new Error("Header could not be loaded...");
            }

            return response.text();
        }).then((data => {
            document.getElementById("header-container").innerHTML = data;
        })).catch(error => {
            console.log("Error in loading header: ", error);
    });