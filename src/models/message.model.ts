import UserModel from './user.model';

export default interface MessageModel {
  id: number;
  conversationId: number;
  content: string;
  fromUser: UserModel;
  toUser: UserModel;
  createdAt: string;
}
