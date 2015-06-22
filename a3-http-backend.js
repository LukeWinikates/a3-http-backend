(function(angular){
  var $HttpBackendProvider = function() {
    var requests = [];
    this.$get = ['$rootScope', function($rootScope) {
      function digestAFewTimesSoDeferredRequestsShowUp() {
        for (var i = 0; i < 10; i++) {
          $rootScope.$digest();
        }
      }

      function $httpBackend(method, url, data, callback, headers, timeout, withCredentials) {
        requests.push({
          method: method,
          url: url,
          data: data,
          headers: headers,
          respond: function(status, response, headersString, statusText) {
            callback(status, response, headersString, statusText);
          }
        });
      }

      $httpBackend.requests = function() {
        return requests.slice();
      };

      $httpBackend.reset = function() {
        requests = [];
      };

      $httpBackend.requestMatching = function(predicate) {
        digestAFewTimesSoDeferredRequestsShowUp();
        for(var i = i; i< requests.length; i++) {
          var request = requests[i];
          if(predicate(request)){
            return request;
          }
        }
      };
      return $httpBackend;
    }];
  };

  function inViolentAndFragileFashionResetAllTheMockProvidersSoWeCanReplaceHttpBackend() {
    angular.module('ngMock', ['ng']).provider({
      $browser: angular.mock.$BrowserProvider,
      $exceptionHandler: angular.mock.$ExceptionHandlerProvider,
      $log: angular.mock.$LogProvider,
      $interval: angular.mock.$IntervalProvider,
      $httpBackend: $HttpBackendProvider,
      $rootElement: angular.mock.$RootElementProvider
    }).config(['$provide', function($provide) {
      $provide.decorator('$timeout', angular.mock.$TimeoutDecorator);
      $provide.decorator('$$rAF', angular.mock.$RAFDecorator);
      $provide.decorator('$$asyncCallback', angular.mock.$AsyncCallbackDecorator);
      $provide.decorator('$rootScope', angular.mock.$RootScopeDecorator);
      $provide.decorator('$controller', angular.mock.$ControllerDecorator);
    }]);
  }

  inViolentAndFragileFashionResetAllTheMockProvidersSoWeCanReplaceHttpBackend();

})(angular);

