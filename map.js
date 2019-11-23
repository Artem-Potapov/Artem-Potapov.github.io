class Map{
    constructor(){
        this.element=document.getElementsByClassName('map')[0];
        this.position_y = 0;

        this.element.onmousedown = (event) => {this.mousedown(event)};
    }

    mousedown(event){
        var start_y = event.pageY;
        this.element.style.cursor= 'grabbing';
        document.onmousemove = (event) => {
            var dy = event.pageY - start_y + this.position_y;
            this.element.style.transform ='translateY(' +dy + 'px)';
        }
        document.onmouseup = (event) => {
            this.element.style.cursor= '';
            document.onmousemove = null;
            var dy = event.pageY - start_y;
            this.position_y += dy;
            this.back(event);
            console.log(this.position_y);
        }
    }

    back(event){
        this.element.style.transition = 'transform 0.5s';
        if(this.position_y > 0){
            this.element.style.transform = '';
            this.position_y = 0;
        }

        // if(this.position_y < -(1500 +window.innerHeight)){
        //     this.element.style.transform = 'translateY(' + (-(1500+window.innerHeight)) + 'px)';
        //     this.position_y = -(1500+window.innerHeight);
        // }

        setTimeout(()=>{this.element.style.transition = '';}, 550);
    }
}

var map = new Map();