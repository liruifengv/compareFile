const data = {
    name: '李瑞丰',
    age: 24
}

function walk(data) {
    for (const key in data) {
        const dep = [];
        let val = data[key]

        const nativeString = Object.prototype.toString.call(val)
        if (nativeString === '[object Object]') {
            walk(val)
        }
        Object.defineProperty(data, key, {
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log(`设置了属性:${key}`);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                dep.forEach(fn => fn())
            },
            get() {
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log(`读取了属性:${key}`);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                dep.push(Target)
                return val
            }
        })
    }
}

walk(data)

let Target = null;

function $watch(exp, fn) {
    Target = fn;
    let pathArr,
        obj = data;
    if (typeof exp === 'function') {
        exp()
        return
    }
    if (/\./.test(exp)) {
        pathArr = exp.split('.')
        pathArr.forEach(p => {
            obj = obj[p]
        })
        return
    }

    data[exp]
}

$watch('age', function () {
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
    console.log("age 的值变动了");
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
})


function render() {
    console.log(`姓名：${data.name}; 年龄：${data.age}`)
}
render();