moonshot
========

HTML5-based REST-driven admin user interface for hierarchical, 
noserver web applications.

Installation
============

Developer setup presumes a modern, NodeJS environment containing 
``npm``, ``bower``, and ``gulp``.

#. npm install

#. bower install

#. gulp

You can now visit ``http://127.0.0.1:9000/`` to see a local, 
reload-on-change web server with the REST API mocked out.

Python
======

To get the real REST API in place, get started on Python:

#. virtualenv env27

#. source env27/bin/activate

#. python setup.py develop

#. pserve moonshot/frontend.ini --reload

#. pserve moonshot/backend.ini --reload

If you now visit ``http://127.0.0.1:4220/`` you will get a version
that does not mock out the REST API, but instead sends requests to the 
local Pyramid app running on port ``3000``. You will still get the 
reload-on-change for the frontend that is still being served by Gulp.

You can also have Pyramid serve up the frontend via static assets at 
``http://127.0.0.1:3000/``.

Twitter
=======

To get Twitter authentication working, make a ``twitter.ini`` that
looks like this::

  [twitter:settings]
  TOKEN_SECRET = some kind of secret
  TWITTER_CONSUMER_KEY = abc09xvfdf9d0f9
  TWITTER_CONSUMER_SECRET = kdjfgdf9fg9dfug9dg
  TWITTER_CALLBACK_URL = http://127.0.0.1:3000

To make these, you need to use the Twitter dev console.

Finally, edit ``views.py`` and put in your Twitter name for USERS.