import { Transaction, SystemProgram, Keypair, Connection, PublicKey } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createMintToInstruction } from '@solana/spl-token';
import { DataV2, createCreateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { bundlrStorage, findMetadataPda, keypairIdentity, Metaplex, toMetaplexFile, UploadMetadataInput } from '@metaplex-foundation/js';
import secret from './keys/beenzer-token-keypair.json';
import dotenv from 'dotenv';
dotenv.config();

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL as string;
const SOLANA_CONNECTION = new Connection(SOLANA_RPC_URL as string);
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));

const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(WALLET))
  .use(bundlrStorage({
    address: `https://node1.bundlr.network`,
    providerUrl: SOLANA_RPC_URL,
    timeout: 360000,
  }));

async function uploadAsset(data: any, fileName: string) {
  console.log(`Step 1 - Uploading Asset to Arweave...`);
  try {
    const imgBuffer = Buffer.from(data, 'utf8');
    const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName);
    const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
    return imgUri;
  } catch (err) {
    if ( String(err).includes('funds') ) {
      console.log('Not enough funds in the master wallet!!!')
    }
    console.log(err)
    return 'ERROR';
  }
}

const MINT_CONFIG = {
  numDecimals: 0,
  numberTokens: 1000000
}

const TOKEN_METADATA: UploadMetadataInput = {
  name: "BEENZER",
  symbol: "BEEN",
  description: "The official token for using it in Beenzer App! 💚",
  image: "https://URL_TO_YOUR_IMAGE.png" //add public URL to image you'd like to use
}

const ON_CHAIN_METADATA = {
  name: TOKEN_METADATA.name, 
  symbol: TOKEN_METADATA.symbol,
  uri: 'TO_UPDATE_LATER',
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null
} as DataV2;

/**
 * 
 * @param wallet Solana Keypair
 * @param tokenMetadata Metaplex Fungible Token Standard object 
 * @returns Arweave url for our metadata json file
 */
const uploadMetadata = async(wallet: Keypair, tokenMetadata: UploadMetadataInput):Promise<string> => {
  //create metaplex instance on devnet using this wallet
  const metaplex = Metaplex.make(SOLANA_CONNECTION)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: SOLANA_RPC_URL,
      timeout: 60000,
      }));
  
  //Upload to Arweave
  const { uri } = await metaplex.nfts().uploadMetadata(tokenMetadata);
  console.log(`Arweave URL: `, uri);
  return uri;
}
const createNewMintTransaction = async (connection:Connection, payer:Keypair, mintKeypair: Keypair, destinationWallet: PublicKey, mintAuthority: PublicKey, freezeAuthority: PublicKey)=>{
  //Get the minimum lamport balance to create a new account and avoid rent payments
  const requiredBalance = await getMinimumBalanceForRentExemptMint(connection);
  //metadata account associated with mint
  const metadataPDA = await findMetadataPda(mintKeypair.publicKey);
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
        mintKeypair.publicKey, //Mint Address
        MINT_CONFIG.numDecimals, //Number of Decimals of New mint
        mintAuthority, //Mint Authority
        freezeAuthority, //Freeze Authority
        TOKEN_PROGRAM_ID),
      createAssociatedTokenAccountInstruction(
        payer.publicKey, //Payer 
        tokenATA, //Associated token account 
        payer.publicKey, //token owner
        mintKeypair.publicKey, //Mint
      ),
      createMintToInstruction(
        mintKeypair.publicKey, //Mint
        tokenATA, //Destination Token Account
        mintAuthority, //Authority
        MINT_CONFIG.numberTokens * Math.pow(10, MINT_CONFIG.numDecimals),//number of tokens
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
        }
      )
  );

  return createNewTokenTransaction;
}


const main = async() => {
  console.log(`---STEP 1: Uploading MetaData---`);
  const userWallet = Keypair.fromSecretKey(new Uint8Array(secret));
  let metadataUri = await uploadMetadata(userWallet, TOKEN_METADATA);
  ON_CHAIN_METADATA.uri = metadataUri;

  console.log(`---STEP 2: Creating Mint Transaction---`);
  let mintKeypair = Keypair.generate();   
  console.log(`New Mint Address: `, mintKeypair.publicKey.toString());

  const newMintTransaction: Transaction = await createNewMintTransaction(
    SOLANA_CONNECTION,
    userWallet,
    mintKeypair,
    userWallet.publicKey,
    userWallet.publicKey,
    userWallet.publicKey
  );

  console.log(`---STEP 3: Executing Mint Transaction---`);
  const transactionId =  await SOLANA_CONNECTION.sendTransaction(newMintTransaction, [userWallet, mintKeypair]);
  console.log(`Transaction ID: `, transactionId);
  console.log(`Succesfully minted ${MINT_CONFIG.numberTokens} ${ON_CHAIN_METADATA.symbol} to ${userWallet.publicKey.toString()}.`);
  console.log(`View Transaction: https://explorer.solana.com/tx/${transactionId}?cluster=devnet`);
  console.log(`View Token Mint: https://explorer.solana.com/address/${mintKeypair.publicKey.toString()}?cluster=devnet`)
}

main();