import { 
	Connection, 
	PublicKey, 
	Keypair
} from '@solana/web3.js';
import { 
	mintTo,
} from '@solana/spl-token';
import payer_secret from '../../keys/payer.json'
import secret from '../../keys/mint.json';
import dotenv from 'dotenv';
dotenv.config();

export async function mintToken(_amount: number = 100) {

	const PAYER = Keypair.fromSecretKey(new Uint8Array(payer_secret));
	const MINT = Keypair.fromSecretKey(new Uint8Array(secret));

	const SOLANA_RPC_URL: string = process.env.SOLANA_RPC_URL as string;
	const SOLANA_CONNECTION: Connection = new Connection(SOLANA_RPC_URL as string);
	const TOKEN: PublicKey = new PublicKey(process.env.TOKEN as string);
	const TOKEN_ACCOUNT: PublicKey = new PublicKey(process.env.TOKEN_ACCOUNT as string);

	// Mint token
	const signature = await mintTo(
		SOLANA_CONNECTION,
		PAYER,
		TOKEN,
		TOKEN_ACCOUNT,
		MINT,
		_amount
	);

	console.log(`Mint signature: ${signature}`);
}

mintToken();

// v 1.0