'use strict';

/* jasmine specs for directives go here */

describe('Unit testing selectRecipe', function() {
    var $compile;
    var $rootScope;
 
    // Load the cookbookApp module, which contains the directive
    beforeEach(module('cookbookApp.directives'));
 
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));
    
    it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("lidless, wreathed in flame");
    });
});