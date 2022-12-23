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
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import payer_secret from "../../keys/payer.json";
import dotenv from "dotenv";
dotenv.config();

export const sendToken = async (_pubkey: string, _amount: number = 1) => {

  const signTransaction = 'processed';
  const decimals = 2;
  const PAYER = Keypair.fromSecretKey(new Uint8Array(payer_secret));
  const SOLANA_RPC_URL: string = process.env.SOLANA_RPC_URL as string;
  const SOLANA_CONNECTION: Connection = new Connection(
    SOLANA_RPC_URL as string
  );
  const TOKEN: PublicKey = new PublicKey(process.env.TOKEN as string);
  const DESTINATION_ACCOUNT = new PublicKey(_pubkey);

  try {
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      SOLANA_CONNECTION,
      PAYER,
      TOKEN,
      TOKEN,
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
        new PublicKey('C883VsqqQoj39QpUzd54ncJes2Q8SubD24WWuDmsVa3n'), // source
        toTokenAccount.address, // dest
        new PublicKey('BctLWb6Q9viYjeJ2gNCr4xkRHc91NyikRR1TWn1qGGYr'),
        _amount * Math.pow(10, decimals),
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

  } catch (err) {
    console.log(err)
  }
};

sendToken('EBNtV9qAddZ3AP5xJMVKcZkcyDeSLmc78Yity3gSVZ5M', 5 );
