import "./index.scss";
import React from "react";
import Lottie from "lottie-react";
import Icons from "./components/Icons";
import animationData from "./lotties/Error.json";
import { closeModal } from "../utils/FlashpayModalsUtils";

const FlashpayTxnFailedModal = ({ errorMsg = "" }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
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
        </div>

        <div className="modal_content">
          <div className="modal_illustration">
            <Lottie {...defaultOptions} />
          </div>
          <div className="modal_description">
            <p className="main">Transaction Failed</p>
            {errorMsg && <p className="sub">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashpayTxnFailedModal;
