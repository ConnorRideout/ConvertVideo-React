from sys import argv as sys_argv
from os import getenv

import webview


class API:
    def close(self):
        webview.windows[0].destroy()

    def get_filedata(self):
        topfol = sys_argv[1] if len(sys_argv) > 0 else getenv('FILE_PATH')
        return [{"filepath": "testing this"}]
