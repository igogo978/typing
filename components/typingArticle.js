Vue.component('typingArticle', {
    props: ['selectedArticleId', 'selectedDuration'],
    data: function() {
        return {
            article: '',
            inputText: '請注意,在此區按下鍵盤任意鍵後,時間開始計算',
            article: '',
            focusArticle: [],
            theArticleCollect: [],
            inputTextCollect: [],
            currentLine: 0,
            lineLength: 35,
            wordsPerMinutes: 0,
            hasBegun: false,
            contestTime: 300,
            duration: 0,
            accuracy: 0,
            isEditable: true,
        }
    },
    created: function() {

        // console.log('created');
        let url = 'getArticle.php';
        this.$http.post(url, {
            articleId: this.selectedArticleId
        }).then(response => {
            console.log(response.data.article);
            this.article = decodeURIComponent(response.data.article);
            // console.log(this.articles)
        });
    },
    computed: {
        endOfLine: function() {
            // console.log(this.focusArticle);
            let eof;
            if (this.focusArticle) {
                eof = '<i class="fa fa-hand-o-down" aria-hidden="true"></i>';
            } else {
                eof = "發生錯誤了,目前抓不到題目";

            }
            return eof;
        },

        typingAccuracy: function() {
            if (this.hasBegun) {
                let totalInputTextLength = this.totalInputTextLength();
                this.accuracy = (this.totalScores / totalInputTextLength) * 100;
                if (totalInputTextLength === 0 || this.duration === 0 || this.totalScores === 0) {
                    this.accuracy = 0;
                }
                return this.accuracy.toFixed(2);
            } else {
                return 0;
            }

        },
        //計算打字速度
        typingRate: function() {
            if (this.hasBegun) {
                let totalInputTextLength = this.totalInputTextLength();
                this.wordsPerMinutes = (totalInputTextLength / this.duration) * 60;
                if (totalInputTextLength === 0 || this.duration === 0) {
                    this.wordsPerMinutes = 0;
                }
                return this.wordsPerMinutes.toFixed(0);
            } else {
                return 0;
            }

        },
        totalScores: function() {
            // console.log(this.currentLine);
            let sum = 0;
            for (let i = 0; i < this.theArticleCollect.length; i++) {
                sum = sum + this.theArticleCollect[i].scores;
            }
            return sum;

        },


    },
    template: '#typingArticle'
});
