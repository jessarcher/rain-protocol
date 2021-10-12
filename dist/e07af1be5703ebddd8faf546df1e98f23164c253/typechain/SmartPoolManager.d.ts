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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface SmartPoolManagerInterface extends ethers.utils.Interface {
  functions: {
    "exitPool(IConfigurableRightsPool,IBPool,uint256,uint256[])": FunctionFragment;
    "exitswapExternAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)": FunctionFragment;
    "exitswapPoolAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)": FunctionFragment;
    "joinPool(IConfigurableRightsPool,IBPool,uint256,uint256[])": FunctionFragment;
    "joinswapExternAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)": FunctionFragment;
    "joinswapPoolAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "exitPool",
    values: [string, string, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "exitswapExternAmountOut",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exitswapPoolAmountIn",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "joinPool",
    values: [string, string, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "joinswapExternAmountIn",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "joinswapPoolAmountOut",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "exitPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "exitswapExternAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exitswapPoolAmountIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "joinPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "joinswapExternAmountIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "joinswapPoolAmountOut",
    data: BytesLike
  ): Result;

  events: {};
}

export class SmartPoolManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: SmartPoolManagerInterface;

  functions: {
    exitPool(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber[]] & {
        exitFee: BigNumber;
        pAiAfterExitFee: BigNumber;
        actualAmountsOut: BigNumber[];
      }
    >;

    "exitPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber[]] & {
        exitFee: BigNumber;
        pAiAfterExitFee: BigNumber;
        actualAmountsOut: BigNumber[];
      }
    >;

    exitswapExternAmountOut(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; poolAmountIn: BigNumber }
    >;

    "exitswapExternAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; poolAmountIn: BigNumber }
    >;

    exitswapPoolAmountIn(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; tokenAmountOut: BigNumber }
    >;

    "exitswapPoolAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; tokenAmountOut: BigNumber }
    >;

    joinPool(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { actualAmountsIn: BigNumber[] }>;

    "joinPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { actualAmountsIn: BigNumber[] }>;

    joinswapExternAmountIn(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { poolAmountOut: BigNumber }>;

    "joinswapExternAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { poolAmountOut: BigNumber }>;

    joinswapPoolAmountOut(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { tokenAmountIn: BigNumber }>;

    "joinswapPoolAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { tokenAmountIn: BigNumber }>;
  };

  exitPool(
    self: string,
    bPool: string,
    poolAmountIn: BigNumberish,
    minAmountsOut: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber[]] & {
      exitFee: BigNumber;
      pAiAfterExitFee: BigNumber;
      actualAmountsOut: BigNumber[];
    }
  >;

  "exitPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
    self: string,
    bPool: string,
    poolAmountIn: BigNumberish,
    minAmountsOut: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber[]] & {
      exitFee: BigNumber;
      pAiAfterExitFee: BigNumber;
      actualAmountsOut: BigNumber[];
    }
  >;

  exitswapExternAmountOut(
    self: string,
    bPool: string,
    tokenOut: string,
    tokenAmountOut: BigNumberish,
    maxPoolAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { exitFee: BigNumber; poolAmountIn: BigNumber }
  >;

  "exitswapExternAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
    self: string,
    bPool: string,
    tokenOut: string,
    tokenAmountOut: BigNumberish,
    maxPoolAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { exitFee: BigNumber; poolAmountIn: BigNumber }
  >;

  exitswapPoolAmountIn(
    self: string,
    bPool: string,
    tokenOut: string,
    poolAmountIn: BigNumberish,
    minAmountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { exitFee: BigNumber; tokenAmountOut: BigNumber }
  >;

  "exitswapPoolAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
    self: string,
    bPool: string,
    tokenOut: string,
    poolAmountIn: BigNumberish,
    minAmountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { exitFee: BigNumber; tokenAmountOut: BigNumber }
  >;

  joinPool(
    self: string,
    bPool: string,
    poolAmountOut: BigNumberish,
    maxAmountsIn: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "joinPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
    self: string,
    bPool: string,
    poolAmountOut: BigNumberish,
    maxAmountsIn: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  joinswapExternAmountIn(
    self: string,
    bPool: string,
    tokenIn: string,
    tokenAmountIn: BigNumberish,
    minPoolAmountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "joinswapExternAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
    self: string,
    bPool: string,
    tokenIn: string,
    tokenAmountIn: BigNumberish,
    minPoolAmountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  joinswapPoolAmountOut(
    self: string,
    bPool: string,
    tokenIn: string,
    poolAmountOut: BigNumberish,
    maxAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "joinswapPoolAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
    self: string,
    bPool: string,
    tokenIn: string,
    poolAmountOut: BigNumberish,
    maxAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    exitPool(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber[]] & {
        exitFee: BigNumber;
        pAiAfterExitFee: BigNumber;
        actualAmountsOut: BigNumber[];
      }
    >;

    "exitPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber[]] & {
        exitFee: BigNumber;
        pAiAfterExitFee: BigNumber;
        actualAmountsOut: BigNumber[];
      }
    >;

    exitswapExternAmountOut(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; poolAmountIn: BigNumber }
    >;

    "exitswapExternAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; poolAmountIn: BigNumber }
    >;

    exitswapPoolAmountIn(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; tokenAmountOut: BigNumber }
    >;

    "exitswapPoolAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { exitFee: BigNumber; tokenAmountOut: BigNumber }
    >;

    joinPool(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "joinPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    joinswapExternAmountIn(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "joinswapExternAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    joinswapPoolAmountOut(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "joinswapPoolAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    exitPool(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "exitPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exitswapExternAmountOut(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "exitswapExternAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exitswapPoolAmountIn(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "exitswapPoolAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    joinPool(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "joinPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    joinswapExternAmountIn(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "joinswapExternAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    joinswapPoolAmountOut(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "joinswapPoolAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    exitPool(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "exitPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountIn: BigNumberish,
      minAmountsOut: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exitswapExternAmountOut(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "exitswapExternAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      tokenAmountOut: BigNumberish,
      maxPoolAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exitswapPoolAmountIn(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "exitswapPoolAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenOut: string,
      poolAmountIn: BigNumberish,
      minAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    joinPool(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "joinPool(IConfigurableRightsPool,IBPool,uint256,uint256[])"(
      self: string,
      bPool: string,
      poolAmountOut: BigNumberish,
      maxAmountsIn: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    joinswapExternAmountIn(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "joinswapExternAmountIn(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      tokenAmountIn: BigNumberish,
      minPoolAmountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    joinswapPoolAmountOut(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "joinswapPoolAmountOut(IConfigurableRightsPool,IBPool,address,uint256,uint256)"(
      self: string,
      bPool: string,
      tokenIn: string,
      poolAmountOut: BigNumberish,
      maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}