//Name: Molli Bishop
class MemGame {
    bDiv = null;
    bDivId = "";
    bSize = 0;

    constructor(bDivId, bSize) {
        this.bDivId = bDivId;
        this.bDiv = document.getElementById(bDivId);
        this.bDiv.innerHTML = "<h1>Loading...</h1>";
        this.bSize =bSize;
        this.hard = false;
        this.easy = true;

        this.initImages();
    
        this.startGame(); 
    }                   
                        
    startGame() {
        if(this.hard){
            this.bSize = this.bSize * 2;
            this.makeList(this.bSize);
            this.shuffle();
            this.genList();
            this.matchedCount = 0;
        }

        if(this.easy){
            this.bSize = 5;
            this.makeList(this.bSize);
            this.shuffle();
            this.genList();
            this.matchedCount = 0;
        }
    }

    makeList(aSize) {
        this.list = [];
        for (let i = 1; i <= aSize; i++) {
            let obj1 = { val: i };
            this.list.push(obj1);
            let obj2 = { val: i };
            this.list.push(obj2);
        }
        this.count = aSize;
    }

    genCard(id){
        let card = document.createElement("div");
        card.classList.add("card");

        if(this.TXT_MODE)
            card.innerHTML = "<div>?</div>";
        else
            card.innerHTML = "<img class='img' src='" + this.card_back + "'/>";

        card.addEventListener("click", (e) => { this.click(id) }, false);
        
        return card;
    }

    genList() {
        this.bDiv.innerHTML = "";
        for (let i = 0; i < this.list.length; i++){
            let c = this.genCard(i);
            this.bDiv.appendChild(c);
            this.list[i].el = c;
        }
    }
    click(id) {
        let item = this.list[id];

        if (this.card_id_1 != null && this.card_id_2 != null)
            return;

        if (item.showFlag)
            return;

        if (this.card_id_1 == null) {
            this.card_id_1 = id;
            console.log("First: " + item.val);
            this.showCard(id, true);
            return;
        } else if (this.card_id_2 == null) {
            this.card_id_2 = id;
            console.log("Second: " + item.val);
            this.showCard(id, true);

            let matched = this.list[this.card_id_1].val == this.list[this.card_id_2].val;
            
            if (matched) {
                console.log("Matched!");
                this.card_id_1 = null;
                this.card_id_2 = null;

                setTimeout(() => {
                    if(++this.matchedCount == this.count) {
                        alert("You won!");
                        if(!this.hard) {
                            let hard = confirm("Increase difficulty?");
                            if(hard){
                                this.hard = true;
                                this.easy = false;
                                this.startGame();
                            }
                            else
                                this.startGame();
                        }
                        else {
                            let easy = confirm("Decrease difficulty?");
                            if(easy) {
                                this.hard = false;
                                this.easy = true;
                                this.startGame();
                            }
                            else
                                this.startGame();
                        }
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    console.log("Not matched: Reset them");
                    this.showCard(this.card_id_1, false);
                    this.showCard(this.card_id_2, false);

                    this.card_id_1 = null;
                    this.card_id_2 = null;
                }, 500);
            }
        }
    }

    showCard(id, showFlag) {
        let item = this.list[id];
        let itemEl = item.el;
        itemEl.classList.add("closed");

        setTimeout(() => {
            this.showCard1(id, showFlag);
        }, 300);
    }

    showCard1(id, showFlag) {
        let item = this.list[id];
        let itemEl = item.el;
        let txtEl = itemEl.firstChild;
        item.showFlag = showFlag;
        if (this.TEXT_MODE) {
            if(showFlag)
                txtEl.innerHTML = item.val;
            else 
                txtEl.innerHTML = "?";
        } else {
            if (showFlag)
                txtEl.src = "./pics/" + this.images[item.val - 1];
            else
                txtEl.src = this.card_back
        }
        console.log("HI");
        itemEl.classList.remove("closed");
        itemEl.classList.add("open");
    }

    shuffle(){ //We got this from Collin on the discussion board

        for(let i = 0; i < this.list.length; i++){
            let randNum = Math.floor(Math.random() * Math.floor(this.list.length));

            let currentEl = this.list[i];

            this.list[i] = this.list[randNum];

            this.list[randNum] = currentEl;
        }
    }

    initImages(){
        this.images = [];
        
        this.images.push("Sora.png");
        this.images.push("goofy.png");
        this.images.push("roxis.png");
        this.images.push("axel.png");
        this.images.push("mickey.png");
        this.images.push("belle.png");
        this.images.push("ariel.png");
        this.images.push("hercules.png");
        this.images.push("aurora.png");
        this.images.push("snow.png");
    
        this.card_back = "./pics/card_back.png";
    }
}