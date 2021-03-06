// ----------  primo componente---------
Vue.component('elenco-annunci', {
    template: '<ul v-if="immobili.length > 0">\
        <li class="small-12 large-4 columns" v-for="(annuncio, i) in immobili" v-bind:key="i">\
            <img :src="annuncio.acf.immagine_1">\
            <p>{{annuncio.title.rendered}}</p>\
            <p>{{annuncio.acf.indirizzo}} - {{annuncio.acf.citta}}</p>\
            <p>&euro; {{annuncio.acf.richiesta}} - $ {{Number(annuncio.acf.richiesta) * 1.2187}}</p>\
        </li>\
    </ul>',
    props: {
        immobili: {
            type: Array
        }
    }
});
//--------secondo componente---------

Vue.component('selezione-annunci', {
    template: '<div>\
         <form method="post" action="/" ref="input">\
             <fieldset>\
                 <legend>Seleziona la tipologia di annuncio</legend>\
                 <input type="radio" v-model="tipo" value="vendita" v-on:focus="updateValue($event.target.value)"> Vendite\
        <input type="radio" v-model="tipo" value="affitto" v-on:focus="updateValue($event.target.value)"> Affitti\
             </fieldset >\
         </form >\
    <h1>Immobili in {{ tipo }}</h1>\
     </div > ',
    data: function () {
        return {
            tipo: 'vendita'
        }
    },
    methods: {
        updateValue: function (value) {
            this.$emit('update:tipo', value)
        }
    },
});

var vm = new Vue({
    el: '#main-app',
    data: {
        tipologia: '',
        annunci: []
    },
    methods: {
        nuovaSomma: function () {
            return this.numero_1 + this.numero_2;
        }
    },
    watch: {
        tipologia: function (valore) {
            if (valore === 'affitto') {
                $.getJSON('https://www.alessandrocosta.pro/wp-json/wp/v2/annunci?tags=18')
                    .done(function (data) {
                        vm.annunci = data;
                    });
            } else {
                $.getJSON('https://www.alessandrocosta.pro/wp-json/wp/v2/annunci?tags=17')
                    .done(function (data) {
                        vm.annunci = data;
                    });
            }
        }
    }
})