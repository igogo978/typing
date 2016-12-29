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
            // console.log(response.data.article);
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
    watch: {
        article: function(val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal)
            this.article = val;
            // console.log('watch');
            if (this.article.length > 0) {
                for (let i = 0; i < Math.ceil(this.article.length / this.lineLength); i++) {
                    let obj = {
                        articleText: new String(''),
                        inputText: new String(''),
                        scores: 0
                    }

                    obj.articleText = this.article.slice(i * this.lineLength, (i * this.lineLength) + this.lineLength);
                    // obj.scores = 0;
                    // console.log(obj.inputText.length);

                    this.theArticleCollect.push(obj);

                }
                this.focusArticle[this.currentLine] = this.theArticleCollect[0].articleText;
                this.focusArticle[this.currentLine + 1] = this.theArticleCollect[1].articleText;

            }
        },

    },
    methods: {
        totalInputTextLength: function() {
            // console.log(this.currentLine);
            let totalInputTextLength = this.inputText.length;

            for (let i = 0; i < this.theArticleCollect.length; i++) {
                if (i != this.currentLine) {
                    let lineLength = this.theArticleCollect[i].inputText.length;
                    totalInputTextLength = totalInputTextLength + lineLength;
                }
            }

            return totalInputTextLength;

        },
        timerCountdown: function() {
            // console.log(this.hasBegun);
            // if (this.hasBegun == false) { //hasBeun: false  還沒開始
            //     this.hasBegun = true;
            //     this.inputText = '';
            //時間計算
            let i = this.contestTime - 1;
            let j = this.duration + 1;
            let isEditable = this.isEditable;
            const intervalId = setInterval(function() {
                // console.log("duration: " + j);
                Vue.set(vm, 'contestTime', i);
                Vue.set(vm, 'duration', j);
                i--;
                j++;
                if (i < 0) {

                    Vue.set(vm, 'isEditable', false);
                    clearInterval(intervalId);

                }
                // console.log(this.$data.contestTime);
            }, 1000);

            // }

        },
        // fetchData: function() {
        //     this.$http.post('data.php', {
        //         foo: 'bar'
        //     }).then(response => {
        //         this.article = decodeURIComponent(response.data.article);
        //         // console.log(response.data.article);

        //         // console.log(this.article);
        //     });

        // },
        previousLine: function() {
            if (this.currentLine > 0) {
                this.currentLine--;
            }
            console.log(this.currentLine);
            this.inputText = this.theArticleCollect[this.currentLine].inputText;

        },
        nextLine: function() {
            //輸入行資料存入array
            this.theArticleCollect[this.currentLine].inputText = this.inputText;
            // this.theArticleCollect[this.currentLine].articleText = this.focusArticle;
            // console.log(this.inputTextCollect[this.currentLine]);

            this.currentLine++;
            if (this.currentLine < this.theArticleCollect.length) {
                //更新中央行內容 
                this.focusArticle[this.currentLine] = this.theArticleCollect[this.currentLine].articleText;

                this.inputText = this.theArticleCollect[this.currentLine].inputText.length > 0 ? this.theArticleCollect[this.currentLine].inputText : '';

                // if (this.theArticleCollect[this.currentLine].inputText != null) {
                //     this.inputText = this.theArticleCollect[this.currentLine].inputText;

                // } else {
                //     this.inputText = '';

                // }

            } else {
                this.isEditable = false;
            }

        },

        inputEvents: function(event) {
            if (this.hasBegun == false) { //hasBeun: false  還沒開始
                this.hasBegun = true;
                this.inputText = '';
                this.timerCountdown();
            }

            // console.log(event.keyCode);
            if (event.keyCode === 38) {
                this.previousLine();
            }
            if (event.keyCode === 40) {
                this.nextLine();
                this.repaintFocusArticle();
            }
            if (event.keyCode === 13) {
                // console.log(this.inputText.length);
                this.inputText = this.inputText.slice(0, this.inputText.length - 1); //last char is enter
                this.nextLine();
                this.repaintFocusArticle();
            }

            //任何鍵盤事件都會引發inputEvents, 所以必須確保非null
            if (this.inputText != null) {

                this.replacePunctuation();
                let currentLine = this.currentLine;
                let displayChar;
                this.focusArticle[currentLine] = '';


                //每一次輸入事件都是重頭計算, 分數永遠由０開始
                this.theArticleCollect[currentLine].scores = 0;
                for (let i = 0; i < this.inputText.length; i++) {
                    let inputChar = this.inputText[i];
                    let articleChar = this.theArticleCollect[currentLine].articleText[i];
                    //計算得分
                    if (this.isScored(inputChar, articleChar)) {
                        this.theArticleCollect[currentLine].scores++;
                    }

                    // console.log(this.isMatch(articleChar,inputChar));
                    //輸入字串長度與取出該行題目字串長度一字一字比對,
                    //輸入行區為立即事件,不應使用repaint 三行都重繪
                    displayChar = this.isMatch(articleChar, inputChar);

                    this.focusArticle[currentLine] = this.focusArticle[currentLine] + displayChar;

                }
                // console.log(this.theArticleCollect[currentLine].scores);
                this.focusArticle[currentLine] = this.focusArticle[currentLine] + this.theArticleCollect[currentLine].articleText.slice(this.inputText.length);

            } //if (this.inputText != null)

        },
        repaintFocusArticle: function() {

            for (let lineNumber = this.currentLine - 1; lineNumber <= this.currentLine + 1; lineNumber++) {

                //輸入行不比對
                if (lineNumber != this.currentLine) {

                    let displayChar;
                    let theArticleCollect = this.theArticleCollect;
                    this.focusArticle[lineNumber] = '';

                    for (let i = 0; i < theArticleCollect[lineNumber].inputText.length; i++) {

                        let inputChar = theArticleCollect[lineNumber].inputText[i];
                        let articleChar = theArticleCollect[lineNumber].articleText[i];

                        let displayChar = this.isMatch(articleChar, inputChar);
                        this.focusArticle[lineNumber] = this.focusArticle[lineNumber] + displayChar;

                    }
                    this.focusArticle[lineNumber] = this.focusArticle[lineNumber] + theArticleCollect[lineNumber].articleText.slice(theArticleCollect[lineNumber].inputText.length);

                    console.log(this.focusArticle[lineNumber]);

                }

            }

        },
        isMatch: function(articleChar, inputChar) {
            if (articleChar === inputChar) {
                articleChar = '<span class="fg-blue">' + articleChar + '</span>';
            } else {
                articleChar = '<span style="color:red">' + articleChar + '</span>';

            }

            return articleChar;

        },
        isScored: function(articleChar, inputChar) {
            let expression = new Boolean();
            if (articleChar === inputChar) {
                expression = true;
            } else {
                expression = false;

            }
            return expression;

        },
        replacePunctuation: function(str) { //置換符號
            this.inputText = this.inputText.replace(/(\[|\]|:|;|,|\.)/, function(v) {
                if (v === ',') {
                    return '，'
                };
                if (v === '.') {
                    return '。'
                };
                if (v === '!') {
                    return '！'
                };
                if (v === '[') {
                    return '「'
                };
                if (v === ']') {
                    return '」'
                };
                if (v === ':') {
                    return '：'
                };
                if (v === ';') {
                    return '；'
                };
            });
        },
    },
    template: '#typingArticle'
});
