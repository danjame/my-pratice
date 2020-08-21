import { init, h } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

const patch = init([
    style,
    eventlisteners
])

let app = document.querySelector('#app')

let data = [
        {rank: 1, name: 'Massachusetts Institute of Technology (MIT)', 
        desc: '“Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place.'},
        {rank: 2, name: 'Stanford University', 
        desc: 'Located 35 miles south of San Francisco and 20 miles north of San Jose, Stanford University is in the heart of Northern California’s dynamic Silicon Valley, home to Yahoo, Google, Hewlett-Packard, and many other cutting-edge tech companies that were founded by and continue to be led by Stanford alumni and faculty. Nicknamed the “billionaire factory”, it is said that if Stanford graduates formed their own country it would boast one of the world’s largest ten economies.'},
        {rank: 3, name: 'The University of Edinburgh', 
        desc: 'Established in 1636, Harvard is the oldest higher education institution in the United States, and is widely regarded in terms of its influence, reputation, and academic pedigree as a leading university in not just the US but also the world.'},
        {rank: 4, name: 'California Institute of Technology (Caltech)', 
        desc: 'The California Institute of Technology (Caltech) is a world-renowned science and engineering research and education institution, located in Pasadena, California, around 11 miles northeast of downtown Los Angeles.'},
        {rank: 5, name: 'University of Oxford', 
        desc: 'The University of Oxford is the oldest university in the English-speaking world, and is actually so ancient that its founding date is unknown – though it is thought that teaching took place there as early as the 11th century.'}
    ]
//页面虚拟dom
function view(){
    return h ('div', [
        h('div.head', 'Top Universities Ranking'),
        h('div.sortWrapper',
        [
            h('div.sortTitle','Sort by'),
            h('button.btn', {on: {click: rankSort}}, 'Rank'),
            h('button.btn', {on: {click: [alphabetSort, 'name']}}, 'Name'),
            h('button.btn', {on: {click: [alphabetSort, 'desc']}}, 'Discription'),
            h('button.btn', {on: {click: addHandler}}, 'Add')
        ]),
        h('div', listView(data))
    ])
}
//列表虚拟dom
function listView(data){
    return h('ul', data.map(item=>{
        return h('li.uni', { style: {
            opacity: '0',
            transition: 'opacity 1s',
            remove: { opacity: '0' },
            delayed: { opacity: '1' }
          }} ,[
            h('div.rank', item.rank),
            h('div.name', item.name),
            h('div.desc', item.desc),
            h('button.delete', {on: {click: [removeHandler, item.rank]}}, 'X')
        ])
    }))
}

let oldVnode = patch(app, view())

//添加
function addHandler(){
    let maxRank = Math.max(...data.map(item=>item.rank))
    data.push({
        rank: ++maxRank,
        name: `new name${maxRank}`,
        desc: `new desc${maxRank}`,
    })

    oldVnode = patch(oldVnode, view())
}

//删除
function removeHandler(rank){
    data.forEach(item=>{
        data = data.filter(item=>{
            return item.rank !== rank
        })
    })
    oldVnode = patch(oldVnode, view())
}

//排名排序
function rankSort (){
    data = data.sort((a, b)=>{
        return a.rank - b.rank
    })
    oldVnode = patch(oldVnode, view())
}
//其他属性字母排序
function alphabetSort(property){
    //提取属性值并排序
    let arr = []
    data.forEach(item=>{
        arr.push(item[property])
    })
    arr.sort()

    //根据属性值的顺序排序data对象
    let newData = [];
    for(let i = 0; i<data.length; i++){
        data.forEach(item=>{
            if(item[property]===arr[i]){
                newData[i]=item;
            }
        })
    }
    data = newData;
    oldVnode = patch(oldVnode, view())
}