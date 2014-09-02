from setuptools import setup

requires = [
    'pyramid', 'pyramid_jinja2', 'waitress', 'pyramid_sqlalchemy',
    'PyJWT', 'requests', 'requests-oauthlib'
]

setup(name='moonshot',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = moonshot:main
      [console_scripts]
      initialize_moonshot_db = moonshot.initialize_moonshot_db:main
      """
)
