from PIL import Image, ImageDraw
import os

image_path = r"C:\Users\Devendraprasad\.gemini\antigravity-ide\brain\da67d099-98b5-4b62-a5e6-aab17dd19a65\drums_of_liberation_tee_1782743892821.png"
output_path = r"c:\Users\Devendraprasad\Downloads\One-Piece-main\One-Piece-main\public\images\products\drums-of-liberation-oversized-tee-1.png"

img = Image.open(image_path).convert("RGBA")

# Floodfill from edges to make background transparent
ImageDraw.floodfill(img, (0, 0), (0, 0, 0, 0), thresh=30)
ImageDraw.floodfill(img, (img.width-1, 0), (0, 0, 0, 0), thresh=30)
ImageDraw.floodfill(img, (0, img.height-1), (0, 0, 0, 0), thresh=30)
ImageDraw.floodfill(img, (img.width-1, img.height-1), (0, 0, 0, 0), thresh=30)

# Sometimes the studio background has a gradient, so we also floodfill slightly inward
ImageDraw.floodfill(img, (img.width//2, 5), (0, 0, 0, 0), thresh=30)

img.save(output_path)
print("Successfully processed and saved image.")
