# WebHID Scales

A Google Chrome extension to connect HID compliant scales and output the value into a designated input field (via HTML element ID). 

## Getting Started

This is an unpacked extension.

To install:

1. Download the source code from GitHub
2. Go to `chrome://extensions/` and select [Load unpacked]
3. Select the folder where the extension was downloaded

### Prerequisites

The WebHID API is not yet fully released, to use the extension you will need to enable the `#enable-experimental-web-platform-features` flag in `chrome://flags`.

## Configuration

* **Weight Input Element** - The `id` of the input field in which to output the weight value
* **Weight Input Element Iframe** - If the Weight Input Element is contained within an iFrame then you must specifiy the id of that Iframe.
* **Scale Model** - The make/model of the scale. 
* **Weight Measurement Units** - Should match the configuration of your scales.
* **Decimalise Weight** - for imperial measurement units, this option controls if the output shoudl be lbs:oz (e.g. 5:8 lbs/oz) or if it should be converted into a decimal (e.g. 5.5 lbs).

## Authors

* **Ben Rees** - *Initial work* - [benrees-git](https://github.com/benrees-git)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

