#/bin/sh
rm -rf ./usfm/
mkdir -p ./usfm/
cd usfm && wget https://ebible.org/Scriptures/eng-web_usfm.zip
unzip eng-web_usfm.zip
rm eng-web_usfm.zip
