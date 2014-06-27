var AppPage = require("./AppPage");

describe("PLT App Demo Page", function () {

    var page = new AppPage();

    beforeEach(function () {
        page.get();
    });

    describe("Basic Setup", function () {
        it("should display the correct title", function () {
            expect(page.getTitle()).toBe('PLT Demo - clobject');
        });

      it('should not have an error', function () {
        page.getError().then(function (jserror) {
          expect(jserror).toBe(null);
        });
      });

      it('should find the node', function () {
        page.node.getTagName().then(function (tagName) {
          expect(tagName).toBe('plt-clobject');
        })
      });

    });

});
