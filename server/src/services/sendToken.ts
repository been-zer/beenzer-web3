// sendToken.ts
import {
  Connection,
  Transaction,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount } from './getOrCreateAssociatedTokenAccount'
import { createTransferInstruction } from './createTransferInstructions'
import { sleep } from "../utils";
import payer_secret from "../../keys/payer.json";
import secret from "../../keys/mint.json";
import dotenv from "dotenv";
dotenv.config();

type OnSendTransaction = { _pubkey: string, _amount: number };

export const sendToken = async (params: OnSendTransaction) => {
  const PAYER = Keypair.fromSecretKey(new Uint8Array(payer_secret));
  const MINT = Keypair.fromSecretKey(new Uint8Array(secret));

  const SOLANA_RPC_URL: string = process.env.SOLANA_RPC_URL as string;
  const SOLANA_CONNECTION: Connection = new Connection(
    SOLANA_RPC_URL as string
  );
  const TOKEN: PublicKey = new PublicKey(process.env.TOKEN as string);
  const TOKEN_ACCOUNT: PublicKey = new PublicKey(
    process.env.TOKEN_ACCOUNT as string
  );
  const TOKEN_OWNER: PublicKey = new PublicKey(
    process.env.TOKEN_OWNER as string
  );
  const __secret__ = String(process.env.TOKEN_AUTHORITY).split(",") as [];
  const TOKEN_AUTHORITY = Keypair.fromSecretKey(new Uint8Array(__secret__));
  const DESTINATION_ACCOUNT = new PublicKey(params._pubkey);

  const signTransaction = 'processed';

  try {
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      SOLANA_CONNECTION,
      PAYER,
      TOKEN,
      new PublicKey('C883VsqqQoj39QpUzd54ncJes2Q8SubD24WWuDmsVa3n'),
      true,
      signTransaction
    );

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      SOLANA_CONNECTION,
      PAYER,
      TOKEN,
      DESTINATION_ACCOUNT,
      true,
      signTransaction
    );

    const tx = new Transaction().add(
      createTransferInstruction(
        fromTokenAccount.address, // source
        toTokenAccount.address, // dest
        TOKEN,
        params._amount * 100,
        [PAYER],
        TOKEN_PROGRAM_ID
      )
    );

    const blockHash = await SOLANA_CONNECTION.getLatestBlockhash();
    tx.feePayer = PAYER.publicKey;
    tx.recentBlockhash = blockHash.blockhash;
    const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [PAYER]);
    console.log(
      '\x1b[32m', // Green Text
      `   Transaction Success! 🎉`,
      `\n    https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta`
    );

    // await SOLANA_CONNECTION.sendRawTransaction(signed.serialize());

  } catch (err) {
    console.log(err)
  }
};

sendToken({_pubkey: 'EBNtV9qAddZ3AP5xJMVKcZkcyDeSLmc78Yity3gSVZ5M', _amount: 1 })
