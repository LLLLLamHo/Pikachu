
const mixin = function () { 
    console.log( b );
    for ( let key in b ) { 
        console.log( b['bb'] );
    }
}

class c { 
    static cc() { }
}

class b { 
    static bb() { }

    static bb2() { }
}

class a { 
    static aa() { }
}


mixin( a );
console.log( a );