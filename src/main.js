import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'normalize.css'
import './assets/style/common.css';
import router from './Router/route';
import store from './Store/store';
import axios from 'axios'
import XtxPagination from './components/xtx-pagination.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './utils/Mock/02.数据占位符'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import { AddressEdit } from 'vant';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router);
app.use(store);

// 雨滴Canvas
app.config.globalProperties.$rain = function rain() {
    if (document.getElementById("canvas-club")) {
        var c = document.getElementById("canvas-club");
        var ctx = c.getContext("2d");
        var w = (c.width = window.innerWidth - 0);
        var h = (c.height = window.innerHeight - 0);
        var clearColor = "rgba(0, 0, 0, .1)";
        var max = 30;
        var drops = [];

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function O() {}

        O.prototype = {
            init: function() {
                this.x = random(0, w);
                this.y = 0;
                this.color = "hsl(180, 100%, 50%)";
                this.w = 2;
                this.h = 1;
                this.vy = random(4, 5);
                this.vw = 3;
                this.vh = 1;
                this.size = 2;
                this.hit = random(h * 0.8, h * 0.9);
                this.a = 1;
                this.va = 0.96;
            },
            draw: function() {
                if (this.y > this.hit) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.h / 2);

                    ctx.bezierCurveTo(
                        this.x + this.w / 2,
                        this.y - this.h / 2,
                        this.x + this.w / 2,
                        this.y + this.h / 2,
                        this.x,
                        this.y + this.h / 2
                    );

                    ctx.bezierCurveTo(
                        this.x - this.w / 2,
                        this.y + this.h / 2,
                        this.x - this.w / 2,
                        this.y - this.h / 2,
                        this.x,
                        this.y - this.h / 2
                    );

                    ctx.strokeStyle = "hsla(180, 100%, 50%, " + this.a + ")";
                    ctx.stroke();
                    ctx.closePath();
                } else {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.size, this.size * 5);
                }
                this.update();
            },
            update: function() {
                if (this.y < this.hit) {
                    this.y += this.vy;
                } else {
                    if (this.a > 0.03) {
                        this.w += this.vw;
                        this.h += this.vh;
                        if (this.w > 100) {
                            this.a *= this.va;
                            this.vw *= 0.98;
                            this.vh *= 0.98;
                        }
                    } else {
                        this.init();
                    }
                }
            },
        };

        function resize() {
            w = c.width = window.innerWidth;
            h = c.height = window.innerHeight;
        }

        function setup() {
            for (var i = 0; i < max; i++) {
                (function(j) {
                    setTimeout(function() {
                        var o = new O();
                        o.init();
                        drops.push(o);
                    }, j * 200);
                })(i);
            }
        }

        function anim() {
            ctx.fillStyle = clearColor;
            ctx.fillRect(0, 0, w, h);
            for (var i in drops) {
                drops[i].draw();
            }
            requestAnimationFrame(anim);
        }

        window.addEventListener("resize", resize);

        setup();
        anim();
    }
}

// 自定义指令
// 声明全局自定义指令，传递参数
app.directive('focus', (el, binding) => {
    let ipt = el;
    ipt.onfocus = function(e) {
        el.classList.add('zks')

    }
    ipt.onblur = function(e) {

        el.classList.remove('zks')
    }
});
app.use(AddressEdit);
app.component(XtxPagination.name, XtxPagination)
app.mount('#app');