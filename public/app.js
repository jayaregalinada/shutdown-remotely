app = angular.module('App', [])

.controller('MessageController', function($scope, $http, $log, $window, $timeout) {
    $scope.message = {}
    $scope.sending = false

    $scope.sendTo = function(method, url) {
        $scope.sending = true
        $http({
            url: window.location.origin + '/' + url,
            method: 'POST',
            data: $scope.message
        }).then(function(success) {
            $scope.sending = false
            $scope.message = {}
            $log.info('::' + method + '@success', success)
        }, function(error) {
            $scope.sending = false
            $scope.message = {}
            $log.error('::' + method + '@error', error)
        })
    }

    $scope.sendOnly = function(form, event) {
        event.preventDefault()
        $log.info('::sendOnly [form, event]', form, event)
        if (form.$valid) $scope.sendTo('sendOnly', 'send')
    }

    $scope.sendAndShut = function(form, event) {
        event.preventDefault()
        $log.info('::sendAndShut [form, event]', form, event)
        if (form.$valid) {
            var confirming = $window.confirm('Are you sure you want to shutdown the computer?')
            if (confirming) $scope.sendTo('sendAndShut', 'shutdown')
        }
    }

    $scope.cancelShut = function(form, event) {
        event.preventDefault()
        $log.info('::cancelShut [form, event]', form, event)
        if (form.$valid) $scope.sendTo('cancelShut', 'cancel')
    }
})
