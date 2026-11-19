"""Create compact campus thumbnails from the presentation images already in the project."""

import json
import subprocess
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "certificate" / "universities"

# Some presentation slides show several campuses. These bounds select the
# university named in the catalog instead of repeating the whole collage.
CROPS = {
    "turkey-ardahan-university": (0.00, 0.12, 0.50, 0.87),
    "turkey-karab-k-university": (0.50, 0.12, 1.00, 0.87),
    "turkey-sakarya-university": (0.02, 0.10, 0.37, 0.46),
    "turkey-sakarya-university-of-applied-sciences": (0.63, 0.10, 0.98, 0.46),
    "turkey-anadolu-university": (0.02, 0.55, 0.37, 0.90),
    "turkey-eski-ehir-osmangazi-university": (0.63, 0.55, 0.98, 0.90),
    "turkey-istanbul-kent-university": (0.02, 0.10, 0.37, 0.46),
    "turkey-ya-ar-university": (0.63, 0.10, 0.98, 0.46),
    "turkey-istanbul-yeni-y-zy-l-university": (0.02, 0.55, 0.37, 0.90),
    "turkey-fenerbah-e-university": (0.63, 0.55, 0.98, 0.90),
    "malaysia-inti-international-university": (0.55, 0.05, 0.98, 0.54),
    "malaysia-alfa-university-college": (0.00, 0.08, 0.54, 0.92),
    "malaysia-city-university-malaysia": (0.00, 0.31, 0.60, 0.97),
    "china-shaoyang-university": (0.49, 0.06, 1.00, 0.52),
    "china-hunan-university-of-arts-and-science": (0.00, 0.08, 0.50, 0.91),
    "china-tongren-university": (0.47, 0.08, 1.00, 0.53),
    "china-shandong-university-of-technology": (0.00, 0.08, 0.48, 0.54),
    "china-chengdu-textile-college": (0.48, 0.08, 1.00, 0.55),
    "china-jiangxi-university-of-finance-and-economics": (0.00, 0.08, 0.52, 0.92),
    "china-chengdu-university": (0.00, 0.08, 0.54, 0.53),
    "china-shanxi-university": (0.00, 0.08, 0.53, 0.92),
    "china-neijiang-normal-university": (0.45, 0.07, 1.00, 0.54),
    "czech-charles-university": (0.00, 0.07, 0.56, 0.92),
    "czech-prague-university-of-economics-and-business": (0.43, 0.07, 1.00, 0.92),
}


def universities():
    code = "import { studyUniversities } from './src/studyCatalog.js'; console.log(JSON.stringify(studyUniversities));"
    result = subprocess.run(
        ["node", "--input-type=module", "-e", code],
        cwd=ROOT, check=True, capture_output=True, text=True, encoding="utf-8",
    )
    return json.loads(result.stdout)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    items = universities()
    for university in items:
        path = (
            ROOT / "public" / university["photo"].lstrip("/")
            if university.get("photo")
            else ROOT / "public" / "presentations" / university["country"] / f"{university['slide']}.jpg"
        )
        if not path.is_file():
            raise FileNotFoundError(path)
        with Image.open(path) as original:
            image = original.convert("RGB")
            bounds = CROPS.get(university["id"], (0.00, 0.08, 1.00, 0.92))
            width, height = image.size
            image = image.crop((
                round(bounds[0] * width), round(bounds[1] * height),
                round(bounds[2] * width), round(bounds[3] * height),
            ))
            image = ImageOps.fit(image, (400, 304), method=Image.Resampling.LANCZOS)
            image.save(OUTPUT / f"{university['id']}.jpg", "JPEG", quality=78, optimize=True)
    unknown = set(CROPS) - {item["id"] for item in items}
    if unknown:
        raise ValueError(f"Crop hints do not match catalog entries: {sorted(unknown)}")
    print(f"Generated {len(items)} university thumbnails in {OUTPUT}")


if __name__ == "__main__":
    main()
