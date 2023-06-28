# Docker DNS Setup

This project help to automate the dns proxy settings for local development environment.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![version](https://img.shields.io/npm/v/dnsmasq-setup.svg?style=flat)](https://www.npmjs.com/package/dnsmasq-setup)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat)](http://commitizen.github.io/cz-cli/)
![GitHub All Releases](https://img.shields.io/github/downloads/mahboobmonnam/dns-masq/total.svg?style=flat)

- [Installation](#installation)
    - [Using npm](#using-npm)
- [Usage](#usage)

## Installation

### Using npm

To install `dnsmasq-setup` globally using `npm`, run the following:

```sh
npm install -g dnsmasq-setup
```

## Usage

Before Starting `dnsmasq-setup`, make sure you are not running any other software that is listening on
ports 53, 80, 443 and 19322. 
This will cause the command to fail. To allow the script to modify your
systems DNS configuration, 
it may ask you to run the command with `sudo` the first time the script
is run.
Once configured, the script can be run with normal privileges.

```text
Usage: dnsmasq-setup [options] [command]

A utility to help setup a docker development environment with host based routing

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  start          Pull and start the proxy container and configure DNS
  stop           Stop the proxy container
  restart        Restart the proxy container
```

Please feel free to follow [readme](https://github.com/codekitchen/dinghy-http-proxy#README)

Thanks to 
[Code Kitchen](https://github.com/codekitchen/dinghy-http-proxy) and [AJ May](https://github.com/aj-may/dotdocker)
