USERS = [
    # Twitter usernames
    dict(
        id='pauleveritt',
        email='p@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='paulweveritt',
        password='password'
    ),
    dict(
        id='stormfburg',
        email='p@x.com',
        first_name='STORM',
        last_name='Fburg',
        twitter='stormfburg',
        password='password'
    ),
    dict(
        id='chrismcdonough',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='chrismcdonough',
        password='password'
    ),
    dict(
        id='blaflamme',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='blaiselaflamme',
        password='password'
    )
]


def get_user(prop, value):
    for user in USERS:
        if user.get(prop) == value:
            return user
