# from pyramid.security import (
#     Allow,
#     Everyone,
# )
# from sqlalchemy.schema import Column
# from sqlalchemy.types import (
#     Integer,
#     String,
# )
# from sqlalchemy import Sequence
# from pyramid_sqlalchemy import BaseObject, Session
#
#
# class Root(BaseObject):
#     __name__ = ''
#     __parent__ = None
#     __tablename__ = 'root'
#     __acl__ = [(Allow, Everyone, 'view'),
#                (Allow, 'group:editors', 'edit')]
#
#     id = Column(Integer,
#                 Sequence('user_id_seq'),
#                 primary_key=True)
#     title = Column(String)
#
#     def __repr__(self):
#         return "<Root(id=%d, title='%s')>" % (self.id, self.title)
#
#     def __json__(self, request):
#         return dict(
#             id=self.id,
#             title=self.title
#         )
#
# def root_factory(request):
#     return Session.query(Root).one()