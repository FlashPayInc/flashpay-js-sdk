<div>
 <img width="400" valign="top" src="https://flashpay.finance/img/svg/logo.svg" alt="FlashPay logo">
</div>

## Get Started

FlashPay Javascript SDK provides a simple and convenient payment flow for web applications to receive payments in USDC, ALGO, USDT, etc. on Algorand blockchain.

## Install

```bash
npm install @flashpay-inc/sdk
```

## SDK Parameters
The SDK accepts the following parameters:

| Param      | Required           | Description                                                                                       |
|:-----------|:-------------------|:--------------------------------------------------------------------------------------------------|
| payload    | :white_check_mark: | An object containing `asset`, `recipient`, and `amount`.                                          |
| public_key | :white_check_mark: | User's public key which can be gotten from the Flashpay dashboard.                                |
| callback   | :white_check_mark: | A function with signature (response, error) that gets called on successful or failed transaction. |

**NOTE**: To get the list of supported assets, make a `GET` request to `https://api.flashpay.finance/api/core/assets`

## Example Applications

- [Using ReactJS](https://codesandbox.io/s/flashpay-sdk-react-example-61rtmj)
- [Using Vanilla JS](https://codesandbox.io/s/flashpay-sdk-vanilla-js-example-epjpzi)

## License

MIT © [Flashpay](https://github.com/FlashPayInc)