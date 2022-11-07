import { Algodv2, Transaction } from "algosdk";
import { AxiosInstance } from "axios";

export type ResponseData = {
  [key: string]: string[] | string;
};

export type Data = {
  [key: string]: any;
};

export type callable = {
  (txnId: string, error?: Error): any;
};

export type ClientObj = {
  [key: string]: Algodv2;
};

export interface IRequestData {
  asset: number;
  recipient: string;
  amount: string;
}

export interface IResponseData {
  status_code: number;
  message: string;
  data: ResponseData;
}

export interface IWallet {
  wallet: any;
  connect(): Promise<string>;
  signTransaction(txn: any): Promise<string>;
  disconnect(): Promise<void>;
}

export enum WalletType {
  pera = "pera",
  myAlgo = "myAlgo"
}

// UI TYPES

export interface FlashpayModalsProps {
  payload: IRequestData;
  processKey: string;
  network: string;
  onCallback: callable;
  createTransaction: (data: Data) => Promise<Transaction>;
  axiosJs: AxiosInstance;
}
