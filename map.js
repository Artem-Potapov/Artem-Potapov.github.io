class Map{
    constructor(){
        this.element=document.getElementsByClassName('map')[0];
        var rect = this.element.getBoundingClientRect()
        this.position_y = rect.top;
        this.position_x = rect.left;
        this.scale_factor = 1;
        this.flag = true;
        this.points = document.querySelectorAll('.point');

        this.element.style.transform = 'scale(1)';
        this.element.style.left = this.position_x.toString() + 'px';
        document.onmousedown = (event) => {this.mousedown(event)};
        document.ontouchstart = (event) => {this.mousedown(event)};
        this.control_add = document.querySelector('.control-add');
    }

    reset_points() {
        this.points = document.querySelectorAll('.point');
    }

    mousedown(event){
        if (event.target === this.element) {
            try {
                var start_y = event.changedTouches[0].clientY;
                var start_x = event.changedTouches[0].clientX;
            } catch(err) {
                var start_y = event.clientY;
                var start_x = event.clientX;
                this.element.style.cursor= 'grabbing';
            }
            let move = (event) => {
                try {
                    var dy = event.changedTouches[0].clientY - start_y + this.position_y;
                    var dx = event.changedTouches[0].clientX - start_x + this.position_x;                
                } catch(err) {
                    var dy = event.clientY - start_y + this.position_y;
                    var dx = event.clientX - start_x + this.position_x;
                }
                this.element.style.left = dx.toString() + 'px';
                this.element.style.top = dy.toString() + 'px';
                this.flag = true;
            }
            document.onmousemove = move;
            document.ontouchmove = move;
            let up = (event) => {
                this.element.style.cursor= '';
                document.onmousemove = null;
                document.ontouchmove = null;
                try {
                    var dy = event.changedTouches[0].clientY - start_y;
                    var dx = event.changedTouches[0].clientX - start_x;
                } catch(err) {
                    var dy = event.clientY - start_y;
                    var dx = event.clientX - start_x;
                }
                this.position_y += dy;
                this.position_x += dx;
                document.onmouseup = null; 
                document.ontouchend = null;  
            }
            document.onmouseup = up;
            document.ontouchend = up;
        } else {
            return false;
        }
    }

    _parseInt(st) {
        if (st.length == 0) {
            return 0;
        } else {
            return parseInt(st);
        }
    }

    reset_grab_control() {
        this.position_x = _parseInt(this.element.style.left);
        this.position_y = _parseInt(this.element.style.top);
    }
}

class ZoomControl {
    constructor(map) {
        this.in_button = document.querySelector('.control-zoom__in');
        this.out_button = document.querySelector('.control-zoom__out');
        this.map = map;
        this.step = 0.7;

        this.in_button.onclick = () => {this.scale_map('in')}
        this.out_button.onclick = () => {this.scale_map('out')}
    }

    scale_map(direct) {
        if (map.flag == true) {
            var map_rect = this.map.element.getBoundingClientRect();
            var top = (innerHeight/2 - map_rect.top)/this.map.scale_factor;
            var left = (innerWidth/2 - map_rect.left)/this.map.scale_factor;
            this.map.element.style.transformOrigin = left.toString()+'px '+ top.toString()+'px';
        }
        var descale = 1;
        if (direct === 'in') {
            this.map.scale_factor /= this.step;
        } else if (direct === 'out') {
            this.map.scale_factor *= this.step;
        }
        descale = 1/this.map.scale_factor;
        this.map.element.style.transform = 'scale('+this.map.scale_factor.toString()+')';
        for (var i = 0; i < this.map.points.length; i++) {
            this.map.points[i].style.transform = "translate(-50%, -50%) scale("+descale+")";
        }
        map.flag = false;
    }

}

function geo() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
      
        console.log('Ваше текущее метоположение:');
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);
      };
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      
      navigator.geolocation.getCurrentPosition(success, error, options);
}

document.body.getBoundingClientRect().left = 0;
var map = new Map();
var zoom_control = new ZoomControl(map);