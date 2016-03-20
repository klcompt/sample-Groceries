var dialogsModule = require("ui/dialogs");
var viewModule = require("ui/core/view");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var Observable = require("data/observable").Observable;
var page;

var groceryList = new GroceryListViewModel([]);
var pageData = new Observable({
  groceryList: groceryList,
  grocery: ""
});

exports.loaded = function(args) {
  page = args.object;
  var listView = page.getViewById("groceryList");
  page.bindingContext = pageData;

  groceryList.empty();
  pageData.set("isLoading", true);
  groceryList.load().then(function() {
    pageData.set("isLoading", false);
    listView.animate({
      opacity: 1,
      duration: 1000
    });
  });
};

exports.add = function() {
  // check for empty submission
  if (pageData.get("grocery").trim() === "") {
    dialogsModule.alert({
      message: "Enter a grocery item",
      okButtonText: "OK"
    });
    return;
  }

  // dismiss the keyboard
  page.getViewById("grocery").dismissSoftInput();
  groceryList.add(pageData.get("grocery"))
    .catch(function() {
      dialogsModule.alert({
        message: "An error occurred while adding an item to your list.",
        okButtonText: "OK"
      });
    });

  pageData.set("grocery", "");
};

