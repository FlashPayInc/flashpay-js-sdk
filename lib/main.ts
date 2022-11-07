import axios, { AxiosInstance } from "axios";
import algosdk, { Algodv2 } from "algosdk";
import { ALGOD_CLIENT, ALGORAND_ASSETS, AXIOS_OPTIONS } from "./constants";
import { callable, Data, IRequestData } from "./interface";

import openFlashpayModal from "./ui";

export class FlashPay {
  private readonly axios: AxiosInstance;
  private readonly client: Algodv2;

  constructor(public readonly network: string) {
    this.axios = axios.create(AXIOS_OPTIONS);
    this.client = ALGOD_CLIENT[network];
  }

  private createTransaction = async (data: Data) => {
    const enc = new TextEncoder();
    const suggestedParams = await this.client.getTransactionParams().do();
    if (data.asset.asa_id == 0 || 1) {
      return algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: data.sender,
        to: data.recipient,
        amount: parseFloat(data.amount) * 10 ** parseFloat(data.asset.decimals),
        note: enc.encode(data.txn_reference),
        suggestedParams
      });
    } else {
      return algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: data.sender,
        to: data.recipient,
        assetIndex: parseInt(data.asset.asa_id),
        amount: parseInt(data.amount) * parseInt(data.asset.decimal),
        note: enc.encode(data.txn_reference),
        suggestedParams
      });
    }
  };

  public async setup(payload: IRequestData, key: string, callback: callable) {
    const networkFromAPIKey = key.startsWith("pk_test") ? "testnet" : "mainnet";
    const isSupportedAsset = ALGORAND_ASSETS[this.network].hasOwnProperty(
      payload.asset
    );
    if (networkFromAPIKey === this.network && isSupportedAsset) {
      openFlashpayModal(
        payload,
        key,
        this.network,
        callback,
        this.createTransaction,
        this.axios
      );
    } else {
      callback(
        "",
        new Error(
          "API Key doesn't match specified network / Invalid asset provided"
        )
      );
    }
  }
}
