# How to configure git variables 

```sh 


# Set for all repositories (globally)
git config --global user.name "AESYS | Ahmet Emrebas"
git config --global user.email "aesys+git@proton.me"

# Show configurations
git config --global --list --show-origin



# Set for a single repository
git config user.name "AESYS | Ahmet Emrebas"
git config user.email "aesys+git@proton.me"
# Show configurations
git config --local --list --show-origin
 

```