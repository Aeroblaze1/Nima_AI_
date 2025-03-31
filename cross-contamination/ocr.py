import easyocr

reader = easyocr.Reader(["en"])

def extract_text(image):
    results = reader.readtext(image.read(), detail=0)
    return results
