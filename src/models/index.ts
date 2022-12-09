import { Art } from './Art';
import { User } from './User';
import { Comment } from './Comment';

export { Art, User, Comment };

export function setupModels() {
  Comment.belongsTo(Art, {
    as: 'art',
    foreignKey: 'artId',
    onUpdate: 'CASCADE',
  });

  Comment.belongsTo(User, {
    foreignKey: {
      allowNull: true,
      name: 'userId',
    },
    onUpdate: 'CASCADE',
  });

  User.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'userId',
    onUpdate: 'CASCADE',
  });

  Art.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'artId',
    onUpdate: 'CASCADE',
  });
}
