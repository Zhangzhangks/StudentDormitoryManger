<template>
  <canvas
    ref="canvas"
    @click="draw"
    width="140"
    height="40"
    style="cursor: pointer"
  ></canvas>
</template>
  <script>
export default {
  data() {
    return {
      codes: [],
      ctx: "",
      colors: ["red", "yellow", "blue", "green", "pink", "black"],
      code_Len: 4,
    };
  },
  mounted() {
    this.draw();
  },
  computed: {
    codeString() {
      let result = "";
      for (let i = 0; i < this.codes.length; i++) {
        result += this.codes[i];
      }
      return result.toUpperCase();
    },
  },
  watch: {
    codeString: function (newValue) {
      this.$emit("change", newValue);
    },
  },
  methods: {
    generateRandom() {
      this.codes = [];
      const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";
      const charsArr = chars.split("");

      for (let i = 0; i < this.code_Len; i++) {
        const num = Math.floor(Math.random() * charsArr.length);
        this.codes.push(charsArr[num]);
      }
    },
    draw() {
      this.generateRandom();
      this.drawText();
    },
    getRandom(max, min) {
      return parseInt(Math.ceil(Math.random() * (max - min + 1)) + min);
    },
    getRandomColor(max, min) {
      let r = this.getRandom(max, min);
      let g = this.getRandom(max, min);
      let b = this.getRandom(max, min);
      return `rgb(${r},${g},${b})`;
    },
    drawLine() {
      const lineNumber = 3; // 线条条数
      const lineX = 140;
      const lineY = 30; // 最大线条坐标
      for (let i = 0; i < lineNumber; i++) {
        this.ctx.strokeStyle = this.colors[Math.floor(Math.random() * 5)];
        this.ctx.beginPath();
        this.ctx.moveTo(
          Math.floor(Math.random() * lineX),
          Math.floor(Math.random() * lineY)
        );
        this.ctx.lineTo(
          Math.floor(Math.random() * lineX),
          Math.floor(Math.random() * lineY)
        );
        this.ctx.stroke();
      }
    },
    drawArc() {
      const canvas = this.$refs["canvas"];
      this.ctx = canvas.getContext("2d");
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < 100; i++) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.getRandomColor(180, 100);
        this.ctx.arc(
          this.getRandom(0, w),
          this.getRandom(0, h),
          0.5,
          0,
          Math.PI * 2
        );
        this.ctx.closePath();
        this.ctx.fill();
      }
    },
    drawText() {
      const canvas = this.$refs["canvas"];
      this.ctx = canvas.getContext("2d");
      this.ctx.fillStyle = this.getRandomColor(230, 180);
      this.ctx.fillRect(0, 0, 140, 40);
      const fs = this.getRandom(18, 40);
      let x = 15;
      for (let i = 0; i < this.code_Len; i++) {
        let deg = this.getRandom(-30, 30);
        this.ctx.font = fs + "px Verdana";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = this.getRandomColor(80, 150);
        this.ctx.save();
        this.ctx.rotate((deg * Math.PI) / 180);
        this.ctx.restore();
        this.ctx.fillStyle = this.getRandomColor(150, 80);
        this.ctx.fillText(this.codes[i], x, 5);
        x = x + 30;
      }

      this.drawLine();
      this.drawArc();
    },
  },
};
</script>