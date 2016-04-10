var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var UserViewModel = require("../../shared/view-models/user-view-model");
var dialogsModule = require("ui/dialogs");

//var user = new UserViewModel();
var user = new UserViewModel({
  email: "kevin@compton.net",
  password: "password"
});

exports.loaded = function(args) {
  var page = args.object;
  if (page.ios) {
    var navigationBar = frameModule.topmost().ios.controller.navigationBar;
    navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
  }
  page.bindingContext = user;
}

exports.signIn = function() {
  user.login()
    .catch(function(error) {
      console.log(error);
      dialogsModule.alert({
        message: "Unfortunately we could not find your account.",
        okButtonText: "OK"
      });
      return Promise.reject();
    })
    .then(function() {
      frameModule.topmost().navigate("views/list/list");
    });
}
exports.register = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/register/register");
}
