angular.module('authenticationService', [])
.factory('Auth', function($http, $q, AuthToken) {
        var authFactory = {};

        authFactory.login =  function(username, password) {
            console.log('login');
                    console.log(username);
                    console.log("password");

            return $http({
                    url: "http://ec2-54-165-248-20.compute-1.amazonaws.com:8080/api/weather", 
                    method: "GET",
                    params: {city1: username, city2: password}
                })
                .success(function (data) {
                    console.log(username);
                    console.log(password);
                    console.log(data);
                    return data;
                })
        };
        authFactory.logout = function() {
            AuthToken.setToken();
        };

        authFactory.loggedIn = function() {
            if(AuthToken.getToken()) {
                return true;
            }
            else {
                return false;
            }
        };

        return authFactory;

    })


.factory('AuthToken', function($window) {
    var authFactory = {};

    authFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    authFactory.setToken = function (token) {
        if (token) {
            console.log('auth factory set token');
            $window.localStorage.setItem('token', token);
        }
        else {
            $window.localStorage.removeItem('token');
        }

    };
        return authFactory;
})


.factory('AuthInterceptor', function($q, $location, AuthToken) {
        console.log('interceptors')

        var interceptorFactory = {};
        interceptorFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) {
                console.log('exists')
                config.headers['x-access-token'] = token;
            }
            return config;
        };

        interceptorFactory.responseError = function (response) {
            //Redirects user to login page
            if (response.status == 403) {
                $location.path('http://ec2-54-165-248-20.compute-1.amazonaws.com:8080/login');
            }
            return $q.reject(response);
        }

        return interceptorFactory;
    });



