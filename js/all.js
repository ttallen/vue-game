var blocks = { type: 0 }
var vm = new Vue({
    el: "#app",
    data: {
        start: 0,
        // 每個格子狀態&資訊
        blocks: [],
        // 上一局player
        previous_game: 1,
        // player狀態
        state: 1,
        // 判斷步數
        step:0,
        // 判斷獲勝條件
        check_list: [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [0,4,8]
        ],
        Xscore: 0,
        Oscore: 0,
        // 遊戲結束與否
        end: false
    },
    mounted() {
        this.restart();
    },
    methods: {
        restart(){
            this.blocks = Array.from({ length: 9 }, function(d,i){
                return {
                    id: i+1,
                    type: 0
                }
            });
            this.previous_game = 1;
            this.state = 1;
            this.step = 0;
            this.Xscore = 0;
            this.Oscore = 0;
            this.end = false;
        },
        again(){
            this.blocks = Array.from({ length: 9 }, function(d,i){
                return {
                    id: i+1,
                    type: 0
                }
            });
            this.state = this.previous_game;
            this.step = 0;
            this.end = false;
        },
        game_start() {
            return this.start = 1;
        },
        go(block){
            for(var i = 0; i < 8; i++) {
                var [a,b,c] = this.check_list[i];
                var sum1 = this.blocks[a].type + this.blocks[b].type + this.blocks[c].type;
                if(sum1 == 3 || sum1 == -3) {
                    this.end = true;
                } 
            }
            if(this.end == false) {
                if(block.type == 0) {
                    block.type = this.state;
                    this.state = -this.state;
                }
                if(this.step <= 8) {
                    this.step++;
                }
                if(this.step == 1) {
                    this.previous_game = -this.previous_game;
                }
            }
        }
    },
    computed: {
        win_text() {
            if(this.blocks.length != 0) {    
                // 輸贏計算
                for(var i = 0; i < 8; i++) {
                    var [a,b,c] = this.check_list[i];
                    var sum = this.blocks[a].type + this.blocks[b].type + this.blocks[c].type;
                    if(sum == 3) {
                        this.Oscore++;
                        return "O 贏了!";
                    } else if(sum == -3) {
                        this.Xscore++;
                        return "X 贏了!";
                    }   
                }
                // 平手判斷
                var type_all = [];
                for(var s = 0; s < 9; s++) {
                    type_all.push(this.blocks[s].type);
                }
                if(type_all.indexOf(0) == -1) {
                    return "雙方平手!";
                }
            }
            
            return this.state == 1?"輪到 O 了":"輪到 X 了";
        },
        o_text() {
            return this.Oscore;
        },
        x_text() {
            return this.Xscore;
        }
    }
});