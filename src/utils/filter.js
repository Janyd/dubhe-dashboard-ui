import Vue from 'vue'
import { formatDate } from '@/utils/date'

Vue.filter('convertTime', function(time) {
    time = time * 1000
    return formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss')
})
