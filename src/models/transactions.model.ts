export default interface TransactionModel {
    '@id': string;
    '@type': string;
    id: number;
    meetId: number;
    createdAt: Date,
    updatedAt: Date,
    price: number; 
    status: string;
};
  