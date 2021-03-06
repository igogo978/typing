
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

       
<component v-bind:is="currentView" :articles="articles" v-on:updateselected="update">
   <!-- component changes when vm.currentView changes! -->
</component>
     

     

        <!-- {{selected}} -->
    </div>


    <template id="initPage">
        <div class="row">
            <div class="col-md-1">
            選擇文章
                <select v-model="selectedOption" v-on:change="updateselected(selectedOption)">
                    <option v-for="article in menu" v-bind:value="article.id">
                        {{ decodeURIComponent(article.fileName) }}
                    </option>
                </select>
                <!-- {{selectedOption}} -->
            </div>
            <div class="col-md-1">
            計時

         <!--    {{durationOptions}}
                <select v-model="selectedDuration" v-on:change="updateselectedduration(preSelectedDuration)">
                    <option v-for="duration in durationOptions" v-bind:value="duration">
                        {{ (duration) }}
                    </option>
                </select> -->

            </div>
        </div>

    </template>

    <footer>
        <script>
        "use strict";
        Vue.http.options.emulateJSON = true;

        Vue.component('initPage', {
            props: ['articles','selected'],
            data: function () {
                return {
                    selectedOption: '', 
                    preSelectedDuration: ''

                }
            },
            created: function () {
                 this.selectedOption = this.selected;
            },
            computed: {
                menu: function () {
                   // console.log(this.articles.length);
                   if (this.articles.length>0) {
                        this.selectedOption = 0;
                        // console.log(this.durationOptions);
                        return this.articles;
                   } else {
                       return [];
                   }

                }
            },
            methods: {
                updateselected: function () {
                    // console.log(this.selectedOption)
                    this.$emit('updateselected', this.selectedOption);
                },

            },
            template: '#initPage'
        });

        var vm = new Vue({
            el: "#app",
            data: {
                articles: [],
                selected: 1,
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
                });
            },
           
            methods: {
                update: function (value) {
                    console.log('update value: '+value);
                    this.selected = value  ;

                }

            }

        });
        </script>
    </footer>
</body>

</html>
