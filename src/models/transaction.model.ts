export default interface TransactionModel {
  id: number;
  meetId: number;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  status: string;
}
