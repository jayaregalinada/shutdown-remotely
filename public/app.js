app = angular.module('App', [])

.controller('MessageController', function($scope, $http, $log, $window, $timeout) {
    $scope.message = {}
    $scope.sending = false

    $scope.sendNotif = function(form, event) {
        event.preventDefault()
        $log.info('::sendNotif [form, event]', form, event)
        if (form.$valid) {
            $scope.sending = true
            $http({
                url:  window.location.origin + '/notify',
                method: 'POST',
                data: $scope.message
            }).then(function(success) {
                $scope.sending = false
                $scope.message = {}
                $log.info('::sendNotif@success', success)
            }, function(error) {
                $scope.sending = false
                $scope.message = {}
                $log.error('::sendNotif@error', error)
            })
        }
    }

    $scope.sendOnly = function(form, event) {
        event.preventDefault()
        $log.info('::sendOnly [form, event]', form, event)
        if (form.$valid) {
            $scope.sending = true
            $http({
                url:  window.location.origin + '/send',
                method: 'POST',
                data: $scope.message
            }).then(function(success) {
                $scope.sending = false
                $scope.message = {}
                $log.info('::sendOnly@success', success)
            }, function(error) {
                $scope.sending = false
                $scope.message = {}
                $log.error('::sendOnly@error', error)
            })
        }
    }

    $scope.sendAndShut = function(form, event) {
        event.preventDefault()
        $log.info('::sendAndShut [form, event]', form, event)
        if (form.$valid) {
            var confirming = $window.confirm('Are you sure you want to shutdown the computer?')
            if (confirming) {
                $scope.sending = true
                $http({
                    url: window.location.origin + '/shutdown',
                    method: 'POST',
                    data: $scope.message
                }).then(function(success) {
                    $scope.sending = false
                    $scope.message = {}
                    $log.info('::sendAndShut@success', success)
                }, function(error) {
                    $scope.sending = false
                    $scope.message = {}
                    $log.error('::sendAndShut@error', error)
                })
            }
        }
    }

    $scope.cancelShut = function(form, event) {
        event.preventDefault()
        $log.info('::cancelShut [form, event]', form, event)
        if (form.$valid) {
            $http({
                url:  window.location.origin + '/cancel',
                method: 'POST'
            }).then(function(success) {
                $scope.sending = false
                $scope.message = {}
                $log.info('::cancelShut@success', success)
            }, function(error) {
                $scope.sending = false
                $scope.message = {}
                $log.error('::cancelShut@error', error)
            })
        }
    }
})
