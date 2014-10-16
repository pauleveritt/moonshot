from setuptools import setup

requires = [
    'pyramid', 'waitress', 'PyJWT', 'rest_toolkit',

    # Twitter
    'requests', 'requests-oauthlib',

    # SQLAlchemy
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',

]

setup(name='moonshot',
      install_requires=requires,
      test_suite="moonrock",
      entry_points="""\
      [paste.app_factory]
      main = moonrock:main
      [console_scripts]
      initialize_moonrock_db = moonrock.scripts.initializedb:main

      """
    )
