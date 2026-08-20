## How to create secure connection to github with ssh connection 

```sh 
#!/bin/bash

# Generate ssh key 


NAME="$1"
PASSPHRASE="$2"

ssh-keygen -t ed25519 \
  -C "$NAME" \
  -f "$HOME/.ssh/$NAME" \
  -N "$PASSPHRASE"

ssh-add "$HOME/.ssh/$NAME"

cat "$HOME/.ssh/$NAME.pub"

# Paste the returned text to the target.



```