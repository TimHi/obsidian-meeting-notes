 #!/bin/bash
 
yarn build 
rm -rf /Users/thiller/Desktop/TestVault/.obsidian/plugins/obsidian-meeting-notes 
mkdir /Users/thiller/Desktop/TestVault/.obsidian/plugins/obsidian-meeting-notes
echo "Copying build files to the obisdian plugin directory..."
cp main.js /Users/thiller/Desktop/TestVault/.obsidian/plugins/obsidian-meeting-notes/main.js
cp manifest.json /Users/thiller/Desktop/TestVault/.obsidian/plugins/obsidian-meeting-notes/manifest.json
echo "Done copying"