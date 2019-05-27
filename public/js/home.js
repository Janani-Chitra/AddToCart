var app = angular.module("app", []);

// ======================service======================

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
    mycart = [];
    total = 0;
    remove = [false];
    itemDetails = [true];
    this.other = function (i) {
        remove[i] = true
        itemDetails[i] = false
    }
    this.details = function (i) {
        remove[i] = false
        itemDetails[i] = true
    }

    this.getRemove = function () {
        return remove
    }
    this.getItemDetails = function () {
        return itemDetails
    }
    this.getTotal = function () {
        return total
    }
    this.addToCart = function (item) {
        if (mycart.includes(item) === false) {
            mycart.push(item)
            total += item.price
            index = mycart.length - 1
            mycart[index]['quantity'] = 1;
            remove[index] = false
            itemDetails[index] = true;
        }
        else
            alert("This item is already available in your cart")
        return mycart;
    }
    this.removeFromCart = function (i) {
        total -= (mycart[i].price * mycart[i].quantity);
        mycart.splice(i, 1)
        remove.splice(i, 1)
        itemDetails.splice(i, 1)
        return mycart
    }

    this.inc = function (i) {
        mycart[i]['quantity'] += 1;
        total += mycart[i]['price']
        return mycart
    }
    this.dec = function (i) {
        if (mycart[i]['quantity'] > 1) {
            mycart[i]['quantity'] -= 1;
            total -= mycart[i]['price']
        }
        return mycart
    }

})

// ==================Controller==========================

app.controller("ctrl", function ($scope, productService, $timeout) {
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
        $scope.mycart = productService.addToCart(item)
        $scope.total = productService.getTotal()
        $scope.remove = productService.getRemove()
        $scope.itemDetails = productService.getItemDetails()
        $scope.showCart()
    }
    $scope.removeFromCart = function (i) {
        $scope.mycart = productService.removeFromCart(i)
        $scope.total = productService.getTotal()
        $scope.remove = productService.getRemove()
        $scope.itemDetails = productService.getItemDetails()
    }

    $scope.other = function (i) {
        productService.other(i)
        $scope.remove = productService.getRemove()
        $scope.itemDetails = productService.getItemDetails()
    }
    $scope.details = function (i) {
        productService.details(i)
        $scope.remove = productService.getRemove()
        $scope.itemDetails = productService.getItemDetails()
    }
    $scope.inc = function (i) {
        $scope.mycart = productService.inc(i)
        $scope.total = productService.getTotal()
    }
    $scope.dec = function (i) {
        $scope.mycart = productService.dec(i)
        $scope.total = productService.getTotal()
    }
    $scope.addClass = function () {
        var myEl = angular.element(document.querySelector('.cartDiv'));
        myEl.addClass('close');
        $timeout(function () {
            $scope.showCart();
            myEl.removeClass('close');            
          }, 600);
    }

})

