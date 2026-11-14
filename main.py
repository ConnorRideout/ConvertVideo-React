import sys
from os import environ
from pathlib import Path
from typing import Dict, List
import webview
from json import dumps

from backend.dataContainer import DataContainer
from backend.definitions import getDefinitions
from lib.variables import *

DEV = "--dev" in sys.argv
ROOT = Path(__file__).parent

TOP_PATH = environ.get('TOP_PATH') if DEV else sys.argv[-1]


class Api:
    # def greet(self, name: str) -> str:
    #     print('texting you')
    #     webview.active_window().evaluate_js(
    #         "window.dispatchEvent(new CustomEvent('py-message'))")
    #     return f"Hello {name}, from Python!"
    def getTopPath(self) -> str:
        return TOP_PATH

    def getCodecs(self) -> List:
        container = DataContainer(TOP_PATH)
        container.probe()
        return container.codecs

    def getConfig(self) -> Dict:
        config_data = {
            'FTYPES': FTYPES,
            'NVENC': NVENC,
            'CRF_VALS': CRF_VALS,
            'DUR_MISMCH_PERCENT': DUR_MISMCH_PERCENT,
            'DUR_MISMCH_SECONDS': DUR_MISMCH_SECONDS,
            'IGNORE_DTS': IGNORE_DTS,
            'SKIP_SIZE': SKIP_SIZE,
            'FORCE_HEVC': FORCE_HEVC,
            'AUD_LANGS': AUD_LANGS,
            'SUB_LANGS': SUB_LANGS,
            'STREAMS': STREAMS,
            'RECURSE': RECURSE,
            'OVERWRITE': OVERWRITE,
            'KEEP_FAIL': KEEP_FAIL,
            'OVERWRITE_FAIL': OVERWRITE_FAIL,
            'KEEP_ERROR': KEEP_ERROR,
            'DO_SCALE': DO_SCALE,
            'DO_CROP': DO_CROP,
            'RENAME': RENAME,
            'RENAME_REGEX': RENAME_REGEX,
            'RENAME_TO': RENAME_TO,
            'THREADS': THREADS,
            'CONV_THREADS': CONV_THREADS,
            'ADD_PARAMS': ADD_PARAMS,
        }
        return config_data

    def getDefinitions() -> Dict:
        defs = getDefinitions.Definitions()
        return {'formats': defs.formats,
                'video': defs.video,
                'audio': defs.audio,
                'subtitle': defs.subtitle}


def main():
    url = "http://localhost:5173" if DEV else str(ROOT / "dist" / "index.html")
    webview.create_window("Convert/Compress Video",
                          url,
                          js_api=Api(),
                          width=CON_WD,
                          height=CON_HT,
                          min_size=(500, 400))
    webview.start(debug=DEV, http_server=not DEV)


if __name__ == "__main__":
    main()
