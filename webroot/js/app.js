angular.module('CrudApp', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    	when('/', {templateUrl: '/tpl/lists.html', controller: ListCtrl}).
        //when('/', {templateUrl: '/tpl/explorer.html', controller: ExplorerCtrl}).
        when('/add-user', {templateUrl: '/tpl/add-new.html', controller: AddCtrl}).
        when('/edit/:id', {templateUrl: '/tpl/edit.html', controller: EditCtrl}).
        otherwise({redirectTo: '/'});
}]);

function ListCtrl($scope, $http) {
    $http.get('/api/users').success(function (data) {
        $scope.users = data;
    });
}

function ExplorerCtrl ($rootScope, $scope, $http, $location, Explorer) {
     $rootScope.loggedIn=true;
     $scope.contextPath = "";
     $scope.breadcrumbs = [];
     vplexGet();

     $scope.appendContextPath = function(ctxPath) {
         $scope.contextPath = $scope.contextPath + "/" + ctxPath;
       updateBreadcrumbs();
       vplexGet();
       };

     $scope.setContextPath = function(ctxPath) {
         if(ctxPath == "root"){
          $scope.contextPath = "";
          $scope.breadcrumbs = [];
       } else {
            var index = $scope.contextPath.indexOf(ctxPath) + ctxPath.length;
            $scope.contextPath = $scope.contextPath.substring(0,index);
              updateBreadcrumbs();
         }
       vplexGet();
       };
       function updateBreadcrumbs() {
    	     $scope.breadcrumbs = $scope.contextPath.split("/");
    	     $scope.breadcrumbs.shift();  //remove first empty "" element
    	  }

	  function vplexGet() {
	      $scope.isLoading = true;
	      //$scope.contextPath= '/vplex';
	      var apath = '/vplex'+$scope.contextPath;
	      var testdata = Explorer.get({pathId: apath}, function() {
	        $scope.subContexts = testdata.response.context[0].children;
	        $scope.attributes = testdata.response.context[0].attributes;
	        if($scope.attributes.length == 1){
	           $scope.attributes = null;
	        }
	      $scope.isLoading = false;
	      doFiltering();

	    });
	  }
	  function doFiltering() {
		    isFilterableObject();
		    $scope.filterExp = null;
		  }

		  function isFilterableObject(){
		      $scope.isFilterableObject = false;
		      var filterableObjTypes = ["/devices", "/consistency-groups","/virtual-volumes","/storage-volumes","/extents"];
		        for (var i=0; i<filterableObjTypes.length; ++i) {
		       if(endsWith($scope.contextPath, filterableObjTypes[i])){
		          $scope.isFilterableObject = true;
		        return;
		       }
		    }
		  }

		  function endsWith(str, suffix) {
		       return str.indexOf(suffix, str.length - suffix.length) !== -1;
		    }
	  
}

function AddCtrl($scope, $http, $location) {
    $scope.master = {};
    $scope.activePath = null;

    $scope.add_new = function (user, AddNewForm) {

        $http.post('/api/users', user).success(function () {
            $scope.reset();
            $scope.activePath = $location.path('/');
        });

        $scope.reset = function () {
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();

    };
}

function EditCtrl($scope, $http, $location, $routeParams) {
    var id = $routeParams.id;
    $scope.activePath = null;

    $http.get('/api/users/' + id).success(function (data) {
        $scope.user = data;
    });

    $scope.update = function (user) {
        $http.put('/api/users/' + id, user).success(function (data) {
            $scope.user = data;
            $scope.activePath = $location.path('/');
        });
    };

    $scope.delete = function (user) {
        var deleteUser = confirm('Are you absolutely sure you want to delete?');
        if (deleteUser) {
            $http.delete('/api/users/' + user.id);
            $scope.activePath = $location.path('/');
        }
    };
}