# WebHID Scales

![WebHid Scales Logo](https://github.com/benrees-git/webhid-scales/blob/master/img/hidscales_128.png)

A Google Chrome extension to connect HID compliant scales and output the value into a designated input field (via HTML element ID). 

## Getting Started

**This is an unpacked extension for the moment** - with positive feedback, it will eventually be submitted to the Chrome Store.

#### To install:

1. Download the source code from GitHub to a static location on your PC (e.g. `C:/`)
2. Go to `chrome://extensions/`, check "Developer mode" and select _Load Unpacked_
3. Select the folder where the extension was downloaded

#### To update:

1. Replace the files in the folder where the extension is installed
2. Go to `chrome://extensions/` and select _Update_

### Prerequisites

WebHID API is included with Chrome Version 89 and later. If you use an earlier version of Chrome then to use the extension you will need to enable the `#enable-experimental-web-platform-features` flag in `chrome://flags`.

## Configuration

Configuration Option | Description
------------ | -------------
**Weight Input Element** | The `id` of the input field in which to output the weight value
**Weight Input Element Iframe** | If the Weight Input Element is contained within an iFrame then you must specifiy the id of that Iframe.
**Scale Model** | The make/model of the scale. 
**Weight Measurement Units** | Should match the configuration of your scales.
**Decimalise Weight** | For imperial measurement units, this option controls if the output should be lbs:oz (e.g. 5:8 lbs/oz) or if it should be converted into a decimal (e.g. 5.5 lbs).

### Application Configuration Examples

**Peoplevox WMS**
* Weight Input Element: `packageWeightTxt`
* Weight Input Element Iframe: `popupIframe`

## Authors

* **Ben Rees** - *Initial work* - [benrees-git](https://github.com/benrees-git)

## License

This project is licensed under the MIT License - see the [LICENCE.md](LICENCE.md) file for details

