$(document).ready(function () {
    $('#filmsTable').hide();
    $('#filmName').val("");
    $('#filmRating').val("");
});

var API = (() => {
    var filmArray = [];
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
            try {
                fetch("http://localhost:8080/api/v2/films", {
                    method: 'POST',
                    body: JSON.stringify({ name: filmName.trim(), rating: filmRating }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }

                });
            } catch (e) {
                console.log(e);
                console.log("---------------------------");
            }
            alert(`${filmName} film added with a rating of ${filmRating}!`);
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

    return {
        createFilm,
        getFilms
    }
})();