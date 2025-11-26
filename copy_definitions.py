from shutil import copytree, rmtree
from pathlib import Path

toplevel = Path(__file__).parent

source_defs = toplevel.joinpath('src', 'api', 'definitions')

destination_folder = toplevel.joinpath('dist', 'definitions')
if destination_folder.exists():
    rmtree(destination_folder)
copytree(source_defs, destination_folder)

print(f"Copied definitions to {destination_folder}")
