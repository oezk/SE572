$(document).ready(function () {
    $('#filmsTable').hide();
    $('#filmName').val("");
});

var API = (() => {
    var filmArray = [];
    var createFilm = () => {

        var formData = new FormData(document.forms.filmSubmit);
        var filmName = formData.get('filmName');

        if (filmName.trim().length > 0){
            filmArray.push(filmName);
            console.log("Film added: " + filmName);
            alert("Film added: " + filmName);
            $("#filmName").val("");
        }
        return false;
    }

    var getFilms = () => {

        if (filmArray.length > 0) {
            var filmRating = 10;
            $('#filmsTable').show();
            $("#filmsTable").find("tr:gt(0)").remove();
            console.log("Films:" + filmArray.toString());
            $.each(filmArray, function (index, filmName) {
                $("#filmsTable").append("<tr><td>" + filmName + "</td><td>" + filmRating + "</td></tr>");
            });

        }
        return false;
    }

    return {
        createFilm,
        getFilms
    }
})();