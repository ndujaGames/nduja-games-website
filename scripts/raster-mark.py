from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
im = Image.open(root / "assets" / "logoIcon.png").convert("RGBA")
public = root / "public"


def resize(size):
    return im.resize((size, size), Image.Resampling.LANCZOS)


for size, name in [
    (16, "favicon-16.png"),
    (32, "favicon-32.png"),
    (128, "favicon.png"),
]:
    path = public / name
    resize(size).save(path, "PNG", optimize=True)
    print("wrote", name)

ico_sizes = [16, 32, 48]
ico_images = [resize(s) for s in ico_sizes]
ico_images[0].save(
    public / "favicon.ico",
    format="ICO",
    sizes=[(s, s) for s in ico_sizes],
    append_images=ico_images[1:],
)
print("wrote favicon.ico")
