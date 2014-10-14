====
TODO
====

Next
====

- (FE/BE) Replace all responses with a dict containing ``data`` and
  anything else (e.g. schema)

- (FE) Add username/password section to the form

- (FE) Mock the username/password

- (BE) Implement username/password security

- (FE) Authorization for state-based and response-based security

- (FE) Unpack the stuff in src/app into separate pieces

- (FE) Get the other $alerts from Satellizer

- (BE) Switch to rest_toolkit

- (BE) Some concept of functional test suite

- (FE) After login, send back to "referrer"

After
=====

- (BE) Expired tokens

- (FE) Move all Restangular calls to the Moonshot service

- (BE) Try again to get CORS working

- Try an abstract state leading to a real state for '/' which has the
  layout

- Remove Todo app, playground, old, etc.

- Digest stuff moonshot/old and playground

- Forms

- Breadcrumbs

- Directive that marks a menu as active based on having a state ancestor


Later
=====

- (BE) Replace security callback with real groupfinder

- Embed access tokens in URLs for emails to principals with no login

- (FE) Ensure <title> does the right thing per view

- (FE/BE) Support Satellizer's "signup" mode

- Better animation

- Karma and Protractor tests

- Get Protractor tests that fail on jserror via a shared requirejs function


One Day
=======

- i18n


Done
====

- (FE/BE) Convert all API URLs to ``/api/auth/twitter`` etc.

- (FE) Move logout to src/auth and redirect to siteroot.site with
  an $alert

- (FE) Start a README.rst in each module explaining implemented features

- Make sure instructions work correctly

- Converted to dist

- Animation

- Get dist/index.html working (need ngtemplates setup)

- Make a module.js for just the module definition

- Move the state definitions out into src/todo/states.js

- Have a src/traverser/traverser.js as the WIP library

- Handle the index.html w/out #/ case via FAQ's
  how-to-set-up-a-defaultindex-child-state

- Ditto for trailing slash

- Get mockRest going

- Fix Protractor

- Get NotFound state working

- Get Error state working

- Why won't Gruntfile template use appjs sequence wildcards?

- Multiple app.config

- Get test coverage way up

