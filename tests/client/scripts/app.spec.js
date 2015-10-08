describe('App', function () {
    var Ctrl,
        scope;

    beforeEach(module('app'));

    beforeEach(inject(['$rootScope', '$controller', function ($rootScope, $controller) {
        scope = $rootScope.$new();
        Ctrl = $controller('Main', {
            $scope: scope
        });
    }]));

    it('should work', function () {
        expect(scope.test).toBe('OK');
    });
});