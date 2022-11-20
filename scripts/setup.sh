#!/bin/bash
git submodule init
git submodule update

# setup python stuff here.
[ ! -d venv ] && python3 -m venv venv
(source venv/bin/activate && cd manticore && python3 -m pip install .)

