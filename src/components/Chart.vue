<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue';

export interface IChartProps {
    value:  Array<{weight: number, color: string}>;
    radius?: number,
    strokeWidth?: number,
    isDonut?: boolean
}

type IViewModel = {
    color: string;
    d: string;
}

function getRads(value: number): number {
    return  (value - 90) * Math.PI / 180; 
}


const props = withDefaults(defineProps<IChartProps>(), {
    radius: 100,
    strokeWidth: 5,
    isDonut: false,
})
const field = props.radius * 3
const center = field/2;


const paths:ComputedRef<Array<IViewModel>> = computed(()=>{

    const weightSum =props.value.reduce((acc,item)=>{
        acc+=item.weight;
        return acc
    },0);

    let onePercent = 360/weightSum;
   
    
    

    const angles: Array<number> = props.value.map(item=>onePercent * item.weight)
    
    let prevCoords = [center,center-props.radius];
    let anglesSum = 0

   return angles.reduce((acc, item, index)=>{
        anglesSum +=item;

        const rad = getRads(anglesSum); 
        const  x = props.radius * Math.cos(rad) + center
        const y  = props.radius * Math.sin(rad) + center
        const d = `M ${center} ${center}  L ${prevCoords[0]} ${prevCoords[1]} A ${props.radius} ${props.radius} 0,${item>180?1:0},1, ${x} ${y} Z`

        prevCoords = [x,y];


        const view = {
            d: d,
            color: props.value[index].color
        }

        acc.push(view);

        return acc;
    }, [] as Array<IViewModel>)
})
</script>


<template>
    <svg class="chart" :width="field" :height="field" :viewBox="`0 0 ${field} ${field}`">
            <g stroke="#000" :stroke-width="strokeWidth" >
                <path v-for="path in paths"  :d="path.d" :fill="path.color"/>
            </g>
            <circle v-if="isDonut" :cx="center" :cy="center" :r="props.radius/2" fill="#fff" stroke="#000" :stroke-width="strokeWidth"/>
        </svg>
</template>
