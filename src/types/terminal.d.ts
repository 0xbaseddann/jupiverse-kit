import { CSSProperties } from 'react';
import { Connection, TransactionError } from '@solana/web3.js';
import { SwapResult } from '@jup-ag/react-hook';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { QuoteResponse } from '../terminal/utils/types';

export type WidgetPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type WidgetSize = 'sm' | 'default';
export type DEFAULT_EXPLORER = 'Solana Explorer' | 'Solscan' | 'Solana Beach' | 'SolanaFM';

export interface FormProps {
  initialAmount?: string;
  fixedAmount?: boolean;
  initialInputMint?: string;
  fixedInputMint?: boolean;
  initialOutputMint?: string;
  fixedOutputMint?: boolean;
}

export interface IForm {
  fromMint: string;
  toMint: string;
  fromValue: string;
  toValue: string;
}

export interface IInit {
  localStoragePrefix?: string;
  endpoint?: string;
  connectionObj?: Connection;
  formProps?: FormProps;
  strictTokenList?: boolean;
  defaultExplorer?: DEFAULT_EXPLORER;
  autoConnect?: boolean;
  refetchIntervalForTokenAccounts?: number;
  displayMode?: 'modal' | 'integrated' | 'widget';
  integratedTargetId?: string;
  widgetStyle?: {
    position?: WidgetPosition;
    size?: WidgetSize;
  };
  containerStyles?: CSSProperties;
  containerClassName?: string;
  enableWalletPassthrough?: boolean;
  passthroughWalletContextState?: WalletContextState;
  onRequestConnectWallet?: () => void | Promise<void>;
  onSwapError?: ({
    error,
    quoteResponseMeta,
  }: {
    error?: TransactionError;
    quoteResponseMeta: QuoteResponse | null;
  }) => void;
  onSuccess?: ({
    txid,
    swapResult,
    quoteResponseMeta,
  }: {
    txid: string;
    swapResult: SwapResult;
    quoteResponseMeta: QuoteResponse | null;
  }) => void;
  onFormUpdate?: (form: IForm) => void;
}

export interface JupiterTerminal {
  init: (props: IInit) => void;
  resume: () => void;
  close: () => void;
}

declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}

export {};
