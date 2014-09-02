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

You can now visit ``http://localhost:9000/`` to see a local, 
reload-on-change web server with the REST API mocked out.

Python
======

To get the real REST API in place, get started on Python:

#. pyvenv-3.4 env34

#. source env34/bin/activate

#. python3.4 setup.py develop

#. initialize_moonshot_db moonshot/development.ini

#. pserve moonshot/development.ini --reload

If you now visit ``http://localhost:9001/`` you will get a version 
that does not mock out the REST API, but instead sends requests to the 
local Pyramid app running on port ``3000``. You will still get the 
reload-on-change for the frontend that is still being served by Gulp.

You can also have Pyramid serve up the frontend via static assets at 
``http://localhost:3000/``.