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
import dotenv from 'dotenv';
dotenv.config();

export async function mintToken(_pubkey: string, _amount: number = 1) {

	const SOLANA_RPC_URL: string = process.env.SOLANA_RPC_URL as string;
	const SOLANA_CONNECTION: Connection = new Connection(SOLANA_RPC_URL as string);
	const TOKEN: PublicKey = new PublicKey(process.env.TOKEN as string);
	const TOKEN_ACCOUNT: PublicKey = new PublicKey(process.env.TOKEN_ACCOUNT as string);
	const TOKEN_OWNER: PublicKey = new PublicKey(process.env.TOKEN_OWNER as string);
	const __secret__ = String(process.env.TOKEN_AUTHORITY).split(',') as [];
	const TOKEN_AUTHORITY = Keypair.fromSecretKey(new Uint8Array(__secret__));
	const DESTINATION_ACCOUNT = new PublicKey(_pubkey);
	console.log('eooo', TOKEN_AUTHORITY.publicKey.toBase58())

	// Mint token
	const signature = await mintTo(
		SOLANA_CONNECTION,
		TOKEN_AUTHORITY,
		TOKEN,
		DESTINATION_ACCOUNT,
		TOKEN_OWNER,
		_amount
	);

	console.log(`Mint signature: ${signature}`);

	// // Send token/s
	// const destinationAccount = await getOrCreateAssociatedTokenAccount(
	// 	SOLANA_CONNECTION, 
	// 	TOKEN_AUTHORITY,
	// 	TOKEN,
	// 	DESTINATION_ACCOUNT
	// );
	// const tx = new Transaction();
	// tx.add(createTransferInstruction(
	// 	TOKEN_ACCOUNT,
	// 	destinationAccount.address,
	// 	TOKEN_OWNER,
	// 	_amount
	// ))
	// const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
	// tx.recentBlockhash = latestBlockHash.blockhash;    
	// const signature2 = await sendAndConfirmTransaction(SOLANA_CONNECTION,tx,[TOKEN_AUTHORITY]);
	// console.log(
	// 	'\x1b[32m', // Green Text
	// 	`   Transaction Success! 🎉`,
	// 	`\n    https://explorer.solana.com/tx/${signature2}?cluster=mainnet-beta`
	// );
	
}

mintToken('2TyAp92s7TEksnycmYY2Fk5i1j5anwFTqECyuFMVhomP');

