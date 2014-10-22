## Moonrock TODO list

- [X] make a branch
- [X] change the directory name and clean up references
- [X] start a README.md and TODO.md in moonrock
- [X] write some minimal unit tests (setup)
- [ ] add more unit tests

## SQLAlchemy

- [X] Add the dependency, as well as pyramid_sqlalchemy
- [X] Put stuff into the INI file per the pyramid_sqlalchemy docs
- [X] Make a models directory with a file users.py
- [X] Change the app startup to initialize the sqlite file and shove in some data or, make a console script
- [X] Get a root_factory in place
- [X] Replace users.py with a SQLA query
- [X] Implement groupfinder callback
- [ ] If possible, some unit tests with mocks

## rest_toolkit SQL support

- [ ] Convert our rest resources to use this
- [ ] If possible, some functional tests (WebTest)

References:
* http://rest-toolkit.readthedocs.org/en/latest/sql.html

## Traversal

- [ ] models/sqltraversal.py as shown in the tutorial
- [ ] models/folder.py and models/document.py as shown in the tutorial
- [ ] For now, don't use rest_toolkit for traversal of folders and documents
- [ ] Instead, make view classes that return JSON

References:
* http://pyramid-tutorials.readthedocs.org/en/latest/quick_traversal/sqlroot.html
* http://pyramid-tutorials.readthedocs.org/en/latest/quick_traversal/sqladdcontent.html

## Authorization

- [ ] get the security.py groupfinder callback working with a group-based ACL
- [ ] figure out persistent ACLs
