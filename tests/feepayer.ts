import * as anchor from "@project-serum/anchor";
import { Keypair, Connection, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Feepayer } from "../target/types/feepayer";

describe("feepayer", () => {
  // Configure the client to use the local cluster.
  const accountWithLamports = Keypair.generate();
  const emptyAccount = Keypair.generate();

  const defaultOptions = anchor.Provider.defaultOptions();
  const nodeWallet = new NodeWallet(emptyAccount);
  anchor.setProvider(new anchor.Provider(new Connection("http://localhost:8899", defaultOptions), nodeWallet, defaultOptions));

  const program = anchor.workspace.Feepayer as Program<Feepayer>;

  it("Is initialized!", async () => {
    await program.provider.connection.confirmTransaction(await program.provider.connection.requestAirdrop(accountWithLamports.publicKey, 5 * LAMPORTS_PER_SOL));

    const tx = await program.rpc.initialize({
      accounts: {
        emptyAccount: emptyAccount.publicKey,
        accountWithLamports: accountWithLamports.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [accountWithLamports]
    });
    console.log("Your transaction signature", tx);
  });
});
