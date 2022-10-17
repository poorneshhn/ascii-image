export class Cell {
  constructor(x, y, symbol, color, backgroundcolor, selectedColor) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
    this.selectedColor = selectedColor;
    this.backgroundcolor = backgroundcolor;
  }

  draw(ctx) {
    if (this.selectedColor === "Color") {
      ctx.fillStyle = this.color;
    } else if (
      this.backgroundcolor === "White" &&
      this.selectedColor === "Black & White"
    ) {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

export class AsciiEffect {
  #ctx;
  #imageDataCellArray = [];
  #pixels = [];
  #width;
  #height;
  #image;
  #backgroundcolor;
  #selectedColor;

  constructor(ctx, width, height, image, backgroundcolor, color) {
    this.#ctx = ctx;
    this.#image = image;
    this.#height = height;
    this.#width = width;
    this.#backgroundcolor = backgroundcolor;
    this.#selectedColor = color;
    this.drawOriginalImage();
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
  }

  #clearImageFromScreen() {
    this.#imageDataCellArray = [];
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
  }

  drawOriginalImage() {
    this.#clearImageFromScreen();
    this.#ctx.drawImage(this.#image, 0, 0, this.#width, this.#height);
  }

  #getSymbolFromColor(averageColor) {
    if (averageColor > 250) return ".";
    else if (averageColor > 240) return "-";
    else if (averageColor > 220) return ",";
    else if (averageColor > 200) return "^";
    else if (averageColor > 200) return "*";
    else if (averageColor > 180) return '"';
    else if (averageColor > 160) return "!";
    else if (averageColor > 140) return "`";
    else if (averageColor > 120) return "'";
    else if (averageColor > 100) return "%";
    else if (averageColor > 80) return "+";
    else if (averageColor > 60) return "@";
    else if (averageColor > 40) return "$";
    else if (averageColor > 20) return "&";
    else return "#";
  }

  #scanImage(cellSize) {
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const pos = posY * this.#pixels.width + posX;

        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const average = total / 3;
          const color = `rgb( ${red}, ${green}, ${blue})`;
          const symbol = this.#getSymbolFromColor(average);
          //   if (total > 200)
          this.#imageDataCellArray.push(
            new Cell(
              x,
              y,
              symbol,
              color,
              this.#backgroundcolor,
              this.#selectedColor
            )
          );
        }
      }
    }
  }

  #drawAscii() {
    for (let i = 0; i < this.#imageDataCellArray.length; i++) {
      this.#imageDataCellArray[i].draw(this.#ctx);
    }
  }

  draw(cellSize) {
    this.#clearImageFromScreen();
    this.#scanImage(cellSize);
    this.#drawAscii(this.#ctx);
  }
}
