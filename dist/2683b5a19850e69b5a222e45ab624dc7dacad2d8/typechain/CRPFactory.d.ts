/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface CRPFactoryInterface extends ethers.utils.Interface {
  functions: {
    "isCrp(address)": FunctionFragment;
    "newCrp(address,tuple,tuple)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "isCrp", values: [string]): string;
  encodeFunctionData(
    functionFragment: "newCrp",
    values: [
      string,
      {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      }
    ]
  ): string;

  decodeFunctionResult(functionFragment: "isCrp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "newCrp", data: BytesLike): Result;

  events: {
    "LogNewCrp(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogNewCrp"): EventFragment;
}

export class CRPFactory extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: CRPFactoryInterface;

  functions: {
    isCrp(addr: string, overrides?: CallOverrides): Promise<[boolean]>;

    "isCrp(address)"(
      addr: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    newCrp(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "newCrp(address,tuple,tuple)"(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  isCrp(addr: string, overrides?: CallOverrides): Promise<boolean>;

  "isCrp(address)"(addr: string, overrides?: CallOverrides): Promise<boolean>;

  newCrp(
    factoryAddress: string,
    poolParams: {
      poolTokenSymbol: string;
      poolTokenName: string;
      constituentTokens: string[];
      tokenBalances: BigNumberish[];
      tokenWeights: BigNumberish[];
      swapFee: BigNumberish;
    },
    rights: {
      canPauseSwapping: boolean;
      canChangeSwapFee: boolean;
      canChangeWeights: boolean;
      canAddRemoveTokens: boolean;
      canWhitelistLPs: boolean;
      canChangeCap: boolean;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "newCrp(address,tuple,tuple)"(
    factoryAddress: string,
    poolParams: {
      poolTokenSymbol: string;
      poolTokenName: string;
      constituentTokens: string[];
      tokenBalances: BigNumberish[];
      tokenWeights: BigNumberish[];
      swapFee: BigNumberish;
    },
    rights: {
      canPauseSwapping: boolean;
      canChangeSwapFee: boolean;
      canChangeWeights: boolean;
      canAddRemoveTokens: boolean;
      canWhitelistLPs: boolean;
      canChangeCap: boolean;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    isCrp(addr: string, overrides?: CallOverrides): Promise<boolean>;

    "isCrp(address)"(addr: string, overrides?: CallOverrides): Promise<boolean>;

    newCrp(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: CallOverrides
    ): Promise<string>;

    "newCrp(address,tuple,tuple)"(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    LogNewCrp(caller: string | null, pool: string | null): EventFilter;
  };

  estimateGas: {
    isCrp(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    "isCrp(address)"(
      addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    newCrp(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "newCrp(address,tuple,tuple)"(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    isCrp(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isCrp(address)"(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    newCrp(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "newCrp(address,tuple,tuple)"(
      factoryAddress: string,
      poolParams: {
        poolTokenSymbol: string;
        poolTokenName: string;
        constituentTokens: string[];
        tokenBalances: BigNumberish[];
        tokenWeights: BigNumberish[];
        swapFee: BigNumberish;
      },
      rights: {
        canPauseSwapping: boolean;
        canChangeSwapFee: boolean;
        canChangeWeights: boolean;
        canAddRemoveTokens: boolean;
        canWhitelistLPs: boolean;
        canChangeCap: boolean;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
