# Vimstalled

A stupid chrome extension that displays when the github repo that you're looking at is installed in your vimrc using [vim plug](https://github.com/junegunn/vim-plug).

### Why the hell is this a thing?
I have, on occasion, found a super sweet plugin while perusing other peoples' vimrcs that I then try to add to my vimrc only to find it's already installed. This fixes that incredibly obscure and infrequent problem.

### Dependencies
CORS makes things tricky. The extension is mortally dependant on [a shitty api](https://github.com/22a/vimstalled-api) being alive and well on `https://weebscale.xyz`.

### Installation
Hah, no.

My username and vimrc are currently hardcoded.

I plan to allow the user to choose their own repo (perhaps even a  spooky algo that finds your plugin definitions given your username?) at some point.

I also plan on adding support(one re capture group) for [neobundle](https://github.com/Shougo/neobundle.vim) and [vundle](https://github.com/VundleVim/Vundle.vim) but not [pathogen](https://github.com/tpope/vim-pathogen).
