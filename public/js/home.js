var app = angular.module("app", []);
app.service('productService', function () {
    this.prodFunc = function () {
        return products = {
            prod1: {
                img: "../public/images/j1.jpg",
                name: "SUKKHI JEWELLERY SET",
                price: 250
            },
            prod2: {
                img: "../public/images/s1.jpg",
                name: "APARA JEWELLERY SET",
                price: 690
            },
            prod3: {
                img: "../public/images/s2.jpg",
                name: "DIVA KUNDAN NECKLACE",
                price: 999
            },
            prod4: {
                img: "../public/images/s3.jpg",
                name: "YOUBELLA ANTIQUE NECKLACE",
                price: 1250
            }
        };
    };
})
app.controller("ctrl", function ($scope, productService) {
    $scope.showcart = false;
    $scope.products = productService.prodFunc()
    $scope.showCart = function () {
        $scope.showcart = !$scope.showcart;
    }
    $scope.mycart = []
    $scope.total = 0;
    $scope.remove = [false];
    $scope.itemDetails = [true];

    $scope.addToCart = function (item) {
        if ($scope.mycart.includes(item) === false) {
            $scope.mycart.push(item)
            $scope.total += item.price
            $scope.index = $scope.mycart.length - 1
            $scope.mycart[$scope.index]['quantity'] = 1;
            $scope.remove[$scope.index] = false
            $scope.itemDetails[$scope.index] = true;
        }
        else
            alert("This item is already available in your cart")
        // alert("\"" + item.name +"\" was successfully added to your cart")
        $scope.showCart()
    }
    $scope.removeFromCart = function (i) {
        $scope.total -= ($scope.mycart[i].price * $scope.mycart[i].quantity);
        $scope.mycart.splice(i, 1)
        $scope.remove.splice(i, 1)
        $scope.itemDetails.splice(i, 1)
    }

    $scope.other = function (i) {
        $scope.remove[i] = true
        $scope.itemDetails[i] = false
    }
    $scope.details = function (i) {
        $scope.remove[i] = false
        $scope.itemDetails[i] = true
    }
    $scope.inc = function (i) {
        $scope.mycart[i]['quantity'] += 1;
        $scope.total += $scope.mycart[i]['price']
    }
    $scope.dec = function (i) {
        if ($scope.mycart[i]['quantity'] > 1) {
            $scope.mycart[i]['quantity'] -= 1;
            $scope.total -= $scope.mycart[i]['price']
        }
    }
})

