// ------------- menu section ------------------//

var app = angular.module('menuStore', ['uiGmapgoogle-maps', 'ngRoute', 'toastr', 'compareTo', 'angular.filter']);

// --------- Cook controller ---------- //

app.controller('cookController', ['$scope', '$http', 'toastr', '$log', function($scope, $http, toastr, $log){

	// set-up loading state
	$scope.dashboardNav = {
		listMyMenus: true
	};

	$scope.product = {};

	$scope.collectUserMenus = function(){
		 // check the user is logged in
		 // to add later, for now, we hard code with user id ==5

		 var userid = '5644f0d0fb30911100b9ae9d';

		 // I didnt finsih below this
		 $http.get('/menus/').success(function(data){
				 $scope.products = data;
				 $log.info(data);
			 });

		 };

		 $scope.editMenu = function(id){

			 $scope.dashboardNav = {
		 		editMyMenu: true
		 	}

			if(id == null) {
					// check if its a create menu
					$scope.data = {};

			} else {
				// otherwise, we will collect the menu to edit

				// Lets get the details of the chosen menu and return to the form
				$http.get('/menus/?id=' + id).success(function(data){
						// set the initial data from DB to the product attribute
						$scope.product = data;
					});

			}
	 };

	 $scope.editMenuSave = function(formData) {
		 // we have the latest data now
		 $scope.menuMaster = angular.copy(formData);

		 if($scope.menuMaster.id) {
			 $scope.reqStructure = "/menus/update/" + $scope.menuMaster.id;
		 } else {
			 // we should do the create function
			 $scope.reqStructure = "/menus/";
		 }
		 // lets update the database
		 // Submit request to Sails.
		 $http.post($scope.reqStructure, $scope.menuMaster)
		 .success(function onSuccess(sailsResponse){
			 toastr.success('Your record has been saved!', 'sucessfull');
		 })
		 .error(function(data, status) {
		 		$log.info('Repos error', status, data);
		 		// Handle known error type(s).
		 	toastr.error('Unknown', 'Error');
		 })
		 .finally(function eitherWay(){
		 	// do nothing
		 })


	 }

	 $scope.addIng = function() {
		 if(!$scope.product.ingrediants) {
			 $scope.product.ingrediants = [];
			 $scope.product.ingrediants.push($scope.input);
			 $scope.input = '';
		 } else {
			 $scope.product.ingrediants.push($scope.input);
			 $scope.input = '';
		 }
    };

		// remove an item
	 $scope.removeIng = function(index) {
		   $scope.product.ingrediants.splice(index, 1);
	 };

	 $scope.addImg = function() {
		 if(!$scope.product.images) {
			 $scope.product.images = [];
			 $scope.product.images.push($scope.imginput);
			 $scope.imginput = '';
		 } else {
			 $scope.product.images.push($scope.imginput);
			 $scope.imginput = '';
		 }
		 };

		// remove an item
	 $scope.removeImg = function(index) {
			 $scope.product.images.splice(index, 1);
	 };

	 $scope.addCat = function() {
		 		// lets check if the catagory is blank...
				if(!$scope.product.category) {
					$scope.product.category = [];
					$scope.product.category.push($scope.catinput);
					$scope.catinput = '';
				} else {
					$scope.product.category.push($scope.catinput);
					$scope.catinput = '';
				}
		 };

		// remove an item
	 $scope.removeCat = function(index) {
			 $scope.product.category.splice(index, 1);
	 };

}]);

// --------- signup controller ---------- //

app.controller('SignupController', ['$scope', '$http', 'toastr', '$log', function($scope, $http, toastr, $log){

	// set-up loading state
	$scope.signupForm = {
		loading: false
	}

	$scope.submitSignupForm = function(group){

		// Set the loading state (i.e. show loading spinner)
		$scope.signupForm.loading = true;

		if(group === 'cook')
		{
			var groups = ["cook"];
		}else{
			var groups = ["user"];
		}

		$scope.signupForm.groups = groups;

		// Submit request to Sails.
		$http.post('/signup', {
			groups: $scope.signupForm.groups,
			fname: $scope.signupForm.fname,
			lname: $scope.signupForm.lname,
			email: $scope.signupForm.email,
			city: $scope.signupForm.city,
      		password: $scope.signupForm.password
		})
		.success(function onSuccess(sailsResponse){
			if(group == 'cook') {
				window.location = '/cook/dashboard';
			} else {
				window.location = '/consumer/dashboard';
			}
		})
		.error(function(data, status) {
        $log.info('Repos error', status, data);
        // Handle known error type(s).
		      // If using sails-disk adpater -- Handle Duplicate Key
		      var emailAddressAlreadyInUse = status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}
    })
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	}
}]);

app.controller('PaymentController', ['$scope', '$http', 'toastr', '$log', function($scope, $http, toastr, $log){

		$scope.paymentClientToken = $http.get('/payment/clientToken').success(function(response){
			$scope.paymentClientToken = response.clientToken;
		}).error(function(data, status) {
			//$log.info('Repos error', status, data);
			$scope.error = true;
		});
}]);

