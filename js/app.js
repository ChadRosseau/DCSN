<<<<<<< HEAD
const express = require("express");
const expressApp = express();
const port = 3000;

angular.module("myApp", [])

var app = angular.module("myApp", ["ngRoute", "ui.router", "firebase"]);


expressApp.get('/', (req, res) => {
    res.send("Hello World!");
});

expressApp.listen(port, function() {
    console.log(`Server listening on port ${port}`);
})


app.directive('navbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/navbar.html'
    }
});

app.directive('myfooter', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/footer.html'
    }
});


app.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "home.html",
        })

    .when("/about", {
        templateUrl: "about.html",
    })

    .when("/contact", {
        templateUrl: "contact.html",
    })

    .when("/profile", {
        templateUrl: "profile.html",
    })

    .when("/tickets", {
        templateUrl: "tickets.html",
    })

    .when("/login", {
        templateUrl: "login.html",
    })

    .when("/secret", {
        templateUrl: "secret.html",
    })

    .otherwise({
        redirectTo: '/home'
    });
});
=======
>>>>>>> 9beb7c37bab53de18868d2d8fb8a9bc6cade919c
