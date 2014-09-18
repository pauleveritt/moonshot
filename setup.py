from setuptools import setup

setup(name='moonshot',
      entry_points="""\
      [paste.app_factory]
      main = moonshot:main
      [console_scripts]
      initialize_moonshot_db = moonshot.initialize_moonshot_db:main
      """
)