// Menu Controller
app.controller('menuController',['$http', '$scope', '$log', '$location', function($http, $scope, $log, $location ){

    //set products to blank
  $scope.products = [];
  $scope.menuModal = false;
  $scope.productDetails = {};
  $scope.showToday = true;
  $scope.showTomorow = false;
  $log.info('im here');


  // function for collecting menus to display to the UI
  // When refers to the filter, incase its today or tomorow
  $scope.collectMenus = function(when){
    $log.info(when);
    // lets check if its tomorow and do something
    if(when === 'tomorow') {
      // need to change to tomorows date
      var myDate = new Date();
      var nextDay = new Date(myDate);
      nextDay.setDate(myDate.getDate()+1);
      $scope.todaysDate = nextDay;

      // lets collect the products for tomrowo
      $scope.products = menus;
      $log.info(menus);


      // lets finally setup the UI header to know which div to choose
      $scope.whichday = 'tomorow';

      // lets check if its today and do something
  } else if (when === 'today'){

        // lets change the date to today
        var myDate = new Date();
        $scope.todaysDate = myDate;

        // lets get data for today from the DB
        $http.get('/menus/').success(function(data){
          $scope.products = data;

        });

        // lets finally setup the UI header to know which div to choose
        $scope.whichday = "today";
    } else {
      // lets get data
      $http.get('/menus/').success(function(data){
        $scope.products = data;
        $log.info(data);
      });
    }

  };

  $scope.buyProduct = function(price) {
    $scope.purchaseModal=true;
  };

  // Search the DB for a specific menu item
  $scope.viewMenu = function(menuRef){

    //lets search based on ID. ID is passed as menu ref from the client or other controller
    $http.get('/menus?id=' + menuRef ).success(function(data){
      // lets set our data ready for the UI
        $scope.productDetails = data;

        // lets get the GEO location from google
        // lets also define the map
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + data.owner.city + '&key=AIzaSyCJLCY1Hf8Z7Majrjfu_AYlMF_zqOAB-p0').success(function(geoData){
          $log.info(geoData.results[0].geometry.location);
          $scope.map = { center: { latitude: geoData.results[0].geometry.location.lat, longitude: geoData.results[0].geometry.location.lng }, zoom: 15 };
          $log.info($scope.map);

          $scope.options = {scrollwheel: false};
          $scope.circles = [
              {
                  id: 1,
                  center: {
                      latitude: geoData.results[0].geometry.location.lat,
                      longitude: geoData.results[0].geometry.location.lng,
                  },
                  radius: 100,
                  stroke: {
                      color: '#08B21F',
                      weight: 2,
                      opacity: 1
                  },
                  fill: {
                      color: '#08B21F',
                      opacity: 0.5
                  },
                  geodesic: true, // optional: defaults to false
                  draggable: false, // optional: defaults to false
                  clickable: true, // optional: defaults to true
                  editable: true, // optional: defaults to false
                  visible: true, // optional: defaults to true
                  control: {}
                }];
        });

    }).error(function(data, status) {
        //$log.info('Repos error', status, data);
        $scope.error = true;
    });
    // lets tell the modal to load
    $scope.menuModal = true;
  };

  // lets setup the default date for the UI to choose
  //$scope.collectMenus('today');

}]);

// ---------- Nav Controller Section ----------------- //

var app = angular.module('navMod', ['ngRoute']);

app.controller('navController',['$routeProvider', '$location', function($routeProvider, $location){

}]);


// ------------- About Section --------------//
var app = angular.module('aboutMod', []);

app.controller('aboutController',['$http', '$scope', '$log', function($http, $scope, $log){
  // Int. Array
  aboutTimeline = [];

  // function for collecting menus
  $scope.getAboutTimeline = function(){

    $http.get('/abouttimeline/').success(function(data){
      $scope.products = data;
      $log.info($scope.products);
    });

  };

}]);





// --------------- static data for testing --------------------//

var menus = [
  {
    id:  '1',
    name:  'Menu 1',
    category: 'Thai',
    images: [
        "images/meals/meal_1.jpg",
        "images/meals/meal_1.jpg",
        "images/meals/meal_1.jpg"
      ],
      price: "10.00"
    },
    {
      id:  '2',
      name:  'Menu 2',
      category: 'Italian',
      images: [
          "images/meals/meal_2.jpg",
          "images/meals/meal_2.jpg",
          "images/meals/meal_2.jpg"
        ],
        price: "10.00"
      },
      {
        id:  '3',
        name:  'Menu 3',
        category: 'Hearty',
        images: [
            "images/meals/meal_3.jpg",
            "images/meals/meal_3.jpg",
            "images/meals/meal_3.jpg"
          ],
          price: "11.00"
        },
        {
          id:  '4',
          name:  'Menu 4',
          category: 'Fish',
          images: [
              "images/meals/meal_4.jpg",
              "images/meals/meal_4.jpg",
              "images/meals/meal_4.jpg"
            ],
            price: "11.00"
          },{
            id:  '5',
            name:  'Menu 5',
            category: 'Meat',
            images: [
                "images/meals/meal_5.jpg",
                "images/meals/meal_5.jpg",
                "images/meals/meal_5.jpg"
              ],
            },
            {
              id:  '6',
              name:  'Menu 6',
              category: 'Thai',
              images: [
                  "images/meals/meal_6.jpg",
                  "images/meals/meal_6.jpg",
                  "images/meals/meal_6.jpg"
                ],
              }];
