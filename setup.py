from setuptools import setup

setup(name='moonshot',
      test_suite="moonrock",
      entry_points="""\
      [paste.app_factory]
      main = moonrock:main
      [console_scripts]
      initialize_moonrock_db = moonrock.scripts.initializedb:main

      """
    )
