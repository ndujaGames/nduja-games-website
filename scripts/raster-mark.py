from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
public = root / "public"
im = Image.open(public / "img" / "logoIcon-v2.png").convert("RGBA")
side = max(im.size)
square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
square.paste(im, ((side - im.width) // 2, (side - im.height) // 2))


def resize(size):
    return square.resize((size, size), Image.Resampling.LANCZOS)


for size, name in [
    (16, "favicon-16-v2.png"),
    (32, "favicon-32-v2.png"),
    (128, "favicon-v2.png"),
]:
    path = public / name
    resize(size).save(path, "PNG", optimize=True)
    print("wrote", name)

square.save(
    public / "favicon-v2.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)
print("wrote favicon-v2.ico")
