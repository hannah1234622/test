const Home ={
    template:
    `
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">你好 馮禹華</h1>
            <p class="text-muted lead">來研究Vue.js吧</p>
        </div>
    </div>
    `
}
const Feature ={
    template:'<h1>自我介紹</h1>'
}
const Works ={
    template:'<h1>作品</h1>'
}
const routes=[
    {
        path:'/home',component:Home
    },
    {
        path:'/feature',component:Feature
    },
    {
        path:'/works',component:Works
    }
]
const router = new VueRouter({
    routes
})
new Vue({
    el:"#app",
    router,
    data:{
        Home:'首頁',
        Feature:'自我介紹',
        Works:'作品',
        yourname:'你的名字',
        submit:'輸入',
        username:'',
    }
});
new Vue({
    el:"#app3",
    data:{  //新增留言的物件
        noteSelected:{
            name:'',
            content:''
        },
        newNote:{
            name:'',
            content:''
        },
        notes:JSON.parse(localStorage.getItem('notes')) || [] //儲存留言物件的陣列
    },watch:{
        notes:{
            handler:'saveNotes', //處理程序的名稱設定
            deep:true //監看資料變化層次
        }
    },methods:{
        selectNote(note){
            this.noteSelected.name =  note.name
            this.noteSelected.content = note.content
        },
        addNote(){
            if (this.newNote.name.trim().length == 0 || this.newNote.content.trim().length == 0) { //this指向物件
                alert('記得標題和內容都要填喔')
                return
            }
            const note ={
                name:this.newNote.name,
                content:this.newNote.content,
                created:new Date()
            }
            this.notes.push(note) //push()將數組末尾添加多個元素 note物件儲存到notes陣列
            this.newNote.name='' //add 後清除 name 和 content 裡面的值
            this.newNote.content=''
        },
        deleteNote(note){
            var found = false
            for(var i=0;i<=this.notes.length;i++){
                if(this.notes[i].name == note.name){
                    found = true;
                    break;
                }
            }
            if(found){
                this.notes.splice(i,1)
            }
            $('#exampleModal').modal('hide') //隱藏刪除視窗
        },
        saveNotes(){
            localStorage.setItem('notes',JSON.stringify(this.notes))
        }
    }
})