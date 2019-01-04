#!/usr/bin/env python
# coding: utf-8

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

import buildtools.build
buildtools.build.process_args(BASE_DIR)
