from pathlib import Path
from sys import argv as sys_argv
from subprocess import run
from concurrent.futures import ThreadPoolExecutor
from json import loads as json_loads
from typing import List, Dict, Union as U

from lib.variables import *


class DataContainer:
    codecs: List[Dict]

    def __init__(self, top_path: str = sys_argv[-1]):
        self.codecs = []
        self.top_path = Path(top_path)
        if self.top_path.is_dir():
            self.video_paths = [
                p for p in self.top_path.rglob('*') if p.suffix in FTYPES]
        else:
            self.video_paths = [self.top_path]

    def probe(self):
        with ThreadPoolExecutor(max_workers=4) as ex:
            ex.map(self._ffprobe, self.video_paths)
        # self._probe(self.video_paths[0])
        return

    def _ffprobe(self, video_path: Path):
        proc = run(['ffprobe', video_path, '-v', 'error',
                    '-show_entries', 'stream=codec_type,codec_name,width,height,duration,channels:stream_tags=language,duration:format=duration',
                    '-of', 'json', '-sexagesimal'], capture_output=True)

        probe_results_raw = json_loads(
            proc.stdout)
        duration: str = probe_results_raw['format']['duration']
        stream_data: List[Dict[str, U[str, int, dict[str, str]]]
                          ] = probe_results_raw['streams']
        probe_results = {'video': [], 'audio': [], 'subs': []}
        for codec in stream_data:
            codec_name = codec.get('codec_name')
            duration = codec.get('duration')
            width = codec.get('width')
            height = codec.get('height')
            channels = codec.get('channels')
            tags = codec.get('tags')
            language = tags.get('language') if tags else None
            tag_duration = tags.get('duration') if tags else None
            if codec['codec_type'] == 'video':
                probe_results['video'].append({
                    'codec_name': codec_name,
                    'width': width,
                    'height': height,
                    'duration': duration,
                })
            elif codec['codec_type'] == 'audio':
                probe_results['audio'].append({
                    'codec_name': codec_name,
                    'channels': channels,
                    'language': language,
                    'tag_duration': tag_duration
                })
            elif codec['codec_type'] == 'subtitle':
                probe_results['subs'].append({
                    'codec_name': codec_name,
                    'language': language,
                    'tag_duration': tag_duration
                })

        self.codecs.append(
            {"path": str(video_path.relative_to(self.top_path)),
             **probe_results})
