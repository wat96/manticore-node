#!/bin/bash
git clone https://github.com/wat96/manticore.git

# setup python stuff here.
[ ! -d venv ] && python3 -m venv venv
(source venv/bin/activate && cd manticore && python3 -m pip install .)

