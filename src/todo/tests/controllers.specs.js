describe("Todo Controllers", function () {

  var listCtrl, listItemCtrl, shoppingList;
  beforeEach(module('moonshot', function ($provide) {
    shoppingList = jasmine.createSpyObj("shoppingList", ["foo"]);
    $provide.value("shoppingList", shoppingList);
  }));

  beforeEach(inject(function (_$controller_, _shoppingList_) {
    shoppingList = _shoppingList_;
    listCtrl = _$controller_("ListCtrl", {shoppingList: 1});
    listItemCtrl = _$controller_("ListItemCtrl", {context: 1});
  }));

  describe("The Basics", function () {
    it("should be true", function () {
      expect(listItemCtrl.context).toBeDefined();
    })

  });

});