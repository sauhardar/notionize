<p align="center">
  <img width="200" height="200" src="assets/logo1.png">
</p>

# Notionize

Notionize is a Google Chrome extension that makes adding a memorable YouTube video to your Notion database quick and effortless. I made this because I was too lazy to copy all the necessary details from the browser and navigate to my Notion table to paste it all in 🤷🏽‍♂️.

## Usage

- Download the extension.
- Replace the `sendVideo` function in `src/popup.js` to perform the logic that adds the provided data to your Notion table. I'm calling a simple API I created and hosted on Replit to be able to use the Javascript Notion SDK. See [here](https://replit.com/@SauhardaRajbhan/notionize#index.js).
- Also replace the `getTags` function in `src/popup.js` in order to properly fetch the multi-select tag values from the appropriate Notion table.
- Load the unpacked extension on your chrome browser at `chrome://extensions/`.

## Example
![](https://thumbs.gfycat.com/ContentDecimalIcelandicsheepdog-size_restricted.gif)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. I would love to extend this for articles, comments, and other documents I'd like to keep track of.

## License
[MIT](https://choosealicense.com/licenses/mit/)