import { 
	Connection, 
	PublicKey, 
	Keypair,
	Transaction,
	sendAndConfirmTransaction
} from '@solana/web3.js';
import { 
	mintTo,
	getOrCreateAssociatedTokenAccount,
	createTransferInstruction
} from '@solana/spl-token';
import payer_secret from '../keys/payer.json'
import secret from '../keys/mint.json';
import dotenv from 'dotenv';
dotenv.config();

export async function mintToken(_pubkey: string, _amount: number = 100) {

	const PAYER = Keypair.fromSecretKey(new Uint8Array(payer_secret));
	const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));

	const SOLANA_RPC_URL: string = process.env.SOLANA_RPC_URL as string;
	const SOLANA_CONNECTION: Connection = new Connection(SOLANA_RPC_URL as string);
	const TOKEN: PublicKey = new PublicKey(process.env.TOKEN as string);
	const TOKEN_ACCOUNT: PublicKey = new PublicKey(process.env.TOKEN_ACCOUNT as string);
	const TOKEN_OWNER: PublicKey = new PublicKey(process.env.TOKEN_OWNER as string);
	const __secret__ = String(process.env.TOKEN_AUTHORITY).split(',') as [];
	const TOKEN_AUTHORITY = Keypair.fromSecretKey(new Uint8Array(__secret__));
	const DESTINATION_ACCOUNT = new PublicKey(_pubkey);

	// Mint token
	const signature = await mintTo(
		SOLANA_CONNECTION,
		PAYER,
		TOKEN,
		TOKEN_ACCOUNT,
		WALLET,
		_amount
		// [PAYER, WALLET],
	);

	console.log(`Mint signature: ${signature}`);

	// Send token/s
	const destinationAccount = await getOrCreateAssociatedTokenAccount(
		SOLANA_CONNECTION, 
		WALLET,
		TOKEN,
		DESTINATION_ACCOUNT
	);
	const tx = new Transaction();
	tx.add(createTransferInstruction(
		TOKEN_ACCOUNT,
		destinationAccount.address,
		TOKEN_OWNER,
		_amount
	))
	// const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
	// tx.recentBlockhash = latestBlockHash.blockhash;
	let i = 0;
	const tries = 10;
	while (i < tries) {
		try {
			const signature2 = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [PAYER]);
			console.log(
				'\x1b[32m', // Green Text
				`   Transaction Success! 🎉`,
				`\n    https://explorer.solana.com/tx/${signature2}?cluster=mainnet-beta`
			);
			i = tries;
			break;
		} catch (err) {
			console.log(i, err);
			i++;
		}
	}
}

mintToken('3o7UynEE8fwboPydXEvU2xTuB1n9xXLgcCMw3FuzrH7A');

// v 1.0