import React from 'react';
import {
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from "react";

const MyWallet: React.FC = () => {
    const { connection } = useConnection();
    let walletAddress = "";
    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [balance, setBalance] = useState<number>(-1)
    //let balance : number = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(wallet)
        try {
        const getBalance = async () => {
            const userPubKey = wallet? wallet.publicKey! : undefined;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            let balanceRes = userPubKey ? await connection.getBalance(userPubKey) : -1;
            balanceRes = Math.floor((balanceRes/1000000000)*100)/100; // 1 billion lamports to 1 SOL (2 decimals)
            setBalance(balanceRes)
            // console.log('SOL', balance);
        };
        getBalance();
        } catch (error) {
        console.log(error)
        }

    }, [balance, connection, wallet]);

    return (
        <>
            {wallet.connected && (
                <p>Your wallet is {walletAddress}</p> ||
                <p>Hello! Click the button to connect</p>
            )
            }

            <div className="multi-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton />
                        { balance >= 0 && <div className="userBalance">{balance} SOL</div> }
                    </WalletModalProvider>
                </span>
            </div>
        </>
    );
};

export default MyWallet;
