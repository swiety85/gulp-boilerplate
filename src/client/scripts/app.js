'use strict';

angular.module('app', [])
.run(function () {
        console.log('App running...');
    })

.controller('Main', ['$scope', function ($scope) {
        $scope.test = 'OK';
    }])
;

