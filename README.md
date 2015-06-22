#A3 $httpBackend 

This repo implements an alternative to the Angular team's mock $httpBackend provided as part of ngMock. Its goal is to allow greater flexibilty in Angular tests by enabling testing in the Arrange, Act, Assert style.

The standard mock $httpBackend requires that stub responses are declared before the system under test is invoked. Although it's not impossible to write tests in this way, this results in harder-to-read tests, and limits the ability to apply useful patterns to specs.

The inerface of this library is inspired by jasmine's mock-ajax.

#TODO:
* add karma setup, port tests over.
* add a test that verifies that this http-backend is the one that gets injected.
* expose a `reset` method
* clarify how the mock would be installed in jasimine
* double check karma plugin install stuff