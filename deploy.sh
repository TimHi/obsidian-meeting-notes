 #!/bin/bash

rm -rf /Users/thiller/Documents/Obsidian/UnseenLibrary/.obsidian/plugins/obsidian-meeting-notes 
mkdir /Users/thiller/Documents/Obsidian/UnseenLibrary/.obsidian/plugins/obsidian-meeting-notes
echo "Copying build files to the obisdian plugin directory..."
cp main.js /Users/thiller/Documents/Obsidian/UnseenLibrary/.obsidian/plugins/obsidian-meeting-notes/main.js
cp manifest.json /Users/thiller/Documents/Obsidian/UnseenLibrary/.obsidian/plugins/obsidian-meeting-notes/manifest.json
echo "Done copying"