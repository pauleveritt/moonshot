=============
Moonshot Auth
=============

Token authentication based on Satellizer, supporting username/password,
Twitter, and more.

Features
========

- Guard state transitions with an ``authenticated: true`` on the state,
  including an ``$alert`` when you are sent to the login form.

- Handle ``403`` responses on ``/api/`` REST endpoint calls,
  including an ``$alert`` when you are sent to the login form.

- Supports login (username/password) and twitter credentials at the
  moment

- From Satellizer: remember token, forget token, profile data

