"""Convert the raw village photos in public/foto desa/ into named, lightly retouched WebP files.

Usage: python3 scripts/process-village-photos.py [upscaled_dir]
Output goes to public/desa/. Raw WhatsApp files stay local and are not committed.

WhatsApp delivers 1280 px JPEGs, too soft for wide screens. For best results first upscale the raw
files 4x with Real-ESRGAN (realesrgan-ncnn-vulkan -n realesrgan-x4plus), saving each as <slug>.png in
one folder, and pass that folder: the AI model restores detail lost to compression without inventing
content, then this script grades and downsizes the set consistently.
"""

import os
import sys

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SRC = "public/foto desa"
OUT = "public/desa"
MAX_EDGE = 2400

PHOTOS = {
    "sawah-senja": "WhatsApp Image 2026-09-28 at 20.22.37 (1).jpeg",
    "kolam-sawah": "WhatsApp Image 2026-09-28 at 20.22.40.jpeg",
    "kantor-kelurahan": "WhatsApp Image 2026-09-28 at 20.22.37.jpeg",
    "kantor-kelurahan-samping": "WhatsApp Image 2026-09-28 at 20.22.38.jpeg",
    "permukiman": "WhatsApp Image 2026-09-28 at 20.22.39 (2).jpeg",
    "gereja": "WhatsApp Image 2026-09-28 at 20.22.41 (1).jpeg",
    "jalan-utama": "WhatsApp Image 2026-09-28 at 20.22.40 (1).jpeg",
    "batas-kelurahan": "WhatsApp Image 2026-09-28 at 20.22.39.jpeg",
    "selamat-datang": "WhatsApp Image 2026-09-28 at 20.22.39 (1).jpeg",
    "sekolah": "WhatsApp Image 2026-09-28 at 20.22.48.jpeg",
    "sekolah-halaman": "WhatsApp Image 2026-09-28 at 20.22.51.jpeg",
    "pos-satkamling": "WhatsApp Image 2026-09-28 at 20.22.51 (1).jpeg",
    "minimarket-indomaret": "WhatsApp Image 2026-09-28 at 20.22.41.jpeg",
}


def retouch(image):
    # One grade for the whole set so photos shot at noon and at dusk read as a series:
    # stretch levels, lift shadows slightly, warm the tone a touch, then modest colour and crispness.
    image = ImageOps.autocontrast(image, cutoff=0.4, preserve_tone=True)
    lift = [round(20 * (1 - v / 255) ** 2 + v * (1 - 20 / 255 * (1 - v / 255) ** 2)) for v in range(256)]
    r, g, b = image.split()
    r = r.point([min(255, round(v * 1.02 + 2)) for v in lift])
    g = g.point(lift)
    b = b.point([max(0, round(v * 0.97)) for v in lift])
    image = Image.merge("RGB", (r, g, b))
    image = ImageEnhance.Color(image).enhance(1.08)
    image = ImageEnhance.Contrast(image).enhance(1.04)
    return image.filter(ImageFilter.UnsharpMask(radius=1.4, percent=45, threshold=3))


def main():
    upscaled = sys.argv[1] if len(sys.argv) > 1 else None
    os.makedirs(OUT, exist_ok=True)
    for slug, name in PHOTOS.items():
        source = os.path.join(upscaled, f"{slug}.png") if upscaled else os.path.join(SRC, name)
        image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        path = os.path.join(OUT, f"{slug}.webp")
        retouch(image).save(path, "WEBP", quality=80, method=6)
        print(f"{slug:26} {image.size[0]}x{image.size[1]}  {os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    main()
