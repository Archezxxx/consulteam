"""Build web-ready case photos from the supplied Consulteam_Cases folder.

Usage: python scripts/prepare-case-images.py PATH_TO_CONSULTEAM_CASES
HEIC files require the heif-convert command; all output is WebP without EXIF.
"""

from pathlib import Path
from subprocess import run
from sys import argv
from tempfile import TemporaryDirectory

from PIL import Image, ImageOps


PHOTOS = {
    "turkey-01": "Turkiye_2026/IMG_2930.HEIC",
    "turkey-02": "Turkiye_2026/IMG_4149.JPG",
    "turkey-03": "Turkiye_2026/IMG_4266.HEIC",
    "turkey-04": "Turkiye_2026/IMG_4278.HEIC",
    "turkey-05": "Turkiye_2026/IMG_4330.HEIC",
    "taiwan-01": "taiwan/IMG_1700.JPG",
    "taiwan-02": "taiwan/IMG_1702.JPG",
    "taiwan-03": "taiwan/IMG_3152.DNG",
    "taiwan-04": "taiwan/IMG_3196.HEIC",
    "taiwan-05": "taiwan/IMG_3443.JPG",
    "prague-01": "Другие фотки/photo_2026-11-16_13-05-36.jpg",
    "prague-02": "Другие фотки/photo_2026-11-16_13-05-58.jpg",
    "prague-03": "Другие фотки/photo_2026-11-16_13-06-00.jpg",
    "prague-04": "Другие фотки/photo_2026-11-16_13-06-11.jpg",
    "prague-05": "Другие фотки/photo_2026-11-16_13-06-15.jpg",
    "europe-01": "Чехия/IMG_6688.HEIC",
    "europe-02": "Чехия/IMG_7509.HEIC",
    "europe-03": "Чехия/IMG_9827.JPG",
    "europe-04": "Чехия/IMG_9828.JPG",
}


def main() -> None:
    source_root = Path(argv[1])
    output_root = Path(__file__).resolve().parents[1] / "public" / "cases"
    output_root.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory() as temporary:
        for name, source_name in PHOTOS.items():
            source = source_root / source_name
            if not source.is_file():
                raise FileNotFoundError(source)
            readable = source
            if source.suffix.lower() == ".heic":
                readable = Path(temporary) / f"{name}.jpg"
                run(["heif-convert", "-q", "90", str(source), str(readable)], check=True, capture_output=True)
            elif source.suffix.lower() == ".dng":
                readable = Path(temporary) / f"{name}.png"
                run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(source), "-frames:v", "1", str(readable)], check=True, capture_output=True)
            with Image.open(readable) as original:
                photo = ImageOps.exif_transpose(original).convert("RGB")
                photo.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
                output = output_root / f"{name}.webp"
                photo.save(output, "WEBP", quality=80, method=6)
                mobile = photo.copy()
                mobile.thumbnail((720, 720), Image.Resampling.LANCZOS)
                mobile_output = output_root / f"{name}-mobile.webp"
                mobile.save(mobile_output, "WEBP", quality=76, method=6)
                print(f"{name}: {output.stat().st_size:,} bytes, mobile {mobile_output.stat().st_size:,} bytes")


if __name__ == "__main__":
    if len(argv) != 2:
        raise SystemExit("Usage: python scripts/prepare-case-images.py PATH_TO_CONSULTEAM_CASES")
    main()
