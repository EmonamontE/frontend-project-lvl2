[![Actions Status](https://github.com/EmonamontE/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/EmonamontE/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/620000e22b7225f10f8f/maintainability)](https://codeclimate.com/github/EmonamontE/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/620000e22b7225f10f8f/test_coverage)](https://codeclimate.com/github/EmonamontE/frontend-project-lvl2/test_coverage)

# Gendiff
GenDiff is a diff tool to compare text differences between two text files.
___
### About  
**__gendiff__** compares content of the two files of the following extensions:
* .json
* .yml

...and outputs the result in the terminal in three possible formats:  
* "_stylish_": demostrative tree-like structure
* "_plain_": verbose plain text
* "_json_": json-like string
___
### Installation
Clone this repo
```
make install
make link  
```
___
### Usage
```  
gendiff [options] <filepath1> <filepath2>
Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```