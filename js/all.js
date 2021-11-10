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
        go(block){
            block.type = this.state;
            this.state = -this.state;
        }
    }
});