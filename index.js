const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl('testnet'), 'confirmed')
        const walletBalanceLamports = await connection.getBalance(publicKey)
        const walletBalance = walletBalanceLamports/ LAMPORTS_PER_SOL
        console.log(`Wallet balance is ${walletBalance}`)
    } catch(err) {
        console.error(err)
    }
}
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('testnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        const latestBlockHash = await connection.getLatestBlockhash()
        await connection.confirmTransaction({
            signature: fromAirDropSignature,
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight  
        })
        console.log(`Airdrop Complete!`)

        
    } catch (err) {
        console.log(err)        
    }
}
const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()
