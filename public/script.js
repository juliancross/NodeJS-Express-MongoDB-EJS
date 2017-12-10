(function() {

    try {
        var date = document.querySelector('.serveur p');
        var toto = new Date().toString().slice(0, 24);
        date.append(toto);
    } catch (e) {
        console.log(e)
    }

    try {
        document.querySelector(".ajax .button1").addEventListener('click', function() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "assets/simple.txt", false);
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.querySelector(".ajax .text").innerHTML = this.responseText;
                }
                if (this.status == 404) {
                    document.querySelector(".ajax .text").innerHTML = "Not found";
                }
            }
            xhr.send();
        });
    } catch (e) {
        console.log(e);
    }

    try {
        document.querySelector(".ajax .button2").addEventListener('click', function() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "assets/users.json", false);
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var user = JSON.parse(this.responseText);
                    var output = ' ';
                    output += `<ul><li>${user.name}</li><li>${user.surname}</li><img src=${user.image}></li>`;
                    document.querySelector(".ajax .text").innerHTML = output;
                }
                if (this.status == 404) {
                    document.querySelector(".ajax .text").innerHTML = "Not found";
                }
            }
            xhr.send();
        });

    } catch (e) {
        console.log(e);
    }

})();