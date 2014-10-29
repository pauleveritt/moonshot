moonshot
========

HTML5-based REST-driven admin user interface for hierarchical,
noserver web applications.

Twitter
=======

To get Twitter authentication working, make a ``twitter.ini`` that
looks like this::

    [app:main]
    use = egg:moonshot
    TOKEN_SECRET = something
    TWITTER_CONSUMER_KEY = something
    TWITTER_CONSUMER_SECRET = something
    TWITTER_CALLBACK_URL = http://127.0.0.1:3000

To make these, you need to use the Twitter dev console or get the keys
from Paul.

Finally, edit ``users.py`` and enter some information about the Twitter
username you will be using.

Installation
============

#. pyvenv-3.4 env34

#. source env34/bin/activate

#. pip install -r requirements.txt

For the Moonrock demo backend:

#. pserve moonrock/development.ini --reload

#. rm moonrock/moonrock.sqlite

#. initialize_moonrock_db moonrock/development.ini

Now visit `http://127.0.0.1:3000/` to see the AngularJS UI served up
by a Pyramid static view. Do *not* use ``localhost`` instead of
``127.0.0.1``.

Developing the Frontend
=======================

Developer setup presumes a NodeJS environment containing
``npm``, ``bower``, and ``gulp``.

#. npm install

#. bower install

#. gulp

