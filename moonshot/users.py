USERS = [
    # Twitter usernames
    dict(
        _id=1,
        username='pauleveritt',
        email='p@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='paulweveritt',
        password='password'
    ),
    dict(
        _id=2,
        username='stormfburg',
        email='p@x.com',
        first_name='STORM',
        last_name='Fburg',
        twitter='stormfburg',
        password='password'
    ),
    dict(
        _id=3,
        username='chrismcdonough',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='chrismcdonough',
        password='password'
    ),
    dict(
        _id=4,
        username='blaflamme',
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
