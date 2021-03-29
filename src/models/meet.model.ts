export default interface MeetModel {
  '@id': string;
  '@type': string;
  id: number;
  buyerId: number;
  sellerId: number;
  date: Date;
  description: string;
  transactionId: number;
  status: string;
}
