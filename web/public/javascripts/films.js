$(document).ready(function () {
    $('#filmsTable').hide();
    $('#filmName').val("");
});

var API = (() => {
    var filmArray = [];
    var createFilm = () => {

        var formData = new FormData(document.forms.filmSubmit);
        var filmName = formData.get('filmName');

        if (filmName.trim().length > 0) {
            try {
                fetch("http://localhost:3001/api/v1/films", {
                    method: 'POST',
                    body: JSON.stringify({ name: filmName }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }

                });
            } catch (e) {
                console.log(e);
                console.log("---------------------------");
            }
            console.log("Film added: " + filmName);
            alert("Film added: " + filmName);
            $("#filmName").val("");
        }
        return false;
    }

    var getFilms = () => {

        var filmRating = 10;

        try {
            fetch("http://localhost:3001/api/v1/films", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json()).then(results => {
                console.log("Films:" + JSON.stringify(results, 2, 2));

                if (results.length > 0) {
                    $('#filmsTable').show();
                    $("#filmsTable").find("tr:gt(0)").remove();
                }
                results.forEach(data => {
                    $("#filmsTable").append("<tr><td>" + data.name + "</td><td>" + filmRating + "</td></tr>");

                });
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