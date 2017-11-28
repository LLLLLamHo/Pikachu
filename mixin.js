class bb { 
    
    aaa() { }
}

class aa extends bb{ 
    constructor( name ) { 
        super( name );
        this.aaa = name;
    }

    say() { 

    }
}

let aa1 = new aa('asd');
let aa2 = new aa( 'ssss' );


console.log('123')

