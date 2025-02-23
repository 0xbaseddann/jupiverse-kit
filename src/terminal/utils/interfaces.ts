import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  DefaultExplorer,
  QuoteResponse,
  WidgetPosition,
  WidgetSize,
} from "./types";
import { Connection, TransactionError } from "@solana/web3.js";
import { SwapResult } from "@jup-ag/react-hook";

export interface IntegratedTerminalProps {
  formProps?: FormProps;
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
  endpoint?: string;
  onSuccess?: (params: { txid: string; swapResult: any }) => void;
  onSwapError?: (params: { error: Error }) => void;
  strictTokenList?: boolean;
  platformFeeAndAccounts?: any;
}

export interface WidgetTerminalProps {
  // form configuration
  formProps?: {
    fixedInputMint?: boolean;
    fixedOutputMint?: boolean;
    swapMode?: "ExactIn" | "ExactOut";
    fixedAmount?: boolean;
    initialAmount?: string;
    initialSlippageBps?: number;
  };

  // styling
  containerClassName?: string;
  containerStyles?: React.CSSProperties;

  // endpoint config
  endpoint?: string;

  // callbacks
  onSuccess?: (params: { txid: string; swapResult: any }) => void;
  onSwapError?: (params: { error: Error }) => void;

  // additional params
  strictTokenList?: boolean;
  platformFeeAndAccounts?: any;
}

export interface TerminalProps {
  ///////////////
  /** Settings */
  ///////////////
  /** Reset your user's local storage by changing this value */
  localStoragePrefix?: string;

  /////////////////
  /** Connection */
  /////////////////
  /** RPC endpoint for Terminal */
  endpoint?: string;
  /** Connection Object for RPC Connection */
  connectionObj?: Connection;

  ///////////////////////
  /** Terminal Configs */
  ///////////////////////
  /** Form Configurations for Terminl Behaviour */
  formProps?: FormProps;
  /** Only allow strict tokens */
  strictTokenList?: boolean;
  /** Set blockchain explorer */
  defaultExplorer?: DefaultExplorer;
  /** Auto connect to wallet on subsequent visits */
  autoConnect?: boolean;
  /** RPC refetch interval for getTABO in milliseconds, defaults to 10000 */
  refetchIntervalForTokenAccounts?: number;

  //////////////
  /** Styling */
  //////////////
  /** Display mode */
  displayMode?: "modal" | "integrated" | "widget";
  /** When displayMode is 'integrated', this is the id of the element to render the integrated widget into */
  integratedTargetId?: string;
  /** When displayMode is 'widget', this is the behaviour and style of the widget */
  widgetStyle?: {
    position?: WidgetPosition;
    size?: WidgetSize;
  };
  /** In case additional styling is needed for Terminal container */
  containerStyles?: React.CSSProperties;
  /** In case additional styling is needed for Terminal container */
  containerClassName?: string;

  /////////////////////
  /** Wallet Configs */
  /////////////////////
  /** When true, wallet connection are handled by your dApp, and use `syncProps()` to synchronise wallet state with Terminal */
  enableWalletPassthrough?: boolean;
  /** Optional, if wallet state is ready, you can pass it in here, or just use `syncProps()` */
  passthroughWalletContextState?: WalletContextState;
  /** When enableWalletPassthrough is true, this allows Terminal to callback your dApp's wallet connection flow */
  onRequestConnectWallet?: () => void | Promise<void>;

  ////////////////
  /** Callbacks */
  ////////////////
  /** When an error has occured during swap */
  onSwapError?: ({
    error,
    quoteResponseMeta,
  }: {
    error?: TransactionError;
    quoteResponseMeta: QuoteResponse | null;
  }) => void;
  /** When a swap has been successful */
  onSuccess?: ({
    txid,
    swapResult,
    quoteResponseMeta,
  }: {
    txid: string;
    swapResult: SwapResult;
    quoteResponseMeta: QuoteResponse | null;
  }) => void;
  /** Callback when there's changes to the form */
  onFormUpdate?: (form: IForm) => void;
}

export interface FormProps {
  /** Initial amount to swap */
  initialAmount?: string;
  /** When true, user cannot change the amount (e.g. for Payments) */
  fixedAmount?: boolean;
  /** Initial input token to swap */
  initialInputMint?: string;
  /** When true, user cannot change the input token */
  fixedInputMint?: boolean;
  /** Initial output token to swap */
  initialOutputMint?: string;
  /** When true, user cannot change the output token (e.g. to buy your project's token) */
  fixedOutputMint?: boolean;
}

export interface IForm {
  fromMint: string;
  toMint: string;
  fromValue: string;
  toValue: string;
}
