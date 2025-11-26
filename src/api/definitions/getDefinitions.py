import sys
import yaml
from pathlib import Path

from typing import TypedDict, NotRequired, Union as U

# types


class _FormatsType(TypedDict):
    format: str
    video: list[str]
    audio: list[str]
    subtitle: list[str]


class _CodecSuboptionsType(TypedDict):
    readable: str
    true: NotRequired[str]
    false: NotRequired[str]
    ffmpeg: NotRequired[str]
    ffprobe: NotRequired[str]


class _CodecOptionsType(TypedDict):
    readable: str
    suboptions: list[_CodecSuboptionsType]
    ffmpeg: str
    ffprobe: NotRequired[str]


class _CodecLogicType(TypedDict):
    key: str
    comparison: str
    values: U[dict[U[int, float, str], U[int, float, str]]]


class _CodecType(TypedDict):
    codec: str
    ffprobe_name: str
    options: list[_CodecOptionsType]
    logic: NotRequired[list[dict[str, _CodecLogicType]]]


class Definitions:
    definitions_dir: Path
    formats: list[_FormatsType]
    video: list[_CodecType]
    audio: list[_CodecType]
    subtitle: list[_CodecType]

    def __init__(self):
        if getattr(sys, "frozen", False):
            self.definitions_dir = Path(sys.executable).parent
        else:
            self.definitions_dir = Path(__file__).parent

        # TODO: make the folder if it doesn't exist

        self.formats = self._get_definitions('formats')
        self.video = self._get_definitions('codecs', 'video')
        self.audio = self._get_definitions('codecs', 'audio')
        self.subtitle = self._get_definitions('codecs', 'subtitle')

    def _get_definitions(self, *pth):
        yamls = []
        for path in self.definitions_dir.joinpath(*pth).glob('*.yaml'):
            with path.open('r') as f:
                yamls.append(yaml.safe_load(f))
        return yamls

    def get_codecs_by_format(self, format: str):
        frmt = next((f for f in self.formats if f['format'] == format))
        vid = [vc for vc in self.video if vc['codec'] in frmt['video']]
        aud = [ac for ac in self.audio if ac['codec'] in frmt['audio']]
        sub = [sc for sc in self.subtitle if sc['codec'] in frmt['subtitle']]
        return {'video': vid, 'audio': aud, 'subtitle': sub}


if __name__ == '__main__':
    d = Definitions()
    print(d.formats)
    print(d.video)
    print(d.audio)
    print(d.subtitle)
    print(d.get_codecs_by_format('mp4'))
