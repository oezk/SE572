$(document).ready(function () {
    clearValues();
    $('#userName').val("");
});

function clearValues(){
    $('#filmsTable').hide();
    $('#filmName').val("");
    $('#filmRating').val("");
}

var API = (() => {
    var filmArray = [];
    var jwtToken;
    var createFilm = () => {

        var formData = new FormData(document.forms.filmSubmit);
        var filmName = formData.get('filmName');
        var filmRating = formData.get('filmRating');


        if (filmRating == null) {
            alert("Please enter a rating!");
            return false
        }

        if (!Number.isFinite(parseInt(filmRating)) || filmRating < 0 || filmRating > 10) {
            alert("Please enter a rating between 0 and 10!");
            return false;
        }

        if (filmName.trim().length > 0) {
            event.preventDefault();
            try {
                fetch("http://localhost:8080/api/v2/films", {
                    method: 'POST',
                    body: JSON.stringify({ name: filmName.trim(), rating: filmRating }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    }

                }).then(resp => {
                    setTimeout(function () {
                        if (resp.status == 200) {
                            alert(`${filmName} film added with a rating of ${filmRating}!`);
                            clearValues();
                        } else {
                            alert(resp.status + " - Please log in before submitting a film");
                        }
                    }, 0);
                }).catch( error =>  console.log(error) );;
            } catch (e) {
                console.log(e);
                console.log("---------------------------");
            }
        } else {
            alert("Please enter a film with at least 1 character!");
            return false;
        }
        return;
    }

    var getFilms = () => {

        try {
            fetch("http://localhost:8080/api/v2/films", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json()).then(results => {
                if (JSON.stringify(results).includes("400 Bad Request") && !JSON.stringify(results).includes("Films:")) {
                    console.log(JSON.stringify(results, 2, 2));
                    alert(JSON.stringify(results, 2, 2));
                } else {
                    console.log("Films:" + JSON.stringify(results, 2, 2));
                    if (results.length > 0) {
                        $('#filmsTable').show();
                        $("#filmsTable").find("tr:gt(0)").remove();
                    }
                    results.forEach(data => {
                        if (data.rating == undefined) {
                            data.rating = "No Rating";
                        }
                        $("#filmsTable").append("<tr><td>" + data.name + "</td><td>" + data.rating + "</td></tr>");

                    });
                }
            });
        } catch (e) {
            console.log(e);
            console.log("---------------------------");
        }
        return false;
    }

    var login = () => {
        const val = document.getElementById("userName").value;
        try {
            if (val.trim().length > 0) {
            fetch("http://localhost:8080/api/v1/login", {
                method: 'POST',
                body: JSON.stringify({
                    username: val
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(resp => resp.json()).then(data => {
                jwtToken = data.token;
                console.log("jwtToken: " + jwtToken);
                alert("Logged in: " + val);
                $( "#userName" ).prop( "disabled", true );
                $("#loginButton").hide();
                $("#loginStatus").text("Logged in:");
                clearValues();
            });
        } else {
            alert("Please enter a username with at least 1 character!");
            return false;
        }
        } catch (e) {
            console.log(e);
            console.log('---------------------------')
        }
        return false;
    }
    
    return {
        createFilm,
        getFilms,
        login
    }
})();