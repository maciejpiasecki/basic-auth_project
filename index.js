// Dodaniw modulow
const express = require("express");
var path = require('path');
// Uruchomienie serwera
const app = express();
// Funkcja do autentykacji uzytkownika
function authentication(req, res, next) {
    // wyciagniecie z requestu wartosci header Authorization
    var authheader = req.headers.authorization;
    console.log(req.headers);
    // Sprawdzenie czy header ma wartosc
    if (!authheader) {
        // Stworzenie obiektu error z wiadomoscia
        var err = new Error('You are not authenticated!');
        // Dodanie header z typem autentykacji do response
        res.setHeader('WWW-Authenticate', 'Basic');
        // Ustawienie statusu http do response
        err.status = 401;
        // Wysłanie wczesniej zdefiniowanego response
        return next(err)
    }

    // Wyciagniecie loginu i hasla z header
    var auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    // Walidacja danych uzytkownika
    if (user == 'Student' && pass == '1234') {

        // funkcja wykonywana po udanym logowaniu
        next();
    } else {
        // Po nieudanej walidacji stworzenie obiektu error z wiadomoscia
        var err = new Error('You are not authenticated!');
        // Dodanie header z typem autentykacji do response
        res.setHeader('WWW-Authenticate', 'Basic');
        // Ustawienie statusu http do response
        err.status = 401;
        // Wysłanie wczesniej zdefiniowanego response
        return next(err);
    }

}

// Dodanie do serwera funkcjonalnosci autentykacji uzytkownika
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// Konfiguracja serwera
app.listen((3000), () => {
    console.log("Server is Running");
})