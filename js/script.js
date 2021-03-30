// Custom burger order
// On user Click on Calculate button :
//1 Read cust-burger-name, if empty default name is applied.
//2 check which extra cust-ingr-check is checked, get that check value and add it to the base burger price.
//3 Check if any discount coupon is added. If so, check if it's a valid one and apply the right discount to total price.
//4 Output the burger price (float fixed @ 2).

//VARIABLES
var baseBurgerCost = 9.99;
var validCouponsList = ["RISPARMINO", "CICCIOBOMBAINCANNOTTIER4"];

//FUNCTIONS
//validateCoupon (couponCode)
//taking a string as input, makes it Uppercase and check if is included in validCouponsList[]
//If validation is successfull returns the discount amount (float number )
//else returns false.
function validateCoupon(couponCode) {
	var discount;
	couponCode = couponCode.toUpperCase();
	if (validCouponsList.includes(couponCode)) {
		discount = 1.9;
	} else {
		discount = false;
	}
	return discount;
}

//BASE STATE
//AT FIRST WE DISPLAY BASE BURGER PRICE
priceTotal = document.getElementById("price-total");
priceTotal.innerHTML = "$ " + baseBurgerCost;

//adding event on btn-calc-price button
var btnPriceCalc = document.getElementById("btn-calc-price");
btnPriceCalc.addEventListener("click", function () {
	//resetting burgerPrice to baseBurgerPrice
	var burgerPrice = baseBurgerCost;
	//reading custom burger name.
	var userBurgerName = document.getElementById("cust-burger-name");
	console.log("customBurgerName = ", userBurgerName.value);

	//checking optional ingredients
	var userIngredients = document.getElementsByClassName("cust-ingr-check");
	console.log(userIngredients);

	//scrolling throught each ingredients and if checked,add price to burgerPrice
	for (i = 0; i < userIngredients.length; i++) {
		thisIngredient = userIngredients[i];
		if (thisIngredient.checked == true) {
			var ingredientPrice = parseFloat(thisIngredient.value);
			burgerPrice += ingredientPrice;
			console.log("added", thisIngredient.name, "for $:", ingredientPrice);
		}
	}
	console.log("burgerPrice base on ingredients= ", burgerPrice);

	//checking coupon
	userCoupon = document.getElementById("user-coupon");
	console.log("userCoupon value = ", userCoupon.value);
	if (userCoupon.value.length > 1) {
		var appliedDiscount = parseFloat(validateCoupon(userCoupon.value), 2);
		console.log("appliedDiscount = ", appliedDiscount);
		if (appliedDiscount) {
			burgerPrice -= appliedDiscount;
		} else {
			alert("Codice coupon non valido");
			//resetting coupon input field
			userCoupon.value = "";
		}
	}
	console.log("burgerPrice after discount= ", burgerPrice);

	//printing new price to user
	priceTotal.innerHTML = "$ " + burgerPrice;
});
