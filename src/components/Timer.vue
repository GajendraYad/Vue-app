<template>
    <div v-if="loaded">
        <span style="font-weight: 600; font-size: 18px;">Timer - </span>
        {{displayDays}} days :
        {{displayHours}} hours :
        {{displayMinutes}} minutes :
        {{displaySeconds}} seconds
    </div>
</template>

<script>
export default {
    data: () => ({
        displayDays: 0,
        displayHours: 0,
        displayMinutes: 0,
        displaySeconds: 0,
        loaded: false,
    }),
    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60;
        },
        _hours() {
            return this._minutes * 60;
        },
        _days() {
            return this._hours * 24;
        }
    },
    
    methods: {
        showRemaining() {
            const showtimer = setInterval(() => {
                const now = new Date();
                const end = new Date(2022, 7, 34, 40, 10, 20, 50);
                const distance = end.getTime() - now.getTime();

                if(distance < 0) {
                    clearInterval(showtimer);
                    return;
                }

                const days = Math.floor(distance / this._days);
                const hours = Math.floor((distance % this._days) / this._hours);
                const minutes = Math.floor((distance % this._hours) / this._minutes);
                const seconds = Math.floor((distance % this._minutes) / this._seconds);
                this.displayMinutes = this.formatNum(minutes);
                this.displaySeconds = this.formatNum(seconds);
                this.displayHours = this.formatNum(hours);
                this.displayDays = this.formatNum(days);
                this.loaded = true;
            }, 1000);
        },
        formatNum: num => (num < 10 ? '0' + num : num),
    },    
    mounted() {
        this.showRemaining();
    },
};
</script>

