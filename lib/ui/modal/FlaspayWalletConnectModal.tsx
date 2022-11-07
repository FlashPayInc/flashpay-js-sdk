import Icons from "./components/Icons";
import React, { useState } from "react";
import PlatformIcons from "./components/PlatformIcons";
import { callable, IRequestData } from "../../interface";
import { removeModalWrapperFromDOM } from "../utils/FlashpayModalsUtils";
import {
  ALGORAND_ASSETS,
  FLASHPAY_CONNECT_MODAL_ID,
  WALLET_PROVIDERS
} from "../../constants";

interface ConnectWalletModalProps {
  data: IRequestData;
  connectWallet: callable;
  network: string;
}

const closeModal = () => {
  removeModalWrapperFromDOM(FLASHPAY_CONNECT_MODAL_ID);
};

const FlashpayWalletConnectModal = ({
  data,
  connectWallet,
  network
}: ConnectWalletModalProps) => {
  const [option, setOption] = useState("");

  const getAssetShortName = (asset_id: number) => {
    const assetsForNetwork = ALGORAND_ASSETS[network];
    if (assetsForNetwork.hasOwnProperty(asset_id)) {
      return assetsForNetwork[asset_id].shortName;
    } else {
      return "**UNSUPPORTED ASSET**";
    }
  };

  return (
    <>
      <div className="flashpay-modal">
        <div className="flashpay-modal__header">
          <div className="main">
            <Icons.Logo />
            <button className="closemodal-x" onClick={closeModal}>
              <Icons.Close />
            </button>
          </div>
          <div className="main">
            <p>
              {`You're about to pay ${data?.amount} ${getAssetShortName(
                data.asset
              )}`}
            </p>
          </div>
          <div className="sub">Select an option to continue</div>
        </div>

        <div className="modal_content">
          {WALLET_PROVIDERS.map((opt, index) => {
            return (
              <div
                key={index}
                className="connect_option"
                onClick={() => setOption(opt?.type)}
              >
                <div className="option_info">
                  <PlatformIcons icon={opt.type} />
                  <p>{opt.name}</p>
                </div>
                <div className="option_ticked">
                  {opt.type === option ? (
                    <PlatformIcons icon="tickcircle" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <div className="modal-btns wallet-connect">
          <button
            className="continue_button"
            onClick={() => {
              if (!!option) {
                connectWallet(option);
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default FlashpayWalletConnectModal;
