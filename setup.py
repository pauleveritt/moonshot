from setuptools import setup

requires = [
    'pyramid', 'waitress', 'PyJWT', 'rest_toolkit',

    # Twitter
    'requests', 'requests-oauthlib'
]

setup(name='moonshot',
      install_requires=requires,
      test_suite="moonrock",
      entry_points="""\
      [paste.app_factory]
      main = moonrock:main
      """
    )
