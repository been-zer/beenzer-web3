import { 
	Connection, 
	PublicKey, 
	Keypair, 
} from '@solana/web3.js';
import { 
	mintTo
} from '@solana/spl-token';
import dotenv from 'dotenv';
dotenv.config();

export async function mintToken(_amount: number = 1) {

	const SOLANA_RPC_URL: string = process.env.SOLANA_RPC_URL as string;
	const SOLANA_CONNECTION: Connection = new Connection(SOLANA_RPC_URL as string);
	const TOKEN: PublicKey = new PublicKey(process.env.TOKEN as string);
	const TOKEN_ACCOUNT: PublicKey = new PublicKey(process.env.TOKEN_ACCOUNT as string);
	const TOKEN_OWNER: PublicKey = new PublicKey(process.env.TOKEN_OWNER as string);
	const __secret__ = String(process.env.TOKEN_AUTHORITY).split(',') as [];
	const TOKEN_AUTHORITY = Keypair.fromSecretKey(new Uint8Array(__secret__));

	const signature = await mintTo(
		SOLANA_CONNECTION,
		TOKEN_AUTHORITY,
		TOKEN,
		TOKEN_ACCOUNT,
		TOKEN_OWNER,
		_amount
	);

	console.log(`Mint signature: ${signature}`);
}

mintToken();
