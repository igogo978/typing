Vue.component('initPage', {
    props: ['articles', 'selected'],
    data: function() {
        return {
            selectedOption: '',
            durationOptions: [60, 180, 300, 600],
            preSelectedDuration: 300

        }
    },
    created: function() {
        this.selectedOption = this.selected;
    },
    computed: {
        menu: function() {
            // console.log(this.articles.length);
            if (this.articles.length > 0) {
                this.selectedOption = 0;
                // console.log(this.durationOptions);
                return this.articles;
            } else {
                return [];
            }

        }
    },
    methods: {
        updateSelectedArticle: function() {
            // console.log(this.selectedOption)
            this.$emit('update-selected-article', this.selectedOption);
        },
        updateselectedDuration: function() {
            this.$emit('update-selected-duration', this.preSelectedDuration);

        }

    },
    template: '#initPage'
});
