<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Typing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="css/metro.css" rel="stylesheet">
    <link href="css/metro-icons.css" rel="stylesheet">
    <link href="css/metro-responsive.css" rel="stylesheet">
    <script src="js/vue.js"></script>
    <script src="js/vue-resource.min.js"></script>
</head>

<body class="bg-grayLighter fg-black">
    <div class="container" id='app'>

       
<component v-bind:is="currentView" :articles="articles" v-on:update-selected-article="updateArticle" v-on:update-selected-duration="updateDuration" :selected-article-id="selectedArticleId" :selected-duration="selectedDuration">
   <!-- component changes when vm.currentView changes! -->
</component>

            <button type="button" class="btn btn-success" @click="currentView='typingArticle'">開始練習</button>

        <!-- {{selectedArticleId}} -->
        <!-- {{selectedDuration}} -->
    </div>


    <template id="initPage">
        <div class="container">
            <div class="col-md-1">
            選擇文章
                <select v-model="selectedOption" v-on:change="updateSelectedArticle(selectedOption)">
                    <option v-for="article in menu" v-bind:value="article.id">
                        {{ decodeURIComponent(article.fileName) }}
                    </option>
                </select>
                <!-- {{selectedOption}} -->
            </div>
            <div class="col-md-1">
            計時

            
                <select v-model="preSelectedDuration" v-on:change="updateselectedDuration(preSelectedDuration)">
                    <option v-for="duration in durationOptions" v-bind:value="duration">
                        {{ (duration) }}
                    </option>
                </select>
                {{preSelectedDuration}}

            </div>

        </div>
    </template>

    <template id="typingArticle">
        <div class="container">
            <div class="row">
                <div class="col-xs-1 col-md-1">
                </div>
                <div class="col-xs-10 col-md-10" style="height: 50px;">
                    <h3>
                        <div>
                            <label class="tag tag-pill tag-info bg-darkCobalt fg-white">
                                計時:  <!-- {{contestTime}} -->
                            </label>

                            <div class="pull-right">
                                <label class="tag tag-pill tag-info bg-darkCobalt fg-white">
                                    得分:  <!-- {{totalScores}} --> 
                                </label>
                                <label class="tag tag-pill tag-info bg-darkCobalt fg-white">
                                    正確率:  <!-- {{typingAccuracy}} --> 
                                </label>
                                <label class="tag tag-pill tag-info bg-darkCobalt fg-white">
                                    <!-- {{typingRate}} --> 字/分
                                </label>
                            </div>

                        </div>
                    </h3>
                </div>
            </div>
            <div class="row" style="font-family:DFKai-sb,標楷體; font-size: 1.3em;">
                <div class="col-xs-1 col-md-1">
                </div>
                 <div class="col-xs-10 col-md-10 bg-black padding10 block-shadow" style="border:solid 2px gray; border-radius: 5px;">
                    <div class="panel">
                        <div class="heading bg-darkBlue fg-grayLighter">
                            中文打字練習
                        </div>
                    </div>
                </div>
            </div>

            <!-- {{article}} -->
       




            typingPage

        {{selectedArticleId}}
        {{selectedDuration}}
        <!-- {{article}} -->
        </div>
    </template>


    <footer>
    <script src="components/initPage.js"></script>
    <script src="components/typingArticle.js"></script>
        <script>
        "use strict";

        Vue.http.options.emulateJSON = true;


        var vm = new Vue({
            el: "#app",
            data: {
                articles: [],
                selectedArticleId: 0,
                selectedDuration: 300,
                currentView: 'initPage'
            },
            created: function () {

                // console.log('created');
                let url = 'initTyping.php';
                this.$http.post(url, {
                    foo: 'bar'
                }).then(response => {
                    console.log(response.data.articles[1].fileName);
                    this.articles = (response.data.articles);
                    // console.log(this.articles)
                });
            },
           
            methods: {
                updateArticle: function (value) {
                    console.log('update value: '+value);
                    this.selectedArticleId = value  ;

                },
                updateDuration: function(value) {
                    // this.duration = value;
                    console.log(value);
                    this.selectedDuration = value;
                }

            }

        });
        </script>
    </footer>
</body>

</html>
