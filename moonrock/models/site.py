from pyramid.security import (
    Allow,
    Everyone,
)
from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
)

from .sqltraversal import Node


class Folder(Node):
    __tablename__ = 'folder'
    id = Column(Integer, ForeignKey('node.id'), primary_key=True)
    title = Column(Text)
    __acl__ = [(Allow, Everyone, 'view'),
               (Allow, 'group:editors', 'edit')]

    def __json__(self, request):
        return dict(
            id=self.id,
            title=self.title,
            resourceType='Folder'
        )


class Document(Node):
    __tablename__ = 'document'
    id = Column(Integer, ForeignKey('node.id'), primary_key=True)
    title = Column(Text)

    def __json__(self, request):
        return dict(
            id=self.id,
            title=self.title
        )
