use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod feepayer {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.account_with_lamports.to_account_info(),
                to: ctx.accounts.empty_account.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(ctx, 100000000)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    /// CHECK: this is fine
    #[account(mut)]
    pub account_with_lamports: Signer<'info>,
    #[account(mut)]
    pub empty_account: Signer<'info>,
    pub system_program: Program<'info, System>,
}
