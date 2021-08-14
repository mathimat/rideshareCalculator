const App = {
    data(){
        return {
            fields: [
                {field: 'kilometers', label: 'Kilometers Driven', tooltip: 'google maps'},
                {field: 'passengers', label: 'Number of Passengers', tooltip: 'driver excluded'},
                {field: 'energyprkm', label: 'Wh/km', tooltip: ''},
                {field: 'energyprice', label: 'kr/Wh', tooltip: ''},
                {field: 'marginal cost/km', label: 'kr/km', tooltip: 'Tire weare, maintanance etc.'},
                {field: 'parking/tolls', label: 'kr', tooltip: ''}
            ]
        }
    }
}


const app = Vue.createApp(App);

app.component('input-field', {
    data() {
        return {
            value: 0
        }
    },
    props: ['field','label','tooltip'],
    template: `
    <div class="input-data">
        <label>{{label}}
            <input v-model.number="value" type="number">
        </label>
        <div class="input-tooltip">{{tooltip}}</div>
    </div>
    `
});


app.mount('#content');