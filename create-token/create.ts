import { 
  Transaction, 
  SystemProgram, 
  Keypair, 
  Connection, 
  PublicKey 
} from "@solana/web3.js";
import { 
  MINT_SIZE, 
  TOKEN_PROGRAM_ID, 
  createInitializeMintInstruction, 
  getMinimumBalanceForRentExemptMint, 
  getAssociatedTokenAddress, 
  createAssociatedTokenAccountInstruction, 
  createMintToInstruction 
} from '@solana/spl-token';
import { 
  Metaplex,
  toMetaplexFile, 
  UploadMetadataInput,
  bundlrStorage, 
  findMetadataPda, 
  keypairIdentity
} from '@metaplex-foundation/js';
import { 
  DataV2, 
  createCreateMetadataAccountV2Instruction 
} from '@metaplex-foundation/mpl-token-metadata';
import payer_secret from './keys/payer.json';
import secret from './keys/mint.json';
import dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const IMG_URI = 'https://arweave.net/IttS7dcmeUVsTeAvJgn5nLoK4yvYR_SadGoVK8oo_F4';
const META_URI = 'https://arweave.net/EU_2usHag2T5fxY3eb_7TqfHs2Vk7Xd5JxB5DeRMB04';

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL as string;
const SOLANA_CONNECTION = new Connection(SOLANA_RPC_URL as string);
const PAYER = Keypair.fromSecretKey(new Uint8Array(payer_secret));
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
const IMAGE_PATH = process.env.IMAGE_PATH as string;
const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(WALLET))
  .use(bundlrStorage({
    address: `https://node1.bundlr.network`,
    providerUrl: SOLANA_RPC_URL,
    timeout: 360000,
  }));

const MINT_CONFIG = {
  numDecimals: 2,
  numberTokens: 100
}

const TOKEN_METADATA: UploadMetadataInput = {
  name: "BEENZER",
  symbol: "BEEN",
  description: "The official token for using it in Beenzer App! 💚",
  image: IMG_URI
}

const ON_CHAIN_METADATA = {
  name: TOKEN_METADATA.name, 
  symbol: TOKEN_METADATA.symbol,
  uri: META_URI,
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null
} as DataV2;

const uploadImage = async (imgPath: string):Promise<string> => {
  console.log(`Uploading token image to Arweave...`);
  try {
    const imgBuffer = fs.readFileSync(imgPath);
    const imgMetaplexFile = toMetaplexFile(imgBuffer, TOKEN_METADATA.symbol as string);
    const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
    console.log(`Arweave IMG uri: `, imgUri);
    return imgUri;
  } catch (err) {
    if ( String(err).includes('funds') ) {
      console.log('Not enough funds in the master wallet!!!')
    }
    console.log(err)
    return 'ERROR';
  }
}

const uploadMetadata = async (tokenMetadata: UploadMetadataInput):Promise<string> => {
  //Upload json to Arweave
  console.log(`Uploading token metadata to Arweave...`);
  try {
    const { uri } = await METAPLEX.nfts().uploadMetadata(tokenMetadata);
    console.log(`Arweave JSON uri: `, uri);
    return uri;
  } catch (err) {
    if ( String(err).includes('funds') ) {
      console.log('Not enough funds in the master wallet!!!')
    }
    console.log(err)
    return 'ERROR';
  }
}

const createNewMintTransaction = async (connection:Connection, payer:Keypair, mintKeypair: Keypair, destinationWallet: PublicKey, mintAuthority: PublicKey, freezeAuthority: PublicKey)=>{
  //Get the minimum lamport balance to create a new account and avoid rent payments
  const requiredBalance = await getMinimumBalanceForRentExemptMint(connection);
  //metadata account associated with mint
  const metadataPDA = findMetadataPda(mintKeypair.publicKey);
  //get associated token account of your wallet
  const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, destinationWallet);   
  
  const createNewTokenTransaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports: requiredBalance,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mintKeypair.publicKey, // Mint Address
      MINT_CONFIG.numDecimals, // Number of Decimals of New mint
      mintAuthority, // Mint Authority
      freezeAuthority, // Freeze Authority
      TOKEN_PROGRAM_ID),
    createAssociatedTokenAccountInstruction(
      payer.publicKey, // Payer 
      tokenATA, // Associated token account 
      payer.publicKey, // Token owner
      mintKeypair.publicKey, // Mint
    ),
    createMintToInstruction(
      mintKeypair.publicKey, // Mint
      tokenATA, // Destination Token Account
      mintAuthority, // Authority
      MINT_CONFIG.numberTokens * Math.pow(10, MINT_CONFIG.numDecimals), // number of tokens
    ),
    createCreateMetadataAccountV2Instruction({
      metadata: metadataPDA, 
      mint: mintKeypair.publicKey, 
      mintAuthority: mintAuthority,
      payer: payer.publicKey,
      updateAuthority: mintAuthority,
    },
    { createMetadataAccountArgsV2: 
      { 
        data: ON_CHAIN_METADATA, 
        isMutable: true 
      } 
    })
  );

  return createNewTokenTransaction;
}

const main = async ( destinationWallet: PublicKey ) => {
  
  console.log(`---STEP 1: Uploading Image & Metadata---`);
  if ( !IMG_URI ) TOKEN_METADATA.image = await uploadImage(IMAGE_PATH);
  if ( !META_URI ) ON_CHAIN_METADATA.uri = await uploadMetadata(TOKEN_METADATA);

  console.log(`---STEP 2: Creating Mint Transaction---`);
  const newMintTransaction: Transaction = await createNewMintTransaction(
    SOLANA_CONNECTION,
    PAYER,
    WALLET,
    destinationWallet,
    WALLET.publicKey,
    WALLET.publicKey
  );

  console.log(`---STEP 3: Executing Mint Transaction---`);
  const transactionId =  await SOLANA_CONNECTION.sendTransaction(newMintTransaction, [PAYER, WALLET]);
  console.log(`Transaction ID: `, transactionId);
  console.log(`Succesfully minted ${MINT_CONFIG.numberTokens} ${ON_CHAIN_METADATA.symbol} to ${WALLET.publicKey.toString()}.`);
  console.log(`View Transaction: https://explorer.solana.com/tx/${transactionId}?cluster=mainnet`);
  console.log(`View Token Mint: https://explorer.solana.com/address/${WALLET.publicKey.toString()}?cluster=mainnet`)
}

main(new PublicKey('BctLWb6Q9viYjeJ2gNCr4xkRHc91NyikRR1TWn1qGGYr'));
