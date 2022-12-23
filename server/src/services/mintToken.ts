import { 
	Connection, 
	PublicKey, 
	Keypair,
	Transaction,
	sendAndConfirmTransaction,
	Commitment
} from '@solana/web3.js';
import { 
	mintTo,
	getOrCreateAssociatedTokenAccount,
	createTransferInstruction
} from '@solana/spl-token';
import { sleep } from '../utils';
import payer_secret from '../../keys/payer.json'
import secret from '../../keys/mint.json';
import dotenv from 'dotenv';
dotenv.config();

export async function mintToken(_pubkey: string, _amount: number = 100) {

	const PAYER = Keypair.fromSecretKey(new Uint8Array(payer_secret));
	const MINT = Keypair.fromSecretKey(new Uint8Array(secret));

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
		MINT,
		_amount
		// [PAYER, WALLET],
	);

	console.log(`Mint signature: ${signature}`);

	// Send token/s
	// let i = 0;
	// const tries = 10;
	// while (i < tries) {
	// 	sleep(3000);
	// 	try {
	// 		const destinationAccount = await getOrCreateAssociatedTokenAccount(
	// 			SOLANA_CONNECTION, 
	// 			PAYER,
	// 			TOKEN,
	// 			DESTINATION_ACCOUNT,
	// 			true,
	// 			'confirmed',
	// 		);
	// 		console.log('eoo', destinationAccount.address)
	// 		const tx = new Transaction();
	// 		tx.add(createTransferInstruction(
	// 			TOKEN,
	// 			destinationAccount.address,
	// 			TOKEN_OWNER,
	// 			_amount,
	// 			[PAYER]
	// 		))
	// 		console.log('tx', tx)
	// 		const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
	// 		tx.recentBlockhash = latestBlockHash.blockhash;
	// 		const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [PAYER]);
	// 		console.log(
	// 			'\x1b[32m', // Green Text
	// 			`   Transaction Success! 🎉`,
	// 			`\n    https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta`
	// 		);
	// 		i = tries;
	// 		break;
	// 	} catch (err) {
	// 		console.log(i, err);
	// 		i++;
	// 	}
	// }
}

mintToken('EBNtV9qAddZ3AP5xJMVKcZkcyDeSLmc78Yity3gSVZ5M');

// v 1.0