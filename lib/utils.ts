import { PeraWalletConnect } from "@perawallet/connect";
import { IWallet } from "./interface";
import MyAlgoWallet from "@randlabs/myalgo-connect";
import { Algodv2 } from "algosdk";
import { ALGOD_CLIENT } from "./constants";
import { toggleModalVisibility } from "./ui/utils/FlashpayModalsUtils";

export class Pera implements IWallet {
  public readonly wallet = new PeraWalletConnect();
  private readonly client: Algodv2;

  constructor(network: string) {
    this.client = ALGOD_CLIENT[network];
  }

  async connect(setModalType: any): Promise<string> {
    // hide the modal from the dom, so only the pera wallet dialog is seen
    toggleModalVisibility();

    try {
      let addresses;
      // try connecting
      try {
        addresses = await this.wallet.connect();
      } catch (error) {
        // try reconnecting
        addresses = await this.wallet.reconnectSession();
      }

      if (addresses == undefined)
        throw new Error("Error connecting to Pera Wallet");

      this.wallet.connector?.on("disconnect", this.disconnect);

      // display the modal after pera wallet popup is removed.
      toggleModalVisibility();
      setModalType("processing");

      return addresses[0];
    } catch (err: any) {
      if (err?.data?.type !== "CONNECT_MODAL_CLOSED") {
        throw new Error("Error encountered");
      } else {
        throw new Error(err.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.wallet.disconnect();
  }

  async signTransaction(txn: any): Promise<string> {
    const singleTxnGroups = [{ txn: txn }];
    try {
      const signedTxn = await this.wallet.signTransaction([singleTxnGroups]);
      return await this.client.sendRawTransaction(signedTxn).do();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export class MyAlgo implements IWallet {
  public readonly wallet = new MyAlgoWallet();
  private readonly client: Algodv2;

  constructor(network: string) {
    this.client = ALGOD_CLIENT[network];
  }

  async connect(setModalType: any): Promise<string> {
    // show the processing modal immediately as myalgo wallet
    // redirects to a different tab
    setModalType("processing");

    try {
      const accounts = await this.wallet.connect({
        shouldSelectOneAccount: true
      });
      return accounts[0].address;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async signTransaction(txn: any): Promise<string> {
    try {
      const signedTxn = await this.wallet.signTransaction(txn.toByte());
      return await this.client.sendRawTransaction(signedTxn.blob).do();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }
}
