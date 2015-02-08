'use strict';

describe("The multiselect directive, when using string models, ", function () {

    var $scope;
    var $rootScope;
    var $compile;

    beforeEach(angular.mock.module('btorfs.multiselect'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('initializes the list lazily, when the first item is chosen', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();
        expect(element.isolateScope().selection).toBeUndefined();

        element.isolateScope().toggleItem($scope.options[0]);
        expect(element.isolateScope().selection).toBeDefined();
        expect(element.isolateScope().selection.length).toBe(1);
    });

    it('can toggle items in the selection', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        element.isolateScope().toggleItem($scope.options[0]);
        expect(element.isolateScope().selection).toBeDefined();
        expect(element.isolateScope().selection.length).toBe(1);

        element.isolateScope().toggleItem($scope.options[0]);
        expect(element.isolateScope().selection.length).toBe(0);
    });

    it('shows a label on the button when no items have been chosen', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        expect(element.isolateScope().getButtonText()).toBe('Select');
    });

    it('shows the name of the element when one item is chosen', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        $scope.selection = ['el1'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        expect(element.isolateScope().getButtonText()).toBe('el1');
    });

    it('shows the number of elements when multiple items are chosen', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        $scope.selection = ['el1', 'el2'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        expect(element.isolateScope().getButtonText()).toBe('2 selected');
    });

    it('can select and unselect all at once', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        $scope.selection = [];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        element.isolateScope().selectAll();
        $scope.$digest();
        expect($scope.selection.length).toBe(3);

        element.isolateScope().unselectAll();
        $scope.$digest();
        expect($scope.selection.length).toBe(0);
    });

    it('knows which items are selected', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        $scope.selection = ['el2'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        expect(element.isolateScope().isSelected($scope.options[1])).toBeTruthy();
        expect(element.isolateScope().isSelected($scope.options[2])).toBeFalsy();
    });

    it('can search inside the options', function () {
        $scope.options = ['el1', 'el2', 'el3'];
        $scope.selection = ['el2'];
        var element = $compile("<multiselect ng-model='selection' options='options'></multiselect>")($scope);
        $scope.$digest();

        element.isolateScope().searchFilter = '2';
        expect(element.isolateScope().search()($scope.options[0])).toBeFalsy();
        expect(element.isolateScope().search()($scope.options[1])).toBeTruthy();
        expect(element.isolateScope().search()($scope.options[2])).toBeFalsy();

        element.isolateScope().searchFilter = '5';
        expect(element.isolateScope().search()($scope.options[0])).toBeFalsy();
        expect(element.isolateScope().search()($scope.options[1])).toBeFalsy();
        expect(element.isolateScope().search()($scope.options[2])).toBeFalsy();
    });

});
