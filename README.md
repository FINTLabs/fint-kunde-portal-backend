# Fint Kundeportal #

This is the back-end project for the customer portal.

[Kundeportal](https://kunde.felleskomponent.no/)

## How to run local 

1. Start vpn against azure
2. Connect to jump server: `ssh -L 3890:vm-edir01.management.private:389 fint@10.10.10.4`
3. Add environment variables from the secret **Kundeportalen env.** in 1Password 
4. Add x-nin to environment variables
5. Set active profiles to test