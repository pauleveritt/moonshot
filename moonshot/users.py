USERS = [
    # Twitter usernames
    dict(
        id='pauleveritt',
        email='p@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='paulweveritt'
    ),
    dict(
        id='stormfburg',
        email='p@x.com',
        first_name='STORM',
        last_name='Fburg',
        twitter='stormfburg'
    ),
    dict(
        id='chrismcdonough',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='chrismcdonough'
    ),
    dict(
        id='blaflamme',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='blaiselaflamme'
    )
]


def get_user(property, value):
    for user in USERS:
        if user.get(property) == value:
            return user
